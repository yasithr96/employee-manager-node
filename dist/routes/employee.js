"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_controller_1 = require("../controllers/employee-controller");
const input_validations_1 = require("../validations/input-validations");
const express = require("express");
const router = express.Router();
router.post("/add", input_validations_1.InputValidations.addEmployeeValidationRules(), employee_controller_1.EmployeeController.addEmployee);
router.get("/list", employee_controller_1.EmployeeController.listEmployees);
router.put("/edit/:empId", input_validations_1.InputValidations.updateEmployeeValidationRules(), employee_controller_1.EmployeeController.updateEmployee);
router.delete("/delete/:empId", input_validations_1.InputValidations.deleteEmployeeValidationRules(), employee_controller_1.EmployeeController.deleteEmployee);
module.exports = router;
//# sourceMappingURL=employee.js.map