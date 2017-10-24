import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import ReduxPromise from 'redux-promise'
import reducers from './reducers';

const elementsList = document.getElementsByClassName('brisk-table');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

Object.keys(elementsList).map(function(key) {
    if(!elementsList[key]) {return}

    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

    const componentID = elementsList[key].getAttribute('id');
    const dataUrl = elementsList[key].getAttribute('data-url');
    const dataPath = elementsList[key].getAttribute('data-json-path');
    const dataColumnTextLength = Number.parseInt(elementsList[key].getAttribute('data-column-text-length'));
    const dataCustomFields = elementsList[key].getAttribute('data-custom-fields');
    const dataShowCheckboxes = (elementsList[key].getAttribute('data-show-checkboxes') == 'true');
    const dataProviderFunction = elementsList[key].getAttribute('data-provider-function');
    const dataHook = elementsList[key].getAttribute('data-hook-on-row-selected');
    const DOM_ELEMENT = document.getElementsByClassName('tableConfig')[0] || elementsList[key];

    const tableConfig = {
        headerToolbarHeight: Number.parseInt(window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--header-toolbar-height').trim()),
        headerColumnHeight: Number.parseInt(window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--header-column-height').trim()),
        rowHeight: Number.parseInt(window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--row-height').trim()),
        rowsPerPage: Number.parseInt(window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--rows-per-page').trim()),
        rowsSizeList: window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--rows-size-list').trim().split(',').map(function(item) {return parseInt(item);}),
    };

    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Main
                componentID={componentID}
                dataUrl={dataUrl}
                dataPath={dataPath}
                dataColumnTextLength={dataColumnTextLength}
                dataCustomFields={dataCustomFields}
                dataShowCheckboxes={dataShowCheckboxes}
                dataHook={dataHook}
                tableConfig={tableConfig}
                dataProviderFunction={dataProviderFunction}
            />
        </Provider>
        , elementsList[key]);
});