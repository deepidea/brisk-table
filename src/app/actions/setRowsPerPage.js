import { SET_ROWS_PER_PAGE } from '../constants/CONSTANTS';

export function setRowsPerPage(rowsPerPage) {
    return {
        type: SET_ROWS_PER_PAGE,
        payload: rowsPerPage,
    }
}

