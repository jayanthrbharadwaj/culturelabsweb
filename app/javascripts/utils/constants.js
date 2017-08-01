/**
 * Created by jayanth on 30/03/17.
 */
var DISPLAY_TYPES_OBJECT = {
    "post": "post",
    "kanthapaatha": "kanthapaatha",
    "sankalpaMantra": "sankalpaMantra",
    "newsItems": "newsItems",
    "photoCarousal": "photoCarousal",
    "series": "series",
};

var currentTabIndex = 0;

var kannadaStyle = {
titleStyle:{
        fontSize: 24,
        fontFamily: 'Arimo',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
        },
 subtitleStyle:{
         fontSize: 20,
         fontFamily: 'Arimo',
         whiteSpace: 'normal',
           wordWrap: 'break-word'
         }
    }
module.exports = {data: DISPLAY_TYPES_OBJECT, kannadaStyle: kannadaStyle}

