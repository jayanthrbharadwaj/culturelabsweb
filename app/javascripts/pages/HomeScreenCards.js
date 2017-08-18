import React from "react";
import {Card, CardMedia, CardHeader, CardTitle, CardText} from "material-ui";
import {browserHistory} from "react-router";
import utils from "../utils/constants";
import SwipeableViews from "react-swipeable-views";
import ImageUtil from "../utils/ImageUtil";

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todaysDate = new Date();
const title = "Today " + days[todaysDate.getDay()];

const styles = {
    slideContainer: {
        height: 632,
    },
    slide: {
        height: 0,
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#FEA900',
    },
    slide2: {
        backgroundColor: '#B3DC4A',
    },
    scroll: {
        height: 632,
        overflow: 'scroll',
    },
    slide3: {
        height: 632,
        backgroundColor: '#6AC0FF',
    },
};

class HomeScreenCards extends React.Component {

    constructor(props) {
        super(props);
        this.includes = {};
        styles.slide.height = styles.slideContainer.height / 1.8
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
            state: {clickedObject: clickedObject, fullObject: this.props.newsList.items}
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
                            <CardText>{object.fields.description}</CardText></Card>
                    } else if (object.sys.contentType.sys.id == utils.data.kanthapaatha) {
                        return <Card onTouchTap={function (e) {
                            this.handleListItemClick({clicked: object, clickedIndex:i})
                        }.bind(this)} containerStyle={utils.kannadaStyle.titleStyle}>
                            <CardHeader title={object.fields.title}
                                        subtitle={object.fields.title} />
                            <CardText>{object.fields.subtitle}</CardText></Card>
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
                                style={utils.kannadaStyle.cardtextstyle}>{object.fields.description}</CardText></Card>
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
                            <CardText style={utils.kannadaStyle.cardtextstyle}>{object.fields.body}</CardText></Card>
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