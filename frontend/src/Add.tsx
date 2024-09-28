import { useState } from 'react';
import  './AddEmployee.css';
export default function Add() {
    // State to manage form inputs
    const [employee, setEmployee] = useState({
        employeeName: '',
        employeeEmail: '',
        employeePhone: '',
        employeeDesignation: '',
        employeeSalary: '',
        employeeLocation: '',
        employeeImage: ''
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Backend API POST request
        try {
            const response = await fetch('http://localhost:8080/api/v1/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                console.log('Employee added successfully!');
                // Optionally reset form or display a success message
                setEmployee({
                    employeeName: '',
                    employeeEmail: '',
                    employeePhone: '',
                    employeeDesignation: '',
                    employeeSalary: '',
                    employeeLocation: '',
                    employeeImage: ''
                });
            } else {
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit} className="add-employee-form">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="employeeName"
                        value={employee.employeeName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="employeeEmail"
                        value={employee.employeeEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="employeePhone"
                        value={employee.employeePhone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <input
                        type="text"
                        name="employeeDesignation"
                        value={employee.employeeDesignation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="employeeSalary"
                        value={employee.employeeSalary}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="employeeLocation"
                        value={employee.employeeLocation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="employeeImage"
                        value={employee.employeeImage}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn">Add Employee</button>
            </form>
        </div>
    );
}


