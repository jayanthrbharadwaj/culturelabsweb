/**
 * Created by jayanth on 23/07/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import SwipeableViews from 'react-swipeable-views';
import ImageUtil from "../utils/ImageUtil";
import Paper from 'material-ui/Paper';

const style = {
    paperStyle: {
        textAlign: 'center',
        width: '100%',
        top: '50%',
        margin: '0 auto',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    fonStyle: {
        backgroundColor: '#ebebeb;'
    }
};
class SeriesDetail extends React.Component {

    constructor(props) {
        super(props);
        this.series = [];
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    state = {
        slideIndex: 0,
        newsStateObj: false,
    };

    getSeries(activity) {
        if (null != activity) {
            return this.activity = activity.split("[//]")
        }
    }

    render() {
        const {router, params, location, routes} = this.props
        const {finished, stepIndex} = this.state;
        this.activity = this.props.location.state.clickedObject.clicked.fields.activity
        this.activity = this.getSeries(this.activity);
        return (
            <div style={style.fonStyle}>
                <SwipeableViews>
                    {null != this.activity && this.activity.map(function (object, i) {
                        object = ImageUtil.getImageUrl(object);
                        if (object.indexOf("images") != -1) {
                            return <Paper zDepth={4} style={style.paperStyle}><img src={object}></img></Paper>
                        } else {
                            return <div className='font-effect-putting-green'>{object}</div>
                        }
                    }.bind(this))}
                </SwipeableViews>
            </div>
        );
    }
}

export default withRouter(SeriesDetail)
