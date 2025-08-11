import React from "react";

export default function Sidebar({ users, selectedUser, onSelectUser }) {
  return (
    <div className="w-40 md:w-90 border-r border-gray-300 bg-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-2 md:p-4 border-b font-bold text-2xl md:text-3xl text-green-500 select-none">
        WhatsApp
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {users.map((user) => {
          const isSelected = selectedUser?.wa_id === user.wa_id;
          // console.log(user);
          return (
            <button
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`w-full p-2 md:p-4 flex items-center gap-2 md:gap-3 transition-colors border-b-1 cursor-pointer duration-150 hover:bg-[#f5f5f5]
                ${
                  isSelected
                    ? "bg-white text-black md:font-semibold"
                    : "hover:bg-gray-100 text-gray-800"
                }
              `}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${
                    isSelected
                      ? "bg-green-400 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                `}
              >
                {user.name ? user.name[0].toUpperCase() : user.wa_id[0]}
              </div>
              <div className="text-left text-xm md:text-lg flex flex-col overflow-hidden">
                <div className="font-semibold truncate">
                  {user.name || user.wa_id}
                </div>
                <div className="textarea-md md:text-md text-gray-500 truncate">
                  {user.lastMessage && user.lastMessage.length > 13
                    ? user.lastMessage.slice(0, 13) + "…"
                    : user.lastMessage}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
