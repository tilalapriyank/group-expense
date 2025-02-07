import {
    ADD_SETTLEMENT_SUCCESS,
    ADD_SETTLEMENT_FAILURE,
    ADD_BULK_SETTLEMENT_SUCCESS,
    ADD_BULK_SETTLEMENT_FAILURE,
    FETCH_SETTLEMENT_SUCCESS,
    FETCH_SETTLEMENT_FAILURE,
    FETCH_SETTLEMENTS_BY_PAYER_SUCCESS,
    FETCH_SETTLEMENTS_BY_PAYER_FAILURE,
    FETCH_SETTLEMENTS_BY_PAYEE_SUCCESS,
    FETCH_SETTLEMENTS_BY_PAYEE_FAILURE,
    DELETE_SETTLEMENT_SUCCESS,
    DELETE_SETTLEMENT_FAILURE,
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
        case ADD_SETTLEMENT_SUCCESS:
            return { ...state, settlements: [...state.settlements, action.payload] };

        case ADD_BULK_SETTLEMENT_SUCCESS:
            return { ...state, settlements: [...state.settlements, ...action.payload] };

        case ADD_SETTLEMENT_FAILURE:
        case ADD_BULK_SETTLEMENT_FAILURE:
        case FETCH_SETTLEMENT_FAILURE:
        case FETCH_SETTLEMENTS_BY_PAYER_FAILURE:
        case FETCH_SETTLEMENTS_BY_PAYEE_FAILURE:
        case DELETE_SETTLEMENT_FAILURE:
            return { ...state, error: action.payload };

        case FETCH_SETTLEMENT_SUCCESS:
        case FETCH_SETTLEMENTS_BY_PAYER_SUCCESS:
        case FETCH_SETTLEMENTS_BY_PAYEE_SUCCESS:
            return { ...state, settlements: action.payload, loading: false, error: undefined };

        case DELETE_SETTLEMENT_SUCCESS:
            return {
                ...state,
                settlements: state.settlements.filter((stm) => stm._id !== action.payload),
            };

        default:
            return state;
    }
};

export default settlementReducer;
