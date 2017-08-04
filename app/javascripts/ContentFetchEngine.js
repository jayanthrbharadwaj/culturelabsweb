/**
 * Created by jayanth on 03/04/17.
 */
var contentful = require('contentful')
var PreProcess = require('./utils/PreProcess')
const SPACE_ID = 'iqy0wgjj6d1k'
const ACCESS_TOKEN = '8d83bc81eab5f712d61da8877b2ef328dc851695733a9375410f7cc8478edef2'
const serverCache = require('./cacheKeys.json')
const NodeCache = require("node-cache");

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
})
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
                    response = PreProcess.filterBasedOnCurrentDate(response);
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
    },

    getItemDetailResponse: function (req, callBackFun) {

        return client.getEntry(req.query.id)
            .then((response) => {
                myCache.set(serverCache.CACHE_KEYS.ITEMDETAIL, response, function (err, success) {
                    if (!err && success) {
                        console.log("success " + success + " failure " + err)
                    }
                });
                response = PreProcess.filterBasedOnCurrentDate(response);
                if (callBackFun)callBackFun(JSON.stringify(response))
            })
            .catch((error) => {
                console.log('\x1b[31merror occured')
                console.log(error)
            })

    },
    getItemAsset: function (req, callBackFun) {
        return client.getAsset(req.query.id)
            .then((response) => {
                myCache.set(serverCache.CACHE_KEYS.IMAGEREQ, response, function (err, success) {
                    if (!err && success) {
                        console.log("success " + success + " failure " + err)
                    }
                });
                response = PreProcess.filterBasedOnCurrentDate(response);
                if (callBackFun)callBackFun(JSON.stringify(response))
            })
            .catch((error) => {
                console.log('\x1b[31merror occured')
                console.log(error)
            })
    }
}

