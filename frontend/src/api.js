import axios from "axios";

const API_BASE_URL =
  import.meta.env.BACKEND_URL || "https://whatsapp-web-u852.onrender.com";
const API_BASE_URL =
  import.meta.env.BACKEND_URL || "https://whatsapp-web-u852.onrender.com";

// export const api = axios.create({ baseURL: BASE });

export const getConversation = async () => {
  const res = await axios.get(`${API_BASE_URL}/conversation`);
  return res.data;
};

export const getMessages = async (wa_id) => {
  const res = await axios.get(`${API_BASE_URL}/conversation/${wa_id}`);
  return res.data;
};

export const sendMessage = async ({ wa_id, name, text, from }) => {
  const res = await axios.post(`${API_BASE_URL}/message`, {
    wa_id,
    name,
    text,
    from,
  });
  return res.data;
};
