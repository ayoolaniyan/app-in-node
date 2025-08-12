export interface IInvoice {
    invoiceNumber: string;
    description: string;
    issueDate: Date;
    dueDate: Date;
    status: "paid" | "draft" | "overdue" | "cancelled" | "pending";
    amount: number;
    companyId: string;
    companyName: string;
    companyRegistrationNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPartialInvoiceWithId extends Partial<IInvoice> {
    _id: string;
}
