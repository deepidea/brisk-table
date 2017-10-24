import { SELECT_ROW_DATA } from '../constants/CONSTANTS';

export function selectRowData(rowIndex) {
    return {
        type: SELECT_ROW_DATA,
        payload: rowIndex,
    }
}

