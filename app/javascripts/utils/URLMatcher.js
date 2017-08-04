/**
 * Created by jayanth on 03/08/17.
 */
var home="home";
var homeDetail="homedetail";
var series = "seriesdetail";
var itemId = null;

class URLMatcher {

    static matchUrl(locationObj) {
        if(locationObj.pathname.search(homeDetail) != -1) {
            return locationObj.query.id;
        }
    }
}

module.exports = URLMatcher;