export interface Expense {
    _id:string;
    id: string;
    description: string;
    amount: number;
    paidBy: any;
    groupId?: string;
    splitDetails: { userId: any; shareAmount: number }[];
    createdAt?: string;
}
