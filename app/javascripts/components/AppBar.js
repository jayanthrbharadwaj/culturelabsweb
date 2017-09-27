/**
 * Created by jayanth on 31/03/17.
 */
import React from "react";
import AppBar from "material-ui/AppBar";
import Avatar from "material-ui/Avatar";

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const AppBarExampleIcon = () => (
    <AppBar
        title="Madhwa Sangraha"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={ <Avatar src="https://lh3.googleusercontent.com/A3y_9JgOELvWHUNG8t1Tk1cnx6W-YcgdBcxIWY4OOwhGTXARl0n6BY9xF8zeMMYpug=w300-rw"></Avatar>}
    />
);

export default AppBarExampleIcon;
