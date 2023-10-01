import { Types } from "mongoose";
import { DEmployee, IEmployee } from "../models/employee-model";
import Employee from "../schemas/employee-schema";

export namespace EmployeeDao {
  //checks if the employee already exists in the DB
  export async function employeeExistence(email: string) {
    const res = await Employee.findOne({ email: email });
    return res;
  }

  //adds a new employee to the system
  export async function addEmployee(
    employeeData: DEmployee
  ): Promise<IEmployee> {
    const res: IEmployee = new Employee(employeeData);
    return await res.save();
  }

  //get all employees in the system
  export async function fetchAllEmployees() {
    const res = await Employee.find();
    return res;
  }

  //update an employee
  export async function updateEmployee(
    employeeId: Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: string
  ): Promise<IEmployee> {
    let res: IEmployee = await Employee.findOneAndUpdate(
      { _id: employeeId },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
        },
      },
      { new: true }
    );

    return res;
  }

  export async function deleteEmployee(empId: Types.ObjectId) {
    const res = await Employee.deleteOne({ _id: empId });
    return res;
  }
}
