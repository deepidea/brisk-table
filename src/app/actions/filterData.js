import { FILTER_DATA } from '../constants/CONSTANTS';

export function filterData(filterOptions) {
    return {
        type: FILTER_DATA,
        payload: filterOptions,
    }
}

