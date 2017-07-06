/**
 * Created by jayanth on 31/03/17.
 */
import React, {PropTypes} from "react";
import {Toolbar, ToolbarTitle} from "material-ui/Toolbar";
import {orange500} from "material-ui/styles/colors";
import {withRouter} from "react-router";

/**
 * A simple example of `Toolbar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const toolbarStyle = {
    backgroundColor: orange500
}


class AppBarExampleIcon extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        const {router, params, location, routes} = this.props
        return (
            < Toolbar style={toolbarStyle}>
                <ToolbarTitle text={this.props.location.state.clickedObject.clicked.fields.title} float="none"/>
            </Toolbar >
        );
    }
}


export default withRouter(AppBarExampleIcon);
