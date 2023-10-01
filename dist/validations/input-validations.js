"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidations = exports.isObjectId = exports.Validations = void 0;
const express_validator_1 = require("express-validator");
const gender_1 = require("../enums/gender");
const mongoose_1 = require("mongoose");
exports.Validations = {
    firstName: () => (0, express_validator_1.check)("firstName")
        .not()
        .isEmpty()
        .withMessage("firstName is required!")
        .isAlpha()
        .withMessage("firstName must be alphabetic")
        .isLength({ min: 6, max: 10 })
        .withMessage("firstName length should be betweeen 6-10 characters"),
    lastName: () => (0, express_validator_1.check)("lastName")
        .not()
        .isEmpty()
        .withMessage("lastName is required!")
        .isAlpha()
        .withMessage("lastName must be alphabetic")
        .isLength({ min: 6, max: 10 })
        .withMessage("lastName length should be betweeen 6-10 characters"),
    email: () => (0, express_validator_1.check)("email")
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: false })
        .withMessage("Invalid email address!"),
    phoneNumber: () => (0, express_validator_1.check)("phoneNumber")
        .not()
        .isEmpty()
        .withMessage("phoneNumber is required!")
        .matches(/^\+94[0-9]{9}$/)
        .withMessage("Invalid Sri Lankan phone number format"),
    gender: () => (0, express_validator_1.check)("gender")
        .not()
        .isEmpty()
        .withMessage("gender is required")
        .isString()
        .withMessage("gender is not a String")
        .isIn([gender_1.Gender.FEMALE, gender_1.Gender.MALE])
        .withMessage("gender is not valid type"),
    empId: () => (0, express_validator_1.param)("empId")
        .not()
        .isEmpty()
        .withMessage("empId is required")
        .isString()
        .withMessage("empId is not a String")
        .custom((v) => isObjectId(v))
        .withMessage(`empId is not a valid mongoDb objectID`),
};
function isObjectId(v) {
    return mongoose_1.Types.ObjectId.isValid(v) && new mongoose_1.Types.ObjectId(v).toHexString() === v;
}
exports.isObjectId = isObjectId;
var InputValidations;
(function (InputValidations) {
    //add and employee validation rules
    function addEmployeeValidationRules() {
        return [
            exports.Validations.firstName(),
            exports.Validations.lastName(),
            exports.Validations.email(),
            exports.Validations.phoneNumber(),
            exports.Validations.gender(),
        ];
    }
    InputValidations.addEmployeeValidationRules = addEmployeeValidationRules;
    //update a employee validation rules
    function updateEmployeeValidationRules() {
        return [
            exports.Validations.empId(),
            exports.Validations.firstName(),
            exports.Validations.lastName(),
            exports.Validations.email(),
            exports.Validations.phoneNumber(),
            exports.Validations.gender(),
        ];
    }
    InputValidations.updateEmployeeValidationRules = updateEmployeeValidationRules;
    //delete a employee validation rules
    function deleteEmployeeValidationRules() {
        return [exports.Validations.empId()];
    }
    InputValidations.deleteEmployeeValidationRules = deleteEmployeeValidationRules;
})(InputValidations || (exports.InputValidations = InputValidations = {}));
//# sourceMappingURL=input-validations.js.map