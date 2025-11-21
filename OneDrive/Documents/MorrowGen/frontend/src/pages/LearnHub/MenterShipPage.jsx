import React, { useState, useEffect } from 'react';
import { Phone, Users, Award, CheckCircle, MessageCircle, Sparkles, BookOpen, Target, TrendingUp, Heart } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';

const MentorshipPage = () => {
  const [isCallScheduled, setIsCallScheduled] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [animatedCounter, setAnimatedCounter] = useState(0);

  const { mode } = useThemeStore();

  // Theme classes
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCounter(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mentorshipBenefits = [
    { 
      icon: Target, 
      title: 'Career Guidance', 
      desc: 'Personalized career roadmap and goal setting',
      color: mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'
    },
    { 
      icon: TrendingUp, 
      title: 'Skill Development', 
      desc: 'Learn industry-relevant skills and best practices',
      color: mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#00B2A9]'
    },
    { 
      icon: Users, 
      title: 'Network Building', 
      desc: 'Connect with industry professionals and peers',
      color: mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'
    },
    { 
      icon: Award, 
      title: 'Success Stories', 
      desc: 'Join 1000+ students who transformed their careers',
      color: mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#00B2A9]'
    }
  ];

  const successMetrics = [
    { number: '1000+', label: 'Students Helped', animated: true },
    { number: '95%', label: 'Success Rate', animated: true },
    { number: '50+', label: 'Expert Mentors', animated: true },
    { number: '24/7', label: 'Support Available', animated: false }
  ];

  const handleCallBooking = () => {
    setIsCallScheduled(true);
    setTimeout(() => {
      setIsCallScheduled(false);
    }, 4000);
  };

  if (isCallScheduled) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 bg-backGray `}>
        <div className="max-w-2xl w-full">
          <div className={`rounded-3xl p-12 text-center relative overflow-hidden border-2 ${
            mode === 'dark'
              ? 'bg-gradient-to-br from-gray-800 to-[#1B2E31] border-gray-700' 
              : 'bg-gradient-to-br from-[#E0F2F5] to-white border-[#B3E0E9]'
          }`}>
            {/* Animated background elements */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r animate-pulse ${
              mode === 'dark' ? 'from-[#00B2A9] to-[#0097B2]' : 'from-[#0097B2] to-[#00B2A9]'
            }`}></div>
            <div className="absolute top-4 right-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-[#00B2A9]" />
            </div>
            <div className="absolute bottom-4 left-4 animate-pulse">
              <Heart className={`w-6 h-6 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-lg opacity-30 animate-ping ${
                  mode === 'dark' ? 'bg-[#00B2A9]' : 'bg-[#0097B2]'
                }`}></div>
                <CheckCircle className="relative w-20 h-20 animate-bounce text-[#00B2A9]" />
              </div>
            </div>
            
            <h2 className={`text-4xl font-bold mb-4 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`}>
              Booking Confirmed! 🎉
            </h2>
            <p className={`text-xl mb-8 ${textSecondary}`}>
              Congratulations! Our mentorship team will call you within 24 hours to start your FREE growth journey.
            </p>
            
            <div className={`rounded-2xl p-8 mb-6 shadow-lg ${
              mode === 'dark' ? 'bg-[#0F1419] bg-opacity-80' : 'bg-white bg-opacity-80'
            }`}>
              <h3 className={`font-bold text-xl mb-6 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`}>
                Your Journey Starts Here!
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className={`p-3 rounded-full mb-3 ${
                    mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
                  }`}>
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <span className={`font-semibold ${textPrimary}`}>Step 1</span>
                  <span className={`text-center ${textSecondary}`}>We'll call you</span>
                </div>
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className={`p-3 rounded-full mb-3 ${
                    mode === 'dark' ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]' : 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]'
                  }`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <span className={`font-semibold ${textPrimary}`}>Step 2</span>
                  <span className={`text-center ${textSecondary}`}>Free consultation</span>
                </div>
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className={`p-3 rounded-full mb-3 ${
                    mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
                  }`}>
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <span className={`font-semibold ${textPrimary}`}>Step 3</span>
                  <span className={`text-center ${textSecondary}`}>Transform your life</span>
                </div>
              </div>
            </div>
            
            <div className={`text-white p-4 rounded-2xl ${
              mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
            }`}>
              <p className="font-bold text-lg">📞 Expect our call from:</p>
              <p className="text-2xl font-bold">+91 87785-42177</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-backGray `}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
          <div className="relative inline-block mb-8">
            <div className={`absolute inset-0 rounded-full blur-lg opacity-30 animate-pulse ${
              mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
            }`}></div>
            <div className={`relative p-6 rounded-full transform hover:scale-110 transition-all duration-300 ${
              mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
            }`}>
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className={`text-6xl font-bold bg-clip-text text-transparent mb-6 animate-fade-in ${
            mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
          }`}>
            FREE Mentorship for Students
          </h1>
          <p className={`text-2xl max-w-3xl mx-auto mb-8 leading-relaxed ${textSecondary}`}>
            Transform your life with personalized guidance from industry experts. 
            <span className={`font-bold ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`}> Completely FREE</span> for all students ready to grow! 🚀
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {successMetrics.map((metric, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 border ${
                  mode === 'dark'
                    ? 'bg-[#1B2E31] border-gray-700' 
                    : 'bg-white border-[#E0F2F5]'
                }`}
              >
                <div className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  metric.animated && animatedCounter === index 
                    ? 'text-[#00B2A9] scale-110'
                    : mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'
                }`}>
                  {metric.number}
                </div>
                <div className={`font-medium ${textSecondary}`}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Phone CTA */}
          <div className={`rounded-3xl p-8 inline-block shadow-xl transform hover:scale-105 transition-all duration-300 border-2 ${
            mode === 'dark'
              ? 'bg-gradient-to-r from-gray-800 to-[#1B2E31] border-gray-700' 
              : 'bg-gradient-to-r from-[#E0F2F5] to-white border-[#B3E0E9]'
          }`}>
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-full animate-pulse ${
                mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
              }`}>
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                  Start Your FREE Journey:
                </p>
                <a 
                  href="tel:+918778542177" 
                  className={`text-4xl font-bold bg-clip-text text-transparent hover:scale-105 transition-all duration-300 inline-block ${
                    mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
                  }`}
                >
                  +91 87785-42177
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className={`text-4xl font-bold text-center mb-4 ${textPrimary}`}>
          Why Choose Our FREE Mentorship?
        </h2>
        <p className={`text-xl text-center mb-12 ${textSecondary}`}>
          Empowering students to achieve their dreams without any cost barriers
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentorshipBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border group ${
                mode === 'dark'
                  ? 'bg-[#1B2E31] border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-[#E0F2F5] hover:border-[#B3E0E9]'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`transition-all duration-500 transform ${
                hoveredFeature === index ? 'rotate-12 scale-125' : ''
              } mb-6`}>
                <benefit.icon className={`w-12 h-12 ${benefit.color} group-hover:animate-bounce`} />
              </div>
              <h3 className={`font-bold text-xl mb-3 ${textPrimary}`}>
                {benefit.title}
              </h3>
              <p className={`leading-relaxed ${textSecondary}`}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className={`py-20 ${
        mode === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-[#1B2E31] to-gray-800' 
          : 'bg-gradient-to-br from-[#E0F2F5] via-white to-[#B3E0E9]'
      }`}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className={`text-4xl font-bold mb-6 ${textPrimary}`}>
            Ready to Transform Your Life? 🌟
          </h2>
          <p className={`text-xl mb-12 ${textSecondary}`}>
            Join thousands of students who have already started their success journey. 
            <span className={`font-bold ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`}> It's completely FREE!</span>
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {/* Direct Call Option */}
            <div className={`rounded-3xl p-8 shadow-xl border-2 transform hover:scale-105 transition-all duration-300 group ${
              mode === 'dark'
                ? 'bg-[#1B2E31] border-[#00B2A9]' 
                : 'bg-white border-[#0097B2]'
            }`}>
              <div className={`p-4 rounded-full inline-block mb-6 group-hover:animate-spin ${
                mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
              }`}>
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${textPrimary}`}>
                Call Directly
              </h3>
              <p className={`mb-6 ${textSecondary}`}>
                Connect with us instantly and start your journey now
              </p>
              <a
                href="tel:+918778542177"
                className={`text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 ${
                  mode === 'dark' ? 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'
                }`}
              >
                <Phone className="w-6 h-6" />
                Call Now - FREE
              </a>
            </div>
            
            {/* Callback Option */}
            <div className={`rounded-3xl p-8 shadow-xl border-2 transform hover:scale-105 transition-all duration-300 group ${
              mode === 'dark'
                ? 'bg-[#1B2E31] border-[#00B2A9]' 
                : 'bg-white border-[#00B2A9]'
            }`}>
              <div className={`p-4 rounded-full inline-block mb-6 group-hover:animate-bounce ${
                mode === 'dark' ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]' : 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]'
              }`}>
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${textPrimary}`}>
                Request Callback
              </h3>
              <p className={`mb-6 ${textSecondary}`}>
                We'll call you back within 24 hours at your convenience
              </p>
              <button
                onClick={handleCallBooking}
                className={`text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 ${
                  mode === 'dark' ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]' : 'bg-gradient-to-r from-[#00B2A9] to-[#0097B2]'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
                Book FREE Call
              </button>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className={`flex flex-wrap justify-center items-center gap-8 ${textSecondary}`}>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#00B2A9]" />
              <span className="font-medium">100% Free Forever</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className={`w-6 h-6 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
              <span className="font-medium">No Hidden Costs</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#00B2A9]" />
              <span className="font-medium">Student-Focused</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className={`w-6 h-6 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
              <span className="font-medium">Expert Mentors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <h2 className={`text-4xl font-bold text-center mb-4 ${textPrimary}`}>
          Student Success Stories 📚
        </h2>
        <p className={`text-xl text-center mb-12 ${textSecondary}`}>
          Real students, real transformations, real futures!
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              field: "Computer Science Student",
              quote: "Free mentorship helped me land my dream internship at Google! The guidance was invaluable.",
              avatar: "👩‍💻"
            },
            {
              name: "Rahul Kumar",
              field: "Business Student",
              quote: "From confused student to startup founder! My mentor showed me the path to success.",
              avatar: "👨‍💼"
            },
            {
              name: "Aisha Patel",
              field: "Design Student",
              quote: "The career guidance was life-changing. Now I'm working at my favorite design agency!",
              avatar: "👩‍🎨"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border ${
                mode === 'dark'
                  ? 'bg-[#1B2E31] border-gray-700' 
                  : 'bg-white border-[#E0F2F5]'
              }`}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-2xl text-yellow-400">⭐</div>
                  ))}
                </div>
              </div>
              <p className={`text-lg italic mb-6 leading-relaxed ${textSecondary}`}>
                "{testimonial.quote}"
              </p>
              <div className="text-center">
                <p className={`font-bold text-xl ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`}>
                  {testimonial.name}
                </p>
                <p className={textSecondary}>
                  {testimonial.field}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;