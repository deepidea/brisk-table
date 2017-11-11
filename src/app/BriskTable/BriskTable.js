import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import md5 from 'md5';
import _ from 'lodash';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from 'material-ui/Card';
import DataTables from 'material-ui-datatables';

import { ROW_SIZE } from '../constants/CONSTANTS';
import { ROW_SIZE_LIST } from '../constants/CONSTANTS';
import { PAGE_NUMBER } from '../constants/CONSTANTS';
import { ROW_HEIGHT } from '../constants/CONSTANTS';
import { HEADER_COLUMN_HEIGHT } from '../constants/CONSTANTS';

import  { setDataPath } from '../actions/setDataPath';
import  { setDataColumnTextLength } from '../actions/setDataColumnTextLength';
import  { setDataCustomFields } from '../actions/setDataCustomFields';
import  { dataFetchAction } from '../actions/dataFetchAction';
import  { setInitState } from '../actions/setInitState';
import  { initDataHandlerState } from '../actions/initDataHandlerState';
import  { sortData } from '../actions/sortData';
import  { filterData } from '../actions/filterData';
import  { showPageRows } from '../actions/showPageRows';
import  { selectRowData } from '../actions/selectRowData';
import  { setAllSelectedRows } from '../actions/setAllSelectedRows';
import  { setRowsPerPage } from '../actions/setRowsPerPage';
import  { setSelectedRows } from '../actions/setSelectedRows';
import  { setSelectedRow } from '../actions/setSelectedRow';
import  { getSelectedRowsData } from '../actions/getSelectedRowsData';

import BriskTableFunctions from './BriskTableFunctions'

const styles = {
    container: {
        textAlign: 'center',
    },
    component: {
        margin: '10px 5px',
    },
    titleStyle: {
        fontSize: 16,
        color: deepOrange500,
    },
    footerToolbarStyle: {
        padding: '0 100px',
    },
    tableStyle: {
        tableLayout: 'auto',
    },
    tableBodyStyle: {
        overflowX: 'auto',
    },
    tableWrapperStyle: {
        padding: 5,
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
    tableHeaderColumn: {
        height: HEADER_COLUMN_HEIGHT
    },
    style: {
        tableRow: {
            height: 24
        }
    },
    tableHeader: {
        height: 10
    }
});

class BriskTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.props.setDataPath(props.dataPath);
        this.props.setDataColumnTextLength(props.dataColumnTextLength);
        this.props.setDataCustomFields(props.dataCustomFields);
        this.props.setRowsPerPage(isNaN(props.tableConfig.rowsPerPage) ? ROW_SIZE : props.tableConfig.rowsPerPage);
        this.props.dataFetchAction(props.dataUrl, props.dataProviderFunction);

        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);

        this.state = {
            columns: [],
            data: [],
            rowSize: isNaN(props.tableConfig.rowsPerPage) ? ROW_SIZE : props.tableConfig.rowsPerPage,
            rowSizeList: props.tableConfig.rowsSizeList.includes(NaN) ? ROW_SIZE_LIST : props.tableConfig.rowsSizeList,
            rowHeight: isNaN(props.tableConfig.rowHeight) ? ROW_HEIGHT : props.tableConfig.rowHeight,
            multiSelectable: props.dataShowCheckboxes,
            showCheckboxes: props.dataShowCheckboxes,
            selectedRows: [],
            page: PAGE_NUMBER,
            filterValue: window.location.search.match(/jsontablefilter=/) ? window.location.search.match(/jsontablefilter=/).input.replace(/&.*$/i, '').replace(/^.*=/, '') : '',
            isFiltered: false,
            isAllRowsSelected: false,
            toUnselectAll: false,
        };

        if(props.componentID) {
            window[md5(props.componentID)] = new BriskTableFunctions(props, props.dataProviderFunction);

            window.briskTableFunctions = (function (_this) {
                return {
                    refresh: function (id) {
                        window[md5(id)].refresh(_this);
                    },
                    fetchSelectedRows: function (id) {
                        let selectedRows = window[md5(id)].fetchSelectedRows(md5(id));

                        return selectedRows.selectedRowsData;
                    },
                    filterData: function (id, filterValue) {
                        window[md5(id)].filterData(md5(id), filterValue);
                    },
                };
            })(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.dataSource.sourceListOrigin) {return}

        if(!nextProps.sourceList.sourceList) {
            this.props.initDataHandlerState(nextProps.dataSource.sourceListOrigin);

            return;
        }

        this.setState({
            tableTitle: nextProps.sourceList.sourceList.tableTitle,
            columns: nextProps.sourceList.sourceList.headerTable,
            originalDataSource: nextProps.sourceList.sourceList.originalDataSource,
            data: nextProps.sourceList.sourceList.dataTable,
            dataLength: nextProps.sourceList.sourceList.dataLength,
            page: nextProps.sourceList.sourceList.page || nextProps.sourceList.sourceList.pageNumber,
            rowSize: nextProps.sourceList.sourceList.rowSize || nextProps.sourceList.sourceList.rowsPerPage,
            selectedRows: nextProps.sourceList.sourceList.selectedRows,
            filterValue: nextProps.sourceList.sourceList.filterValue,
            isAllRowsSelected: nextProps.sourceList.sourceList.isAllRowsSelected,
            toUnselectAll: nextProps.sourceList.sourceList.toUnselectAll,
            selectedRowsHash: nextProps.sourceList.sourceList.selectedRowsHash,
        });
    }

    handleSortOrderChange(columnName, sortOrder) {
        this.props.sortData({
            columnName: columnName,
            sortOrder: sortOrder,
            pageNumber: this.state.page,
            rowSize: this.state.rowSize
        })
    }

    handleFilterValueChange(value) {
        this.props.filterData(value);
    }

    handleRowSizeChange(pageNumber, rowsPerPage) {
        let maxPages = Math.ceil(this.state.data.length / rowsPerPage)
        let nextPage = this.state.page > maxPages ? maxPages : this.state.page;

        this.props.showPageRows({
            pageNumber: nextPage,
            rowSize: rowsPerPage,
            rowSizeList: this.state.rowSizeList
        });

        this.setState({
            page: nextPage,
            rowSize: rowsPerPage,
            rowSizeList: this.state.rowSizeList
        })
    }

    handleRowSelection(rowsList) {
        if(rowsList === 'all') {
            this.props.setAllSelectedRows(rowsList);
            this.state.isAllRowsSelected = true;

            return;
        }

        if(rowsList === 'none') {
            this.props.setSelectedRows({
                rowsList: rowsList,
                isAllRowsSelected: this.state.isAllRowsSelected,
                selectedRowsHash: this.state.selectedRowsHash,
                toUnselectAll: true
            });

            rowsList = new Array();

            return;
        }

        let selectedRowId;

        if(this.state.selectedRows) {
            if(this.state.selectedRows.length > rowsList.length) {
                selectedRowId = [_.differenceWith(this.state.selectedRows, rowsList, _.isEqual)[0]];
            } else {
                selectedRowId = _.differenceWith(rowsList, this.state.selectedRows, _.isEqual);
            }
        }

        if(this.props.dataHook) {
            let originalDataSource;

            this.state.originalDataSource.map((row) => {
                if(row.hash == this.state.data[selectedRowId].hash) {
                    originalDataSource = row;
                }
            });

            this.props.selectRowData({
                row: originalDataSource,
                hook: this.props.dataHook
            });
        }

        if(!this.state.showCheckboxes) {
            this.props.setSelectedRow(rowsList.length > 0 ? rowsList : this.state.selectedRows);
        } else {
            this.props.setSelectedRows({
                dataTable: this.state.data,
                pageNumber: this.state.page,
                rowsList: selectedRowId,
                toUnselectAll: false
            });
        }
    }

    handlePreviousPageClick() {
        let nextPage = this.state.page - 1;

        this.props.showPageRows({
            pageNumber: nextPage,
            rowSize: this.state.rowSize,
            rowSizeList: this.state.rowSizeList
        });

        this.setState({page: nextPage})

    }

    handleNextPageClick() {
        let nextPage = this.state.page + 1;

        this.props.showPageRows({
            pageNumber: nextPage,
            rowSize: this.state.rowSize,
            rowSizeList: this.state.rowSizeList
        });

        this.setState({page: nextPage})
    }

    render() {
        if(!this.props.dataSource.sourceListOrigin) {return <div>Loading ...</div>};

        console.log('%c render brisk table', 'color: orange; display: block;');

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <div style={styles.component}>
                        <Card style={{margin: 12}}>
                            <DataTables
                                title={this.state.tableTitle}
                                height={'auto'}
                                selectable={true}
                                enableSelectAll={this.state.showCheckboxes}
                                showRowHover={true}
                                columns={this.state.columns}
                                data={this.state.data}
                                selectedRows={this.state.selectedRows}
                                isAllRowsSelected={this.state.isAllRowsSelected}
                                page={this.state.page}
                                filterValue={this.state.filterValue}
                                tableRowStyle={{height: this.state.rowHeight}}
                                tableRowColumnStyle={{height: this.state.rowHeight}}
                                tableHeaderColumnStyle={
                                    {
                                        headerToolbar: {
                                            height: 24
                                        },
                                        toolbarTitle: {
                                          lineHeight: '40px'
                                        }
                                    }
                                }
                                tableHeaderStyle={
                                    {
                                        headerToolbar: {
                                            height: 24
                                        },
                                        toolbarTitle: {
                                          lineHeight: '40px'
                                        }
                                    }
                                }
                                rowSize={this.state.rowSize}
                                rowSizeList={this.state.rowSizeList}
                                showCheckboxes={this.state.showCheckboxes}
                                multiSelectable={this.state.showCheckboxes}
                                showHeaderToolbar={true}
                                showFooterToolbar={true}
                                onRowSizeChange={this.handleRowSizeChange}
                                onRowSelection={this.handleRowSelection}
                                onNextPageClick={this.handleNextPageClick}
                                onPreviousPageClick={this.handlePreviousPageClick}
                                onFilterValueChange={this.handleFilterValueChange}
                                onSortOrderChange={this.handleSortOrderChange}
                                count={this.state.dataLength}
                            />
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps({dataSource, sourceList, selectedRows, selectedRowsData}) {
    return { dataSource, sourceList, selectedRows, selectedRowsData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setDataPath: setDataPath,
        setDataColumnTextLength: setDataColumnTextLength,
        setDataCustomFields: setDataCustomFields,
        dataFetchAction: dataFetchAction,
        setInitState: setInitState,
        initDataHandlerState: initDataHandlerState,
        sortData: sortData,
        filterData: filterData,
        showPageRows: showPageRows,
        selectRowData: selectRowData,
        setRowsPerPage: setRowsPerPage,
        setSelectedRows: setSelectedRows,
        setSelectedRow: setSelectedRow,
        setAllSelectedRows: setAllSelectedRows,
        getSelectedRowsData: getSelectedRowsData,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BriskTable);