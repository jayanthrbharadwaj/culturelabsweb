/**
 * Created by jayanth on 27/07/17.
 */
var utils = require('./constants')

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
};

class PreProcess {
    static  filterBasedOnCurrentDate(response) {
        var date = new Date();
        var index = -1;
        for (var item of response.items) {
            index++;
            console.log(item.sys.contentType.sys.id+"    "+utils.data.sankalpaMantra);
            if (item.sys.contentType.sys.id == utils.data.sankalpaMantra) {
                var itemDate = new Date(item.fields.dateAndTime);
                if (date.yyyymmdd() === itemDate.yyyymmdd()) {

                } else {
                    response.items.splice(index, 1);
                }
            }
        }
        return response;
    }
}

module.exports = PreProcess;