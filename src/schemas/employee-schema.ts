import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../models/employee-model";

export const employeeSchema = new mongoose.Schema<IEmployee>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 120,
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    gender: {
      type: Schema.Types.String,
      required: true,
    },
    photo: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
export default Employee;
