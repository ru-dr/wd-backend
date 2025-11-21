/**
 * Enrollments Database
 * Mock data for course enrollments
 */

export default [
  // Student enrollments for iron_man (121)
  { _id: "E101", user: "121", course: "CS5010", role: "STUDENT" },
  { _id: "E102", user: "121", course: "CS5610", role: "STUDENT" },
  { _id: "E103", user: "121", course: "CS5800", role: "STUDENT" },

  // Student enrollments for dark_knight (122)
  { _id: "E104", user: "122", course: "CS5010", role: "STUDENT" },
  { _id: "E105", user: "122", course: "CS5610", role: "STUDENT" },
  { _id: "E106", user: "122", course: "CS6140", role: "STUDENT" },

  // Faculty enrollments for capt_america (123)
  { _id: "E107", user: "123", course: "CS5010", role: "FACULTY" },
  { _id: "E108", user: "123", course: "CS5610", role: "FACULTY" },

  // Faculty enrollments for wonder_woman (124)
  { _id: "E109", user: "124", course: "CS5800", role: "FACULTY" },
  { _id: "E110", user: "124", course: "CS6140", role: "FACULTY" },

  // Student enrollments for thor (125)
  { _id: "E111", user: "125", course: "CS5610", role: "STUDENT" },
  { _id: "E112", user: "125", course: "CS5800", role: "STUDENT" },
  { _id: "E113", user: "125", course: "CS6140", role: "STUDENT" },
];
