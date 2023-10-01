import { NextFunction, Request, Response } from "express";
import { EmployeeDao } from "../dao/employee-dao";
import { DEmployee, IEmployee } from "../models/employee-model";
import axios from "axios";
import { Types } from "mongoose";
import { validationResult } from "express-validator";

export namespace EmployeeController {
  //endpoint to create employee
  export async function addEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0]["msg"] });
      }

      //gets a random user
      let photoUrl;
      try {
        const response = await axios("https://randomuser.me/api/");
        photoUrl = response.data.results[0].picture.large;
      } catch (err) {
        photoUrl = "https://randomuser.me/api/portraits/men/27.jpg";
      }

      const { firstName, lastName, email, phoneNumber, gender } = req.body;

      //check if the employee exists
      const employeeExists = await EmployeeDao.employeeExistence(email);
      if (employeeExists) {
        return res.status(400).send({ error: "This Email is Already in Use!" });
      }

      const newEmployee: DEmployee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        photo: photoUrl,
      };

      //add new employee to the system
      const addEmployee = await EmployeeDao.addEmployee(newEmployee);
      if (!addEmployee) {
        return res
          .status(500)
          .send({ error: "Failed to Create New Employee!" });
      }

      return res.send({
        status: 200,
        data: addEmployee,
      });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  //endpoint to list all the employees
  export async function listEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //fetch all the employees from the db
      const getAllEmployees = await EmployeeDao.fetchAllEmployees();
      if (!getAllEmployees) {
        return res.status(500).send({ error: "Failed to Fetch Employees!" });
      }

      return res.send({
        status: 200,
        data: getAllEmployees,
      });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  //endpoint to update a single employee
  export async function updateEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0]["msg"] });
      }

      const { empId } = req.params;
      const { firstName, lastName, email, phoneNumber, gender } = req.body;

      //checks the email before updating to make sure there is no user registered from the same email
      const checkEmail = await EmployeeDao.employeeExistence(email);
      if (checkEmail) {
        if (checkEmail._id.toString() !== empId.toString()) {
          return res
            .status(500)
            .send({ error: "This Email is associatied with another account" });
        }
      }

      //update employee data
      const updateEmployeeData = await EmployeeDao.updateEmployee(
        new Types.ObjectId(empId),
        firstName,
        lastName,
        email,
        phoneNumber,
        gender
      );
      if (!updateEmployeeData) {
        return res.status(500).send({ error: "Failed to Update Employee!" });
      }

      return res.send({
        status: 200,
        data: updateEmployeeData,
      });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  //endpoint to delete a single employee
  export async function deleteEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { empId } = req.params;

      //delete the employee
      const deleteEmployee = await EmployeeDao.deleteEmployee(
        new Types.ObjectId(empId)
      );
      if (deleteEmployee.deletedCount === 0) {
        return res.status(500).send({ error: "Failed to Delete Employee!" });
      }

      return res.send({
        status: 200,
        data: "Successfully Deleted Employee",
      });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }
}
