/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from "react";
import {Tabs, Tab, LinearProgress} from "material-ui";
import SwipeableViews from "react-swipeable-views";
import HomeScreenCards from "./HomeScreenCards";
import SeriesHomeTab from "./SeriesHomeTab";
import axios from "axios";
import utils from '../utils/constants'
// From https://github.com/oliviertassinari/react-swipeable-views

export default class HomeScreenTabsBar extends React.Component {

    constructor(props) {
        super(props);
        this.newsList = [];
        this.loadDBData();
        this.state = {slideIndex: utils.currentTabIndex};
        console.log("inside constructor "+utils.currentTabIndex)
    }

    state = {
        slideIndex: utils.currentTabIndex,
        newsStateObj: false,
    };

    loadDBData() {
        this.setState({newsStateObj: false});
        axios.get('/newslist')
            .then(function (response) {
                this.newsList = response.data;
                this.setState({newsStateObj: true});
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
            slideIndex:value
        });
    };

    render() {
        return (
            <div>
                {!this.state.newsStateObj && <LinearProgress />}
                <Tabs value={this.state.slideIndex} onChange={this.handleChange}>
                    <Tab label="Home" value={0}/>
                    <Tab label="Series" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChangeIndex}>
                    <div>
                        <HomeScreenCards newsList={this.newsList}/>
                    </div>
                    <div>
                        <SeriesHomeTab newsList={this.newsList}/>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}
