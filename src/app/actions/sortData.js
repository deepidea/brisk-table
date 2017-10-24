import { SORT_DATA } from '../constants/CONSTANTS';

export function sortData(sortOptions) {
    return {
        type: SORT_DATA,
        payload: sortOptions,
    }
}

