// Employee class
class Employee {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  // Name
  get Name() {
    return this.name;
  }

  set Name(name) {
    this.name = name;
  }
  // Age
  get Age() {
    return this.age;
  }

  set Age(age) {
    this.age = age;
  }
  // Salary
  get Salary() {
    return this.salary;
  }

  set Salary(salary) {
    this.salary = salary;
  }
}

// Programmer class that inherits from Employee
class Programmer extends Employee {
  constructor(name, age, salary, lang) {
    super(name, age, salary);
    this.lang = lang;
  }

  // Override Salary
  get Salary() {
    return this.salary * 3;
  }

  // Lang
  get Lang() {
    return this.lang;
  }

  set Lang(lang) {
    this.lang = lang;
  }
}

const user1 = new Programmer("Eldaniz Akbarzade", 23, 4200, ["JavaScript",  "React",  "Kotlin"]);
const user2 = new Programmer("Elon Musk", 56, 2000, ["PHP", "C", "Java"]);

console.log(user1);
console.log(user2);

console.log(`User 1 override salary - ${user1.Salary}`);
console.log(`User 2 override salary - ${user2.Salary}`);







