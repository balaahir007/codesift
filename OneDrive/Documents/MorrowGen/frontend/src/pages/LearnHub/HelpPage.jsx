import React from "react";
import { MessageCircle, Mail, Phone, HelpCircle, ArrowRight } from "lucide-react";
import useThemeStore from "../../zustand/themeStore";

const HelpPage = () => {
  const { mode } = useThemeStore();

  // Theme Colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const faqs = [
    {
      question: "How do I join or create a study group?",
      answer: "Go to the Study Spaces page and click 'Create Group' or join an existing one with an invite link.",
    },
    {
      question: "How can I upgrade to Premium?",
      answer: "Visit the Plans page under your profile menu and choose a suitable plan for your needs.",
    },
    {
      question: "I forgot my password, what can I do?",
      answer: "Click on 'Forgot Password' in the login screen and follow the instructions to reset it.",
    },
    {
      question: "How can I report a bug or issue?",
      answer: "You can contact our support team directly through the form below or email us anytime.",
    },
  ];

  return (
    <div className={`min-h-screen  p-6 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <HelpCircle className={`w-10 h-10 ${textPrimary}`} />
          </div>
          <h1 className={`text-3xl font-semibold ${textPrimary}`}>Need Help?</h1>
          <p className={`text-base ${textSecondary} mt-2 max-w-2xl mx-auto`}>
            We're here to help you with any questions or issues you face. Check our FAQs below or reach out directly.
          </p>
        </div>

        {/* Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className={`p-6 rounded-2xl border ${borderColor} ${bgSecondary} hover:shadow-lg transition`}>
            <Mail className="w-6 h-6 text-[#0097B2] mb-3" />
            <h3 className={`font-semibold text-lg ${textPrimary}`}>Email Support</h3>
            <p className={`text-sm mt-1 ${textSecondary}`}>Reach us anytime at</p>
            <a href="mailto:support@formsnap.com" className="text-[#0097B2] text-sm mt-1 inline-block">
              support@formsnap.com
            </a>
          </div>

          <div className={`p-6 rounded-2xl border ${borderColor} ${bgSecondary} hover:shadow-lg transition`}>
            <Phone className="w-6 h-6 text-[#0097B2] mb-3" />
            <h3 className={`font-semibold text-lg ${textPrimary}`}>Call Us</h3>
            <p className={`text-sm mt-1 ${textSecondary}`}>Mon–Fri (10 AM – 6 PM)</p>
            <p className="text-[#0097B2] text-sm mt-1">+91 98765 43210</p>
          </div>

          <div className={`p-6 rounded-2xl border ${borderColor} ${bgSecondary} hover:shadow-lg transition`}>
            <MessageCircle className="w-6 h-6 text-[#0097B2] mb-3" />
            <h3 className={`font-semibold text-lg ${textPrimary}`}>Live Chat</h3>
            <p className={`text-sm mt-1 ${textSecondary}`}>Chat with our team in real-time for quick help.</p>
            <button className="mt-3 text-sm flex items-center gap-1 text-[#0097B2] hover:underline">
              Start Chat <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`rounded-2xl border ${borderColor} ${bgSecondary} p-6`}>
          <h2 className={`text-2xl font-semibold mb-6 ${textPrimary}`}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-none pb-4">
                <h3 className={`font-medium text-lg ${textPrimary}`}>{faq.question}</h3>
                <p className={`text-sm mt-2 ${textSecondary}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className={`rounded-2xl border ${borderColor} ${bgSecondary} p-6 mt-10`}>
          <h2 className={`text-2xl font-semibold mb-6 ${textPrimary}`}>Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className={`block text-sm ${textSecondary} mb-1`}>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full p-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
              />
            </div>
            <div>
              <label className={`block text-sm ${textSecondary} mb-1`}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full p-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
              />
            </div>
            <div>
              <label className={`block text-sm ${textSecondary} mb-1`}>Message</label>
              <textarea
                rows="4"
                placeholder="Describe your issue or question"
                className={`w-full p-3 rounded-lg border ${borderColor} ${bgPrimary} ${textPrimary}`}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0097B2] text-white rounded-lg hover:bg-[#007D93] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className={`text-center mt-10 text-sm ${textSecondary}`}>
          © {new Date().getFullYear()} FormSnap. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
