import { SELECT_ROW_DATA } from '../constants/CONSTANTS';

export default function (state = {}, action) {
    switch (action.type) {
        case SELECT_ROW_DATA:
            window[action.payload.hook](action.payload.row);

            return { ...state };
    }

    return state
}