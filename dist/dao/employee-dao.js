"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDao = void 0;
const employee_schema_1 = __importDefault(require("../schemas/employee-schema"));
var EmployeeDao;
(function (EmployeeDao) {
    //checks if the employee already exists in the DB
    async function employeeExistence(email) {
        const res = await employee_schema_1.default.findOne({ email: email });
        return res;
    }
    EmployeeDao.employeeExistence = employeeExistence;
    //adds a new employee to the system
    async function addEmployee(employeeData) {
        const res = new employee_schema_1.default(employeeData);
        return await res.save();
    }
    EmployeeDao.addEmployee = addEmployee;
    //get all employees in the system
    async function fetchAllEmployees() {
        const res = await employee_schema_1.default.find();
        return res;
    }
    EmployeeDao.fetchAllEmployees = fetchAllEmployees;
    //update an employee
    async function updateEmployee(employeeId, firstName, lastName, email, phoneNumber, gender) {
        let res = await employee_schema_1.default.findOneAndUpdate({ _id: employeeId }, {
            $set: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                gender: gender,
            },
        }, { new: true });
        return res;
    }
    EmployeeDao.updateEmployee = updateEmployee;
    async function deleteEmployee(empId) {
        const res = await employee_schema_1.default.deleteOne({ _id: empId });
        return res;
    }
    EmployeeDao.deleteEmployee = deleteEmployee;
})(EmployeeDao || (exports.EmployeeDao = EmployeeDao = {}));
//# sourceMappingURL=employee-dao.js.map