import { inject } from "inversify";
import { ICompany } from "./../models/company.interface";
import { Response, Request } from "express";
import { matchedData } from "express-validator";
import { CompanyService } from "./../services/company.service";
import { Document } from "mongoose";

export class CompanyController {
    constructor(
        @inject(CompanyService) private companyService: CompanyService,
    ) { }

    public async handlePostCompany(
        req: Request<{}, {}, ICompany>,
        res: Response
    ): Promise<Document> {
        const validatedData: ICompany = matchedData(req);
        try {
            return await this.companyService.createCompany(validatedData);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleGetCompanies(
        req: Request,
        res: Response
    ): Promise<{ data: ICompany[]; meta: {} }> {
        const validatedData = matchedData(req);

        try {
            const companies: { data: ICompany[]; meta: {} } =
                await this.companyService.findCompanies(validatedData);
            return companies;
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleGetCompany(id: string): Promise<Document> {
        try {
            return await this.companyService.getCompanyById(id);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async updateCompany(id: string, updateData: Partial<ICompany>): Promise<Document> {
        try {
            return await this.companyService.updateCompany({
                _id: id,
                ...updateData
            });
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleDeleteCompany(id: string): Promise<Document> {
        try {
            return await this.companyService.deleteCompany(id);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }
}
