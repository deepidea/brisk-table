import axios from 'axios';

import { GET_SOURCE_LIST } from '../constants/CONSTANTS';

export function dataFetchAction(url, dataProviderFunction) {
    let sourceList = null;

    if(dataProviderFunction) {
        let sourceList = new Promise(function(resolve, reject) {
                resolve(window[dataProviderFunction]());
        });

        return sourceList.then(result => {
            return {
                type: GET_SOURCE_LIST,
                payload: {data: result},
            }
        });
    } else {
        sourceList = axios.get(url, dataProviderFunction);
    }

    return {
        type: GET_SOURCE_LIST,
        payload: sourceList,
    }
}

