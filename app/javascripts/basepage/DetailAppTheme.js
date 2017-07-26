import React, {PropTypes} from 'react';
import ToolBar from "../components/CommonToolBar";
import SubhaashitaScreen from "../pages/SubhaashitaScreen";
import KanthaPaathaDetail from "../pages/KanthaPaathaDetail";
import NewsDetailScreen from "../pages/NewsDetailScreen";
import PostDetailScreen from "../pages/PostDetailScreen";
import SeriesDetailScreen from "../pages/SeriesDetail";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import utils from '../utils/constants'

class AppBarExampleIcon extends React.Component {
    constructor(props) {
        super(props)
        this.clicked = this.props.location.state.clickedObject.clicked;
        this.subhashita = false;
        this.post = false;
        this.newsfeed = false;
        this.kanthapaatha = false;
        this.photocarousal = false;

        switch(this.clicked.sys.contentType.sys.id) {
            case utils.data.subhaashita:
                this.subhashita = true;
                break;
            case utils.data.kanthapaatha:
                this.kanthapaatha = true;
                break;
            case utils.data.newsfeed:
                this.newsfeed = true;
                break;
            case utils.data.post:
                this.post = true;
                break;
            case utils.data.photocarousal:
                this.photocarousal = true;
                break;
            case utils.data.series:
                this.series = true;
                break;

        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <ToolBar/>
                        {this.subhashita && <SubhaashitaScreen/>}
                        {this.newsfeed && <NewsDetailScreen/>}
                        {this.post && <PostDetailScreen/>}
                        {this.kanthapaatha && <KanthaPaathaDetail/>}
                        {this.kanthapaatha && <KanthaPaathaDetail/>}
                        {this.series && <SeriesDetailScreen/>}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}


export default AppBarExampleIcon;
