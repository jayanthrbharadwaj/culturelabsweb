/**
 * Created by jayanth on 30/06/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import utils from '../utils/constants'
import {Card, CardTitle, CardHeader, CardText, CardMedia, Divider} from 'material-ui';
import GAEventLogger from '../analytics/GAEventLogger';

class NewsDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.pageObject = {};
        this.logPageEvent()
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    state = {
        slideIndex: 0,
        newsStateObj: false
    };

    render() {
        const {router, params, location, routes} = this.props
        console.log(this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.file.url);
        return (
            <div>
                <Card>
                    <CardHeader
                        style={utils.kannadaStyle.subtitleStyle}
                        subtitle={this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.title}
                        title={this.props.location.state.clickedObject.clicked.fields.title}
                        avatar={this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.file.url}
                    />
                    <CardMedia
                        overlay={<CardTitle title={this.props.location.state.clickedObject.clicked.fields.title}
                                            subtitle={this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.title}/>}
                    >
                        <img src={this.props.location.state.clickedObject.clicked.fields.featuredImage.fields.file.url}
                             alt=""/>
                    </CardMedia>
                    <CardText style={utils.kannadaStyle.titleStyle}>{this.props.location.state.clickedObject.clicked.fields.body}</CardText>
                </Card>
                <Divider />

            </div>
        );
    }

    logPageEvent() {
        GAEventLogger.logPageViewEvent(this.props.location.state.clickedObject.clicked.sys.contentType.sys.id);
    }
}

export default withRouter(NewsDetailScreen)
