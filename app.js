"use strict";

// Protected configuration 
const config = (function () {
  const settings = { bootcamp: "Melsoft AI Bootcamp", version: "1.0.0", passMark: 50 };
  return {
    get: (key) => settings[key],
    setPassMark(mark) {
      if (typeof mark === "number" && mark >= 0 && mark <= 100) settings.passMark = mark;
    },
  };
})();

// Unique student IDs 
function* idGenerator(prefix = "STU") {
  let n = 1;
  while (true) yield `${prefix}-${String(n++).padStart(3, "0")}`;
}
const ids = idGenerator();

// Private processed counter 
function createCounter() {
  let count = 0; 
  return { increment: () => ++count, value: () => count };
}
const processedCounter = createCounter();

//  Storage 
const students = [];
const isValidMark = (m) => typeof m === "number" && m >= 0 && m <= 100;


function registerStudent(name, course = "General Programming", ...marks) {
  if (typeof name !== "string" || !name.trim()) {
    console.log("  ⚠ Invalid name, student not registered.");
    return null;
  }
  const validMarks = marks.filter(isValidMark);
  if (validMarks.length !== marks.length) console.log(`  Invalid marks ignored for ${name}.`);
  const student = { id: ids.next().value, name, course, marks: [...validMarks], processed: false };
  students.push(student);
  return student;
}
