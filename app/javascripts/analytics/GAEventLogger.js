/**
 * Created by jayanth on 25/07/17.
 */
import ReactGA from 'react-ga';
class Ping {
    static initialiseGA() {
        ReactGA.initialize('UA-103183282-1');
    }

    static logPageViewEvent(object) {
        ReactGA.pageview(object);
    }

    static logClickEvent(object) {
        ReactGA.event({
            category: 'Navigation',
            action: 'Clicked Link',
        });
    }
}

module.exports = Ping;