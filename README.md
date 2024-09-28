# Employee Management System

## Overview

The Employee Management System is a full-stack web application that allows users to view and manage employee records. Users can add, edit, view, and delete employee data using this platform. It includes a backend API for managing employee data and a responsive frontend for interacting with the system.

### Key Features

- Display employee cards with detailed information (Name, Email, Phone, Designation, Salary, Location, etc.).
- Add new employee records via a form.
- Edit existing employee details.
- Delete employee records.
- Integrated with a backend API.
- Responsive design with dark theme support.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend Setup (API)](#backend-setup-api)
- [Frontend Setup (UI)](#frontend-setup-ui)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)
- [License](#license)

## Technologies Used

### Backend

- **Node.js** with **Express.js**: For building the API server.
- **MongoDB**: To store employee data.
- **RESTful API**: To perform CRUD (Create, Read, Update, Delete) operations on employee data.
- **CORS Middleware**: To enable communication between frontend and backend.

### Frontend

- **React.js** with **TypeScript**: For building a dynamic and interactive user interface.
- **CSS**: For styling the components and ensuring responsive design.
- **Fetch API**: For making HTTP requests from the frontend to the backend.
- **Responsive Design**: Ensures the application is mobile-friendly and adapts well to different screen sizes.

## Project Structure

The project is divided into two main parts:

- **Frontend** (React + TypeScript)
- **Backend** (Node.js + Express)
```
.
├── backend/
│   ├── controllers/
│   ├── index.js (Main entry point for the server)
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── Add.tsx
│   │   ├── index.tsx
│   └── package.json
└── README.md
```

## Key Components

- **App.tsx**: Main component that fetches and displays employee data as cards.
- **Add.tsx**: A form component for adding new employees.
- **Edit.tsx**: Inline editing functionality for employee details.

### CSS Styling

- The app uses **Flexbox** for responsive design, ensuring the employee cards stack and scale properly.
- Dark theme is applied for user-friendly interaction, especially in low-light environments.
- Styling files are located in `src/App.css`.

## API Endpoints

### Fetch All Employees

    **Request**: `GET /api/v1/employees`

    ```json

    {
        "employeeId": 1,
        "employeeName": "John Doe",
        "employeeEmail": "john@example.com",
        "employeePhone": "123-456-7890",
        "employeeDesignation": "Software Engineer",
        "employeeSalary": 70000,
        "employeeLocation": "New York",
        "employeeImage": "https://via.placeholder.com/100"
    },
    ...


### Add New employees

    **Request**: `POST /api/v1/employees`
    ```json
    {
    "employeeName": "Jane Doe",
    "employeeEmail": "jane@example.com",
    "employeePhone": "987-654-3210",
    "employeeDesignation": "HR Manager",
    "employeeSalary": 65000,
    "employeeLocation": "Los Angeles",
    "employeeImage": "https://via.placeholder.com/100"
}
```

### Update Employee details
    
    **Request**: `PUT /api/v1/employees/:id`

    ```json
{
    "employeeName": "John Smith",
    "employeeEmail": "johnsmith@example.com",
    "employeePhone": "111-222-3333",
    "employeeDesignation": "Lead Developer",
    "employeeSalary": 85000,
    "employeeLocation": "San Francisco"
}
```


### Delete Employee

    **Request**: `DELETE /api/v1/employee/:id`

