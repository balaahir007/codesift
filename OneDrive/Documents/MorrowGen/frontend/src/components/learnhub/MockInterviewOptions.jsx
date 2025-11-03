import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewInterviewForm from "./NewInterviewForm";
import ResumeQuestionForm from "./ResumeUploadForm";

const MockInterviewOptions = () => {
  const navigate = useNavigate();
  const [newMockInterviewFormOpen, setNewMockInterviewFormOpen] = useState(false);
  const [resumeMockInterviewOpen, setResumeMockInterviewOpen] = useState(false)


  return (
    <div className="w-full px-4 sm:px-6 md:px-0 mt-4 grid gap-6 sm:gap-8 md:grid-cols-2">
      <div
        className="group p-4 sm:p-6 rounded-2xl border border-[#0097B2] bg-primary shadow-md hover:shadow-xl shadow-[#0097B233] hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center gap-4 sm:gap-5"
        onClick={() => setNewMockInterviewFormOpen(true)} 
      >
        <div className="text-white text-2xl sm:text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
          <FaPlus />
        </div>
        <div>
          <h2 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 tracking-wide">
            New Mock Interview
          </h2>
          <p className="text-xs sm:text-sm text-white">Start a fresh interview simulation.</p>
        </div>
      </div>

      <label className="group p-4 sm:p-6 rounded-2xl border border-[#00B2A9] bg-[#F2F2F2] shadow-md hover:shadow-xl shadow-[#00B2A933] hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center gap-4 sm:gap-5" onClick={()=>setResumeMockInterviewOpen(true)}>
        <div className="text-[#00B2A9] text-2xl sm:text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
          <MdOutlineDriveFolderUpload />
        </div>
        <div>
          <h2 className="text-sm sm:text-base md:text-xl font-bold text-black mb-1 tracking-wide">
            Resume-Based Interview
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">Upload resume to tailor your interview.</p>
        </div>
      </label>
      {
        resumeMockInterviewOpen && (
          <div className="fixed inset-0 bg-black/50 duration-200  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <ResumeQuestionForm onClose={() => setResumeMockInterviewOpen(false)} />
            </div>
          </div>
        )
      }
      {newMockInterviewFormOpen && (
        <div className="fixed inset-0 bg-black/50 duration-200  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <NewInterviewForm  onClose={() => setNewMockInterviewFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewOptions;
