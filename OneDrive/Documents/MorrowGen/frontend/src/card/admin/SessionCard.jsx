import React, { useState, useRef, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiSend,
} from "react-icons/fi";
import { FaVideo, FaWhatsapp } from "react-icons/fa";
import SessionForm from "../../components/admin/SessionForm"; // This might not be used here directly, check imports if needed
import EditSessionForm from "../../components/admin/EditSessionForm";
// import useSessionManagementStore from "../../zustand/sessionManagementStore/useSessionManagementStore"; // Not needed directly in SessionCard

const statusColors = {
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const SessionCard = ({ event, onEdit,publishSession, onRemove, onSend }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionFormOpen, setSessionFormOpen] = useState(false);
  const menuRef = useRef();

  const dropdownOptions = [
    {
      label: "Edit",
      icon: <FiEdit2 className="text-blue-600" />,
      action: "edit",
    },
    {
      label: "Remove",
      icon: <FiTrash2 className="text-red-600" />,
      action: "remove",
    },
    {
      label: "Send Now",
      icon: <FiSend className="text-green-600" />,
      action: "send",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (action) => {
    if (action === "edit") {
      setSessionFormOpen(true);
    } else if (action === "remove") {
      console.log("SessionCard: Calling onRemove for ID:", event?.id);
      onRemove(event?.id);
    } else if (action === "send") publishSession?.(event);
    setMenuOpen(false);
  };
  
  // Console log the groups for debugging purposes as per previous logs
  console.log("SessionCard: selectedGroups for event", event?.id, ":", event.selectedGroups);

  return (
    <div>
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative">
        {/* Image Section */}
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-35 object-cover"
          />

          {event.status !== "completed" && (
            <div className="absolute top-2 right-2 " ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-gray-600 hover:text-gray-900 p-1 rounded-full cursor-pointer hover:scale-110 duration-300 bg-white shadow"
              >
                <FiMoreVertical />
              </button>
              {menuOpen && (
                <div className="absolute right-0 cursor-pointer mt-2 z-20 w-36 bg-white border rounded-lg shadow-md">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleOptionClick(option.action)}
                      className="flex items-center w-full px-3 cursor-pointer rounded-lg py-2 text-sm text-left hover:bg-gray-100 gap-2"
                    >
                      {option.icon} {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <span
            className={`absolute top-2 left-2 px-2 py-1 text-[8px] font-bold uppercase rounded-full shadow-sm ${
              statusColors[event.status] || "bg-gray-200 text-gray-600"
            }`}
          >
            {event.status}
          </span>
        </div>
        <div className="py-2 px-3">
          <h3 className="text-sm font-semibold text-primary">{event.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {event.description}
          </p>

          <div className="mt-3 text-sm text-gray-500 flex flex-col gap-1">
            <span className="flex items-center gap-1">
              <FiCalendar /> {event.date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {event.time}
            </span>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            {event.gmeetLink && (
              <a
                href={event.gmeetLink || "#"}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition flex items-center gap-1"
              >
                <FaVideo /> {`${event.gmeetLink ? "Google Meet" : "Not yet"}`}
              </a>
            )}
            {event.whatsappLink && (
              <a
                href={event.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-200 transition flex items-center gap-1"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            )}
          </div>

          {event.selectedGroups && event.selectedGroups.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 ">
              {event.selectedGroups.map((group) => (
                <span
                  key={group} // Assuming group name is unique
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>
          )}
        </div>

        {sessionFormOpen && (
          <div className="fixed inset-0 bg-black/50 duration-200 flex items-center justify-center z-50">
            <div className="bg-white p-6 mx-2 rounded-lg shadow-lg w-full max-w-md">
              <EditSessionForm
                EditData={event}
                title={event.title}
                onClose={() => setSessionFormOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
