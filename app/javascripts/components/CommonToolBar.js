/**
 * Created by jayanth on 31/03/17.
 */
import React, {PropTypes} from "react";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";
import {withRouter} from "react-router";
import {browserHistory} from 'react-router';
/**
 * A simple example of `Toolbar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class AppBarExampleIcon extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    handleHomeClick(){
        browserHistory.push({
            pathname: '/home'
        });
    }

    render() {
        const {router, params, location, routes} = this.props
        return (
            <AppBar
                title={this.props.toolBarTitle}
                onTitleTouchTap={function(e){this.handleHomeClick()}.bind(this)}
                onLeftIconButtonTouchTap = {function(e){this.handleHomeClick()}.bind(this)}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementLeft={ <Avatar
                    src="https://lh3.googleusercontent.com/A3y_9JgOELvWHUNG8t1Tk1cnx6W-YcgdBcxIWY4OOwhGTXARl0n6BY9xF8zeMMYpug=w300-rw"></Avatar>}
            />

        );
    }
}


export default withRouter(AppBarExampleIcon);
