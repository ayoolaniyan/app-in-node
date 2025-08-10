import { checkSchema } from "express-validator";

export const updateCompanyValidator = checkSchema({
    name: {
        in: ["body"],
        optional: true,
        isString: true,
    },
    email: {
        in: ["body"],
        optional: true,
        isString: true,
    },
    phone: {
        in: ["body"],
        optional: true,
        isString: true,
    },
    address: {
        in: ["body"],
        optional: true,
    },
});
