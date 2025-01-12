import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import employeesData from "./hr.json";
import EmployeeChart from "./EmployeeChart";
import '../App.css'; // Ensure you have the CSS file imported

const HrDashboard = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [timing, setTiming] = useState({ in: "", out: "" });
  const [leave, setLeave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Function to calculate worked hours based on check-in and check-out time
  const calculateWorkedHours = (checkInTime, checkOutTime) => {
    const checkIn = new Date(`1970-01-01T${checkInTime}:00`);
    const checkOut = new Date(`1970-01-01T${checkOutTime}:00`);
    const diff = checkOut - checkIn;
    return diff / (1000 * 60 * 60); // Return hours
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setTiming({ in: "", out: "" });
    setLeave("");
    setError("");
  };

  const handleTimingChange = (e) => {
    setTiming({ ...timing, [e.target.name]: e.target.value });
  };

  const handleLeaveChange = (e) => {
    setLeave(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Calculate worked hours and update the employee's timing and leave data
    const workedHours = calculateWorkedHours(timing.in, timing.out);
    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployee.id
        ? { ...emp, timing, leave, workedHours }
        : emp
    );
    setEmployees(updatedEmployees);
    setLoading(false);
    alert("Leave and Timings updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="logout-container">
        {loggedInUser && (
          <div className="logged-in-user">
            <p>Welcome, {loggedInUser.name}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <h2>HR Dashboard</h2>

      <h3>Select Employee</h3>
      <select onChange={(e) => handleSelectEmployee(employees[e.target.value])}>
        <option value="">-- Select Employee --</option>
        {employees.map((employee, index) => (
          <option key={employee.id} value={index}>
            {employee.name}
          </option>
        ))}
      </select>

      {selectedEmployee && (
        <div className="employee-details">
          <h3>Employee Details: {selectedEmployee.name}</h3>
          <p>Email: {selectedEmployee.email}</p>
          <p>Role: {selectedEmployee.role}</p>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Office Timing (In):</label>
              <input
                type="time"
                name="in"
                value={timing.in}
                onChange={handleTimingChange}
                required
              />
            </div>
            <div className="form-control">
              <label>Office Timing (Out):</label>
              <input
                type="time"
                name="out"
                value={timing.out}
                onChange={handleTimingChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Timings and Leave'}
            </button>
          </form>
        </div>
      )}

      <div className="chart-container">
        <h3>Employee Hours Worked</h3>
        <EmployeeChart data={employees} />
      </div>
    </div>
  );
};

export default HrDashboard;
