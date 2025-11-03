// import React, { useState } from "react";
// import JobCard from "../../components/opportuneSpace/jobs/JobCard";
// const jobs = [
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00124",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   {
//     id: "job_00123",
//     title: "Software Engineer Intern",
//     company: {
//       name: "Bluestock Fintech",
//       website: "https://bluestock.in",
//       logoUrl: "https://bluestock.in/logo.png",
//       industry: "FinTech",
//       size: "11-50 employees",
//       headquarters: "Mumbai, India",
//       foundedYear: 2020,
//       verified: true
//     },
//     location: {
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       remote: false,
//       hybrid: true,
//       onsite: true
//     },
//     employmentType: "Internship",
//     workMode: "Hybrid",
//     duration: "3 months",
//     stipend: {
//       min: 15000,
//       max: 25000,
//       currency: "INR",
//       period: "month"
//     },
//     salary: null,
//     experienceRequired: {
//       minYears: 0,
//       maxYears: 1,
//       preferred: "Fresher"
//     },
//     educationRequired: ["B.E/B.Tech", "BSc in Computer Science"],
//     skillsRequired: ["JavaScript", "React.js", "Node.js", "MongoDB", "Git"],
//     languagesPreferred: ["English", "Hindi"],
//     certificationsPreferred: ["React Developer Certification"],
//     responsibilities: [
//       "Develop and maintain web applications",
//       "Collaborate with cross-functional teams",
//       "Write clean, efficient, and testable code"
//     ],
//     qualifications: [
//       "Strong understanding of front-end technologies",
//       "Knowledge of RESTful APIs"
//     ],
//     perksAndBenefits: [
//       "Certificate",
//       "Pre-placement offer (PPO)",
//       "Letter of Recommendation",
//       "Work from home flexibility",
//       "Startup culture"
//     ],
//     applicationDetails: {
//       howToApply: "Apply via company website or send resume to hr@bluestock.in",
//       applicationDeadline: "2025-07-01",
//       questions: [
//         "Why do you want to join Bluestock?",
//         "Link to GitHub or portfolio?",
//         "Are you available for a 3-month internship?"
//       ]
//     },
//     jobStatus: "active",
//     postedDate: "2025-06-10",
//     updatedDate: "2025-06-13",
//     expiryDate: "2025-07-01",
//     applicantsCount: 126,
//     viewsCount: 584,
//     isFeatured: true,
//     isNew: true,
//     tags: ["FinTech", "Internship", "RemoteOption", "Startup", "Entry Level"],
//     recruiter: {
//       name: "Anjali Sharma",
//       designation: "HR Manager",
//       contactEmail: "anjali@bluestock.in",
//       linkedIn: "https://linkedin.com/in/anjalisharma"
//     },
//     attachments: [
//       {
//         type: "PDF",
//         url: "https://bluestock.in/job-description.pdf",
//         label: "Job Description"
//       }
//     ],
//     seo: {
//       metaTitle: "Software Engineer Intern at Bluestock Fintech",
//       metaDescription: "Apply for Software Engineer Internship in a fast-growing fintech startup in Bangalore.",
//       keywords: ["Software Engineer", "Fintech Internship", "React Developer", "Startup"]
//     }
//   },
//   // 👉 Add 2-3 more similar job objects here for testing
// ];


// const JobExplorer = () => {
//   const [selectedJob, setSelectedJob] = useState(jobs[0]); // default first job
//   return (
//     <div className="min-h-screen  py-8 px-4 white">
//       <div className="w-full mx-auto flex flex-col md:flex-row gap-6">

//         {/* Job List */}
//         <div className="md:w-3/4 mx-auto rounded-xl bg-white p-4 max-h-[75vh] overflow-y-auto">
//           <h2 className="text-xl font-semibold mb-5 text-gray-800">🔍 Available Jobs</h2>
//           <div className="space-y-4">
//             {jobs.map((job) => (
//               <div
//                 key={job.id}
//                 onClick={() => setSelectedJob(job)}
//                 className={`flex gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition ${selectedJob?.id === job.id ? "ring-2 ring-blue-400" : ""
//                   }`}
//               >
//                 <img
//                   src={job.company.logoUrl}
//                   alt="logo"
//                   className="w-14 h-14 rounded-md border object-contain bg-white"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-md font-semibold text-gray-800">{job.title}</h3>
//                   <p className="text-sm text-gray-600">{job.company.name}</p>

//                   <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
//                     <span className="bg-gray-100 px-2 py-1 rounded-full">
//                       {job.employmentType}
//                     </span>
//                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                       {job.workMode}
//                     </span>
//                     {job.location && (
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                         {job.location}
//                       </span>
//                     )}
//                     {job.experience && (
//                       <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
//                         {job.experience} yrs exp
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>


//         {/* Job Details */}
//         {/* <div className="flex-1">
//           {selectedJob ? (
//             <JobCard job={selectedJob} />
//           ) : (
//             <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-500">
//               Select a job to see details
//             </div>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default JobExplorer;