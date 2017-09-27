/**
 * Created by jayanth on 23/07/17.
 */
import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import SwipeableViews from 'react-swipeable-views';
import ImageUtil from "../utils/ImageUtil";
import {Paper, Snackbar} from 'material-ui';
import GAEventLogger from '../analytics/GAEventLogger';
import utils from '../utils/Constants'
import FlipPage from 'react-flip-page'

const style = {
    paperStyle: {
        textAlign: 'center',
        width: '100%',
        height:'100%',
        marginTop: '10px',
        marginLeft: '10px',
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

    state = {
        slideIndex: 0,
        newsStateObj: false,
        showHSSCoach: false,
    };

    getSeries(activity) {
        if (null != activity) {
            return this.activity = activity.split("[//]")
        }
    }

    componentDidMount() {
        this.showCoachMark();
    }

    render() {
        this.activity = this.props.location.state.clickedObject.clicked.fields.activity
        this.activity = this.getSeries(this.activity);
        return (
            <div style={style.fonStyle}>
                <FlipPage orientation="horizontal">
                    {null != this.activity && this.activity.map(function (object, i) {
                        object = ImageUtil.getImageUrlAndMeta(object);
                        if (null != object.url && object.url.indexOf("images") != -1) {
                            return <div style={style.paperStyle}><img src={object.url}></img>
                                <br/>
                                <div>{object.imageMeta}</div>
                            </div>
                        } else {
                            return <div className='font-effect-putting-green'>{object}</div>
                        }
                    }.bind(this))}
                </FlipPage>
                <Snackbar
                    open={this.state.showHSSCoach}
                    message={utils.COACHMARKTEXT.hssswipe}
                    action="Okay"
                    autoHideDuration={4000}
                />
            </div>
        );
    }

    logPageEvent() {
        GAEventLogger.logPageViewEvent(this.props.location.state.clickedObject.clicked.sys.contentType.sys.id);
    }

    handleCoachMarkClose() {
        this.setState({showHSSCoach: false});
    }

    showCoachMark() {
        if (!this.state.showHSSCoach) {
            this.setState({showHSSCoach: true});
        }
    }
}

export default withRouter(SeriesDetail)
