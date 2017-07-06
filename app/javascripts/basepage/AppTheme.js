import React from 'react';
import AppBar from '../components/AppBar';
import HomeScreenTabsBar from '../pages/HomeScreenTabsBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {orange500} from "material-ui/styles/colors";

// AppBar with simple overrides
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange500
    },
    appBar: {
        height: 50,
    },
});
const Main = () => (
<div>
    <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <AppBar/>
            <HomeScreenTabsBar/>
        </div>
        </MuiThemeProvider>
</div>
);

export default Main;
