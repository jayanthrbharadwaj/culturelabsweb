/**
 * Created by jayanth on 30/06/17.
 */
import React, {PropTypes} from "react";
import {withRouter} from "react-router";
import utils from "../utils/constants";
import {Card, CardTitle, CardHeader, CardText, CardMedia, Divider} from "material-ui";
import GAEventLogger from "../analytics/GAEventLogger";
import DocumentMeta from 'react-document-meta';
import Whatsapp from "react-share-icons/lib/Whatsapp";
import ShareUrlBuilder from '../share/ShareUrlBuilder';
import ImageUtil from '../utils/ImageUtil'

const meta = {
    title: 'Some Meta Title',
    description: 'I am a description, and I can create multiple tags',
    canonical: 'http://example.com/path/to/page',
    meta: {
        charset: 'utf-8',
        name: {
            keywords: 'react,meta,document,html,tags'
        }
    }
};
class PostsDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.pageObject = {};
        utils.kannadaStyle.titleStyle.subtitleStyle = window.outerHeight;
        this.logPageEvent()
    }

    componentDidMount() {
        this.initBundleObject();
    }

    componentWillReceiveProps(nextProps) {
        this.imageUrl = ImageUtil.getImageUrlHttp(nextProps.itemOnly.fields.file.url)
        this.subtitle = nextProps.itemOnly.fields.title;
        this.setState({newsStateObj: true})
    }

    state = {
        slideIndex: 0,
        newsStateObj: false
    };

    render() {
        return (
            <div>
                <DocumentMeta {...meta} />
                <a style={utils.allPostsStyle.noscroll} href={this.shareUrl}>
                    <Whatsapp /></a>
                <Card>
                    <CardHeader
                        style={utils.kannadaStyle.subtitleStyle}
                        subtitle={this.subtitle}
                        title={this.title}
                        avatar={this.imageUrl}
                    />
                    <CardMedia
                        overlay={<CardTitle title={this.title}
                                            subtitle={this.subtitle}/>}
                    >
                        <img src={this.imageUrl}
                             alt=""/>
                    </CardMedia>
                    <CardText style={utils.kannadaStyle.titleStyle}>{this.description}</CardText>
                </Card>
                <Divider />

            </div>
        );
    }

    initBundleObject() {
        if (null != this.props.location && null != this.props.location.state) {
            this.itemId = this.props.location.state.clickedObject.clicked.sys.contentType.sys.id;
            this.title = this.props.location.state.clickedObject.clicked.fields.title;
            this.subtitle = this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.title;
            this.description = this.props.location.state.clickedObject.clicked.fields.body;
            this.imageUrl = this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.file.url
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.location.state.clickedObject.clicked)
        } else {
            this.itemId = this.props.bundleObject.sys.contentType.sys.id;
            this.title = this.props.bundleObject.fields.title;
            this.description = this.props.bundleObject.fields.body;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.bundleObject)
        }
        this.setState({newsStateObj: true})
    }

    logPageEvent() {
        GAEventLogger.logPageViewEvent(this.itemId);
    }
}

export default withRouter(PostsDetailScreen)
