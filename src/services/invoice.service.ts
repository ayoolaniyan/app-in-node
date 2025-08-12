import { injectable } from "inversify";
import { Model } from "mongoose";
import { IInvoice, IPartialInvoiceWithId } from "../models/invoice.interface";
import { Invoice } from "../models/invoice.schema";
import { ICompany } from "../models/company.interface";
import { Company } from "../models/company.schema";
import { IInvoicePagination } from "../models/invoicePagination.interface";

@injectable()
export class InvoiceService {
    private invoiceModel: Model<IInvoice> = Invoice;
    private companyModel: Model<ICompany> = Company;

    public async createInvoice(data: IInvoice) {

        if (!data.companyName || !data.companyRegistrationNumber) {
            throw new Error("Company name and number are required");
        }

        const company = await this.companyModel.findOne({
            companyId: data.companyId,
            registrationNumber: data.companyRegistrationNumber
        });

        if (!company) {
            throw new Error(`Company ${data.companyName} with ${data.companyRegistrationNumber} not found.`);
        }

        const invoice = new this.invoiceModel({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            companyId: company._id
        });

        return await invoice.save();
    }

    public async getInvoicesById(_id: string) {
        const invoice = await this.invoiceModel.findById(_id);
        if (!invoice) {
            throw new Error(`Invoice with ID: ${_id} not found`);
        }
        return invoice;
    }

    public async updateInvoice(invoicesData: IPartialInvoiceWithId) {
        const { _id, ...updateData } = invoicesData;

        const updatedInvoice = await this.invoiceModel.findById(
            _id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedInvoice) {
            throw new Error(`Invoice with ID: ${_id} not found`);
        }
        return updatedInvoice;
    }

    public async deleteInvoice(_id: string) {
        const invoice = await this.invoiceModel.findById(_id);

        if (!invoice) {
            throw new Error(`Invoice with ID: ${_id} not found`);
        }

        const allowedStatus: Array<IInvoice["status"]> = ["paid", "cancelled", "draft"];
        if (!allowedStatus.includes(invoice.status)) {
            throw new Error(`Invoice with status: ${invoice.status}. Only "paid", "cancelled" and "draft" can be deleted.`);
        }

        const deletedInvoice = await this.invoiceModel.findByIdAndDelete(_id);

        if (!deletedInvoice) {
            throw new Error(`Invoice with ID ${_id} not found`);
        }


        return deletedInvoice;
    }

    public async getInvoices(pagination: IInvoicePagination) {
        return await this.invoiceModel
            .find()
            .limit(pagination.limit)
            .skip(pagination.page - 1)
            .sort({
                createdAt: pagination.order === "asc" ? 1 : -1,
            });
    }

    public async findInvoices(pagination: Partial<IInvoicePagination>): Promise<{ data: IInvoice[]; meta: {} }> {
        const invoices: IInvoice[] = await this.getInvoices({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc",
        });

        return {
            data: invoices,
            meta: {},
        };
    }
}
