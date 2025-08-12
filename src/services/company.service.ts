import { injectable } from "inversify";
import { Model } from "mongoose";
import { ICompany, IPartialCompanyWithId } from "./../models/company.interface";
import { Company } from "./../models/company.schema";
import { ICompanyPagination } from "./../models/companyPagination.interface";


@injectable()
export class CompanyService {
    private companyModel: Model<ICompany> = Company;

    public async createCompany(data: ICompany) {
        return await new this.companyModel(data).save();
    }

    public async getCompanies(pagination: ICompanyPagination) {
        return await this.companyModel
            .find()
            .limit(pagination.limit)
            .skip(pagination.page - 1)
            .sort({
                createdAt: pagination.order === "asc" ? 1 : -1,
            });
    }

    public async getCompanyById(_id: string) {
        const comapny = await this.companyModel.findById(_id);
        if (!comapny) {
            throw new Error(`Comapny with ID ${_id} not found`);
        }
        return comapny;
    }

    public async updateCompany(companyData: IPartialCompanyWithId) {
        const { _id, ...updateData } = companyData;

        const updatedCompany = await this.companyModel.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            throw new Error(`company with id ${_id} inot found!`)
        }
        return updatedCompany;
    }

    public async deleteCompany(_id: string) {
        const deletedCompany = await this.companyModel.findByIdAndDelete(_id);

        if (!deletedCompany) {
            throw new Error(`Company with ID ${_id} not found`);
        }

        return deletedCompany;
    }

    public async findCompanies(pagination: Partial<ICompanyPagination>): Promise<{ data: ICompany[]; meta: {} }> {
        const companies: ICompany[] = await this.getCompanies({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc",
        });

        return {
            data: companies,
            meta: {},
        };

    }
}
