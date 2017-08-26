/**
 * Created by jayanth on 03/08/17.
 */
class ShareUrlBuilder {
    static  createShareUrl(itemObj) {
        var baseUrl = window.location.href
        baseUrl = baseUrl + "?id=" + itemObj.sys.id
        return baseUrl;
    }
}

module.exports = ShareUrlBuilder;