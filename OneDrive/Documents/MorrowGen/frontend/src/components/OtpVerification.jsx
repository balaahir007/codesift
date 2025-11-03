import React, { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";

function OtpVerification({ verifyOtp,success, email, onBack, onResend,code, setCode }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle code input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...code];
    newOtp[index] = value;
    setCode(newOtp);
    setError("");

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value !== "") {
      const otpCode = newOtp.join("");
      handleVerify(otpCode);
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setCode([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      if (newOtp.length === 6) {
        handleVerify(pastedData);
      }
    }
  };

  // Verify code
  const handleVerify = async (otpCode = code.join("")) => {
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits to : ");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Call the verify function passed from parent
       await verifyOtp(otpCode);
      // Auto-redirect after success (optional)
      setTimeout(() => {
        // You can trigger navigation here if needed
      }, 1500);
    } catch (err) {
      setError(err.message || "Invalid or expired code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend code
  const handleResend = async () => {
    if (!canResend) return;
    
    setCode(["", "", "", "", "", ""]);
    setError("");
    setTimer(300);
    setCanResend(false);
    
    try {
      await onResend?.();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verified Successfully!</h2>
          <p className="text-gray-600">Your email has been verified. Redirecting...</p>
          <div className="mt-6">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0097B2] to-[#00B2A9] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-[#0097B2] font-semibold mt-1">{email || "your email"}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Enter Verification Code
          </label>
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={`w-12 h-14 text-center text-2xl font-semibold bg-gray-50 border-2 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#0097B2] focus:border-transparent
                  transition-all ${
                    error
                      ? "border-red-300 bg-red-50"
                      : digit
                      ? "border-[#00B2A9] bg-white"
                      : "border-gray-200"
                  } ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Timer & Resend */}
        <div className="mb-6 text-center">
          {timer > 0 ? (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Code expires in <span className="font-semibold text-[#0097B2]">{formatTime(timer)}</span></span>
            </div>
          ) : (
            <p className="text-red-600 text-sm font-medium">Code expired</p>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleVerify()}
          disabled={isVerifying || code.join("").length !== 6}
          className="w-full bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] 
            text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 
            flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed 
            shadow-lg hover:shadow-xl mb-4"
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify Email</span>
          )}
        </button>

        {/* Resend Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              canResend
                ? "text-[#0097B2] hover:text-[#007A94]"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Resend Code
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            <strong className="text-gray-900">Tip:</strong> Check your spam folder if you don't see the email. 
            Make sure to check the email address is correct.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;