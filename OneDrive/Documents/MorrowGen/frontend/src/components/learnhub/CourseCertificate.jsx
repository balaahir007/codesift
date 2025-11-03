import React, { useEffect, useState } from 'react';
import { Award, Download, Share2, CheckCircle, Lock, Loader2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const CourseCertificate = ({ fetchCourseLoading ,courseId, progress = 75, title = "Complete Web Development Bootcamp", userName = "John Doe dfgf",certificateThreshold = 80 }) => {
  const isCompleted = progress >= (certificateThreshold * 100) ;
  

  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState(null);

  console.log("Certificate Threshold:", certificateThreshold, "Progress:", progress);

  useEffect(() => {
    if (!isCompleted) return;


    const fetchCertificate = async () => {
      try {
        setLoading(true);

        const certRes = await axiosInstance.get(`/course/${courseId}/certificate`);

        if (certRes.data.data) {
          setCertificateData(certRes.data.data);
        } else {
          const issueRes = await axiosInstance.post(`/course/${courseId}/certificate/issue`);
          setCertificateData(issueRes.data.data);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [courseId, isCompleted]);

const handleDownload = async () => {
  if (!certificateData?.certificateId) return;

  try {
    const res = await axiosInstance.get(
      `/course/certificate/${certificateData.certificateId}/download`,
      { responseType: 'arraybuffer' } 
    );
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      certificateData.fileName ||
      `certificate_${certificateData.title?.replace(/\s+/g, '_') || 'course'}.pdf`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download certificate. Please try again.");
  }
};


  const handleShare = async () => {
    if (!certificateData?.certificate) return;

    try {
      // Create blob for sharing
      const byteCharacters = atob(certificateData.certificate);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const file = new File(
        [blob],
        certificateData.fileName || 'certificate.pdf',
        { type: 'application/pdf' }
      );

      // Try native share API
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Course Certificate',
          text: `I've completed ${title}!`,
          files: [file]
        });
      } else {
        // Fallback: Just download since we can't share the actual file
        alert('Sharing is not supported on this device. The certificate will be downloaded instead.');
        handleDownload();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        alert('Failed to share certificate');
      }
    }
  };

  const handlePreview = () => {
    if (!certificateData?.certificate) return;

    try {
      // Convert base64 to blob
      const byteCharacters = atob(certificateData.certificate);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Open in new tab
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      // Note: We don't revoke the URL immediately as it's being used in the new tab
      // The browser will handle cleanup when the tab is closed
    } catch (err) {
      console.error("Preview failed:", err);
      alert("Failed to preview certificate. Please try again.");
    }
  };

  // Generate certificate ID from courseId
  const certificateId = `CERT-${new Date().getFullYear()}-${String(courseId).replace(/[^0-9]/g, '').padStart(10, '0')}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Certificate</h1>

      {!isCompleted && (
        <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white p-6 rounded-xl shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Almost There!</h3>
                <p className="text-white/90 text-sm">
                  Complete all course requirements to unlock your certificate
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-white/80 text-sm">Complete</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isCompleted ? (
          <>
            {/* Certificate Available */}
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 size={48} className="text-[#0097B2] animate-spin" />
                  <span className="mt-3 text-gray-600">Generating your certificate...</span>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Retry
                  </button>
                </div>
              ) : certificateData ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-[#00B2A9]">
                      <CheckCircle size={28} />
                      <span className="font-semibold text-lg">Certificate Earned!</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 bg-[#E0F2F5] text-[#0097B2] rounded-lg hover:bg-[#B3E0E9] transition-colors"
                      >
                        <Share2 size={18} />
                        Share
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0097B2] text-white rounded-lg hover:bg-[#00B2A9] transition-colors"
                      >
                        <Download size={18} />
                        Download
                      </button>
                    </div>
                  </div>

                  <div
                    className="border-8 border-double border-[#0097B2] p-12 rounded-lg bg-gradient-to-br from-white to-[#F2F2F2] relative cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={handlePreview}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handlePreview()}
                  >
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#00B2A9]"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#00B2A9]"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#00B2A9]"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#00B2A9]"></div>

                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-gradient-to-br from-[#0097B2] to-[#00B2A9] p-4 rounded-full">
                          <Award size={48} className="text-white" />
                        </div>
                      </div>

                      <h2 className="text-4xl font-bold text-gray-800">
                        Certificate of Completion
                      </h2>

                      <p className="text-gray-600 text-lg">This is to certify that</p>

                      <h3 className="text-3xl font-bold text-[#0097B2]">{userName}</h3>

                      <p className="text-gray-600 text-lg">has successfully completed</p>

                      <h4 className="text-2xl font-semibold text-gray-800">
                        {title}
                      </h4>

                      <div className="flex justify-center gap-16 pt-8">
                        <div className="text-center">
                          <div className="w-48 border-t-2 border-gray-400 mb-2"></div>
                          <p className="text-sm text-gray-600">Instructor Signature</p>
                          <p className="text-xs text-gray-500 mt-1">Dr. Sarah Johnson</p>
                        </div>
                        <div className="text-center">
                          <div className="w-48 border-t-2 border-gray-400 mb-2"></div>
                          <p className="text-sm text-gray-600">Date of Completion</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date().toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 pt-4">
                        Certificate ID: {certificateId}
                      </p>
                    </div>

                    {/* Click to preview overlay */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg">
                      <span className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-lg">
                        Click to preview full certificate
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="p-8">
              <div className="bg-[#F2F2F2] p-16 rounded-lg text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-[#F2F2F2]/50 backdrop-blur-sm"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-gray-300 p-6 rounded-full">
                      <Lock size={48} className="text-gray-500" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-700">
                    Certificate Locked
                  </h3>

                  <p className="text-gray-600 max-w-md mx-auto">
                    Complete all course modules and assignments to unlock your certificate of completion.
                  </p>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                    {Math.max(0, certificateThreshold - progress)}% remaining
                    </p>
                  </div>
                </div>

                <div className="absolute inset-8 border-4 border-dashed border-gray-300 rounded-lg opacity-50"></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 bg-[#E0F2F5] p-6 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-3">About Your Certificate</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle size={18} className="text-[#00B2A9] mt-0.5 flex-shrink-0" />
            <span>Shareable on LinkedIn and other professional networks</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={18} className="text-[#00B2A9] mt-0.5 flex-shrink-0" />
            <span>Includes a unique verification ID for authenticity</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={18} className="text-[#00B2A9] mt-0.5 flex-shrink-0" />
            <span>Available for download in high-resolution PDF format</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseCertificate;