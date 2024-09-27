import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/employees');
                const data = await response.json();
                const employeesWithEditState = data.map((employee: Employee) => ({
                    ...employee,
                    isEditing: false, // Initial state: not editing
                }));
                setEmployees(employeesWithEditState);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEditClick = (id: number) => {
        setEmployees(employees.map(employee =>
            employee.employeeId === id ? { ...employee, isEditing: !employee.isEditing } : employee
        ));
    };

    const handleInputChange = (id: number, field: string, value: string) => {
        setEmployees(employees.map(employee =>
            employee.employeeId === id ? { ...employee, [field]: value } : employee
        ));
    };

    const handleSaveClick = async (id: number) => {
        const employeeToUpdate = employees.find(employee => employee.employeeId === id);
        if (employeeToUpdate) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employee/${id}`, {
                    method: 'PUT', // Or PUT based on your API
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employeeToUpdate),
                });
                if (response.ok) {
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
                            {employee.isEditing ? (
                                <button className="btn" onClick={() => handleSaveClick(employee.employeeId)}>Save</button>
                            ) : (
                                <button className="btn" onClick={() => handleEditClick(employee.employeeId)}>Edit</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;

interface Employee {
    employeeId: number;
    employeeName: string;
    employeeDesignation: string;
    employeeImage: string;
    employeeEmail: string;
    employeePhone: string;
    employeeSalary: number;
    employeeLocation: string;
    isEditing: boolean; // Added to track editing state
}

