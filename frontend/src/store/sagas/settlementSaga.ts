import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    ADD_BULK_SETTLEMENT_REQUEST,
    FETCH_SETTLEMENT_REQUEST,
    DELETE_ALL_SETTLEMENTS_REQUEST,
    addBulkSettlementSuccess,
    addBulkSettlementFailure,
    fetchSettlementsSuccess,
    fetchSettlementsFailure,
    deleteAllSettlementsSuccess,
    deleteAllSettlementsFailure,
    UPDATE_SETTLEMENT_STATUS_REQUEST,
    updateSettlementStatusSuccess,
    updateSettlementStatusFailure,
    fetchSettlementsRequest,
    FETCH_MY_SETTLEMENTS_REQUEST, fetchMySettlementsFailure, fetchMySettlementsSuccess
} from "../actions/settlementActions";
import { API_ENDPOINTS } from "../../services/config";


const getAuthToken = () => localStorage.getItem("token");

function* addBulkSettlementSaga(action: any) {
    try {
        const { settlementsDetails } = action.payload;
        if (!settlementsDetails || settlementsDetails.length === 0) {
            yield put(addBulkSettlementFailure("No settlements provided."));
            message.error("No settlements provided.");
            return;
        }

        const token = getAuthToken();

        const response = yield call(() =>
            fetch(API_ENDPOINTS.SETTLEMENTS.BULK, {
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
            yield put(fetchSettlementsRequest(response.settlements[0].groupId));
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
            fetch(API_ENDPOINTS.SETTLEMENTS.GROUP(groupId), {
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

function* deleteAllSettlementsSaga(action: any) {
    try {
        const groupId = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(API_ENDPOINTS.SETTLEMENTS.GROUP(groupId), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

        if (response.message === "All settlements deleted successfully") {
            yield put(deleteAllSettlementsSuccess(groupId));
            message.success("All settlements deleted successfully.");
        } else {
            yield put(deleteAllSettlementsFailure("Failed to delete settlements"));
            message.error(response.message || "Failed to delete settlements");
        }
    } catch (error) {
        yield put(deleteAllSettlementsFailure(error.message));
        message.error(error.message);
    }
}

function* updateSettlementStatusSaga(action: any) {
    try {
        const { settlementId, status, groupId } = action.payload;
        const token = getAuthToken();

        const response = yield call(() =>
            fetch(API_ENDPOINTS.SETTLEMENTS.SINGLE(settlementId), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            }).then((res) => res.json())
        );

        if (response.message === "Settlement status updated successfully") {
            yield put(updateSettlementStatusSuccess(settlementId, status));
            message.success("Settlement status updated successfully.");
            if (groupId) {
                yield put(fetchSettlementsRequest(groupId));
            }
        } else {
            yield put(updateSettlementStatusFailure(response.message || "Failed to update settlement status"));
            message.error(response.message || "Failed to update settlement status");
        }
    } catch (error) {
        yield put(updateSettlementStatusFailure(error.message));
        message.error(error.message);
    }
}

function* fetchMySettlementsSaga() {
    try {
        const token = getAuthToken();
        const response = yield call(() =>
            fetch(API_ENDPOINTS.SETTLEMENTS.BASE, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => res.json())
        );
        yield put(fetchMySettlementsSuccess(response));
    } catch (error) {
        yield put(fetchMySettlementsFailure(error.message));
        message.error("Failed to fetch settlements");
    }
}

export function* watchSettlementActions() {
    yield takeLatest(ADD_BULK_SETTLEMENT_REQUEST, addBulkSettlementSaga);
    yield takeLatest(FETCH_SETTLEMENT_REQUEST, fetchSettlementsSaga);
    yield takeLatest(DELETE_ALL_SETTLEMENTS_REQUEST, deleteAllSettlementsSaga);
    yield takeLatest(UPDATE_SETTLEMENT_STATUS_REQUEST, updateSettlementStatusSaga);
    yield takeLatest(FETCH_MY_SETTLEMENTS_REQUEST, fetchMySettlementsSaga);
}
