export const ADD_EXPENSE_REQUEST = "ADD_EXPENSE_REQUEST";
export const ADD_EXPENSE_SUCCESS = "ADD_EXPENSE_SUCCESS";
export const ADD_EXPENSE_FAILURE = "ADD_EXPENSE_FAILURE";

export const FETCH_EXPENSE_REQUEST = "FETCH_EXPENSE_REQUEST";
export const FETCH_EXPENSE_SUCCESS = "FETCH_EXPENSE_SUCCESS";
export const FETCH_EXPENSE_FAILURE = "FETCH_EXPENSE_FAILURE";

export const DELETE_EXPENSE_REQUEST = "DELETE_EXPENSE_REQUEST";
export const DELETE_EXPENSE_SUCCESS = "DELETE_EXPENSE_SUCCESS";
export const DELETE_EXPENSE_FAILURE = "DELETE_EXPENSE_FAILURE";

export const addExpenseRequest = (expense: any, groupId: string) => ({
    type: ADD_EXPENSE_REQUEST,
    payload: { expense, groupId },
});

export const addExpenseSuccess = (expense: any) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expense,
});

export const addExpenseFailure = (error: string) => ({
    type: ADD_EXPENSE_FAILURE,
    payload: error,
});

export const fetchExpensesRequest = (groupId: string) => ({
    type: FETCH_EXPENSE_REQUEST,
    payload: groupId,
});

export const fetchExpensesSuccess = (expenses: any) => ({
    type: FETCH_EXPENSE_SUCCESS,
    payload: expenses,
});

export const fetchExpensesFailure = (error: any) => ({
    type: FETCH_EXPENSE_FAILURE,
    payload: error,
});

export const deleteExpenseRequest = (expenseId: string, groupId: string) => ({
    type: DELETE_EXPENSE_REQUEST,
    payload: { expenseId, groupId },
});

export const deleteExpenseSuccess = (expenseId: string, groupId: string) => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload: { expenseId, groupId },
});

export const deleteExpenseFailure = (error: string) => ({
    type: DELETE_EXPENSE_FAILURE,
    payload: error,
});
