import { message } from 'antd';
import { call, put, takeEvery } from "redux-saga/effects";
import {
    ADD_EXPENSE_REQUEST,
    FETCH_EXPENSE_REQUEST,
    DELETE_EXPENSE_REQUEST,
    addExpenseSuccess,
    addExpenseFailure,
    fetchExpensesSuccess,
    fetchExpensesFailure,
    deleteExpenseSuccess,
    deleteExpenseFailure,
    fetchExpensesRequest
} from "../actions/expenseActions";
import { API_ENDPOINTS } from "../../services/config";

const getAuthToken = () => localStorage.getItem("token");

// ✅ Added explicit return type: Generator<any, void, any>
function* addExpenseSaga(action: any): Generator<any, void, any> {
    try {
        const { expense, groupId } = action.payload;
        const { amount, members, ...rest } = expense;

        if (!members || members.length === 0) {
            yield put(addExpenseFailure("No members selected for splitting."));
            return;
        }

        const splitAmount = parseFloat((amount / members.length).toFixed(2));

        const splitDetails = members.map((userId: string) => ({
            userId,
            shareAmount: splitAmount,
        }));

        const updatedExpense = { ...rest, amount, groupId, splitDetails };

        const token = getAuthToken();

        // ✅ Cast response to expected type
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.EXPENSES.BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedExpense),
            }).then((res) => res.json())
        );

        if (response && response.message === "Expense added successfully") {
            yield put(addExpenseSuccess(response.expense));
            message.success("Expense added successfully.");
            yield put(fetchExpensesRequest(groupId));
        } else {
            yield put(addExpenseFailure("Failed to add expense"));
        }
    } catch (error) {
        // ✅ Handle error properly
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        yield put(addExpenseFailure(errorMessage));
    }
}

// ✅ Added explicit return type
function* fetchExpensesSaga(action: any): Generator<any, void, any> {
    try {
        const groupId = action.payload;
        const token = getAuthToken();

        // ✅ Cast response to expected type
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.EXPENSES.GROUP(groupId), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "Expense get successfully") {
            yield put(fetchExpensesSuccess(response.expenses));
        } else {
            yield put(fetchExpensesFailure("Failed to fetch expenses"));
        }
    } catch (error) {
        // ✅ Handle error properly
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        yield put(fetchExpensesFailure(errorMessage));
    }
}

// ✅ Added explicit return type
function* deleteExpenseSaga(action: any): Generator<any, void, any> {
    try {
        const { expenseId, groupId } = action.payload;
        const token = getAuthToken();

        // ✅ Cast response to expected type
        const response: any = yield call(() =>
            fetch(API_ENDPOINTS.EXPENSES.DELETE(expenseId), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response && response.message === "Expense deleted successfully") {
            yield put(deleteExpenseSuccess(expenseId, groupId));
            yield put(fetchExpensesRequest(groupId));
            message.success("Expense deleted successfully.");
        } else {
            yield put(deleteExpenseFailure("Failed to delete expense"));
            message.error(response.message);
        }
    } catch (error) {
        // ✅ Handle error properly
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        yield put(deleteExpenseFailure(errorMessage));
    }
}

export function* watchExpenseActions() {
    yield takeEvery(ADD_EXPENSE_REQUEST, addExpenseSaga);
    yield takeEvery(FETCH_EXPENSE_REQUEST, fetchExpensesSaga);
    yield takeEvery(DELETE_EXPENSE_REQUEST, deleteExpenseSaga);
}
