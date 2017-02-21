/**
 * Created by swxy on 2017/2/20.
 */
function Model() {
    // do nothing
    this.dataCenter = chrome.storage.local;
}

Model.prototype = {
    constructor: Model,
    set: function (data, callback) {
        this.dataCenter.set(data, callback);
    },
    get: function (key, callback) {
        // callback param: query object;
        if (key) {
            return this.dataCenter.get(key, callback);
        }
        return this.dataCenter.get(null, callback);
    },
    list: function (callback) {
        this.get(null, function (queries) {
            var keys = Object.keys(queries);
            var entries = keys.map(function (key) {
                return queries[key];
            });
            callback(entries);
        });
    }
};
