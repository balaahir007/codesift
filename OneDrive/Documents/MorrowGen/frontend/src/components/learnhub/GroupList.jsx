import React from "react";

const dummyGroups = [
  {
    id: 1,
    name: "MNC Prep Squad",
    membersCount: 25,
    techSkills: ["Java", "Data Structures", "Algorithms"],
    workExperience: "Freshers",
    logo: "https://example.com/logo.png",
    goal: "Prepare for MNC interviews and coding rounds",
    tags: ["MNC", "Coding", "Interview Prep"],
    description: "A group for freshers focusing on coding and interviews.",
  },
  {
    id: 2,
    name: "Full Stack Masters",
    membersCount: 15,
    techSkills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    workExperience: "1–3 years experience",
    logo: "https://example.com/fs-logo.png",
    goal: "Master full stack web development",
    tags: ["Full Stack", "MERN", "Project Development"],
    description: "For developers looking to build and ship full-stack apps.",
  },
];

const GroupList = () => (
  <div className="space-y-4 mt-2">
    {dummyGroups.map((g) => (
      <div
        key={g.id}
        className="bg-white rounded-lg p-4 relative shadow hover:shadow-lg"
      >
        <div
          className="
    bg-[#0097B2] text-white w-fit absolute right-2 top-2 rounded-md cursor-pointer 
    px-2 py-1 flex items-center justify-center
    hover:bg-[#007A93] transition-colors
    font-medium
  "
        >
          Join Group
        </div>

        <div className="flex items-center gap-3">
          <img src={g.logo} alt={g.name} className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="font-bold text-[#0097B2]">{g.name}</h2>
            <p className="text-gray-500 text-sm">
              Members: {g.membersCount} | Experience: {g.workExperience}
            </p>
          </div>
        </div>
        <p className="mt-2 text-gray-600">{g.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {g.techSkills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {g.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#0097B2] text-white text-xs rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 font-semibold text-gray-800">Goal: {g.goal}</p>
      </div>
    ))}
  </div>
);

export default GroupList;
