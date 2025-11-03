import React, { useState, useEffect } from 'react';
import { Phone, Users, Award, CheckCircle, User, MessageCircle, Sparkles, BookOpen, Target, TrendingUp, Heart } from 'lucide-react';

const MentorshipPage = () => {
  const [isCallScheduled, setIsCallScheduled] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [animatedCounter, setAnimatedCounter] = useState(0);

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
      color: 'text-[#0097B2]' 
    },
    { 
      icon: TrendingUp, 
      title: 'Skill Development', 
      desc: 'Learn industry-relevant skills and best practices',
      color: 'text-[#00B2A9]' 
    },
    { 
      icon: Users, 
      title: 'Network Building', 
      desc: 'Connect with industry professionals and peers',
      color: 'text-[#0097B2]' 
    },
    { 
      icon: Award, 
      title: 'Success Stories', 
      desc: 'Join 1000+ students who transformed their careers',
      color: 'text-[#00B2A9]' 
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
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-[#E0F2F5] to-white border-2 border-[#B3E0E9] rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] animate-pulse"></div>
            <div className="absolute top-4 right-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-[#00B2A9]" />
            </div>
            <div className="absolute bottom-4 left-4 animate-pulse">
              <Heart className="w-6 h-6 text-[#0097B2]" />
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0097B2] rounded-full blur-lg opacity-30 animate-ping"></div>
                <CheckCircle className="relative w-20 h-20 text-[#00B2A9] animate-bounce" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-[#0097B2] mb-4">Booking Confirmed! 🎉</h2>
            <p className="text-xl text-gray-700 mb-8">
              Congratulations! Our mentorship team will call you within 24 hours to start your FREE growth journey.
            </p>
            
            <div className="bg-white bg-opacity-80 rounded-2xl p-8 mb-6 shadow-lg">
              <h3 className="font-bold text-[#0097B2] text-xl mb-6">Your Journey Starts Here!</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-3 rounded-full mb-3">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Step 1</span>
                  <span className="text-gray-600 text-center">We'll call you</span>
                </div>
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#00B2A9] to-[#0097B2] p-3 rounded-full mb-3">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Step 2</span>
                  <span className="text-gray-600 text-center">Free consultation</span>
                </div>
                <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-3 rounded-full mb-3">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Step 3</span>
                  <span className="text-gray-600 text-center">Transform your life</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white p-4 rounded-2xl">
              <p className="font-bold text-lg">📞 Expect our call from:</p>
              <p className="text-2xl font-bold">+1 (555) 123-MENTOR</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        {/* <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#E0F2F5] rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-[#B3E0E9] rounded-full blur-lg opacity-40 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#E0F2F5] rounded-full blur-md opacity-50 animate-ping"></div>
        </div> */}
        
        <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-6 rounded-full transform hover:scale-110 transition-all duration-300">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent mb-6 animate-fade-in">
            FREE Mentorship for Students
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your life with personalized guidance from industry experts. 
            <span className="font-bold text-[#0097B2]"> Completely FREE</span> for all students ready to grow! 🚀
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {successMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#E0F2F5] transform hover:scale-105 transition-all duration-300"
              >
                <div className={`text-3xl font-bold mb-2 ${
                  metric.animated && animatedCounter === index ? 'text-[#00B2A9] scale-110' : 'text-[#0097B2]'
                } transition-all duration-300`}>
                  {metric.number}
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
          
          {/* Phone CTA */}
          <div className="bg-gradient-to-r from-[#E0F2F5] to-white border-2 border-[#B3E0E9] rounded-3xl p-8 inline-block shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-4 rounded-full animate-pulse">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-800 mb-2">Start Your FREE Journey:</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-4xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent hover:scale-105 transition-all duration-300 inline-block"
                >
                  +91 87785-42177 MENTOR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Why Choose Our FREE Mentorship?</h2>
        <p className="text-xl text-gray-600 text-center mb-12">Empowering students to achieve their dreams without any cost barriers</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentorshipBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-[#E0F2F5] hover:border-[#B3E0E9] group"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`transition-all duration-500 transform ${
                hoveredFeature === index ? 'rotate-12 scale-125' : ''
              } mb-6`}>
                <benefit.icon className={`w-12 h-12 ${benefit.color} group-hover:animate-bounce`} />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-[#E0F2F5] via-white to-[#B3E0E9] py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Transform Your Life? 🌟</h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of students who have already started their success journey. 
            <span className="font-bold text-[#0097B2]"> It's completely FREE!</span>
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {/* Direct Call Option */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#0097B2] transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-4 rounded-full inline-block mb-6 group-hover:animate-spin">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Call Directly</h3>
              <p className="text-gray-600 mb-6">Connect with us instantly and start your journey now</p>
              <a
                href="tel:+15551234567"
                className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Call Now - FREE
              </a>
            </div>
            
            {/* Callback Option */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#00B2A9] transform hover:scale-105 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#00B2A9] to-[#0097B2] p-4 rounded-full inline-block mb-6 group-hover:animate-bounce">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Request Callback</h3>
              <p className="text-gray-600 mb-6">We'll call you back within 24 hours at your convenience</p>
              <button
                onClick={handleCallBooking}
                className="bg-gradient-to-r from-[#00B2A9] to-[#0097B2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Book FREE Call
              </button>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#00B2A9]" />
              <span className="font-medium">100% Free Forever</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#0097B2]" />
              <span className="font-medium">No Hidden Costs</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#00B2A9]" />
              <span className="font-medium">Student-Focused</span>
            </div>
            <div className="flex items-center gap-3 transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-[#0097B2]" />
              <span className="font-medium">Expert Mentors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Student Success Stories 📚</h2>
        <p className="text-xl text-gray-600 text-center mb-12">Real students, real transformations, real futures!</p>
        
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
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-[#E0F2F5]"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-2xl text-yellow-400">⭐</div>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="text-center">
                <p className="font-bold text-xl text-[#0097B2]">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.field}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;