import React from "react";
import { FaPlayCircle, FaVideo, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpCommingSessionCard = () => {
  const session = [
  {
    id: 1,
    title: "CRUD Operations using Node.js & postgreSq",
    description:
      "What is Node.js? What is postgreSql?\n✅ Understanding the basics of backend development",
    imageUrl:
      "https://res.cloudinary.com/dxbeg10cj/image/upload/v1749309114/egrdi1fgnnjy8haxcfjs.jpg",
    date: "2025-06-07",
    time: "20:42:00",
    gmeetLink: "https://meet.google.com/xqs-wmmf-mck",
    whatsappLink: "https://chat.whatsapp.com/EoH6loZv1xHGyo9cpSmnio",
    selectedGroups: ["dummy"],
    status: "completed",
  },
];
  return (
    <div className="w-full px-4 py-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {session.map((item, index) => (
          <div
            key={index}
            className={`w-full border rounded-xl shadow-sm overflow-hidden bg-white ${
              item.status === "completed"
                ? "border-green-400 ring-1 ring-green-100"
                : "border-primary"
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-[140px] object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{item.date}</p>
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>

              <span
                className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-2 ${
                  item.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>

              <p className="text-xs text-gray-600 line-clamp-3 mb-3 whitespace-pre-line">
                {item.description}
              </p>

              <div className="w-full mb-2 flex gap-2 flex-wrap">
                {item.gmeetLink && (
                  <a
                    href={item.gmeetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
                  >
                    <FaVideo /> Google Meet
                  </a>
                )}
                {item.whatsappLink && (
                  <a
                    href={item.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-200 transition flex items-center gap-1"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                )}
              </div>

              {item.selectedGroups?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.selectedGroups.map((group) => (
                    <span
                      key={group}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              )}

              <div className="w-full">
                {item.status === "completed" ? (
                  <Link
                    to={item.videoUrl || "#"}
                    className="inline-flex justify-center items-center gap-1 bg-primary text-white text-xs px-3 py-1 rounded-md hover:bg-secondary transition-all"
                  >
                    <FaPlayCircle className="text-sm" />
                    Watch Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1 bg-gray-300 text-white text-xs px-3 py-1 rounded-md cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default UpCommingSessionCard;
