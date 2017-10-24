import { combineReducers } from 'redux';

import DataFetcher from './reducer_dataFetcher'
import DataHandler from './reducer_dataHandler'
import HookFunction from './reducer_hookFunction'

const rootReducer = combineReducers({
  dataSource: DataFetcher,
  sourceList: DataHandler,
  sortData: DataHandler,
  filterData: DataHandler,
  showPageRows: DataHandler,
  selectedRows: DataHandler,
  selectedRow: DataHandler,
  selectedRowsData: DataHandler,
  selectRowData: HookFunction,
});

export default rootReducer;
