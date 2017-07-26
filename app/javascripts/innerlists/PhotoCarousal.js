/**
 * Created by jayanth on 14/07/17.
 */
import React from "react";
import SwipeableViews from "react-swipeable-views";
import ImageUtil from "../utils/ImageUtil";
// From https://github.com/oliviertassinari/react-swipeable-views

class PhotoCarousal extends React.Component {

    constructor(props) {
        super(props);
        this.photoCarousal = [];
        this.tempCarousal = [];
        this.tempCarousal = this.props.subtitle.split("![")
        this.photoCarousal = ImageUtil.cleanAndSetPhotoArray(this.tempCarousal);
    }

    state = {
        slideIndex: 0,
        newsStateObj: false,
    };

    render() {
        console.log("render "+this.photoCarousal.length)
        return (
            <SwipeableViews>
                {this.photoCarousal.map(function (img, i) {
                    console.log(this.photoCarousal[0])
                    if (null != this.photoCarousal[i] && i >= 0 && null != img) {
                        return <img width={'100%'} height={'250'} src={this.photoCarousal[i]}/>
                    }
                }.bind(this))};
            </SwipeableViews>
        )
    }
}

export default PhotoCarousal;

