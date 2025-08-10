import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Message from "../models/messages.js";
import connectDb from "../db.js";

dotenv.config();
const PAYLOAD_DIR = path.resolve("./src/payloads");

const processFile = async (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const entry = data.metaData?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value) {
      console.warn(`No 'value' field found in ${filePath}`);
      return;
    }

    // 1. STATUS UPDATES
    if (value.statuses) {
      for (const st of value.statuses) {
        await Message.updateMany(
          {
            $or: [{ message_id: st.id }, { meta_msg_id: st.meta_msg_id }],
          },
          { $set: { status: st.status } }
        );
        console.log(
          `Status updated to '${st.status}' for message_id: ${st.id}`
        );
      }
      return;
    }

    // 2. MESSAGE INSERTS
    if (value.messages && value.contacts) {
      const contact = value.contacts[0];
      for (const msg of value.messages) {
        await Message.updateOne(
          { message_id: msg.id },
          {
            $setOnInsert: {
              wa_id: contact.wa_id,
              name: contact.profile?.name || "",
              text: msg.text?.body || "",
              timestamp: new Date(Number(msg.timestamp) * 1000),
              status: "sent",
              message_id: msg.id,
              meta_msg_id: msg.context?.id || "",
              from: msg.from,
            },
          },
          { upsert: true }
        );
        console.log(`Inserted message ${msg.id} from ${contact.wa_id}`);
      }
    }
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
};

const run = async () => {
  await connectDb();
  const files = fs.readdirSync(PAYLOAD_DIR);
  for (const f of files) {
    await processFile(path.join(PAYLOAD_DIR, f));
  }
  console.log("All payloads processed");
};

run();
