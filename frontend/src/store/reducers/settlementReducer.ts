import {
    ADD_BULK_SETTLEMENT_SUCCESS,
    ADD_BULK_SETTLEMENT_FAILURE,
    FETCH_SETTLEMENT_SUCCESS,
    FETCH_SETTLEMENT_FAILURE,
    DELETE_ALL_SETTLEMENTS_SUCCESS,
    DELETE_ALL_SETTLEMENTS_FAILURE,
    UPDATE_SETTLEMENT_STATUS_REQUEST,
    UPDATE_SETTLEMENT_STATUS_SUCCESS,
    UPDATE_SETTLEMENT_STATUS_FAILURE,
    FETCH_MY_SETTLEMENTS_FAILURE,
    FETCH_MY_SETTLEMENTS_REQUEST,
    FETCH_MY_SETTLEMENTS_SUCCESS
} from "../actions/settlementActions";
import { Settlement } from "../../types/settlementTypes";

interface SettlementState {
    settlements: Settlement[];
    loading: boolean;
    error?: string;
}

const initialState: SettlementState = {
    settlements: [],
    loading: false,
    error: undefined,
};

const settlementReducer = (state = initialState, action: any): SettlementState => {
    switch (action.type) {
        case ADD_BULK_SETTLEMENT_SUCCESS:
            return { ...state, settlements: [...state.settlements, ...action.payload] };

        case ADD_BULK_SETTLEMENT_FAILURE:
        case FETCH_SETTLEMENT_FAILURE:
        case DELETE_ALL_SETTLEMENTS_FAILURE:
            return { ...state, error: action.payload };

        case FETCH_SETTLEMENT_SUCCESS:
            return { ...state, settlements: action.payload, loading: false, error: undefined };

        case DELETE_ALL_SETTLEMENTS_SUCCESS:
            return {
                ...state,
                settlements: state.settlements.filter(stm => stm.groupId !== action.payload),
            };
        case UPDATE_SETTLEMENT_STATUS_REQUEST:
            return { ...state, loading: true, error: null };

        case UPDATE_SETTLEMENT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                settlements: state.settlements.map(settlement =>
                    settlement._id === action.payload.settlementId
                        ? { ...settlement, status: action.payload.status }
                        : settlement
                ),
            };

        case FETCH_MY_SETTLEMENTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MY_SETTLEMENTS_SUCCESS:
            return { ...state, loading: false, settlements: action.payload };
        case FETCH_MY_SETTLEMENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_SETTLEMENT_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default settlementReducer;
