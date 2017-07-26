/**
 * Created by jayanth on 03/04/17.
 */
var contentful = require('contentful')
var util = require('util')
const SPACE_ID = 'ypb8g5qr54b8'
const ACCESS_TOKEN = '192467fd006455dd5ae39e2354119895112ada51aae69a741eaee8edfdf6e5a3'
const serverCache = require('./cacheKeys.json')
const NodeCache = require("node-cache");

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
})
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
};
const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});
myCache.on("expired", function (key, value) {

});
myCache.on("del", function (key, value) {

});
module.exports = {
    handleCallBack: function (item) {
        return handleCallBack(item);
    }
};
function handleCallBack(item) {
    return item
}
module.exports = {
    getHomeScreenResponse: function (callBackFun) {
        if (myCache.get(serverCache.CACHE_KEYS.HOME) == undefined) {
            return client.getEntries()
                .then((response) => {
                    myCache.set(serverCache.CACHE_KEYS.HOME, response, function (err, success) {
                        if (!err && success) {
                            console.log("success " + success + " failure " + err)
                        }
                    });
                    response = filterBasedOnCurrentDate(response);
                    if (callBackFun)callBackFun(JSON.stringify(response))
                })
                .catch((error) => {
                    console.log('\x1b[31merror occured')
                    console.log(error)
                })
        } else {
            var cache = [];
            callBackFun(JSON.stringify(myCache.get(serverCache.CACHE_KEYS.HOME), function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            }));
            cache = null
        }

        function filterBasedOnCurrentDate(response) {
            var date = new Date();
            var index = -1;
            for (var item of response.items) {
                index++;
                if (item.sys.contentType.sys.id == 'subhaashita') {
                    var itemDate = new Date(item.fields.date);
                    if (date.yyyymmdd() === itemDate.yyyymmdd()) {

                    } else {
                        response.items.splice(index, 1);
                    }
                }
            }
            return response;
        }
    }
}

