import { SET_INIT_STATE } from '../constants/CONSTANTS';

export function setInitState(state) {
    return {
        type: SET_INIT_STATE,
        payload: state,
    }
}

