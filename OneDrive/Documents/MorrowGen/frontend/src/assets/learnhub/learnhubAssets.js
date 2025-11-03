import UpcommingCourses_1 from "./images/HomeBanner1.avif";
import UpcommingCourses_2 from "./images/HomeBanner2.jpeg";
import UpcommingCourses_3 from "./images/HomeBanner3.avif";
import thumnail_1 from "./images/thumnail1.jpg";
import thumnail_2 from "./images/thumnail2.jpeg";
import courseIcon from "./images/courseIcon.png";

export const homeBanners = [
  UpcommingCourses_1,
  UpcommingCourses_2,
  UpcommingCourses_3,
];

export const courseData = [
  {
    id: "vidAB101",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React Basics – useState & Props",
    category: "React",
    description: "Understand the core concepts of state and props in React.",
    date: "2025-04-21",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_1,
    altText: "React Basics Video Thumbnail",
  },
  {
    id: "vidXY102",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React Props – Passing Data",
    category: "React",
    description: "Learn how to pass data between components using props.",
    date: "2025-04-22",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_1,
    altText: "React Props Video Thumbnail",
  },
  {
    id: "vidLM103",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React useEffect – Side Effects",
    category: "React",
    description: "Master side effects in React using the useEffect hook.",
    date: "2025-04-23",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_1,
    altText: "React useEffect Video Thumbnail",
  },
  {
    id: "vidQR104",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React Conditional Rendering",
    category: "React",
    description: "Explore ways to conditionally render elements in React.",
    date: "2025-04-24",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_1,
    altText: "React Conditional Rendering Video Thumbnail",
  },
  {
    id: "vidJK105",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React Lists & Keys",
    category: "React",
    description: "Understand rendering lists and using keys effectively.",
    date: "2025-04-25",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_1,
    altText: "React Lists and Keys Video Thumbnail",
  },
  {
    id: "vidRS106",
    icon: courseIcon,
    courseBy: "Google Developers",
    title: "React Forms – Handling Input",
    category: "React",
    description: "Master form handling and input fields in React.",
    date: "2025-04-26",
    status: "Completed",
    isFree: true,
    price: 0,
    hasCertificate: true,
    videoLink: "https://youtu.be/RshwYt3P55Y?si=Px_j17icc-pQdinG",
    buttonLabel: "Watch Now",
    image: thumnail_2,
    altText: "React Forms Video Thumbnail",
  },
];


export const assignmentOption = {
  qnaAI: [
    {
      videoId: 'RshwYt3P55Y',
      questions: [
        {
          question: "What is the capital of France?",
          options: [
            { text: "Paris", isCorrect: true },
            { text: "London", isCorrect: false },
            { text: "Rome", isCorrect: false },
            { text: "Berlin", isCorrect: false }
          ]
        },
        {
          question: "Who discovered gravity?",
          options: [
            { text: "Isaac Newton", isCorrect: true },
            { text: "Albert Einstein", isCorrect: false },
            { text: "Galileo Galilei", isCorrect: false },
            { text: "Stephen Hawking", isCorrect: false }
          ]
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: [
            { text: "Mars", isCorrect: true },
            { text: "Venus", isCorrect: false },
            { text: "Saturn", isCorrect: false },
            { text: "Jupiter", isCorrect: false }
          ]
        },
        {
          question: "What is the boiling point of water at sea level?",
          options: [
            { text: "100°C", isCorrect: true },
            { text: "90°C", isCorrect: false },
            { text: "80°C", isCorrect: false },
            { text: "120°C", isCorrect: false }
          ]
        }
      ]
    }
  ]
};

export const upCommingSessionsData = [
  {
    title: "React Basics",
    topic: "Introduction to React",
    date: "2025-06-01",
    status: "Upcoming",
    videoUrl: "",
    thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/mqdefault.jpg"
  },
  {
    title: "State & Props",
    topic: "Understanding Props and State",
    date: "2025-06-03",
    status: "Completed",
    videoUrl: "/videos/state-props",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg"
  },
  {
    title: "React Router",
    topic: "Routing in React Apps",
    date: "2025-06-05",
    status: "Upcoming",
    videoUrl: "",
    thumbnail: "https://img.youtube.com/vi/Law7wfdg_ls/mqdefault.jpg"
  },
  {
    title: "UseEffect Explained",
    topic: "useEffect Hook Deep Dive",
    date: "2025-06-07",
    status: "Completed",
    videoUrl: "/videos/use-effect",
    thumbnail: "https://img.youtube.com/vi/0ZJgIjIuY7U/mqdefault.jpg"
  },
  {
    title: "Custom Hooks",
    topic: "Creating Custom Hooks in React",
    date: "2025-06-10",
    status: "Upcoming",
    videoUrl: "",
    thumbnail: "https://img.youtube.com/vi/6ThXsUwLWvc/mqdefault.jpg"
  },
  {
    title: "React + Firebase",
    topic: "Authentication with Firebase",
    date: "2025-06-13",
    status: "Completed",
    videoUrl: "/videos/react-firebase-auth",
    thumbnail: "https://img.youtube.com/vi/-OKrloDzGpU/mqdefault.jpg"
  },
  {
    title: "Context API",
    topic: "Global State Management",
    date: "2025-06-15",
    status: "Upcoming",
    videoUrl: "",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg"
  },
  {
    title: "React Query",
    topic: "Data Fetching with React Query",
    date: "2025-06-17",
    status: "Completed",
    videoUrl: "/videos/react-query-intro",
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg"
  }
];


export const sessions = [
  {
    id: 1,
    sessionHeading: "React Basics",
    sessionTitle: "Introduction to React",
    sessionImage: "https://img.youtube.com/vi/Ke90Tje7VS0/mqdefault.jpg",
    sessionDescription: "Learn the fundamentals of React.",
    sessionDate: "2025-06-10",
    sessionTime: "10:00 AM - 11:30 AM",
    status: "live",
    recordingUrl: "",
    whatsappGroupLink: "https://chat.whatsapp.com/example1"
  },
  {
    id: 2,
    sessionHeading: "Advanced JavaScript",
    sessionTitle: "Deep dive into JS",
    sessionImage: "https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg",
    sessionDescription: "Explore advanced concepts in JavaScript.",
    sessionDate: "2025-06-15",
    sessionTime: "2:00 PM - 3:30 PM",
    status: "upcoming",
    recordingUrl: "",
    whatsappGroupLink: "https://chat.whatsapp.com/example2"
  },
  {
    id: 3,
    sessionHeading: "Node.js Workshop",
    sessionTitle: "Building backend with Node",
    sessionImage: "https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg",
    sessionDescription: "Learn backend development with Node.js.",
    sessionDate: "2025-05-20",
    sessionTime: "4:00 PM - 5:30 PM",
    status: "finished",
    recordingUrl: "https://example.com/recording-nodejs",
    whatsappGroupLink: ""
  },
];

export const mockInterviewData = [
  {
    id: 1,
    title: "React Developer Interview",
    description: "Prepare for your React developer interviews with this essential guide.",
    attemptedDate: "2025-06-20",
    isAttempted: true,
    isPassed: true,
    score: 85,
    category: "Technical",
    mainImage: "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
    thumbnailImages: [
      "https://img.youtube.com/vi/Ke90Tje7VS0/mqdefault.jpg",
      "https://img.youtube.com/vi/bMknfKXIFA8/mqdefault.jpg"
    ],
    videoUrl: "https://youtu.be/Ke90Tje7VS0"
  },
  {
    id: 2,
    title: "JavaScript Coding Interview",
    description: "Ace your JavaScript coding interview with top questions and solutions.",
    attemptedDate: "2025-06-18",
    isAttempted: true,
    isPassed: false,
    score: 42,
    category: "Technical",
    mainImage: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    thumbnailImages: [
      "https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg",
      "https://img.youtube.com/vi/jS4aFq5-91M/mqdefault.jpg"
    ],
    videoUrl: "https://youtu.be/PkZNo7MFNFg"
  },
  {
    id: 3,
    title: "HR Behavioral Interview",
    description: "Understand how to answer common HR interview questions confidently.",
    attemptedDate: "2025-06-10",
    isAttempted: true,
    isPassed: true,
    score: 76,
    category: "HR",
    mainImage: "https://img.youtube.com/vi/A_5V4wGQMXw/maxresdefault.jpg",
    thumbnailImages: [
      "https://img.youtube.com/vi/A_5V4wGQMXw/mqdefault.jpg",
      "https://img.youtube.com/vi/YYXdXT2l-Gg/mqdefault.jpg"
    ],
    videoUrl: "https://youtu.be/A_5V4wGQMXw"
  },

];

export const mockInterviewNotTaken  = [
      {
    id: 4,
    title: "System Design Interview",
    description: "Learn how to approach system design interviews step by step.",
    attemptedDate: "2025-06-05",
    isAttempted: true,
    isPassed: null,
    score: 60,
    category: "Technical",
    mainImage: "https://img.youtube.com/vi/vJG698U2Mvo/maxresdefault.jpg",
    thumbnailImages: [
      "https://img.youtube.com/vi/vJG698U2Mvo/mqdefault.jpg",
      "https://img.youtube.com/vi/lCYPo2cdxMI/mqdefault.jpg"
    ],
    videoUrl: "https://youtu.be/vJG698U2Mvo"
  },
  {
    id: 5,
    title: "Full Stack Developer Interview",
    description: "Tackle full stack developer interview questions with these practical tips.",
    attemptedDate: "2025-06-01",
    isAttempted: true,
    isPassed: true,
    score: 91,
    category: "Technical",
    mainImage: "https://img.youtube.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
    thumbnailImages: [
      "https://img.youtube.com/vi/7CqJlxBYj-M/mqdefault.jpg",
      "https://img.youtube.com/vi/-bt_y4Loofg/mqdefault.jpg"
    ],
    videoUrl: "https://youtu.be/7CqJlxBYj-M"
  }
]
export const validDomains = [
  // Development Roles
  'frontend',
  'backend',
  'fullstack',
  'web development',
  'mobile development',
  'android development',
  'ios development',

  // Data & AI
  'data science',
  'data engineering',
  'machine learning',
  'ai/ml',
  'deep learning',
  'big data',
  'business intelligence',
  'data analyst',
  'data architect',

  // Cloud & DevOps
  'devops',
  'cloud computing',
  'aws',
  'azure',
  'gcp',
  'cloud engineering',
  'site reliability engineer',
  'devsecops',
  'cloud security engineer',
  'platform engineer',
  'release engineer',
  'performance engineer',

  // Testing & QA
  'software testing',
  'qa engineer',
  'manual testing',
  'automation testing',
  'sdet',
  'penetration tester',

  // Security
  'cybersecurity',
  'security analyst',
  'information security',

  // Management & Product
  'product management',
  'project management',
  'scrum master',

  // UI/UX & Design
  'ui/ux design',
  'graphic design',
  'mobile app designer',
  'seo specialist',
  'content strategist',

  // Others
  'database administrator',
  'system administrator',
  'game development',
  'embedded systems',
  'blockchain',
  'ar/vr',
  'technical support',
  'technical writing',
  'research',
  'network engineer',
  'it support',
  'technical evangelist',
  'customer success engineer',
  'it auditor',
  'firmware engineer',
  'robotics engineer',
  'ai ethics specialist',
  'digital transformation specialist',
  'voice assistant developer',
  'quantum computing researcher'
];



