
export interface ICompany {
    name: string;
    registrationNumber: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPartialCompanyWithId extends Partial<ICompany> {
    _id: string;
}
