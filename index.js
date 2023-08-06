// Your code here
// Employee Record constructor
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Process an Array of Arrays into an Array of employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(...data));
  }
  
  // Add timeIn event Object to an employee's record of timeInEvents
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  // Add timeOut event Object to an employee's record of timeOutEvents
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  // Calculate the hours worked on a given date for an employee
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate the wages earned on a given date for an employee
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate all the dates' wages for an employee and return the total earnings
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Calculate the total payroll burden for an array of employee records
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
  }
  