import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    ADD_SETTLEMENT_REQUEST,
    ADD_BULK_SETTLEMENT_REQUEST,
    FETCH_SETTLEMENT_REQUEST,
    FETCH_SETTLEMENTS_BY_PAYER_REQUEST,
    FETCH_SETTLEMENTS_BY_PAYEE_REQUEST,
    DELETE_SETTLEMENT_REQUEST,
    addSettlementSuccess,
    addSettlementFailure,
    addBulkSettlementSuccess,
    addBulkSettlementFailure,
    fetchSettlementsSuccess,
    fetchSettlementsFailure,
    fetchSettlementsByPayerSuccess,
    fetchSettlementsByPayerFailure,
    fetchSettlementsByPayeeSuccess,
    fetchSettlementsByPayeeFailure,
    deleteSettlementSuccess,
    deleteSettlementFailure,
    fetchSettlementsRequest,
} from "../actions/settlementActions";

const getAuthToken = () => localStorage.getItem("token");

function* addSettlementSaga(action: any) {
    try {
        const { settlement, groupId } = action.payload;

        if (!settlement.payer || !settlement.payee || settlement.amount <= 0) {
            yield put(addSettlementFailure("Invalid settlement data."));
            message.error("Invalid settlement data.");
            return;
        }

        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...settlement, groupId }),
            }).then((res) => res.json())
        );

        if (response && response.message === "Settlement created successfully") {
            yield put(addSettlementSuccess(response.settlement));
            message.success("Settlement added successfully.");
            yield put(fetchSettlementsRequest(groupId));
        } else {
            yield put(addSettlementFailure(response.message || "Failed to add settlement"));
            message.error(response.message || "Failed to add settlement");
        }
    } catch (error) {
        yield put(addSettlementFailure(error.message));
        message.error(error.message);
    }
}

function* addBulkSettlementSaga(action: any) {
    try {
        const { settlementsDetails } = action.payload;
        console.log(settlementsDetails);
        if (!settlementsDetails || settlementsDetails.length === 0) {
            yield put(addBulkSettlementFailure("No settlements provided."));
            message.error("No settlements provided.");
            return;
        }

        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(settlementsDetails),
            }).then((res) => res.json())
        );

        if (response && response.message === "Bulk settlements created successfully") {
            yield put(addBulkSettlementSuccess(response.settlements));
            message.success("Bulk settlements added successfully.");
        } else {
            yield put(addBulkSettlementFailure(response.message || "Failed to add bulk settlements"));
            message.error(response.message || "Failed to add bulk settlements");
        }
    } catch (error) {
        yield put(addBulkSettlementFailure(error.message));
        message.error(error.message);
    }
}

function* fetchSettlementsSaga(action: any) {
    try {
        const groupId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/group/${groupId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "Settlements fetched successfully") {
            yield put(fetchSettlementsSuccess(response.settlements));
        } else {
            yield put(fetchSettlementsFailure("Failed to fetch settlements"));
        }
    } catch (error) {
        yield put(fetchSettlementsFailure(error.message));
        message.error(error.message);
    }
}

function* fetchSettlementsByPayerSaga(action: any) {
    try {
        const payerId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/payer/${payerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "Settlements fetched successfully") {
            yield put(fetchSettlementsByPayerSuccess(response.settlements));
        } else {
            yield put(fetchSettlementsByPayerFailure("Failed to fetch settlements"));
            message.error(response.message || "Failed to fetch settlements");
        }
    } catch (error) {
        yield put(fetchSettlementsByPayerFailure(error.message));
        message.error(error.message);
    }
}

function* fetchSettlementsByPayeeSaga(action: any) {
    try {
        const payeeId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/payee/${payeeId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "Settlements fetched successfully") {
            yield put(fetchSettlementsByPayeeSuccess(response.settlements));
        } else {
            yield put(fetchSettlementsByPayeeFailure("Failed to fetch settlements"));
            message.error(response.message || "Failed to fetch settlements");
        }
    } catch (error) {
        yield put(fetchSettlementsByPayeeFailure(error.message));
        message.error(error.message);
    }
}

// ✅ Delete settlement
function* deleteSettlementSaga(action: any) {
    try {
        const settlementId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(`http://192.168.1.19:5000/api/settlements/${settlementId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "Settlement deleted successfully") {
            yield put(deleteSettlementSuccess(settlementId));
            message.success("Settlement deleted successfully.");
        } else {
            yield put(deleteSettlementFailure("Failed to delete settlement"));
            message.error(response.message || "Failed to delete settlement");
        }
    } catch (error) {
        yield put(deleteSettlementFailure(error.message));
        message.error(error.message);
    }
}

// ✅ Watcher saga
export function* watchSettlementActions() {
    yield takeLatest(ADD_SETTLEMENT_REQUEST, addSettlementSaga);
    yield takeLatest(ADD_BULK_SETTLEMENT_REQUEST, addBulkSettlementSaga);
    yield takeLatest(FETCH_SETTLEMENT_REQUEST, fetchSettlementsSaga);
    yield takeLatest(FETCH_SETTLEMENTS_BY_PAYER_REQUEST, fetchSettlementsByPayerSaga);
    yield takeLatest(FETCH_SETTLEMENTS_BY_PAYEE_REQUEST, fetchSettlementsByPayeeSaga);
    yield takeLatest(DELETE_SETTLEMENT_REQUEST, deleteSettlementSaga);
}
