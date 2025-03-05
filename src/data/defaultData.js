export const defaultResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Developer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "San Francisco, CA",
    summary: "Experienced software developer with a passion for creating efficient and scalable applications."
  },
  skills: [
    { id: "1", name: "JavaScript" },
    { id: "2", name: "React" },
    { id: "3", name: "Node.js" },
    { id: "4", name: "HTML/CSS" }
  ],
  experience: [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "Present",
      description: "Developed and maintained multiple React applications. Implemented responsive designs and improved performance."
    },
    {
      id: "2",
      jobTitle: "Web Developer",
      company: "Digital Creations",
      location: "San Jose, CA",
      startDate: "2017-03",
      endDate: "2019-12",
      description: "Built and maintained client websites. Collaborated with design team to implement UI/UX improvements."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      description: "Graduated with honors. Focused on web development and algorithms."
    }
  ],
  customSections: [
    {
      id: "1",
      title: "Projects",
      items: [
        {
          id: "1",
          title: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB."
        },
        {
          id: "2",
          title: "Task Management App",
          description: "Developed a task management application with real-time updates using React and Firebase."
        }
      ]
    }
  ]
}