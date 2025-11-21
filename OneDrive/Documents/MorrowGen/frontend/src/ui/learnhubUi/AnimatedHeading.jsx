import React, { useState, useEffect } from 'react';
import useThemeStore from '../../zustand/themeStore';

const AnimatedHeading = () => {
  const {mode} = useThemeStore()
  const phrases = [
    "Career Journey",
    "Future Today",
    "Skills & Grow",
    "Dream Job",
    "Professional Path"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  const textColor = mode == 'dark' ? 'text-white' : 'text-primary';

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          setTypeSpeed(100 + Math.random() * 100);
        } else {
          // Pause before deleting
          setTypeSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          setTypeSpeed(50);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypeSpeed(150);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typeSpeed, phrases]);

  return (
    <h1 className={`text-5xl md:text-7xl font-black ${textColor} mb-6 leading-tight transition-colors duration-300`}>
      Transform Your
      <span className="bg-gradient-to-r from-[#0097B2] via-[#00B2A9] to-[#0097B2] bg-clip-text text-transparent block relative">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </h1>
  );
};

export default AnimatedHeading;