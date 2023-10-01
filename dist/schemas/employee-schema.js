"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.employeeSchema = new mongoose_1.default.Schema({
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 120,
    },
    phoneNumber: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
    },
    gender: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    photo: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
}, {
    _id: true,
    timestamps: true,
});
const Employee = mongoose_1.default.model("Employee", exports.employeeSchema);
exports.default = Employee;
//# sourceMappingURL=employee-schema.js.map