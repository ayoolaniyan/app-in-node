import { inject } from "inversify";
import { InvoiceService } from "../services/invoice.service";
import { IInvoice } from "../models/invoice.interface";
import { matchedData } from "express-validator";
import { Response, Request } from "express";
import { Document } from "mongoose";

export class InvoiceController {
    constructor(
        @inject(InvoiceService) private invoiceService: InvoiceService,
    ) { }

    public async handlePostInvoice(
        req: Request<{}, {}, IInvoice>,
        res: Response
    ): Promise<Document> {

        const validatedData: IInvoice = matchedData(req);
        try {
            return await this.invoiceService.createInvoice(validatedData);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleGetInvoices(
        req: Request,
        res: Response
    ): Promise<{ data: IInvoice[]; meta: {} }> {
        const validatedData = matchedData(req);

        try {
            const invoices: { data: IInvoice[]; meta: {} } =
                await this.invoiceService.findInvoices(validatedData);
            return invoices;
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleGetInvoice(id: string): Promise<Document> {
        try {
            return await this.invoiceService.getInvoicesById(id);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async updateInvoice(id: string, updateData: Partial<IInvoice>): Promise<Document> {
        try {
            return await this.invoiceService.updateInvoice({
                _id: id,
                ...updateData
            });
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    public async handleDeleteInvoice(id: string): Promise<Document> {
        try {
            return await this.invoiceService.deleteInvoice(id);
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }
}
