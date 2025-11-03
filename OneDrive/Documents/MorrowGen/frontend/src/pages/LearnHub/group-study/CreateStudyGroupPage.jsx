import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../zustand/auth/useAuthStore";
import { studyGroupFormValidation as validateForm } from "../../../utils/validation/studyGroupFormValidation";
import courseIcon from "../../../assets/learnhub/images/courseIcon.png";
import { renderCurrentStepInput } from "../../../components/learnhub/groupStudy/renderCurrentStepInput";
import uploadImage from "../../../utils/uploadImage";
import useStudySpacesStore from "../../../zustand/studySpaces/useStudySpaceStore";

const steps = [
  { title: "Enter Group Name and Domain", name: ["name", "domain"] },
  { title: "Set Goal, Tech Skills & Upload Logo", name: ["goal", "techSkills", "logo"] },
];

const CreateStudySpacePage = ({ onClose }) => {
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState({ name: "", domain: "", goal: "", techSkills: "", logo: "" });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { draftStudySpace, activeStudySpace } = useStudySpacesStore();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData((prev) => ({ ...prev, [name]: files[0] || "" }));
      setPreviewUrl(files[0] ? URL.createObjectURL(files[0]) : null);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    const fieldsToCheck = steps[step]?.name.reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});

    const errorCheck = validateForm(fieldsToCheck, step + 1);
    if (Object.keys(errorCheck).length > 0) {
      setErrors(errorCheck);
      return;
    }
    setErrors({});

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const validateErrors = validateForm(formData, step + 1);
      if (Object.keys(validateErrors).length > 0) {
        setErrors(validateErrors);
        setIsLoading(false);
        return;
      }

      let uploadedImageUrl;
      try {
        uploadedImageUrl = await uploadImage(formData.logo);
      } catch {
        setErrors((prev) => ({ ...prev, logo: "Image upload failed." }));
        setIsLoading(false);
        return;
      }

      if (!uploadedImageUrl) {
        setErrors((prev) => ({ ...prev, logo: "Failed to upload the image." }));
        setIsLoading(false);
        return;
      }

      const groupData = { ...formData, logo: uploadedImageUrl };
      const draftResult = await draftStudySpace(groupData);

      if (!draftResult.success) {
        setErrors((prev) => ({ ...prev, general: draftResult.error || "Failed to create study space draft." }));
        setIsLoading(false);
        return;
      }

      const draft_id = draftResult.id;

      if (!draft_id) {
        setErrors((prev) => ({ ...prev, general: "Draft ID not returned. Failed to create draft." }));
        setIsLoading(false);
        return;
      }

      const isPremiumUser = authUser.isPremium ||  authUser.subscription;

      if (isPremiumUser) {
        const activeResult = await activeStudySpace(draft_id);
        if (!activeResult.success) {
          setErrors((prev) => ({ ...prev, general: activeResult.error || "Failed to activate the space." }));
        } else {
          navigate("/learnhub/group-study");
        }
      } else {
        navigate("/learnhub/plans", {
          state: { from: "/learnhub/group-study", draft_id },
        });
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, general: error?.response?.data?.message || "An unexpected error occurred. Please try again later." }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row justify-between items-center bg-white">
      <div className="w-full md:w-1/2 max-w-sm mt-10 md:ml-20 flex flex-col justify-center p-4">
        {renderCurrentStepInput(step, formData, errors, handleChange, previewUrl)}
        {steps[step]?.name?.some((name) => errors[name]) && (
          <p className="text-red-500 text-sm mt-3">
            {steps[step]?.name.filter((name) => errors[name]).map((name) => errors[name]).join(", ")}
          </p>
        )}
        {errors.general && (
          <p className="text-red-500 text-sm mt-3">{errors.general}</p>
        )}
        <div className="mt-8 flex justify-between">
          {step > 0 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="rounded-lg p-3 font-bold text-primary underline hover:text-secondary"
            >
              Back
            </button>
          )}
          <button
            onClick={step === steps.length - 1 ? handleSubmit : handleNext}
            className={`bg-[#0097B2] rounded-lg p-3 flex justify-center font-bold text-white hover:bg-[#007d93] flex-1 ${step > 0 ? "ml-3" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="border-2 border-white border-t-transparent animate-spin h-6 w-6 rounded-full"></div>
            ) : (
              <span>{step === steps.length - 1 ? "Create Group" : "Continue"}</span>
            )}
          </button>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 justify-center items-center h-screen bg-gray-100">
        <img
          src={courseIcon}
          alt="side illustration"
          className="max-w-full max-h-screen object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default CreateStudySpacePage;
