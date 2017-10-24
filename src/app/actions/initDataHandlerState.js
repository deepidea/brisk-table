import { INIT_DATA_HANDLER_STATE } from '../constants/CONSTANTS';

export function initDataHandlerState(state) {
    return {
        type: INIT_DATA_HANDLER_STATE,
        payload: state,
    }
}

