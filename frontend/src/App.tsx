import { useState } from 'react';
import './App.css';

function App() {
	const  [employee] = useState({
		id: 1,	
		name: 'John Doe',
		age: 30,
		salary: 50000,
		location: 'New York',
		designation: 'Software Engineer',
		image: 'https://jsonplaceholder.typicode.com/photos/1'
	});
  return (
    <>
      <div className="App">
        <div className="card">
          <div className="card-header">
            <img src={employee.image} alt={employee.name} className="employee-image" />
            <h2>{employee.name}</h2>
            <p className="designation">{employee.designation}</p>
            <p className="employee-id">ID: {employee.id}</p>
          </div>
          <div className="card-body">
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><strong>Location:</strong> {employee.location}</p>
	    <button className="btn">Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

