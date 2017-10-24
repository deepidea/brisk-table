import { SET_DATA_COLUMN_TEXT_LENGTH } from '../constants/CONSTANTS';

export function setDataColumnTextLength(columnTextLength) {
    return {
        type: SET_DATA_COLUMN_TEXT_LENGTH,
        payload: columnTextLength,
    }
}

