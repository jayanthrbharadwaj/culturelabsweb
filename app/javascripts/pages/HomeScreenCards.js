import React from "react";
import {ListItem, List} from "material-ui";
import injectTapEventPlugin from 'react-tap-event-plugin';
import {browserHistory} from 'react-router';
import utils from '../utils/constants'

injectTapEventPlugin();

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todaysDate = new Date();
const title = "Today " + days[todaysDate.getDay()];

const style = {
    height: '90px',
};

class HomeScreenCards extends React.Component {

    constructor(props) {
        super(props);
        this.includes = {};
    }

    componentWillReceiveProps() {
        this.includes = this.props.newsList.includes;
    }

    handleListItemClick(clickedObject) {
        browserHistory.push({
            pathname: '/homedetail',
            state: {clickedObject: clickedObject, fullObject: this.props.newsList.items}
        });
    }

    render() {
        return (
            <List>
                {null != this.props.newsList.items && this.props.newsList.items.map(function (object, i) {
                    if (object.sys.contentType.sys.id == utils.data.subhaashita) {
                        return <ListItem
                            style={utils.kannadaStyle.kannadaTitleStyle}
                            primaryText={title}
                            secondaryText={object.fields.description}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}
                            innerDiveStyle={style}/>
                    }
                }.bind(this))}
                {null != this.props.newsList.items && this.props.newsList.items.map(function (object, i) {
                    if (object.sys.contentType.sys.id == utils.data.kanthapaatha) {
                        return <ListItem
                            style={utils.kannadaStyle.kannadaTitleStyle}
                            primaryText={object.fields.title}
                            secondaryText={object.fields.subtitle}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}
                            innerDiveStyle={style}/>
                    }
                }.bind(this))}
                {null != this.props.newsList.items && this.props.newsList.items.map(function (object, i) {
                    if (object.sys.contentType.sys.id == utils.data.newsfeed) {
                        return <ListItem
                            style={utils.kannadaStyle.kannadaTitleStyle}
                            primaryText={object.fields.title}
                            secondaryText={object.fields.description}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}
                            innerDiveStyle={style}/>
                    }
                }.bind(this))}
                {null != this.props.newsList.items && this.props.newsList.items.map(function (object, i) {
                    if (object.sys.contentType.sys.id == utils.data.post) {
                        return <ListItem
                            primaryText={object.fields.title}
                            secondaryText={object.fields.body}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}
                            style={utils.kannadaStyle.kannadaTitleStyle}/>
                    }
                }.bind(this))}
            </List>
        );
    }
}

export default HomeScreenCards;