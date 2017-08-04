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
    var allPostsStyle = {
        noscroll: {
          width:'40px',
          height:'40px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
          float:'right',
          overflowY: 'scroll',
          align:'right',
          top: 10, right: 12, bottom: 0, left: 0
        }
    }
module.exports = {data: DISPLAY_TYPES_OBJECT, kannadaStyle: kannadaStyle, allPostsStyle: allPostsStyle}

