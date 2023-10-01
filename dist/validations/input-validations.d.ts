import { ValidationChain } from "express-validator";
export declare const Validations: {
    firstName: () => ValidationChain;
    lastName: () => ValidationChain;
    email: () => ValidationChain;
    phoneNumber: () => ValidationChain;
    gender: () => ValidationChain;
    empId: () => ValidationChain;
};
export declare function isObjectId(v: string): boolean;
export declare namespace InputValidations {
    function addEmployeeValidationRules(): ValidationChain[];
    function updateEmployeeValidationRules(): ValidationChain[];
    function deleteEmployeeValidationRules(): ValidationChain[];
}
