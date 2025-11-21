import { AlertTriangle } from "lucide-react";

const RegistrationClosed = ({ mode = "dark" }) => {
  return (
    <div
      className={`flex flex-col items-center bg-backGray justify-center p-10 rounded-2xl shadow-md border ${
        mode === "dark"
          ? " border-gray-700 text-white"
          : "bg-white border-gray-300 text-gray-800"
      }`}
    >
      <AlertTriangle className="text-red-500 mb-4" size={60} />

      <h1 className="text-2xl font-bold mb-2">Registration Limit Reached</h1>

      <p className="text-center max-w-md">
        Sorry! The maximum number of participants for this hackathon has been
        reached. You can no longer register for this event.
      </p>

      <button
        className="mt-6 px-6 py-2 rounded-xl bg-primary text-white hover:bg-secondary hover:scale-105 transition"
        onClick={() => window.location.href = "/hackathons"}
      >
        Browse Other Hackathons
      </button>
    </div>
  );
};

export default RegistrationClosed;
