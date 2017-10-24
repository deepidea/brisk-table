import { GET_SELECTED_ROWS_DATA } from '../constants/CONSTANTS';

export function getSelectedRowsData(id) {
    return {
        type: GET_SELECTED_ROWS_DATA,
        payload: id,
    }
}

