import React from "react";
import { FaCheck, FaStar, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/auth/useAuthStore";
import { toast } from "react-toastify";
import useStudySpacesStore from "../../zustand/studySpaces/useStudySpaceStore";
import useThemeStore from "../../zustand/themeStore";

const PlansPage = () => {
  const { activeStudySpace } = useStudySpacesStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, draft_id } = location.state || {};
  const { createPremium, authUser } = useAuthStore();
  const { mode } = useThemeStore();

  // Theme Colors
  const bgPrimary = mode === "dark" ? "bg-[#0F1419]" : "bg-white";
  const bgSecondary = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
  const bgTertiary = mode === "dark" ? "bg-gray-800" : "bg-gray-50";
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-200";
  const cardBorder = mode === "dark" ? "border-gray-700" : "border-gray-200";

  const handleChoosePlan = async (planId, name) => {
    if (authUser.isPremium || authUser.subscription) {
      let msg;
      if (authUser.subscription === "basic") {
        msg = "User already has the basic plan.";
      } else {
        msg = "User already has the premium plan.";
      }
      toast.info(msg);
      return;
    }
    await createPremium(planId);
    if (from && draft_id) {
      await activeStudySpace(draft_id);
      navigate(from || "/learnhub");
    } else {
      navigate("/learnhub");
    }
    toast.success(`You have successfully chosen the ${name} plan!`);
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for starting your group studies and trying out core features.",
      premiumFee: 0,
      duration: "Free",
      isPopular: false,
      features: [
        "Create 1 study group",
        "Add up to 5 members per group",
        "3 Whiteboard sessions",
        "2 Mock interviews",
        "No live sessions",
        "Screen sharing unavailable",
      ],
      actionLabel: "Choose Free",
      isPremium: false,
    },
    {
      id: "premium",
      name: "Premium Plan",
      description: "Ideal for active learners and teams — access every feature with a low monthly fee.",
      premiumFee: 69.99,
      duration: "Monthly",
      isPopular: true,
      features: [
        "Create unlimited study groups",
        "Add unlimited members",
        "Unlimited Whiteboard sessions",
        "Unlimited Mock interviews",
        "Live sessions available",
        "Screen sharing enabled",
      ],
      actionLabel: "Choose Premium",
      isPremium: true,
    },
    {
      id: "lifetime",
      name: "Lifetime Plan",
      premiumFee: 599.99,
      duration: "Lifetime",
      isPopular: false,
      description:
        "A one-time payment that gives you lifetime access to all benefits — and every course available.",
      features: [
        "Create unlimited study groups",
        "Add unlimited members",
        "Unlimited Whiteboard & Mock interviews",
        "Live sessions available",
        "Screen sharing enabled",
        "Watch any course for free, forever",
      ],
      actionLabel: "Choose Lifetime",
      isPremium: true,
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${textPrimary}`}
    >
      {/* Success Section */}
      {authUser?.subscription && authUser.isPremium && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className={`px-6 py-5 rounded-2xl shadow-md text-center max-w-lg w-full ${bgSecondary}`}>
            <h2 className={`text-3xl font-bold mb-2 ${textPrimary}`}>✅ Payment Successful!</h2>
            <p className={`text-lg ${textSecondary}`}>
              You’ve activated the <span className="font-semibold">Premium Plan</span>.
            </p>
          </div>

          <span className="inline-block bg-[#0097B2] text-white px-4 py-1 text-sm rounded-full shadow">
            Premium User
          </span>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-[#00B2A9] text-white rounded-full hover:bg-[#0097B2] transition-all duration-300 shadow-md"
          >
            Go to Dashboard
          </button>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl`}>
            {[
              { title: "Unlimited Groups", desc: "Create and join unlimited study groups without limits." },
              { title: "Live Sessions", desc: "Join live study sessions with mentors and peers." },
              { title: "Mock Interviews", desc: "Practice with realistic simulations and feedback." },
              { title: "Exclusive Resources", desc: "Access premium notes, templates, and cheat sheets." },
              { title: "Priority Support", desc: "Get faster help whenever you need it." },
            ].map((feature, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 shadow border-l-4 border-[#0097B2] ${bgSecondary} ${borderColor}`}
              >
                <h3 className={`text-lg font-bold mb-1 ${textPrimary}`}>{feature.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plans Section */}
      {!authUser?.subscription && (
        <div className="w-full max-w-5xl text-center">
          <h1 className={`text-2xl md:text-3xl font-bold mt-4 mb-8 ${textPrimary}`}>
            Choose Your Plan
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`${bgSecondary} ${borderColor} relative rounded-xl shadow-lg p-5 flex flex-col justify-between flex-1 border transition-transform duration-300 ${
                  idx === 1 ? "border-2 border-[#0097B2] scale-105" : "hover:scale-105"
                }`}
              >
                {plan.isPopular && (
                  <span className="bg-[#0097B2] flex gap-1 items-center justify-center absolute rounded-full text-white text-xs font-semibold px-3 py-1 left-1/2 transform -translate-x-1/2 -top-3">
                    <FaStar /> Most Popular
                  </span>
                )}

                <h2 className={`text-xl font-semibold ${textPrimary}`}>{plan.name}</h2>
                <p className={`mt-2 text-sm ${textSecondary}`}>{plan.description}</p>

                <div className="flex items-center gap-1 mt-3">
                  <h1 className="text-3xl font-bold text-[#0097B2]">₹{plan.premiumFee}</h1>
                  <span className={`${textSecondary}`}>/{plan.duration}</span>
                </div>

                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => {
                    const isUnavailable =
                      feature.toLowerCase().includes("no") || feature.toLowerCase().includes("unavailable");
                    return (
                      <li key={index} className="flex gap-2 items-center">
                        {isUnavailable ? (
                          <FaTimes className="text-red-500" />
                        ) : (
                          <FaCheck className="text-green-500" />
                        )}
                        <span className={`text-sm ${textSecondary}`}>{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handleChoosePlan(plan.id, plan.name)}
                  className={`rounded-lg p-3 font-bold w-full mt-6 transition ${
                    idx === 0
                      ? `bg-transparent border border-[#0097B2] text-[#0097B2] hover:bg-[#0097B2] hover:text-white`
                      : `bg-[#0097B2] text-white hover:bg-[#007d93]`
                  }`}
                >
                  {plan.actionLabel}
                </button>

                <span className={`text-xs mx-auto mt-1 ${textSecondary}`}>
                  30-day money-back guarantee.
                </span>
              </div>
            ))}
          </div>

          <p className={`mt-6 ${textSecondary}`}>
            Not sure?{" "}
            <span
              className="text-[#0097B2] cursor-pointer underline hover:text-[#007d93]"
              onClick={() => navigate(from || "/")}
            >
              Go back
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
