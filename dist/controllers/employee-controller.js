"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const employee_dao_1 = require("../dao/employee-dao");
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = require("mongoose");
const express_validator_1 = require("express-validator");
var EmployeeController;
(function (EmployeeController) {
    //endpoint to create employee
    async function addEmployee(req, res, next) {
        try {
            //input validation
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ error: errors.array()[0]["msg"] });
            }
            //gets a random user
            let photoUrl;
            try {
                const response = await (0, axios_1.default)("https://randomuser.me/api/");
                photoUrl = response.data.results[0].picture.large;
            }
            catch (err) {
                photoUrl = "https://randomuser.me/api/portraits/men/27.jpg";
            }
            const { firstName, lastName, email, phoneNumber, gender } = req.body;
            //check if the employee exists
            const employeeExists = await employee_dao_1.EmployeeDao.employeeExistence(email);
            if (employeeExists) {
                return res.status(400).send({ error: "This Email is Already in Use!" });
            }
            const newEmployee = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                gender: gender,
                photo: photoUrl,
            };
            //add new employee to the system
            const addEmployee = await employee_dao_1.EmployeeDao.addEmployee(newEmployee);
            if (!addEmployee) {
                return res
                    .status(500)
                    .send({ error: "Failed to Create New Employee!" });
            }
            return res.send({
                status: 200,
                data: addEmployee,
            });
        }
        catch (err) {
            return res.status(500).send({ error: err });
        }
    }
    EmployeeController.addEmployee = addEmployee;
    //endpoint to list all the employees
    async function listEmployees(req, res, next) {
        try {
            //fetch all the employees from the db
            const getAllEmployees = await employee_dao_1.EmployeeDao.fetchAllEmployees();
            if (!getAllEmployees) {
                return res.status(500).send({ error: "Failed to Fetch Employees!" });
            }
            return res.send({
                status: 200,
                data: getAllEmployees,
            });
        }
        catch (err) {
            return res.status(500).send({ error: err });
        }
    }
    EmployeeController.listEmployees = listEmployees;
    //endpoint to update a single employee
    async function updateEmployee(req, res, next) {
        try {
            //input validation
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ error: errors.array()[0]["msg"] });
            }
            const { empId } = req.params;
            const { firstName, lastName, email, phoneNumber, gender } = req.body;
            //checks the email before updating to make sure there is no user registered from the same email
            const checkEmail = await employee_dao_1.EmployeeDao.employeeExistence(email);
            if (checkEmail) {
                if (checkEmail._id.toString() !== empId.toString()) {
                    return res
                        .status(500)
                        .send({ error: "This Email is associatied with another account" });
                }
            }
            //update employee data
            const updateEmployeeData = await employee_dao_1.EmployeeDao.updateEmployee(new mongoose_1.Types.ObjectId(empId), firstName, lastName, email, phoneNumber, gender);
            if (!updateEmployeeData) {
                return res.status(500).send({ error: "Failed to Update Employee!" });
            }
            return res.send({
                status: 200,
                data: updateEmployeeData,
            });
        }
        catch (err) {
            return res.status(500).send({ error: err });
        }
    }
    EmployeeController.updateEmployee = updateEmployee;
    //endpoint to delete a single employee
    async function deleteEmployee(req, res, next) {
        try {
            const { empId } = req.params;
            //delete the employee
            const deleteEmployee = await employee_dao_1.EmployeeDao.deleteEmployee(new mongoose_1.Types.ObjectId(empId));
            if (deleteEmployee.deletedCount === 0) {
                return res.status(500).send({ error: "Failed to Delete Employee!" });
            }
            return res.send({
                status: 200,
                data: "Successfully Deleted Employee",
            });
        }
        catch (err) {
            return res.status(500).send({ error: err });
        }
    }
    EmployeeController.deleteEmployee = deleteEmployee;
})(EmployeeController || (exports.EmployeeController = EmployeeController = {}));
//# sourceMappingURL=employee-controller.js.map