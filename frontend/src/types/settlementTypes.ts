export interface Settlement {
    _id?: string;
    groupId: string;
    payer: string;
    payee: string;
    amount: number;
    status: "pending" | "completed";
    createdAt?: Date;
    updatedAt?: Date;
}
