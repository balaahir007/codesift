import React from 'react';

function Footer() {
  return (
    <footer className="relative bg-white darkbg-gray-900 text-gray-900 darktext-gray-100 py-12 mt-10 overflow-hidden">
      {/* Background effects matching banner */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#0097B2]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00B2A9]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#0097B2]/3 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] darkbg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

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
              <p className="text-gray-600 darktext-gray-400 leading-relaxed">
                Empowering learners worldwide with high-quality courses and skills for tomorrow.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {['linkedin', 'twitter', 'instagram', 'youtube'].map((social, index) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="group w-10 h-10 bg-gray-100 darkbg-gray-800 hover:bg-[#0097B2]/10 darkhover:bg-[#0097B2]/20 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-200 darkborder-gray-700 hover:border-[#00B2A9]/50 hover:shadow-md"
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
                    className="group text-gray-600 darktext-gray-400 hover:text-[#00B2A9] darkhover:text-[#00B2A9] transition-all duration-300 flex items-center gap-2"
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
                    className="group text-gray-600 darktext-gray-400 hover:text-[#00B2A9] darkhover:text-[#00B2A9] transition-all duration-300 flex items-center gap-2"
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
            <p className="text-gray-600 darktext-gray-400 text-sm mb-4">
              Get the latest updates and career insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-50 darkbg-gray-800 border border-gray-300 darkborder-gray-600 rounded-lg text-gray-900 darktext-gray-100 placeholder-gray-500 darkplaceholder-gray-400 outline-none focus:border-[#0097B2] darkfocus:border-[#00B2A9] focus:bg-white darkfocus:bg-gray-900 transition-all duration-300 text-sm hover:border-[#00B2A9]/50"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] darkhover:from-[#00B2A9] darkhover:to-[#0097B2] text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium shadow-md hover:shadow-lg">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-gray-200 darkborder-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 darktext-gray-400 text-sm">
                © {new Date().getFullYear()} LearnVerse. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 darktext-gray-400 text-xs">
                <div className="w-2 h-2 bg-[#00B2A9] rounded-full animate-pulse"></div>
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 darktext-gray-400 text-xs">
                <div className="w-2 h-2 bg-[#0097B2] rounded-full animate-pulse delay-500"></div>
                <span>Trusted Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-20 animate-bounce delay-1000 pointer-events-none">
        <div className="bg-[#00B2A9] w-2 h-2 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 right-32 animate-bounce delay-2000 pointer-events-none">
        <div className="bg-[#0097B2] w-1 h-1 rounded-full opacity-40"></div>
      </div>
    </footer>
  );
}

export default Footer;