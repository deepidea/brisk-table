import JSONPath from 'jsonpath-plus';
import md5 from 'md5';

import { SET_DATA_PATH } from '../constants/CONSTANTS';
import { SET_DATA_CUSTOM_FIELDS } from '../constants/CONSTANTS';
import { SET_INIT_STATE } from '../constants/CONSTANTS';
import { GET_SOURCE_LIST } from '../constants/CONSTANTS';
import { PAGE_NUMBER } from '../constants/CONSTANTS';
import { SET_ROWS_PER_PAGE } from '../constants/CONSTANTS';
import { SET_DATA_COLUMN_TEXT_LENGTH } from '../constants/CONSTANTS';

function parseToList(customFields) {
    let customFieldsList = [];

    if(!customFields) {return}
    customFieldsList = JSON.parse(customFields);

    return customFieldsList;
}

function getCustomField(fieldKey, customFieldsList) {
    let customField = {};

    for (var key in customFieldsList) {
        let rowData = customFieldsList[key];

        for (var rowKey in rowData) {
            if(fieldKey == rowData[rowKey]) {
                customField = {
                    key: rowData.fieldName,
                    label: rowData.columnName,
                    sortable: true,
                    style: {
                        width: Math.ceil(rowData.columnWidth),
                    },
                };

            }
        }
    }

    return customField;
}

function getCustomHeaderTable(dataSource, customFieldsList) {
    let headerTable = [];

    for (var key in dataSource) {

        let customField = getCustomField(key, customFieldsList);

        if(Object.keys(customField).length) {
            headerTable[headerTable.length] = customField;
        }
    }

    return headerTable;
}

function getHeaderTable(dataSource) {
    let headerTable = [];
    let i = 0;

    for (var key in dataSource) {
        headerTable[i] = {
            key: key,
            label: key,
            sortable: true
        };
        i++;
    }

    return headerTable;
}

function showPageRows(data, pageRowsOption) {
    let tableRows;
    let startIndex = ((pageRowsOption.pageNumber - 1) * pageRowsOption.rowSize);
    let endIndex = startIndex + pageRowsOption.rowSize;

    tableRows = data.slice(startIndex, endIndex);

    return tableRows;
}

function isVisibleField(fieldsList, field) {
    let isVisibleField = false;

    fieldsList.map((customField) => {
        if(customField.key == field) {
            isVisibleField = true;
        }
    });

    return isVisibleField;
}

function convertToDataTable(data, dataPath, rowsPerPage, columnTextLength, customFields) {
    let dataSource = [];
    let tableTitle;
    let dataTable = [];
    let customFieldsList = parseToList(customFields);
    let headerTable;

    dataSource = JSONPath({json: data, path: dataPath});
    tableTitle = dataPath.replace(/^\$../, '');
    headerTable = customFieldsList ? getCustomHeaderTable(dataSource[0][0], customFieldsList) : getHeaderTable(dataSource[0][0]);

    dataSource[0].forEach((dataSourceRow, i, dataSource) => {
        let dataRow = {};
        let hash = md5(new Date() + Math.random() + i);

        for (var key in dataSourceRow) {
            if(isVisibleField(headerTable, key)) {
                if(typeof dataSourceRow[key] === 'string' && dataSourceRow[key].length > columnTextLength) {
                    dataRow[key] = dataSourceRow[key].substr(0, columnTextLength) + '...';
                } else {
                    dataRow[key] = dataSourceRow[key];
                }
            }
        }

        dataRow = Object.assign({hash: hash}, dataRow);
        dataSource[i] = Object.assign({hash: hash}, dataSourceRow);

        dataTable[i] = dataRow;
    });

    return {
        originalDataSource: dataSource[0],
        dataSource: dataTable,
        tableTitle: tableTitle,
        headerTable: headerTable,
        dataTable: showPageRows(dataTable, {pageNumber: PAGE_NUMBER, rowSize: rowsPerPage}),
        dataLength: dataSource[0].length,
        rowsPerPage: rowsPerPage,
        pageNumber: PAGE_NUMBER,
        selectedRows: new Array(),
        selectedRowsData: new Map(),
        selectedRowsHash: new Set(),
        filterValue: '',
        isFiltered: false,
        isSorted: false,
        isAllRowsSelected: false,
        toUnselectAll: false,
    };
}

export default function (state = {}, action) {
    switch (action.type) {
        case SET_INIT_STATE:
            return { ...state, sourceListOrigin: null};

        case SET_DATA_PATH:
            return { ...state, dataPath: action.payload};

        case SET_DATA_COLUMN_TEXT_LENGTH:
            return { ...state, columnTextLength: action.payload};

        case SET_DATA_CUSTOM_FIELDS:
            return { ...state, customFields: action.payload};

        case SET_ROWS_PER_PAGE:
            return { ...state, rowsPerPage: action.payload };

        case GET_SOURCE_LIST:
            return { ...state, sourceListOrigin: convertToDataTable(action.payload.data, state.dataPath, state.rowsPerPage, state.columnTextLength, state.customFields)};
    }

    return state
}