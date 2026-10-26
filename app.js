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

// Performance 
const calculateAverage = (marks) =>
  marks.length ? Math.round((marks.reduce((sum, m) => sum + m, 0) / marks.length) * 10) / 10 : null;

const getStatus = (average, passMark = config.get("passMark")) =>
  average === null ? "N/A" : average >= passMark ? "PASS" : "FAIL";

const isPassing = (s) => getStatus(calculateAverage(s.marks)) === "PASS";
const countWhere = (list, predicate) => list.filter(predicate).length; 

//  this, call, apply, bind 
const reporter = {
  title: `${config.get("bootcamp")} v${config.get("version")}`,
  printHeader() {
    console.log(`\n=== ${this.title} ===`); 
  },
};

function describe(passMark) {
  // this is set by call()
  return `${this.name} (${this.course}): avg ${calculateAverage(this.marks)} -> ${getStatus(calculateAverage(this.marks), passMark)}`;
}

// Async processing with callback
function processStudent(id, callback) {
  const student = typeof id === "string" ? students.find((s) => s.id === id) : undefined;
  if (!student) return callback(new Error(`Cannot process "${id}": student not found or invalid data`));
  console.log(`  Processing ${student.name}...`);
  setTimeout(() => {
    student.processed = true;
    processedCounter.increment();
    callback(null, student); // callback decides what happens next
  }, 500);
}

function processAll(list, done) {
  const [first, ...rest] = list;
  if (!first) return done();
  processStudent(first.id, (err, s) => {
    console.log(err ? `  ${err.message}` : `  ${s.name} processed`);
    processAll(rest, done);
  });
}

//  Final report 
function printReport() {
  reporter.printHeader.call(reporter); // call(): run with a chosen this
  console.table(
    students.map((s) => {
      const avg = calculateAverage(s.marks);
      return { ID: s.id, Name: s.name, Course: s.course, Marks: s.marks.join(", ") || "-", Average: avg ?? "-", Status: getStatus(avg) };
    })
  );
   console.log(`Total students:     ${students.length}`);
   console.log(`Students processed: ${processedCounter.value()}`);
   console.log(`Passed:             ${countWhere(students, isPassing)}`);
   console.log(`Failed:             ${countWhere(students, (s) => getStatus(calculateAverage(s.marks)) === "FAIL")}`);
}