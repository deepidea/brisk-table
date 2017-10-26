import _ from 'lodash';

import { INIT_DATA_HANDLER_STATE } from '../constants/CONSTANTS';
import { SORT_DATA } from '../constants/CONSTANTS';
import { SORT_DESC } from '../constants/CONSTANTS';
import { FILTER_DATA } from '../constants/CONSTANTS';
import { SHOW_PAGE_ROWS } from '../constants/CONSTANTS';
import { SET_SELECTED_ROWS } from '../constants/CONSTANTS';
import { SET_SELECTED_ROW } from '../constants/CONSTANTS';
import { SET_ALL_SELECTED_ROWS } from '../constants/CONSTANTS';
import { GET_SELECTED_ROWS_DATA } from '../constants/CONSTANTS';

function fetchSelectedRowsNumbers(state, dataTablePageRows) {
    let selectedRowsNumbers = [];

    dataTablePageRows.forEach((row, i) => {
            if(state.sourceList.selectedRowsHash.has(row.hash)) {
                selectedRowsNumbers[selectedRowsNumbers.length] = i;
            }
        });

    return selectedRowsNumbers;
}

function sortData(state, sortOptions) {
    let sortedData;
    let dataTable;

    sortedData = _.sortBy(state.sourceList.filteredData || state.sourceList.dataSource, [sortOptions.columnName]);

    if(sortOptions.sortOrder === SORT_DESC) {
        sortedData = _.reverse(sortedData);
    }

    dataTable = showPageRows(sortedData, {pageNumber: sortedData.length < sortOptions.rowSize ? 1 : sortOptions.pageNumber, rowSize: sortOptions.rowSize});

    return {
        originalDataSource: state.sourceList.originalDataSource,
        dataSource: state.sourceList.dataSource,
        headerTable: state.sourceList.headerTable,
        sortedData: sortedData,
        sortOptions: sortOptions,
        filteredData: state.sourceList.filteredData,
        filterValue: state.sourceList.filterValue,
        isFiltered: state.sourceList.isFiltered,
        isSorted: true,
        isAllRowsSelected: state.sourceList.isAllRowsSelected,
        dataTable: dataTable,
        dataLength: sortedData.length,
        rowsPerPage: state.sourceList.rowsPerPage,
        pageNumber: sortOptions.pageNumber,
        selectedRows: fetchSelectedRowsNumbers(state, dataTable),
        selectedRowsData: state.sourceList.selectedRowsData,
        selectedRowsHash: state.sourceList.selectedRowsHash
    };
}

function filterData(state, filterValue) {
    let filteredData;
    let selectedRows;
    let sortedData;
    let dataTable;
    let isFiltered;
    let isAllRowsSelected;
    let toUnselectAll;
    let regexp = new RegExp(filterValue, 'i');

    if(filterValue.length < 1) {
        state.sourceList.filteredData = null;
        toUnselectAll = true;
        filterValue = undefined;
        filteredData = '';
        isFiltered = false;

        if(state.sourceList.sortOptions) {
            let allSortedData = sortData(state, state.sourceList.sortOptions);

            sortedData = allSortedData.sortedData;
            dataTable = allSortedData.dataTable;
            selectedRows = fetchSelectedRowsNumbers(state, dataTable);
        } else {
            if(state.sourceList.isFiltered) {
                dataTable = showPageRows(state.sourceList.dataSource, {pageNumber: state.sourceList.pageNumber, rowSize: state.sourceList.rowsPerPage});
                selectedRows = fetchSelectedRowsNumbers(state, dataTable);
            } else {
                dataTable = showPageRows(state.sourceList.dataSource, {pageNumber: state.sourceList.pageNumber, rowSize: state.sourceList.rowsPerPage});
                selectedRows = fetchSelectedRowsNumbers(state, dataTable);
            }
        }

    } else {
        filteredData = _.filter(state.sourceList.sortedData || state.sourceList.dataSource, function(data) {
            for (var key in data) {
                if(!data[key]) {return;}
                
                if(data[key].toString().match(regexp) && key != 'hash') {
                    return true;
                }
            }
        });

        isFiltered = true;

        dataTable = showPageRows(filteredData, {pageNumber: 1, rowSize: state.sourceList.rowsPerPage});
        selectedRows = fetchSelectedRowsNumbers(state, dataTable);
    }

    return {
        originalDataSource: state.sourceList.originalDataSource,
        dataSource: state.sourceList.dataSource,
        headerTable: state.sourceList.headerTable,
        sortedData: sortedData || state.sourceList.sortedData,
        sortOptions: state.sourceList.sortOptions,
        filteredData: filteredData,
        filterValue: filterValue,
        isFiltered: isFiltered,
        isSorted: state.sourceList.isSorted,
        dataTable: dataTable,
        dataLength: filteredData ? filteredData.length : state.sourceList.dataSource.length,
        rowsPerPage: state.sourceList.rowsPerPage,
        pageNumber: state.sourceList.pageNumber,
        selectedRows: selectedRows,
        selectedRowsData: state.sourceList.selectedRowsData,
        selectedRowsHash: state.sourceList.selectedRowsHash,
        isAllRowsSelected: isAllRowsSelected || state.sourceList.isAllRowsSelected,
        toUnselectAll: toUnselectAll,
    };
}

function showPageRows(data, pageRowsOption) {
    let tableRows;
    let startIndex = ((pageRowsOption.pageNumber - 1) * pageRowsOption.rowSize);
    let endIndex = startIndex + pageRowsOption.rowSize;

    tableRows = data.slice(startIndex, endIndex);

    return tableRows;
}

function getDataLength(data) {
    if(data.filteredData) {
        return data.filteredData.length;
    }
    if(data.sortedData) {
        return data.sortedData.length;
    }
    if(data.dataSource) {
        return data.dataSource.length;
    }
}

function getOriginalDataSource(state, hash) {
    let originalDataSource;

    state.sourceList.originalDataSource.map((row) => {
        if(row.hash == hash) {
            originalDataSource = row;

            return;
        }
    });

    return originalDataSource;
}

function setSelectedRows(state, selectedRows) {
    if(selectedRows.rowsList === 'all') {return}

    if(selectedRows.rowsList === 'none') {
        if(state.sourceList.isFiltered) {
            state.sourceList.filteredData.forEach((row) => {
                state.sourceList.selectedRowsHash.delete(row.hash);
            });
        } else {
            state.sourceList.selectedRowsHash = new Set();
        }

        state.sourceList.selectedRows = [];
        state.sourceList.isAllRowsSelected = false;
        state.sourceList.toUnselectAll = selectedRows.toUnselectAll;
        state.sourceList.selectedRowsData = new Map();

        return;
    }

    state.sourceList.toUnselectAll = selectedRows.toUnselectAll;

    selectedRows.rowsList.forEach((rowIndexesList) => {
        let rowData = state.sourceList.dataTable;

        if(rowIndexesList >= rowData.length) {return}

        if(state.sourceList.selectedRowsHash.has(rowData[rowIndexesList].hash)) {
            state.sourceList.selectedRowsHash.delete(rowData[rowIndexesList].hash);
            state.sourceList.selectedRowsData.delete(rowData[rowIndexesList].hash);

            state.sourceList.selectedRows = _.differenceWith(state.sourceList.selectedRows, selectedRows.rowsList, _.isEqual);
        } else {
            state.sourceList.selectedRowsHash.add(rowData[rowIndexesList].hash);
            state.sourceList.selectedRowsData.set(rowData[rowIndexesList].hash, getOriginalDataSource(state, rowData[rowIndexesList].hash));

            state.sourceList.selectedRows[state.sourceList.selectedRows.length] = selectedRows.rowsList[0];
        }
    });
}

function setSelectedRow(state, selectedRow) {
    let rowHash = state.sourceList.dataTable[selectedRow].hash;

    state.sourceList.selectedRows = selectedRow;
    state.sourceList.selectedRowsData = new Map();
    state.sourceList.selectedRowsData.set(
        rowHash,
        getOriginalDataSource(state, rowHash)
    );
}

function setAllSelectedRows(state, allSelectedRows) {
    if(allSelectedRows !== 'all') { return }

    state.sourceList.isAllRowsSelected = true;

    if(state.sourceList.isFiltered) {
        state.sourceList.filteredData.forEach((row, i) => {
            state.sourceList.selectedRows[i] = i;
            state.sourceList.selectedRowsHash.add(row.hash);
            state.sourceList.selectedRowsData.set(row.hash, getOriginalDataSource(state, row.hash));
        });

        return;
    }

    if(state.sourceList.isSorted) {
        state.sourceList.sortedData.forEach((row, i) => {
            state.sourceList.selectedRows[i] = i;
            state.sourceList.selectedRowsHash.add(row.hash);
            state.sourceList.selectedRowsData.set(row.hash, getOriginalDataSource(state, row.hash));
        });

        return;
    }

    state.sourceList.dataSource.forEach((row, i) => {
        state.sourceList.selectedRows[i] = i;
        state.sourceList.selectedRowsHash.add(row.hash);
        state.sourceList.selectedRowsData.set(row.hash, getOriginalDataSource(state, row.hash));
    });
}

export default function (state = {}, action) {
    switch (action.type) {
        case INIT_DATA_HANDLER_STATE:

            return { ...state, sourceList: action.payload };

        case SORT_DATA:
            let sortedData = sortData(state, action.payload);

            return { ...state,  sourceList: sortedData };

        case FILTER_DATA:
            let filteredData = filterData(state, action.payload);

            return { ...state,  sourceList: filteredData };

        case SHOW_PAGE_ROWS:
            let dataTable = showPageRows(state.sourceList.sortedData || state.sourceList.filteredData || state.sourceList.dataSource, action.payload);

            return { ...state, sourceList: {
                    originalDataSource: state.sourceList.originalDataSource,
                    dataSource: state.sourceList.dataSource,
                    headerTable: state.sourceList.headerTable,
                    sortedData: state.sourceList.sortedData,
                    sortOptions: state.sourceList.sortOptions,
                    filteredData: state.sourceList.filteredData,
                    filterValue: state.sourceList.filterValue,
                    isAllRowsSelected: state.sourceList.isAllRowsSelected,
                    isFiltered: state.sourceList.isFiltered,
                    isSorted: state.sourceList.isSorted,
                    dataTable: dataTable,
                    dataLength: getDataLength(state.sourceList),
                    rowsPerPage: action.payload.rowSize,
                    pageNumber: action.payload.pageNumber,
                    selectedRows: fetchSelectedRowsNumbers(state, dataTable),
                    selectedRowsData: state.sourceList.selectedRowsData,
                    selectedRowsHash: state.sourceList.selectedRowsHash
                }
            };

        case SET_SELECTED_ROWS:
            setSelectedRows(state, action.payload)

            return { ...state };

        case SET_SELECTED_ROW:
            setSelectedRow(state, action.payload)

            return { ...state };

        case SET_ALL_SELECTED_ROWS:
            setAllSelectedRows(state, action.payload);

            return { ...state };

        case GET_SELECTED_ROWS_DATA:
            let selectedRowsData = Array.from(  state.sourceList.selectedRowsData.values() );

            window[action.payload].setSelectedRowsData(selectedRowsData);

            return { ...state };
    }

    return state
}