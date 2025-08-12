import { checkSchema } from "express-validator";

export const updateInvoiceValidator = checkSchema({
    invoiceNumber: {
        in: ["body"],
        optional: true,
    },
    issueDate: {
        in: ["body"],
        optional: true,
    },
    dueDate: {
        in: ["body"],
        optional: true,
    },
    companyName: {
        in: ["body"],
        optional: true,
    },
    companyRegistrationNumber: {
        in: ["body"],
        optional: true,
    },
});
