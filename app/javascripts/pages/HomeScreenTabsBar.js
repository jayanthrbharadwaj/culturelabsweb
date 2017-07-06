/**
 * Created by jayanth on 30/03/17.
 */
import React, {PropTypes} from 'react';
import {Tabs, Tab, LinearProgress} from 'material-ui';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import HomeScreenCards from './HomeScreenCards'
import axios from 'axios';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

export default class TabsExampleSwipeable extends React.Component {

    constructor(props) {
        super(props);
        this.newsList = [];
        this.loadDBData();
    }

    state = {
        slideIndex: 0,
        newsStateObj:false,
    };

    loadDBData() {
        this.setState({newsStateObj: false});
        axios.get('/newslist')
            .then(function (response) {
                this.newsList = response.data;
                console.log("got news list "+JSON.stringify(this.newsList))
                this.setState({newsStateObj: true});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {!this.state.newsStateObj && <LinearProgress />}
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Home" value={0}/>
                    <Tab label="Series" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <div style={styles.slide}>
                            <HomeScreenCards newsList={this.newsList}/>
                        </div>
                    </div>
                    <div style={styles.slide}>
                        2nd tab Coming soon
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}
