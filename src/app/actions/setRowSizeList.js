import { SET_ROW_SIZE_LIST } from '../constants/CONSTANTS';

export function setRowSizeList(rowSizeList) {
    return {
        type: SET_ROW_SIZE_LIST,
        payload: rowSizeList,
    }
}

