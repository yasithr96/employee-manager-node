import * as mongoose from "mongoose";
interface CommonAttributes {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    photo: string;
}
export interface DEmployee extends CommonAttributes {
}
export interface IEmployee extends CommonAttributes, mongoose.Document {
}
export {};
