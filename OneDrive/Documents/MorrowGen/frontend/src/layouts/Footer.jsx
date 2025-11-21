import React from 'react';
import useThemeStore from '../zustand/themeStore';

function Footer() {
  const {mode} = useThemeStore()
  // Theme colors
  const bgPrimary = mode == 'dark' ? 'bg-[#0A1415]' : 'bg-white';
  const textPrimary = mode == 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode == 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const socialBg = mode == 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-100';
  const socialHover = mode == 'dark' ? 'hover:bg-[#0097B2]/20' : 'hover:bg-[#0097B2]/10';
  const socialBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode == 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50';
  const inputBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-300';
  const inputText = mode == 'dark' ? 'text-gray-100' : 'text-gray-900';
  const inputPlaceholder = mode == 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-500';
  const gridGradient = mode == 'dark' 
    ? 'bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)]';

  return (
    <footer className={`relative p-8 md:px-12 bg-backGray pt-10 ${textPrimary} bg-backGray  overflow-hidden transition-colors duration-300`}>
      {/* Background effects matching banner */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <div className={`absolute top-10 left-10 w-32 h-32 ${mode == 'dark' ? 'bg-[#0097B2]/15' : 'bg-[#0097B2]/5'} rounded-full blur-2xl animate-pulse transition-colors duration-300`}></div> */}
        <div className={`absolute bottom-10 right-10 w-40 h-40 ${mode == 'dark' ? 'bg-[#00B2A9]/15' : 'bg-[#00B2A9]/5'} rounded-full blur-2xl animate-pulse delay-1000 transition-colors duration-300`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${gridGradient} bg-[size:50px_50px] pointer-events-none`}></div>

      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0097B2] to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Main footer content */}
        <div className="flex flex-wrap justify-around text-left">
          {/* Brand Section */}
          <div className="flex-1 min-w-[250px] m-5">
            <div className="mb-6">
              <img src='./logo.png' className="w-auto h-8 mb-5 font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">
                
              </img>
              <p className={`${textSecondary} leading-relaxed transition-colors duration-300`}>
                Empowering learners worldwide with high-quality courses and skills for tomorrow.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {['linkedin', 'twitter', 'instagram', 'youtube'].map((social, index) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className={`group w-10 h-10 ${socialBg} ${socialHover} rounded-full flex items-center justify-center transition-all duration-300 border ${socialBorder} hover:border-[#00B2A9]/50 hover:shadow-md`}
                >
                  <div className="w-4 h-4 bg-[#00B2A9] rounded-sm group-hover:scale-110 transition-transform duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[150px] m-5">
            <h4 className="text-[#00B2A9] text-xl mb-6 font-semibold relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#00B2A9] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {['Courses', 'About Us', 'Contact', 'FAQ'].map((link, index) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`} 
                    className={`group ${textSecondary} hover:text-[#00B2A9] transition-all duration-300 flex items-center gap-2`}
                  >
                    <div className="w-1 h-1 bg-[#0097B2] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex-1 min-w-[150px] m-5">
            <h4 className="text-[#00B2A9] text-xl mb-6 font-semibold relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#00B2A9] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy'].map((link, index) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(/\s+/g, '').replace('&', '')}`} 
                    className={`group ${textSecondary} hover:text-[#00B2A9] transition-all duration-300 flex items-center gap-2`}
                  >
                    <div className="w-1 h-1 bg-[#0097B2] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Newsletter */}
          <div className="flex-1 min-w-[200px] m-5">
            <h4 className="text-[#00B2A9] text-xl mb-6 font-semibold relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#00B2A9] to-transparent"></div>
            </h4>
            <p className={`${textSecondary} text-sm mb-4 transition-colors duration-300`}>
              Get the latest updates and career insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-3 py-2 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${inputPlaceholder} outline-none focus:border-[#0097B2] focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-sm hover:border-[#00B2A9]/50`}
              />
              <button className="px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium shadow-md hover:shadow-lg">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`mt-12 pt-6 border-t ${borderColor} transition-colors duration-300`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className={`${textSecondary} text-sm transition-colors duration-300`}>
                © {new Date().getFullYear()} LearnVerse. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${textSecondary} text-xs transition-colors duration-300`}>
                <div className="w-2 h-2 bg-[#00B2A9] rounded-full animate-pulse"></div>
                <span>Secure Platform</span>
              </div>
              <div className={`flex items-center gap-2 ${textSecondary} text-xs transition-colors duration-300`}>
                <div className="w-2 h-2 bg-[#0097B2] rounded-full animate-pulse delay-500"></div>
                <span>Trusted Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-20 animate-bounce delay-1000 pointer-events-none">
        <div className={`w-2 h-2 rounded-full ${mode == 'dark' ? 'bg-[#00B2A9]/70' : 'bg-[#00B2A9]'}`}></div>
      </div>
      <div className="absolute bottom-20 right-32 animate-bounce delay-2000 pointer-events-none">
        <div className={`w-1 h-1 rounded-full ${mode == 'dark' ? 'bg-[#0097B2]/60' : 'bg-[#0097B2]'}`}></div>
      </div>
    </footer>
  );
}

export default Footer;