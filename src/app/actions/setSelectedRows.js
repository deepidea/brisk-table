import { SET_SELECTED_ROWS } from '../constants/CONSTANTS';

export function setSelectedRows(selectedRows) {
    return {
        type: SET_SELECTED_ROWS,
        payload: selectedRows,
    }
}

