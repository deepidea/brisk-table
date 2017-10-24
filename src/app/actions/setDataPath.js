import { SET_DATA_PATH } from '../constants/CONSTANTS';

export function setDataPath(dataPath) {
    return {
        type: SET_DATA_PATH,
        payload: dataPath,
    }
}

