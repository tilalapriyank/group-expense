export interface Expense {
    id: string;
    description: string;
    amount: number;
    paidBy: any;
    groupId?: string;
    splitDetails: { userId: string; shareAmount: number }[];
    createdAt?: string;
}
