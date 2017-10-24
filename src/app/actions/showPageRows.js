import { SHOW_PAGE_ROWS } from '../constants/CONSTANTS';

export function showPageRows(rowSize) {
    return {
        type: SHOW_PAGE_ROWS,
        payload: rowSize,
    }
}

