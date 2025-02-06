import {
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_FAILURE,
    FETCH_EXPENSE_SUCCESS,
    FETCH_EXPENSE_FAILURE,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
} from "../actions/expenseActions";
import { Expense } from "../../types/expenseTypes"; // Update with the correct type

interface ExpenseState {
    expenses: Expense[];
    loading: boolean;
    error?: string;
}

const initialState: ExpenseState = {
    expenses: [],
    loading: false,
    error: undefined,
};

const expenseReducer = (state = initialState, action: any): ExpenseState => {
    switch (action.type) {
        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };

        case ADD_EXPENSE_FAILURE:
            return { ...state, error: action.payload };

        case FETCH_EXPENSE_SUCCESS:
            return { ...state, expenses: action.payload, loading: false, error: undefined };

        case FETCH_EXPENSE_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.filter((exp) => exp.id !== action.payload.expenseId),
            };

        case DELETE_EXPENSE_FAILURE:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default expenseReducer;
