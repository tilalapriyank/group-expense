export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const ADD_EXPENSE_FAILED = 'ADD_EXPENSE_FAILED';

export const addExpense = (expense: any) => ({
    type: ADD_EXPENSE,
    payload: expense,
});

export const addExpenseSuccess = (expense: any) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expense,
});

export const addExpenseFailed = (error: any) => ({
    type: ADD_EXPENSE_FAILED,
    payload: error,
});
