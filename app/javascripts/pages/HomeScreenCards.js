import React from "react";
import {ListItem, List} from "material-ui";
import {browserHistory} from 'react-router';
import utils from '../utils/constants'
import PhotoCarousal from '../innerlists/PhotoCarousal'

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todaysDate = new Date();
const title = "Today " + days[todaysDate.getDay()];

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
                    if (object.sys.contentType.sys.id == utils.data.sankalpaMantra) {
                        return <ListItem
                            style={utils.kannadaStyle.titleStyle}
                            primaryText={title}
                            secondaryText={object.fields.description}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}/>
                    } else if (object.sys.contentType.sys.id == utils.data.kanthapaatha) {
                        return <ListItem
                            style={utils.kannadaStyle.titleStyle}
                            primaryText={object.fields.title}
                            secondaryText={object.fields.subtitle}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}/>
                    } else if (object.sys.contentType.sys.id == utils.data.newsItems) {
                        return <ListItem
                            style={utils.kannadaStyle.titleStyle}
                            primaryText={object.fields.title}
                            secondaryText={object.fields.description}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}/>
                    } else if (object.sys.contentType.sys.id == utils.data.post) {
                        return <ListItem
                            primaryText={object.fields.title}
                            secondaryText={object.fields.body}
                            onTouchTap={function (e) {
                                this.handleListItemClick({clicked: object})
                            }.bind(this)}
                            secondaryTextLines={3}
                            style={utils.kannadaStyle.titleStyle}/>
                    } else if (object.sys.contentType.sys.id == utils.data.photoCarousal) {
                        return <PhotoCarousal subtitle={object.fields.subtitle}/>
                    }
                }.bind(this))}
            </List>
        );
    }
}

export default HomeScreenCards;