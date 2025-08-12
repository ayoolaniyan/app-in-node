import { model, Model, Schema } from "mongoose";
import { IInvoice } from "./invoice.interface";

const invoiceSchema: Schema<IInvoice> = new Schema(
    {
        invoiceNumber: {
            type: String,
            required: [true, "Invoice number is required"],
            trim: true,
            maxlength: [100, "Invoice number can not be more than 100 characters."]
        },
        description: {
            type: String,
            trim: true,
        },
        issueDate: {
            type: Date,
            trim: true
        },
        dueDate: {
            type: Date,
            trim: true
        },
        status: {
            type: String,
            required: [true, "Invoice status is required"],
            trim: true
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            trim: true
        },
        companyName: {
            type: String,
            required: [true, "Comapny name is required"],
            trim: true
        },
        companyRegistrationNumber: {
            type: String,
            required: [true, "Company registration number is required"],
            trim: true
        }
    },
    { timestamps: true }
);

export const Invoice: Model<IInvoice> = model("Invoice", invoiceSchema);
