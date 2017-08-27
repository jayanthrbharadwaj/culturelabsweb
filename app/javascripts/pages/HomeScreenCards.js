import React from "react";
import {Card, CardMedia, CardHeader, CardTitle, CardText, CardActions, FlatButton} from "material-ui";
import {browserHistory} from "react-router";
import utils from "../utils/constants";
import SwipeableViews from "react-swipeable-views";
import ImageUtil from "../utils/ImageUtil";

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todaysDate = new Date();
const title = "Today " + days[todaysDate.getDay()];

const styles = {
    slideContainer: {
        height: 0,
    },
    slide: {
        height: 0,
        color: '#fff',
    },
    scroll: {
        height: 0,
        overflow: 'scroll',
    },

};

class HomeScreenCards extends React.Component {

    constructor(props) {
        super(props);
        this.includes = {};
        styles.slideContainer.height =  window.outerHeight-98;
        styles.slide.height = styles.slideContainer.height / 1.8
        utils.kannadaStyle.titleStyle.height = window.outerHeight-98-6;
        utils.kannadaStyle.cardtextstyle.height =  (styles.slideContainer.height - styles.slide.height-98-6)*0.98;
        this.currentListIndex = -1;
    }

    componentWillReceiveProps() {
        window.scrollTo(0,0)
        this.includes = this.props.newsList.includes;
    }

    handleListItemClick(clickedObject) {
        this.currentListIndex = -1;
        utils.currentListIndex = clickedObject.clickedIndex;
        browserHistory.push({
            pathname: '/homedetail',
            state: {clickedObject: clickedObject, fullObject: this.props.newsList}
        });
    }

    render() {
        return (
            <SwipeableViews index= {utils.currentListIndex} containerStyle={styles.slideContainer} axis="y" resistance>
                {null != this.props.newsList && this.props.newsList.map(function (object, i) {
                    if (object.sys.contentType.sys.id == utils.data.sankalpaMantra) {
                        return <Card onTouchTap={function (e) {
                            this.handleListItemClick({clicked: object, clickedIndex:i})
                        }.bind(this)} containerStyle={utils.kannadaStyle.titleStyle}>
                            <CardHeader title={object.fields.title}
                                        subtitle={object.fields.title} />
                            <CardText>{object.fields.description}</CardText>
                            <CardActions>
                                <FlatButton label="Read more" onClick={this.handleListItemClick} />
                            </CardActions>
                        </Card>
                    } else if (object.sys.contentType.sys.id == utils.data.kanthapaatha) {
                        return <Card onTouchTap={function (e) {
                            this.handleListItemClick({clicked: object, clickedIndex:i})
                        }.bind(this)} containerStyle={utils.kannadaStyle.titleStyle}>
                            <CardHeader title={object.fields.title}
                                        subtitle={object.fields.title} />
                            <CardText>{object.fields.subtitle}</CardText>
                            <CardActions>
                                <FlatButton label="Read more" onClick={this.handleListItemClick} />
                            </CardActions>
                        </Card>
                    } else if (object.sys.contentType.sys.id == utils.data.newsItems) {
                        return <div><Card onTouchTap={function (e) {
                            this.handleListItemClick({clicked: object, clickedIndex:i})
                        }.bind(this)} containerStyle={utils.kannadaStyle.titleStyle}>
                            <CardMedia
                                overlay={<CardTitle title={object.fields.title}
                                                    subtitle={object.fields.featuredImage.fields.title}/>}>
                                <img height={styles.slide.height}
                                     src={ImageUtil.getImageUrlHttp(object.fields.featuredImage.fields.file.url)}
                                     alt=""/>
                            </CardMedia>
                            <CardText
                                style={utils.kannadaStyle.cardtextstyle}>{object.fields.description}</CardText>
                            <CardActions>
                                <FlatButton label="Read more" onClick={this.handleListItemClick} />
                            </CardActions>
                        </Card>
                        </div>
                    } else if (object.sys.contentType.sys.id == utils.data.post) {
                        return <Card onTouchTap={function (e) {
                            this.handleListItemClick({clicked: object, clickedIndex:i})
                        }.bind(this)} containerStyle={utils.kannadaStyle.titleStyle}>
                            <CardMedia
                                overlay={<CardTitle title={object.fields.title}
                                                    subtitle={object.fields.featuredImage.fields.title}/>}>
                                <img height={styles.slide.height}
                                     src={ImageUtil.getImageUrlHttp(object.fields.featuredImage.fields.file.url)}
                                     alt=""/>
                            </CardMedia>
                            <CardText style={utils.kannadaStyle.cardtextstyle}>{object.fields.body}</CardText>
                            <CardActions>
                                <FlatButton label="Read more" onClick={this.handleListItemClick} />
                            </CardActions>
                        </Card>
                    } else if (object.sys.contentType.sys.id == utils.data.photoCarousal) {
                        {/*return <PhotoCarousal containerStyle={utils.kannadaStyle.titleStyle} subtitle={object.fields.subtitle}/>*/
                        }
                    }
                }.bind(this))}
            </SwipeableViews>
        );
    }
}

export default HomeScreenCards;