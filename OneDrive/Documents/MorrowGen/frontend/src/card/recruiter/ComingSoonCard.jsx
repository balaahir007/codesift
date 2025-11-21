import React from 'react';
import { Clock, Zap } from 'lucide-react';

const ComingSoonCard = ({ title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="max-w-md w-full">
        {/* Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 p-6 rounded-2xl shadow-lg">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {description}
          </p>
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Coming Soon
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm mb-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
            What's Coming
          </h3>
          <ul className="space-y-3">
            {title === 'Help & Support' ? (
              <>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Comprehensive FAQ section</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Live chat support</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Knowledge base & tutorials</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Contact support team</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Account management</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Notification preferences</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Privacy & security settings</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Zap className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>Billing & subscription</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            We're working hard to bring you the best experience. Stay tuned!
          </p>
          <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors">
            Explore Other Features
          </button>
        </div>
      </div>
    </div>
  );
};
export default ComingSoonCard