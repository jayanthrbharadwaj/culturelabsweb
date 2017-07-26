/**
 * Created by jayanth on 30/03/17.
 */
var DISPLAY_TYPES_OBJECT = {
    "post": "post",
    "kanthapaatha": "kanthapaatha",
    "subhaashita": "subhaashita",
    "newsfeed": "newsfeed",
    "photocarousal": "photocarousal",
    "series": "series",
};

var currentTabIndex = 0;

var kannadaStyle = {
titleStyle:{
        fontSize: 24,
        fontFamily: 'Rancho'
        },
 subtitleStyle:{
         fontSize: 20,
         fontFamily: 'Rancho'
         }
    }
module.exports = {data: DISPLAY_TYPES_OBJECT, kannadaStyle: kannadaStyle}

