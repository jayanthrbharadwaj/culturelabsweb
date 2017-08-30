/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from "react";
import {Tabs, Tab, LinearProgress, Snackbar, CircularProgress} from "material-ui";
import SwipeableViews from "react-swipeable-views";
import HomeScreenCards from "./HomeScreenCards";
import SeriesHomeTab from "./SeriesHomeTab";
import PreProcess from "../utils/PreProcess";
import axios from "axios";
import utils from '../utils/constants'
// From https://github.com/oliviertassinari/react-swipeable-views

export default class HomeScreenTabsBar extends React.Component {

    constructor(props) {
        super(props);
        this.newsList = [];
        this.seriesList = [];
        this.loadDBData();
        this.state = {slideIndex: utils.currentTabIndex, newsStateObj: false, showHSCCoach: false,};
    }

    loadDBData() {
        this.setState({newsStateObj: false});
        axios.get('/newslist')
            .then(function (response) {
                // console.log("response " + JSON.stringify(response));
                this.newsList = PreProcess.filterCardsEntries(response.data);
                this.seriesList = PreProcess.filterSeriesEntries(response.data);
                this.setState({newsStateObj: true});
                this.showCoachMark();
            }.bind(this))
            .catch(function (error) {
                //console.log(error);
            });
    }

    handleChange = (value) => {
        utils.currentTabIndex = value;
        this.setState({
            slideIndex: value,
        });
    };

    handleChangeIndex = (value) => {
        utils.currentTabIndex = value;
        this.setState({
            slideIndex: value
        });
    };

    render() {
        return (
            <div>
                <Tabs value={this.state.slideIndex} onChange={this.handleChange}>
                    <Tab label="Home" value={0}/>
                    <Tab label="Series" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChangeIndex}>
                    <div>
                        {!this.state.newsStateObj && <CircularProgress size={80} thickness={5} style={utils.kannadaStyle.loadingtextstyle} />}
                        {this.state.newsStateObj && <HomeScreenCards newsList={this.newsList}/>}
                    </div>
                    <div>
                        {!this.state.newsStateObj && <CircularProgress size={80} thickness={5} style={utils.kannadaStyle.loadingtextstyle} />}
                        {this.state.newsStateObj && <SeriesHomeTab newsList={this.seriesList}/>}
                    </div>
                </SwipeableViews>
                <Snackbar
                    open={this.state.showHSCCoach}
                    message={utils.COACHMARKTEXT.hscswipe}
                    action="Okay"
                    autoHideDuration={4000}
                    onRequestClose={this.handleCoachMarkClose.bind(this)}
                />
            </div>
        );
    }

    showCoachMark() {
        if (!this.state.showHSCCoach && this.state.slideIndex == null) {
            this.setState({showHSCCoach: true});
        }
    }

    handleCoachMarkClose() {
        this.setState({showHSCCoach: false});
    }
}