import React from "react";
import { FaCheck, FaStar, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/auth/useAuthStore";
import { toast } from "react-toastify";
import useStudySpacesStore from "../../zustand/studySpaces/useStudySpaceStore";


const PlansPage = () => {
    const { activeStudySpace } = useStudySpacesStore()
    const navigate = useNavigate();
    const location = useLocation();
    const { from, draft_id } = location.state || {};

    const { createPremium, authUser } = useAuthStore()
    console.log(authUser);

    const handleChoosePlan = async (planId, name) => {
        if (authUser.isPremium || authUser.subscription) {
            let msg;
            if (authUser.subscription == 'basic') {
                msg = 'user has already basic plan'
            } else {
                msg = 'user has already premium plan'
            }
            toast.info(msg)
            return;
        }
        await createPremium(planId);
        if (from && draft_id) {
            await activeStudySpace(draft_id);
            navigate(from || '/learnhub');
        } else {
            navigate("/learnhub");
        }
        toast.success(`You have successfully chosen the ${name} plan!`,)
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
        <div className="min-h- flex flex-col justify-center items-center mx-auto max-w-full  p-4">
            {
                authUser?.subscription && authUser.isPremium && (
                    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -6">

                        <div className="bg-green-100 text-green-700 px-6 py-5 rounded-2xl shadow-md text-center max-w-lg w-full">
                            <h2 className="text-3xl font-bold mb-2">✅ Payment Successful!</h2>
                            <p className="text-lg">You’ve activated the <span className="font-semibold">Premium Plan</span>.</p>
                        </div>

                        <div className="mt-4">
                            <span className="inline-block bg-primary text-green-800 px-4 py-1 text-sm rounded-full shadow">
                                Premium User
                            </span>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/dashboard')} // replace with your logic
                                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 shadow-md"
                            >
                                Go to Dashboard
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
                            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-primary">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Unlimited Groups</h3>
                                <p className="text-sm text-gray-600">Create and join unlimited study groups without limits.</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-primary">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Live Sessions</h3>
                                <p className="text-sm text-gray-600">Join live study sessions with mentors and peers.</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-primary">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Mock Interviews</h3>
                                <p className="text-sm text-gray-600">Practice interviews with realistic simulation and feedback.</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-primary">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Exclusive Resources</h3>
                                <p className="text-sm text-gray-600">Access premium notes, templates, and cheat sheets.</p>
                            </div>

                            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-primary">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Priority Support</h3>
                                <p className="text-sm text-gray-600">Get faster support and assistance when needed.</p>
                            </div>
                        </div>

                    </div>
                )

            }
    
            {
                !authUser?.subscription && (
                    <div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-8 text-center">
                            Choose Your Plan
                        </h1>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch w-full max-w-5xl">
                            {plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`bg-white relative rounded-lg shadow-lg p-5 flex flex-col justify-between flex-1
              ${idx === 1 ? "border-2 border-[#0097B2] scale-105" : "hover:scale-105"} transition-transform`}
                                >
                                    {plan.isPopular && (
                                        <span className="bg-[#0097B2] flex gap-1 items-center justify-center absolute rounded-full text-white text-xs font-semibold px-3 py-1 left-1/2 transform -translate-x-1/2 -top-3">
                                            <FaStar /> Most Popular
                                        </span>
                                    )}

                                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                                    <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                                    <div className="flex items-center gap-1 mt-3">
                                        <h1 className="text-3xl font-bold text-[#0097B2]">₹{plan.premiumFee}</h1>
                                        <span className="text-gray-500">/{plan.duration}</span>
                                    </div>

                                    <ul className="mt-4 space-y-2 text-gray-700">
                                        {plan.features.map((feature, index) => {
                                            const isUnavailable = feature.toLowerCase().includes("no") || feature.toLowerCase().includes("unavailable");
                                            return (
                                                <li key={index} className="flex gap-2 items-center">
                                                    {isUnavailable ? (
                                                        <FaTimes className="text-red-500" />
                                                    ) : (
                                                        <FaCheck className="text-green-500" />
                                                    )}
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>


                                    <div className="mt-6">
                                        <button
                                            className={`rounded-lg p-3 font-bold w-full cursor-pointer transition
                  ${idx === 0
                                                    ? "bg-white text-gray-800 border border-[#0097B2] shadow hover:shadow-lg"
                                                    : "bg-[#0097B2] text-white hover:bg-[#007d93] shadow"}`}
                                            onClick={() => handleChoosePlan(plan.id, plan.name)}
                                        >
                                            {plan.actionLabel}
                                        </button>
                                    </div>

                                    <span className="text-xs mx-auto mt-1 text-gray-500">
                                        30-day money-back guarantee.
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-500 mt-6 text-center">
                            Not sure?{" "}
                            <span
                                className="text-[#0097B2] cursor-pointer underline hover:text-[#007d93]"
                                onClick={() => navigate(from || "/")}
                            >
                                Go back
                            </span>
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default PlansPage;
