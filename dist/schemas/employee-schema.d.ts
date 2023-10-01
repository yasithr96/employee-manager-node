import mongoose from "mongoose";
import { IEmployee } from "../models/employee-model";
export declare const employeeSchema: mongoose.Schema<IEmployee, mongoose.Model<IEmployee, any, any, any, mongoose.Document<unknown, any, IEmployee> & IEmployee & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IEmployee, mongoose.Document<unknown, {}, mongoose.FlatRecord<IEmployee>> & mongoose.FlatRecord<IEmployee> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const Employee: mongoose.Model<IEmployee, {}, {}, {}, mongoose.Document<unknown, {}, IEmployee> & IEmployee & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Employee;
