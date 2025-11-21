import { Briefcase, MapPin, Clock, DollarSign, Users, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useJobStore from '../../zustand/recruiter/useJobStore';
import {toast} from 'react-toastify'
const JobCard = ({ job ={}, mode,onView }) => {
  const navigate = useNavigate()
  const {deleteJob} = useJobStore()

  const deleteJobById = async(id)=>{
    try {
      await deleteJob(id)
    toast.success('Job Deleted Successfully...')
  } catch (error) {
      toast.error(error.message || 'Job Deleted Successfully...')
      
    }
  }
  return (
    <>
      <div
        className={`rounded-xl p-4 md:p-6 transition-all duration-300 border-2 
      ${mode === 'dark'
            ? 'bg-[#1B2E31] border-[#294B4E] hover:border-[#00B2A9]'
            : ' border-gray-100 hover:border-[#0097B2] shadow-sm hover:shadow-md'
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg md:text-xl font-semibold mb-1  ${mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
            >
              {job.title}
            </h3>
            <p
              className={`text-xs md:text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              {job.company}
            </p>
          </div>
          {/* <button
        className={`p-2 rounded-lg transition-colors ${
          mode === 'dark' ? 'hover:bg-[#294B4E]' : 'hover:bg-gray-100'
        }`}
      >
        <MoreVertical
          className={`w-4 h-4 md:w-5 md:h-5 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        />
      </button> */}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium 
            ${mode === 'dark'
                  ? 'bg-[#2D4F50] text-[#00B2A9]'
                  : 'bg-[#E0F2F5] text-[#0097B2]'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {job.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className={`w-4 h-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {job.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className={`w-4 h-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {job.salary}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {new Date(job.deadline).toISOString().split('T')[0]}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 md:pt-4 border-t 
        ${mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-100'}`}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-0">
            <Users className={`w-5 h-5 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
            <span className={`font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {job.applicants}
            </span>
            <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Applicants
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
            onClick={onView}
              className={`p-2 flex-1 sm:flex-none rounded-lg transition-colors ${mode === 'dark'
                  ? 'bg-[#2D4F50] hover:bg-[#3A6467] text-[#00B2A9]'
                  : 'bg-[#E0F2F5] hover:bg-[#B3E0E9] text-[#0097B2]'
                }`}
            >
              <Eye className="w-4 h-4 mx-auto" />
            </button>
            <button
            onClick={()=>navigate(`edit/${job.id}`)}
              className={`p-2 flex-1 sm:flex-none rounded-lg transition-colors ${mode === 'dark'
                  ? 'bg-[#2D4F50] hover:bg-[#3A6467] text-[#00B2A9]'
                  : 'bg-[#E0F2F5] hover:bg-[#B3E0E9] text-[#0097B2]'
                }`}
            >
              <Edit className="w-4 h-4 mx-auto" />
            </button>
            <button
            onClick={()=>deleteJobById(job.id)}
              className={`p-2 flex-1 sm:flex-none rounded-lg transition-colors ${mode === 'dark'
                  ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                  : 'bg-red-50 hover:bg-red-100 text-red-600'
                }`}
            >
              <Trash2 className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </>
  )


}
export default JobCard