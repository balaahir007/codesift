import { validDomains } from "../../../assets/learnhub/learnhubAssets";
import { FiUpload } from "react-icons/fi";

export const renderCurrentStepInput = (
  step,
  formData,
  errors,
  handleChange,
  previewUrl
) => {
  switch (step) {
    case 0:
      return (
        <div className="flex flex-col gap-3">
          <label className="font-bold">Group Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Coding Masters, Ninja Coders"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${errors.name ? "border border-red-500" : "border border-gray-300"}`}
          />

          <label className="font-bold">Domain</label>
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${errors.domain ? "border border-red-500" : "border border-gray-300"}`}
          >
            <option value="">Select Domain</option>
            {validDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain.trim().charAt(0).toUpperCase() + domain.slice(1)}
              </option>
            ))}
          </select>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-3">
          <label className="font-bold">Set Goal</label>
          <input
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            placeholder="e.g., Improve coding skills"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${errors.goal ? "border border-red-500" : "border border-gray-300"}`}
          />

          <label className="font-bold">Add Tech Skills</label>
          <input
            name="techSkills"
            value={formData.techSkills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${errors.techSkills ? "border border-red-500" : "border border-gray-300"}`}
          />

          <label className="font-bold">Upload Group Logo</label>
          <label
            htmlFor="logo"
            className={`cursor-pointer flex flex-col items-center justify-center rounded-xl p-6 border-2 border-dashed ${errors.logo ? "border-red-500" : "border-gray-300 hover:border-[#0097B2]"}`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Logo"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <>
                <FiUpload className="text-[#0097B2] text-5xl" />
                <span className="text-gray-600 mt-2">Click to upload a group logo</span>
              </>
            )}
          </label>
          <input
            id="logo"
            name="logo"
            accept="image/*"
            className="hidden"
            type="file"
            onChange={handleChange}
          />
        </div>
      );
    default:
      return null;
  }
};
