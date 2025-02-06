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

const getAuthToken = () => localStorage.getItem("token");

function* addExpenseSaga(action: any) {
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

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/expenses/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedExpense),
            }).then((res) => res.json())
        );

        if (response && response.message == "Expense added successfully") {
            yield put(addExpenseSuccess(response.expense));
            message.success("Expense added successfully.");
            yield put(fetchExpensesRequest(groupId));
        } else {
            yield put(addExpenseFailure("Failed to add expense"));
        }
    } catch (error) {
        yield put(addExpenseFailure(error.message));
    }
}

function* fetchExpensesSaga(action: any) {
    try {
        const groupId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/expenses/${groupId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message == "Expense get successfully") {
            yield put(fetchExpensesSuccess(response.expenses));
        } else {
            yield put(fetchExpensesFailure("Failed to fetch expenses"));
        }
    } catch (error) {
        yield put(fetchExpensesFailure(error.message));
    }
}

function* deleteExpenseSaga(action: any) {
    try {
        const { expenseId, groupId } = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/expenses/${expenseId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response && response.message=="Expense deleted successfully") {
            yield put(deleteExpenseSuccess(expenseId, groupId));
            yield put(fetchExpensesRequest(groupId));
            message.success("Expense deleted successfull.");
        } else {
            yield put(deleteExpenseFailure("Failed to delete expense"));
            message.success(response.message);
        }
    } catch (error) {
        yield put(deleteExpenseFailure(error.message));
    }
}

export function* watchExpenseActions() {
    yield takeEvery(ADD_EXPENSE_REQUEST, addExpenseSaga);
    yield takeEvery(FETCH_EXPENSE_REQUEST, fetchExpensesSaga);
    yield takeEvery(DELETE_EXPENSE_REQUEST, deleteExpenseSaga);
}
