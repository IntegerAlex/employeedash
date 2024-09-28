import { useState, useEffect } from 'react';
import './App.css';

function App() {
    // State to hold the list of employees, each with their own edit state
    const [employees, setEmployees] = useState<Employee[]>([]);

    // useEffect runs once after the component is mounted to fetch employee data from the API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/employees');
                const data = await response.json();

                // Add an 'isEditing' state for each employee to track whether they are being edited
                const employeesWithEditState = data.map((employee: Employee) => ({
                    ...employee,
                    isEditing: false, // Initial state: not editing
                }));

                setEmployees(employeesWithEditState); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees(); // Call the function to fetch employee data
    }, []); // Empty dependency array means this effect runs once after component mounts

    // Toggle editing state for a specific employee
    const handleEditClick = (id: number) => {
        setEmployees(employees.map(employee =>
            employee.employeeId === id ? { ...employee, isEditing: !employee.isEditing } : employee
        ));
    };

    // Update employee field when an input value changes
    const handleInputChange = (id: number, field: string, value: string) => {
        setEmployees(employees.map(employee =>
            employee.employeeId === id ? { ...employee, [field]: value } : employee
        ));
    };

    // Save updated employee data by sending a PUT request to the API
    const handleSaveClick = async (id: number) => {
        const employeeToUpdate = employees.find(employee => employee.employeeId === id);
        if (employeeToUpdate) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employee/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employeeToUpdate), // Send updated employee data
                });

                if (response.ok) {
                    // Once successfully saved, disable editing mode for that employee
                    setEmployees(employees.map(employee =>
                        employee.employeeId === id ? { ...employee, isEditing: false } : employee
                    ));
                } else {
                    console.error('Failed to update employee data');
                }
            } catch (error) {
                console.error('Error saving employee data:', error);
            }
        }
    };

    // Delete an employee by sending a DELETE request to the API
    const handleDeleteClick = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/employee/${id}`, {
                method: 'DELETE', // Delete request
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Remove the employee from the state once successfully deleted
                setEmployees(employees.filter(employee => employee.employeeId !== id));
            } else {
                console.error('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <>
            <div className="App">
                {employees.map((employee: Employee) => (
                    <div className="card" key={employee.employeeId}>
                        <div className="card-header">
                            <img src={employee.employeeImage} alt={employee.employeeName} className="employee-image" />
                            <h2>
                                {employee.isEditing ? (
                                    <input
                                        type="text"
                                        value={employee.employeeName || ""} // Default to empty string if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeeName', e.target.value)}
                                    />
                                ) : (
                                    employee.employeeName
                                )}
                            </h2>
                            <p className="designation">
                                {employee.isEditing ? (
                                    <input
                                        type="text"
                                        value={employee.employeeDesignation || ""} // Default to empty string if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeeDesignation', e.target.value)}
                                    />
                                ) : (
                                    employee.employeeDesignation
                                )}
                            </p>
                            <p className="employee-id">ID: {employee.employeeId}</p>
                        </div>
                        <div className="card-body">
                            <p><strong>Email:</strong>
                                {employee.isEditing ? (
                                    <input
                                        type="email"
                                        value={employee.employeeEmail || ""} // Default to empty string if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeeEmail', e.target.value)}
                                    />
                                ) : (
                                    employee.employeeEmail
                                )}
                            </p>
                            <p><strong>Phone:</strong>
                                {employee.isEditing ? (
                                    <input
                                        type="tel"
                                        value={employee.employeePhone || ""} // Default to empty string if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeePhone', e.target.value)}
                                    />
                                ) : (
                                    employee.employeePhone
                                )}
                            </p>
                            <p><strong>Salary:</strong>
                                {employee.isEditing ? (
                                    <input
                                        type="number"
                                        value={employee.employeeSalary?.toString() || "0"} // Default to "0" if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeeSalary', e.target.value)}
                                    />
                                ) : (
                                    employee.employeeSalary
                                )}
                            </p>
                            <p><strong>Location:</strong>
                                {employee.isEditing ? (
                                    <input
                                        type="text"
                                        value={employee.employeeLocation || ""} // Default to empty string if undefined
                                        onChange={(e) => handleInputChange(employee.employeeId, 'employeeLocation', e.target.value)}
                                    />
                                ) : (
                                    employee.employeeLocation
                                )}
                            </p>
                            {/* If employee is being edited, show Save button, otherwise show Edit button */}
                            {employee.isEditing ? (
                                <button className="btn" onClick={() => handleSaveClick(employee.employeeId)}>Save</button>
                            ) : (
                                <button className="btn" onClick={() => handleEditClick(employee.employeeId)}>Edit</button>
                            )}
                            {/* Delete button to remove employee */}
                            <button className="del-btn" onClick={() => handleDeleteClick(employee.employeeId)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;

// TypeScript interface for Employee structure
interface Employee {
    employeeId: number;
    employeeName: string;
    employeeDesignation: string;
    employeeImage: string;
    employeeEmail: string;
    employeePhone: string;
    employeeSalary: number;
    employeeLocation: string;
    isEditing: boolean; // Tracks whether the employee is in edit mode
}

