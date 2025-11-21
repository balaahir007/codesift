import { Briefcase, Search, ArrowRight, ArrowLeft } from 'lucide-react';

export default function EmptyJobState({ mode = "light" }) {
  const cardBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
  const sectionBg = mode === "dark" ? "bg-[#0F1E20]" : "bg-gray-50";
  const textPrimary = mode === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = mode === "dark" ? "border-[#294B4E]" : "border-gray-200";
  const iconBg = mode === "dark"
    ? "bg-gradient-to-br from-[#294B4E] to-[#1B2E31]"
    : "bg-gradient-to-br from-blue-50 to-cyan-50";
  const iconColor = mode === "dark" ? "text-cyan-400" : "text-blue-500";
  const accentColor = mode === "dark" ? "text-cyan-400" : "text-blue-600";

  return (
    <div
      className={`p-8 rounded-2xl sticky top-16 ${cardBg} border ${borderColor} shadow-md 
      flex flex-col items-center justify-center w-full max-h-[calc(100vh-4rem)] overflow-auto min-h-96 transition-all`}
    >
      {/* Icon Container */}
      <div className={`mb-6 p-8 rounded-full ${iconBg}`}>
        <Briefcase className={`w-16 h-16 ${iconColor}`} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h2 className={`text-2xl md:text-3xl font-semibold ${textPrimary} mb-2`}>
        No Job Selected
      </h2>

      {/* Description */}
      <p className={`${textSecondary} text-center mb-8 max-w-sm`}>
        Browse through our job listings on the left to view details, salary info, 
        and apply for positions that interest you.
      </p>

      {/* Action Icon */}
      <div className={`flex items-center gap-2 ${accentColor} mb-6`}>
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Start by selecting a job</span>
        <Search className="w-5 h-5" />
      </div>

      {/* Decorative Dots */}
      <div className="flex gap-2 mt-8">
        <div className={`w-2 h-2 rounded-full ${accentColor} opacity-100`}></div>
        <div className={`w-2 h-2 rounded-full ${accentColor} opacity-60`}></div>
        <div className={`w-2 h-2 rounded-full ${accentColor} opacity-30`}></div>
      </div>
    </div>
  );
}
