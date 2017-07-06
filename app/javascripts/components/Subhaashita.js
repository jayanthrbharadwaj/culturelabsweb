/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import {Card, CardTitle, CardText, Divider} from 'material-ui';

class HomeDetailScreen extends React.Component {

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
                    <CardText>{this.props.location.state.clickedObject.clicked.fields.description}</CardText>
                </Card>
                <Divider />

            </div>
        );
    }
}

export default withRouter(HomeDetailScreen)
