/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from "react";
import {withRouter} from "react-router";
import utils from "../utils/constants";
import {Card, CardText, CardHeader, Divider} from "material-ui";
import GAEventLogger from '../analytics/GAEventLogger';
import Whatsapp from 'react-share-icons/lib/Whatsapp';
import ShareUrlBuilder from '../share/ShareUrlBuilder';
import ImageUtil from '../utils/ImageUtil'

class NewsDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.imageTitle;
        this.imageUrl;
        this.title;
        this.description;
        this.shareUrl;
        this.itemId
        this.logPageEvent()
    }

    state = {
        slideIndex: 0,
        newsStateObj: false
    };

    componentWillReceiveProps(nextProps) {
        this.imageUrl = ImageUtil.getImageUrlHttp(nextProps.itemOnly.fields.file.url)
        this.setState({newsStateObj: true})
    }

    componentDidMount() {
        this.initBundleObject();
    }

    render() {
        return (
            <div>
                <a style={utils.allPostsStyle.noscroll} href={this.shareUrl}>
                    <Whatsapp /></a>
                <Card>
                    <CardHeader
                        style={utils.kannadaStyle.subtitleStyle}
                        subtitle={this.imageTitle}
                        title={this.title}
                        avatar={this.imageUrl}
                    />
                    <CardText
                        style={utils.kannadaStyle.subtitleStyle}>{this.description}</CardText>
                </Card>
                <Divider />

            </div>
        );
    }

    logPageEvent() {
        GAEventLogger.logPageViewEvent(this.itemId);
    }

    fetchImageAsset() {

    }

    initBundleObject() {
        if (null != this.props.location && null != this.props.location.state && this.props.location.state.clickedObject != null) {
            this.imageTitle = this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.title;
            this.title = this.props.location.state.clickedObject.clicked.fields.title;
            this.toolBarTitle = this.props.location.state.clickedObject.clicked.fields.title;
            this.description = this.props.location.state.clickedObject.clicked.fields.description;
            this.imageUrl = this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.file.url;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.location.state.clickedObject.clicked)
            this.itemId = this.props.location.state.clickedObject.clicked.sys.contentType.sys.id;
            console.log("shareurl " + this.shareUrl);
        } else {
            this.itemId = this.props.bundleObject.sys.contentType.sys.id;
            this.title = this.props.bundleObject.fields.title;
            this.imageTitle = this.props.bundleObject.fields.title;
            this.description = this.props.bundleObject.fields.description;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.bundleObject)
            this.toolBarTitle = this.props.bundleObject.fields.title;
            console.log("shareurl " + this.shareUrl);
        }
        this.setState({newsStateObj: true})
    }
}

export default withRouter(NewsDetailScreen)
