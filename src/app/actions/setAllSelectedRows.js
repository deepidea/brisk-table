import { SET_ALL_SELECTED_ROWS } from '../constants/CONSTANTS';

export function setAllSelectedRows(allSelectedRows) {
    return {
        type: SET_ALL_SELECTED_ROWS,
        payload: allSelectedRows,
    }
}

