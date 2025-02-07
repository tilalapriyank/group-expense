export const ADD_SETTLEMENT_REQUEST = "ADD_SETTLEMENT_REQUEST";
export const ADD_SETTLEMENT_SUCCESS = "ADD_SETTLEMENT_SUCCESS";
export const ADD_SETTLEMENT_FAILURE = "ADD_SETTLEMENT_FAILURE";

export const ADD_BULK_SETTLEMENT_REQUEST = "ADD_BULK_SETTLEMENT_REQUEST";
export const ADD_BULK_SETTLEMENT_SUCCESS = "ADD_BULK_SETTLEMENT_SUCCESS";
export const ADD_BULK_SETTLEMENT_FAILURE = "ADD_BULK_SETTLEMENT_FAILURE";

export const FETCH_SETTLEMENT_REQUEST = "FETCH_SETTLEMENT_REQUEST";
export const FETCH_SETTLEMENT_SUCCESS = "FETCH_SETTLEMENT_SUCCESS";
export const FETCH_SETTLEMENT_FAILURE = "FETCH_SETTLEMENT_FAILURE";

export const FETCH_SETTLEMENTS_BY_PAYER_REQUEST = "FETCH_SETTLEMENTS_BY_PAYER_REQUEST";
export const FETCH_SETTLEMENTS_BY_PAYER_SUCCESS = "FETCH_SETTLEMENTS_BY_PAYER_SUCCESS";
export const FETCH_SETTLEMENTS_BY_PAYER_FAILURE = "FETCH_SETTLEMENTS_BY_PAYER_FAILURE";

export const FETCH_SETTLEMENTS_BY_PAYEE_REQUEST = "FETCH_SETTLEMENTS_BY_PAYEE_REQUEST";
export const FETCH_SETTLEMENTS_BY_PAYEE_SUCCESS = "FETCH_SETTLEMENTS_BY_PAYEE_SUCCESS";
export const FETCH_SETTLEMENTS_BY_PAYEE_FAILURE = "FETCH_SETTLEMENTS_BY_PAYEE_FAILURE";

export const DELETE_SETTLEMENT_REQUEST = "DELETE_SETTLEMENT_REQUEST";
export const DELETE_SETTLEMENT_SUCCESS = "DELETE_SETTLEMENT_SUCCESS";
export const DELETE_SETTLEMENT_FAILURE = "DELETE_SETTLEMENT_FAILURE";

// Add a single settlement
export const addSettlementRequest = (settlement: any, groupId: string) => ({
    type: ADD_SETTLEMENT_REQUEST,
    payload: { settlement, groupId },
});

export const addSettlementSuccess = (settlement: any) => ({
    type: ADD_SETTLEMENT_SUCCESS,
    payload: settlement,
});

export const addSettlementFailure = (error: string) => ({
    type: ADD_SETTLEMENT_FAILURE,
    payload: error,
});

// Bulk add settlements
export const addBulkSettlementRequest = (settlementsDetails: any[]) => ({
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

// Fetch settlements by payer
export const fetchSettlementsByPayerRequest = (payerId: string) => ({
    type: FETCH_SETTLEMENTS_BY_PAYER_REQUEST,
    payload: payerId,
});

export const fetchSettlementsByPayerSuccess = (settlements: any) => ({
    type: FETCH_SETTLEMENTS_BY_PAYER_SUCCESS,
    payload: settlements,
});

export const fetchSettlementsByPayerFailure = (error: any) => ({
    type: FETCH_SETTLEMENTS_BY_PAYER_FAILURE,
    payload: error,
});

// Fetch settlements by payee
export const fetchSettlementsByPayeeRequest = (payeeId: string) => ({
    type: FETCH_SETTLEMENTS_BY_PAYEE_REQUEST,
    payload: payeeId,
});

export const fetchSettlementsByPayeeSuccess = (settlements: any) => ({
    type: FETCH_SETTLEMENTS_BY_PAYEE_SUCCESS,
    payload: settlements,
});

export const fetchSettlementsByPayeeFailure = (error: any) => ({
    type: FETCH_SETTLEMENTS_BY_PAYEE_FAILURE,
    payload: error,
});

// Delete settlement
export const deleteSettlementRequest = (settlementId: string) => ({
    type: DELETE_SETTLEMENT_REQUEST,
    payload: settlementId,
});

export const deleteSettlementSuccess = (settlementId: string) => ({
    type: DELETE_SETTLEMENT_SUCCESS,
    payload: settlementId,
});

export const deleteSettlementFailure = (error: string) => ({
    type: DELETE_SETTLEMENT_FAILURE,
    payload: error,
});
