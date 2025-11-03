import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { createPortal } from "react-dom";

const paidPlans = [
  {
    id: "premium",
    name: "Premium Plan",
    price: 69.99,
    duration: "Monthly",
    features: [
      "Unlimited groups",
      "Unlimited members",
      "Live sessions",
      "Mock interviews",
      "Screen sharing",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime Plan",
    price: 599.99,
    duration: "Lifetime",
    features: [
      "All premium features",
      "Watch any course forever",
      "One-time payment",
    ],
  },
];

const PlanModal = ({ onClose, onSelect }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-5 sm:p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
          Unlock Premium Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {paidPlans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#0097B2] mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  ₹{plan.price} / {plan.duration}
                </p>

                <ul className="text-sm text-gray-700 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="mt-4 bg-[#0097B2] hover:bg-[#007d93] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
                onClick={() => onSelect(plan.id)}
              >
                Choose {plan.name} <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PlanModal;
