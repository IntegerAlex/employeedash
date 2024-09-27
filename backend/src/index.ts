import express from 'express';
import {employeeController} from '../controllers/employeeControllers'
import  cors from 'cors';


const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/v1/employees', employeeController.getAllEmployees);
server.get('/api/v1/employee/:id', employeeController.getEmployeeById);
server.post('/api/v1/employee', employeeController.addEmployee);
server.put('/api/v1/employee/:id', employeeController.updateEmployee);
server.delete('/api/v1/employee', employeeController.deleteEmployee);


server.listen(8080, () => {
	console.log('Server is running on port 8080');
});
