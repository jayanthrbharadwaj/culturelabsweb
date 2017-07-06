/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import utils from '../utils/constants'
import {Card, CardTitle, CardText, Divider} from 'material-ui';

class KanthaPaathaDetail extends React.Component {

    constructor(props) {
        super(props);
        this.pageObject = {};
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
                    <CardTitle
                        title={this.props.location.state.clickedObject.clicked.fields.title}/>
                    <CardText style={utils.kannadaStyle.kannadaTitleStyle}>{this.props.location.state.clickedObject.clicked.fields.subtitle}</CardText>
                    <CardText style={utils.kannadaStyle.kannadaSubtitleStyle}>{this.props.location.state.clickedObject.clicked.fields.description}</CardText>
                </Card>
                <Divider />

            </div>
        );
    }
}

export default withRouter(KanthaPaathaDetail)
