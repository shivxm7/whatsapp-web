import React, { useEffect, useMemo, useRef } from "react";
import MessageInput from "./MessageInput";
import dayjs from "dayjs";
import { Check, CheckCheck } from "lucide-react";

export default function ChatWindow({
  wa_id,
  messages,
  conversations,
  onSend,
  myNumber,
}) {
  // Find conversation by matching _id to wa_id
  const conv = useMemo(() => {
    if (!wa_id || !conversations) return null;
    return conversations.find((c) => c._id === wa_id);
  }, [conversations, wa_id]);

  //   console.log(conv);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // useEffect(() => {
  //   console.log("Selected wa_id changed:", wa_id);
  //   console.log("Found conversation:", conv);
  // }, [wa_id, conv]);

  const detectOutgoing = (m) => String(m.from) === String(myNumber);

  const handleSend = (text) => {
    if (!wa_id) return;
    onSend({ wa_id, name: conv?.name || wa_id, text });
  };

  const getStatusIcon = (status) => {
    if (status === "sent") return <Check size={14} className="text-gray-500" />;
    if (status === "delivered")
      return <CheckCheck size={14} className="text-gray-500" />;
    if (status === "read")
      return <CheckCheck size={14} className="text-blue-500" />;
    return null;
  };

  return (
    <div className="flex flex-col bg-gray-300 flex-1 min-h-[calc(100vh-0px)] w-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-white">
        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full text-black text-lg bg-green-300 flex items-center justify-center">
          {conv?.name ? conv.name[0] : wa_id ? wa_id[0] : "?"}
        </div>
        <div>
          <div className="md:mt-2 text-lg md:text-xl font-semibold text-black">
            {conv
              ? conv.name
              : wa_id
              ? `Loading user ${wa_id}...`
              : "Select a user"}
          </div>
          <div className="text-sm md:text-md text-black">{wa_id}</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 scrol">
        {messages.map((m, idx) => {
          //   console.log(
          //     "m.from:",
          //     m.from,
          //     "myNumber:",
          //     myNumber,
          //     "isOutgoing:",
          //     detectOutgoing(m)
          //   );

          const isOutgoing = detectOutgoing(m);
          return (
            <div
              key={idx}
              className={`flex mb-2 ${
                isOutgoing ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 text-black text-md md:text-lg rounded-lg shadow ${
                  isOutgoing ? "bg-green-300" : "bg-white"
                }`}
              >
                <div>{m.text}</div>
                <div className="flex justify-end items-center gap-1 text-xs text-gray-500 mt-1">
                  {dayjs(m.timeStamp).format("DD/MM/YYYY HH:mm")}
                  {isOutgoing && getStatusIcon(m.status)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
