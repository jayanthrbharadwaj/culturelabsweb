/**
 * Created by jayanth on 24/07/17.
 */
class ImageUtil {
    static cleanAndSetPhotoArray(tempCarousal) {
        var photoCarousal = [];
        for (var i = 0; i < tempCarousal.length; i++) {
            photoCarousal.push(tempCarousal[i].split("(//")[1]);
        }
        for (var i = 0; i < photoCarousal.length; i++) {
            if (photoCarousal[i] != null) {
                photoCarousal[i] = "http://" + photoCarousal[i].replace(')', '');
            }
        }

        Array.prototype.clean = function (deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };

        photoCarousal.clean(undefined);
        return photoCarousal;
    }

    static getImageUrl(url) {
        if (url.indexOf("(//") != -1) {
            url = url.split("(//")[1];
            url = "http://" + url.replace(')', '');
            return url;
        }
        return url
    }
}

module.exports = ImageUtil;