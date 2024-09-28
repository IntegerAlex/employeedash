import * as express from 'express';
const { MongoClient , ServerApiVersion } = require('mongodb');
require('dotenv').config();
// or as an es module:
// import { MongoClient } from 'mongodb'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const url = process.env.MONGOURL;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function db() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const  db  =  await client.db("employeeDb").collection("employee")
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return db;
  }
  catch	(err) {
	  console.log(err);
	  return false;
  }

    // Ensures that the client will close when you finish/error


}
db().catch(console.dir);

class EmployeeController {

	getAllEmployees = async (req: express.Request, res: express.Response) => {
		const dbCollection = await db();
		const employees = await dbCollection.find({}).toArray();
		res.send(employees);
	}


	addEmployee = async (req: express.Request, res: express.Response) => {
		const employeeId = Math.floor(Math.random() * 1000);
		const employeeName = req.body.employeeName;
		const employeeEmail = req.body.employeeEmail;
		const employeePhone = req.body.employeePhone;
		const employeeSalary = req.body.employeeSalary;
		const employeeDesignation = req.body.employeeDesignation;
		const employeeLocation = req.body.employeeLocation;
		const employeeImage = req.body.employeeImage;
		if(employeeName && employeeEmail && employeePhone && employeeSalary && employeeDesignation && employeeLocation && employeeImage) {
			const dbCollection = await db();
			const employee = {
				employeeId: employeeId,
				employeeName: employeeName,
				employeeEmail: employeeEmail,
				employeePhone: employeePhone,
				employeeSalary: employeeSalary,
				employeeDesignation: employeeDesignation,
				employeeLocation: employeeLocation,
				employeeImage: employeeImage
			};
			await dbCollection.insertOne(employee);
			res.send('Employee added successfully');
		} 
	}



	updateEmployee = async (req: express.Request, res: express.Response) => {
    const employeeId = parseInt(req.params.id, 10); // Adjust if employeeId is not a number
    const { employeeName, employeeEmail, employeePhone, employeeSalary, employeeDesignation, employeeLocation } = req.body;
    
    console.log(req.body);
    
    if (employeeName && employeeEmail && employeePhone && employeeSalary && employeeDesignation && employeeLocation) {
        const dbCollection = await db();
        
        const employee = {
            employeeName,
            employeeEmail,
            employeePhone,
            employeeSalary,
            employeeDesignation,
            employeeLocation,
        };
        
        console.log(`Updating employee with ID: ${employeeId}`);
        
        const result = await dbCollection.updateOne({ employeeId }, { $set: employee });
        
        console.log(result);
        
        if (result.modifiedCount > 0) {
            res.send('Employee updated successfully');
        } else {
            res.send('No changes made to the employee');
        }
    } else {
        res.send('Please provide all the required fields');
    }
};



	deleteEmployee = async (req: express.Request, res: express.Response) => {
		const employeeId = req.params.id;
		if(employeeId) {
			const dbCollection = await db();
			await dbCollection.deleteOne({employeeId: employeeId});
			res.send('Employee deleted successfully');
		} 
	}

	getEmployeeById = async (req: express.Request, res: express.Response) => {
		const employeeId = req.params.id;
		if(employeeId) {
			const dbCollection = await db();
			const employee = await dbCollection.findOne({employeeId: parseInt(employeeId)});
			res.send(employee);
		} 
	}




}
export const employeeController = new EmployeeController();
