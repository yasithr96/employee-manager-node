import { ValidationChain, check, param } from "express-validator";
import { Gender } from "../enums/gender";
import { Types } from "mongoose";

export const Validations = {
  firstName: () =>
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("firstName is required!")
      .isAlpha()
      .withMessage("firstName must be alphabetic")
      .isLength({ min: 6, max: 10 })
      .withMessage("firstName length should be betweeen 6-10 characters"),
  lastName: () =>
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("lastName is required!")
      .isAlpha()
      .withMessage("lastName must be alphabetic")
      .isLength({ min: 6, max: 10 })
      .withMessage("lastName length should be betweeen 6-10 characters"),
  email: () =>
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .withMessage("Invalid email address!"),
  phoneNumber: () =>
    check("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("phoneNumber is required!")
      .matches(/^\+94[0-9]{9}$/)
      .withMessage("Invalid Sri Lankan phone number format"),
  gender: () =>
    check("gender")
      .not()
      .isEmpty()
      .withMessage("gender is required")
      .isString()
      .withMessage("gender is not a String")
      .isIn([Gender.FEMALE, Gender.MALE])
      .withMessage("gender is not valid type"),
  empId: () =>
    param("empId")
      .not()
      .isEmpty()
      .withMessage("empId is required")
      .isString()
      .withMessage("empId is not a String")
      .custom((v) => isObjectId(v))
      .withMessage(`empId is not a valid mongoDb objectID`),
};

export function isObjectId(v: string): boolean {
  return Types.ObjectId.isValid(v) && new Types.ObjectId(v).toHexString() === v;
}

export namespace InputValidations {
  //add and employee validation rules
  export function addEmployeeValidationRules(): ValidationChain[] {
    return [
      Validations.firstName(),
      Validations.lastName(),
      Validations.email(),
      Validations.phoneNumber(),
      Validations.gender(),
    ];
  }

  //update a employee validation rules
  export function updateEmployeeValidationRules(): ValidationChain[] {
    return [
      Validations.empId(),
      Validations.firstName(),
      Validations.lastName(),
      Validations.email(),
      Validations.phoneNumber(),
      Validations.gender(),
    ];
  }

  //delete a employee validation rules
  export function deleteEmployeeValidationRules(): ValidationChain[] {
    return [Validations.empId()];
  }
}
