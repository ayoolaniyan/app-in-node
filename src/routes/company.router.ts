import { inject } from "inversify";
import express, { Request, Response, Router } from "express";
import { CompanyController } from "./../controllers/company.controller";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { createCompanyValidator } from "./../validators/createCompany.validator";
import { ICompany } from "./../models/company.interface";
import { updateCompanyValidator } from "../validators/updateCompany.validator";

export class CompanyRouter {
    public router: Router;

    constructor(
        @inject(CompanyController) private companyController: CompanyController
    ) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post(
            "/create",
            createCompanyValidator,
            async (req: Request<{}, {}, ICompany>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    const newCompany = await this.companyController.handlePostCompany(req, res);
                    res.status(StatusCodes.CREATED).json(newCompany);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            }
        );

        this.router.put(
            "/update/:id",
            updateCompanyValidator,
            async (req: Request<{ id: string }, {}, Partial<ICompany>>, res: Response) => {
                const result = validationResult(req);
                if (result.isEmpty()) {
                    try {
                        const updateCompany = await this.companyController.updateCompany(req.params.id, req.body);
                        res.status(StatusCodes.OK).json(updateCompany);
                    } catch (error: any) {
                        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
                    }
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json(result.array());
                }
            });

        this.router.get("/", async (req: Request, res: Response) => {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const allInvoices = await this.companyController.handleGetCompanies(req, res);
                res.json(allInvoices);
            } else {
                res.status(StatusCodes.BAD_REQUEST).json(result.array());
            }

        });

        this.router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
            const result = validationResult(req);
            if (result.isEmpty()) {
                try {
                    const company = await this.companyController.handleGetCompany(req.params.id);
                    res.status(StatusCodes.OK).json(company);
                } catch (error: any) {
                    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json(result.array());
            }

        });

        this.router.delete("/delete/:id", async (req: Request<{ id: string }>, res: Response) => {
            try {
                const deletedCompany = await this.companyController.handleDeleteCompany(req.params.id);
                res.status(StatusCodes.OK).json({
                    message: "Company deleted succesfully",
                    company: deletedCompany
                });
            } catch (error: any) {
                res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
            }
        });

    }
}
