/**
 * Modules Database
 * Mock data for course modules
 */

export default [
  {
    _id: "M101",
    name: "Week 0 - INTRO",
    description: "Introduction to the course",
    course: "CS5010",
    status: "Published",
    lessons: [
      { _id: "L101", name: "Course Overview", type: "READING" },
      { _id: "L102", name: "Learning Objectives", type: "ASSIGNMENT" },
    ]
  },
  {
    _id: "M102",
    name: "Week 1 - Program Design",
    description: "Introduction to systematic program design",
    course: "CS5010",
    status: "Published",
    lessons: [
      { _id: "L103", name: "Design Recipe", type: "READING" },
      { _id: "L104", name: "Practice Problems", type: "ASSIGNMENT" },
    ]
  },
  {
    _id: "M103",
    name: "Week 2 - Data Definitions",
    description: "How to represent information",
    course: "CS5010",
    status: "Published",
    lessons: [
      { _id: "L105", name: "Atomic Data", type: "READING" },
      { _id: "L106", name: "Homework 1", type: "ASSIGNMENT" },
    ]
  },

  {
    _id: "M201",
    name: "Week 0 - INTRO",
    description: "Introduction to Web Development",
    course: "CS5610",
    status: "Published",
    lessons: [
      { _id: "L201", name: "Course Overview", type: "READING" },
      { _id: "L202", name: "Environment Setup", type: "ASSIGNMENT" },
    ]
  },
  {
    _id: "M202",
    name: "Week 1 - HTML & CSS",
    description: "Introduction to HTML and CSS",
    course: "CS5610",
    status: "Published",
    lessons: [
      { _id: "L203", name: "HTML Basics", type: "READING" },
      { _id: "L204", name: "CSS Styling", type: "READING" },
      { _id: "L205", name: "Lab 1", type: "ASSIGNMENT" },
    ]
  },
  {
    _id: "M203",
    name: "Week 2 - JavaScript Basics",
    description: "Introduction to JavaScript programming",
    course: "CS5610",
    status: "Published",
    lessons: [
      { _id: "L206", name: "Variables and Data Types", type: "READING" },
      { _id: "L207", name: "Functions", type: "READING" },
      { _id: "L208", name: "Lab 2", type: "ASSIGNMENT" },
    ]
  },

  {
    _id: "M301",
    name: "Week 1 - Introduction to Algorithms",
    description: "Course overview and algorithm analysis",
    course: "CS5800",
    status: "Published",
    lessons: [
      { _id: "L301", name: "What is an Algorithm?", type: "READING" },
      { _id: "L302", name: "Big O Notation", type: "READING" },
    ]
  },
  {
    _id: "M302",
    name: "Week 2 - Sorting Algorithms",
    description: "Different sorting techniques",
    course: "CS5800",
    status: "Published",
    lessons: [
      { _id: "L303", name: "Bubble Sort", type: "READING" },
      { _id: "L304", name: "Quick Sort", type: "READING" },
      { _id: "L305", name: "Homework 1", type: "ASSIGNMENT" },
    ]
  },

  {
    _id: "M401",
    name: "Week 1 - Introduction to ML",
    description: "Machine Learning fundamentals",
    course: "CS6140",
    status: "Published",
    lessons: [
      { _id: "L401", name: "What is Machine Learning?", type: "READING" },
      { _id: "L402", name: "Types of Learning", type: "READING" },
    ]
  },
  {
    _id: "M402",
    name: "Week 2 - Supervised Learning",
    description: "Introduction to supervised learning",
    course: "CS6140",
    status: "Published",
    lessons: [
      { _id: "L403", name: "Linear Regression", type: "READING" },
      { _id: "L404", name: "Lab 1", type: "ASSIGNMENT" },
    ]
  },
];
