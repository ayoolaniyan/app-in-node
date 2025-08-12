import { checkSchema } from "express-validator";

export const createInvoiceValidator = checkSchema({
    invoiceNumber: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice number is required",
        isNumeric: true,
        trim: true,
    },
    issueDate: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice issue date is required",
        trim: true,
    },
    dueDate: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice due date is required",
        trim: true
    },
    status: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice status is required",
        trim: true
    },
    amount: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Invoice amount is required",
        trim: true
    },
    companyName: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Company name must be specified",
        trim: true
    },
    companyRegistrationNumber: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Company registration number must be specified",
        trim: true
    },
});
