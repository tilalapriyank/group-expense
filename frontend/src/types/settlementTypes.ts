export interface Settlement {
    _id?: string;
    groupId: string;
    payer: any;
    payee: any;
    amount: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
