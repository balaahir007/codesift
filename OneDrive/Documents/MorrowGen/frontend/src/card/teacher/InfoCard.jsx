import React from "react";

const InfoCard = ({ 
  icon: Icon, 
  title, 
  value,         // For stats; optional
// "stat" or "benefit"
  cardBg,        // Background based on theme
  borderColor,
  textPrimary,
  textSecondary
}) => {
  const statLayout = (
    <div className={`${cardBg} p-6 rounded-xl border shadow-md ${borderColor} hover:shadow-xl transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textSecondary} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{value}</p>
        </div>
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );



  return statLayout;
};

export default InfoCard;
