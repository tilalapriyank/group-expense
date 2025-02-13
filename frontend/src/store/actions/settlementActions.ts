export const ADD_BULK_SETTLEMENT_REQUEST = "ADD_BULK_SETTLEMENT_REQUEST";
export const ADD_BULK_SETTLEMENT_SUCCESS = "ADD_BULK_SETTLEMENT_SUCCESS";
export const ADD_BULK_SETTLEMENT_FAILURE = "ADD_BULK_SETTLEMENT_FAILURE";

export const FETCH_SETTLEMENT_REQUEST = "FETCH_SETTLEMENT_REQUEST";
export const FETCH_SETTLEMENT_SUCCESS = "FETCH_SETTLEMENT_SUCCESS";
export const FETCH_SETTLEMENT_FAILURE = "FETCH_SETTLEMENT_FAILURE";

export const DELETE_ALL_SETTLEMENTS_REQUEST = "DELETE_ALL_SETTLEMENTS_REQUEST";
export const DELETE_ALL_SETTLEMENTS_SUCCESS = "DELETE_ALL_SETTLEMENTS_SUCCESS";
export const DELETE_ALL_SETTLEMENTS_FAILURE = "DELETE_ALL_SETTLEMENTS_FAILURE";

export const UPDATE_SETTLEMENT_STATUS_REQUEST = "UPDATE_SETTLEMENT_STATUS_REQUEST";
export const UPDATE_SETTLEMENT_STATUS_SUCCESS = "UPDATE_SETTLEMENT_STATUS_SUCCESS";
export const UPDATE_SETTLEMENT_STATUS_FAILURE = "UPDATE_SETTLEMENT_STATUS_FAILURE";

export const FETCH_MY_SETTLEMENTS_REQUEST = "FETCH_MY_SETTLEMENTS_REQUEST";
export const FETCH_MY_SETTLEMENTS_SUCCESS = "FETCH_MY_SETTLEMENTS_SUCCESS";
export const FETCH_MY_SETTLEMENTS_FAILURE = "FETCH_MY_SETTLEMENTS_FAILURE";


export const fetchMySettlementsRequest = () => ({
    type: FETCH_MY_SETTLEMENTS_REQUEST
});

export const fetchMySettlementsSuccess = (settlements: any) => ({
    type: FETCH_MY_SETTLEMENTS_SUCCESS,
    payload: settlements
});

export const fetchMySettlementsFailure = (error: string) => ({
    type: FETCH_MY_SETTLEMENTS_FAILURE,
    payload: error
});

export const updateSettlementStatusRequest = (settlementId: string, status: string) => ({
    type: UPDATE_SETTLEMENT_STATUS_REQUEST,
    payload: { settlementId, status },
});

export const updateSettlementStatusSuccess = (settlementId: string, status: string) => ({
    type: UPDATE_SETTLEMENT_STATUS_SUCCESS,
    payload: { settlementId, status },
});

export const updateSettlementStatusFailure = (error: string) => ({
    type: UPDATE_SETTLEMENT_STATUS_FAILURE,
    payload: error,
});


// Bulk add settlements
export const addBulkSettlementRequest = (settlementsDetails: { transactionList: any[] }) => ({
    type: ADD_BULK_SETTLEMENT_REQUEST,
    payload: settlementsDetails,
});

export const addBulkSettlementSuccess = (settlements: any[]) => ({
    type: ADD_BULK_SETTLEMENT_SUCCESS,
    payload: settlements,
});

export const addBulkSettlementFailure = (error: string) => ({
    type: ADD_BULK_SETTLEMENT_FAILURE,
    payload: error,
});

// Fetch settlements by group
export const fetchSettlementsRequest = (groupId: string) => ({
    type: FETCH_SETTLEMENT_REQUEST,
    payload: groupId,
});

export const fetchSettlementsSuccess = (settlements: any) => ({
    type: FETCH_SETTLEMENT_SUCCESS,
    payload: settlements,
});

export const fetchSettlementsFailure = (error: any) => ({
    type: FETCH_SETTLEMENT_FAILURE,
    payload: error,
});


// Delete settlement
export const deleteAllSettlementsRequest = (groupId: string) => ({
    type: DELETE_ALL_SETTLEMENTS_REQUEST,
    payload: groupId,
});

export const deleteAllSettlementsSuccess = (groupId: string) => ({
    type: DELETE_ALL_SETTLEMENTS_SUCCESS,
    payload: groupId,
});

export const deleteAllSettlementsFailure = (error: string) => ({
    type: DELETE_ALL_SETTLEMENTS_FAILURE,
    payload: error,
});
