import { NextFunction, Request, Response } from "express";
export declare namespace EmployeeController {
    function addEmployee(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    function listEmployees(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    function updateEmployee(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    function deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
