/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from "react";
import {withRouter} from "react-router";
import utils from "../utils/constants";
import {Card, CardTitle, CardText, Divider} from "material-ui";
import GAEventLogger from "../analytics/GAEventLogger";
import ShareUrlBuilder from '../share/ShareUrlBuilder';
import Whatsapp from "react-share-icons/lib/Whatsapp";
import ImageUtil from '../utils/ImageUtil'

class KanthaPaathaDetail extends React.Component {

    constructor(props) {
        super(props);
        this.title;
        this.subtitle;
        this.description;
        this.logPageEvent()
    }

    state = {
        slideIndex: 0,
        newsStateObj: false
    };

    componentDidMount() {
        this.initBundleObject();
    }

    componentWillReceiveProps(nextProps) {
        this.imageUrl = nextProps.imageUrl;
        this.setState({newsStateObj: true})
    }

    render() {
        return (
            <div>
                <a style={utils.allPostsStyle.noscroll} href={this.shareUrl}>
                    <Whatsapp /></a>
                <Card>
                    <CardTitle
                        title={this.title}/>
                    <CardText
                        style={utils.kannadaStyle.titleStyle}>{this.subtitle}</CardText>
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

    initBundleObject() {
        if (null != this.props.location && null != this.props.location.state) {
            this.itemId = this.props.location.state.clickedObject.clicked.sys.contentType.sys.id;
            this.title = this.props.location.state.clickedObject.clicked.fields.title;
            this.subtitle = this.props.location.state.clickedObject.clicked.fields.subtitle;
            this.description = this.props.location.state.clickedObject.clicked.fields.description;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.location.state.clickedObject.clicked)
        } else {
            this.itemId = this.props.bundleObject.sys.contentType.sys.id;
            this.title = this.props.bundleObject.fields.title;
            this.subtitle = this.props.bundleObject.fields.subtitle;
            this.description = this.props.bundleObject.fields.description;
            this.shareUrl = ShareUrlBuilder.createShareUrl(this.props.bundleObject)
        }
        this.setState({newsStateObj: true})
    }
}

export default withRouter(KanthaPaathaDetail)
