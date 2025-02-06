export interface Expense {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
    groupId?: string;
    splitDetails: { userId: string; shareAmount: number }[];
    createdAt?: string;
}
