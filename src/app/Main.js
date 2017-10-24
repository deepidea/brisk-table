import React, {Component} from 'react';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BriskTable from './BriskTable/BriskTable';

const styles = {
  container: {
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <div style={styles.container}>
          <BriskTable
              componentID={this.props.componentID}
              dataUrl={this.props.dataUrl}
              dataPath={this.props.dataPath}
              dataColumnTextLength={this.props.dataColumnTextLength}
              dataCustomFields={this.props.dataCustomFields}
              dataShowCheckboxes={this.props.dataShowCheckboxes}
              dataHook={this.props.dataHook}
              dataRefreshFunction={this.props.dataRefreshFunction}
              tableConfig={this.props.tableConfig}
              dataProviderFunction={this.props.dataProviderFunction}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
