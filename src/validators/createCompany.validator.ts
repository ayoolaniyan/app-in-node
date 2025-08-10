import { checkSchema } from "express-validator";

export const createCompanyValidator = checkSchema({
    name: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Company name is required",
        isString: true,
        isLength: {
            options: {

            },
            errorMessage: "Company name can not be more than 100 characters"
        },
        trim: true,
    },
    email: {
        in: ["body"],
        optional: true,
        errorMessage: "Company email is required",
        isString: true,
        trim: true,
    },
    phone: {
        in: ["body"],
        errorMessage: "Issue date must be a valid ISO8601 string",
        isString: true,
        trim: true
    },
    address: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Company address must be specified",
        trim: true
    },
});
