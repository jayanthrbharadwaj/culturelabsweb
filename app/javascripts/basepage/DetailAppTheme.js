import React, {PropTypes} from 'react';
import ToolBar from "../components/CommonToolBar";
import axios from "axios";
import {orange500} from "material-ui/styles/colors";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {LinearProgress} from "material-ui";
import SubhaashitaScreen from "../pages/SubhaashitaScreen";
import KanthaPaathaDetail from "../pages/KanthaPaathaDetail";
import NewsDetailScreen from "../pages/NewsDetailScreen";
import PostDetailScreen from "../pages/PostDetailScreen";
import SeriesDetailScreen from "../pages/SeriesDetail";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import utils from '../utils/constants'
import URLMatcher from '../utils/URLMatcher'
import ImageUtil from '../utils/ImageUtil'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange500
    },
    appBar: {
        height: 50,
    },
});

class AppBarExampleIcon extends React.Component {
    state = {
        newsStateObj: true
    };

    constructor(props) {
        super(props)
        console.log("url matcher ");
    }

    componentDidMount() {
        this.setState({newsStateObj: false});
        this.itemId = URLMatcher.matchUrl(this.props.location)
        if (this.itemId != null) {
            this.loadItemData();
        } else {
            this.initNavObject(this.props.location.state.clickedObject.clicked);
            this.setState({newsStateObj: true});
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <ToolBar toolBarTitle={this.toolBarTitle}/>
                        {!this.state.newsStateObj && <LinearProgress />}
                        {this.subhashita &&
                        <SubhaashitaScreen itemOnly={this.itemResponse} bundleObject={this.bundleObject}/>}
                        {this.newsItems &&
                        <NewsDetailScreen itemOnly={this.itemResponse} bundleObject={this.bundleObject}/>}
                        {this.post && <PostDetailScreen itemOnly={this.itemResponse} bundleObject={this.bundleObject}/>}
                        {this.kanthapaatha &&
                        <KanthaPaathaDetail itemOnly={this.itemResponse} bundleObject={this.bundleObject}/>}
                        {this.series && <SeriesDetailScreen itemOnly={this.itemResponse} bundleObject={this.bundleObject}/>}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    loadItemData() {
        this.setState({newsStateObj: false});
        axios.get('/content/item', {
            params: {
                id: this.itemId
            }
        }).then(function (response) {
            this.initNavObject(response.data)
            this.setState({newsStateObj: true});
            this.fetchImageData(response)
        }.bind(this))
            .catch(function (error) {
                //console.log(error);
            });
    }

    fetchImageData(response) {
        if (null != response.data && null != response.data.fields.featuredImage) {
            var assetId = response.data.fields.featuredImage.sys.id;
            axios.get('/content/asset', {
                params: {
                    id: assetId
                }
            }).then(function (response) {
                this.itemResponse = response.data;
                this.setState({newsStateObj: true});
            }.bind(this))
                .catch(function (error) {
                    //console.log(error);
                });
        }
    }

    initNavObject(navObject) {
        this.bundleObject = navObject;
        this.subhashita = false;
        this.post = false;
        this.newsItems = false;
        this.kanthapaatha = false;
        this.photocarousal = false;
        this.toolBarTitle = navObject.fields.title

        switch (this.bundleObject.sys.contentType.sys.id) {
            case utils.data.sankalpaMantra:
                this.subhashita = true;
                break;
            case utils.data.kanthapaatha:
                this.kanthapaatha = true;
                break;
            case utils.data.newsItems:
                this.newsItems = true;
                break;
            case utils.data.post:
                this.post = true;
                break;
            case utils.data.photoCarousal:
                this.photocarousal = true;
                break;
            case utils.data.series:
                this.series = true;
                break;

        }
    }
}


export default AppBarExampleIcon;
