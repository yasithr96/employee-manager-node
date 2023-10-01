import { EmployeeController } from "../controllers/employee-controller";
import { InputValidations } from "../validations/input-validations";
const express = require("express");
const router = express.Router();

router.post(
  "/add",
  InputValidations.addEmployeeValidationRules(),
  EmployeeController.addEmployee
);

router.get("/list", EmployeeController.listEmployees);

router.put(
  "/edit/:empId",
  InputValidations.updateEmployeeValidationRules(),
  EmployeeController.updateEmployee
);

router.delete(
  "/delete/:empId",
  InputValidations.deleteEmployeeValidationRules(),
  EmployeeController.deleteEmployee
);

module.exports = router;
