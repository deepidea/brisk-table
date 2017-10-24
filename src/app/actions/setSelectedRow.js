import { SET_SELECTED_ROW } from '../constants/CONSTANTS';

export function setSelectedRow(selectedRow) {
    return {
        type: SET_SELECTED_ROW,
        payload: selectedRow,
    }
}

