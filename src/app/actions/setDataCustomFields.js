import { SET_DATA_CUSTOM_FIELDS } from '../constants/CONSTANTS';

export function setDataCustomFields(customFields) {
    return {
        type: SET_DATA_CUSTOM_FIELDS,
        payload: customFields,
    }
}

