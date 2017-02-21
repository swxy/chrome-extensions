/**
 * Created by swxy on 2017/2/20.
 */
function Router(name, rules) {
    this.name = name;
    this.rules = rules || {};
}

Router.prototype = {
    constructor: Router,
    addRule: function (pattern, callback) {
        this.rules[pattern] = callback;
    },
    addRules: function (rules) {
        for (var rule in rules) {
            if (rules.hasOwnProperty(rule)) {
                this.rules[rule] = rules[rule];
            }
        }
    },
    navigate: function (pattern) {
        if (!this.rules[pattern]) {
            throw Error(pattern + ' not found');
        }
        this.rules[pattern].init(Array.prototype.slice.call(arguments, 1));
    },
    clear: function (pattern) {
        if (!pattern) {
            this.rules = {};
            return true;
        }
        if (this.rules[pattern]) {
            delete this.rules[pattern];
            return true;
        }
        return false;
    }
};