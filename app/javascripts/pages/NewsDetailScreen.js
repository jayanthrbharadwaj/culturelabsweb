/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from "react";
import {withRouter} from "react-router";
import utils from "../utils/constants";
import {Card, CardText, Divider} from "material-ui";
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
        return (
            <div>
                <Card>
                    <CardText style={utils.kannadaStyle.subtitleStyle}>{this.props.location.state.clickedObject.clicked.fields.description}</CardText>
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
