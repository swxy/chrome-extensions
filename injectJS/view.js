/**
 * Created by swxy on 2017/2/20.
 */

/**
 * util function
 */

/**
 * 扩展对象
 * @param override 是否覆盖同名属性 默认为覆盖(true)
 * @param target 被扩展的对象
 * @param source 扩展对象
 */
function extend(override, target, source) {
    if (typeof override === 'object') {
        source = target;
        target = override;
        override = true;
    }
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (!override && target[key] === undefined) {
                target[key] = source[key];
            }
            else if (override) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

function once(fn, context) {
    var result = '';
    return function () {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    }
}

function Common() {
    //just define common function
    // sub will inherit this function
    this.container = document.querySelector('.container');
}

Common.prototype = {
    constructor: Common,
    init: function () {
        // do nothing
    },
    show: function (html) {
        this.container.innerHTML = html;
    },
    destroy: function () {
        this.container.innerHTML = '';
    }
};

function List(model) {
    this.dom = document.querySelector('#listTpl');
    this.tpl = this.dom.innerHTML;
    this.model = model;
}

List.prototype = new Common();
extend(List.prototype, {
    init: function () {
        var self = this;
        this.parse(function(entries) {
            var html = Template(self.tpl, entries);
            self.show(html);
        });
    },
    parse: function (callback) {
        this.model.list(callback);
    },
    bind: function () {
        this.dom.addEventListener('click', function (event) {
            var target = event.target;
        });
    }
});

function Add(model) {
    this.dom = document.querySelector('#addTpl');
    this.tpl = this.dom.innerHTML;
    this.model = model;
}

Add.prototype = new Common();
extend(Add.prototype, {
    init: function (key) {
        var self = this;
        this.model.get(key, function (entry) {
            var html = Template(self.tpl, entry);
            self.show(html);
        })
    },
    bind: function () {
        this.dom.addEventListener('click', function (event) {
            var target = event.target;
        });
    }
});


function init() {
    var model = new Model();
    var router = new Router('inject');
    var list = new List(model);
    router.addRule(List.name, list);
    var add = new Add(model);
    router.addRule(Add.name, add);

    return router;
}

window.router = init();

document.addEventListener('DOMContentLoaded', function () {
    router.navigate(List.name);
    document.querySelector('.add').addEventListener('click', function (e) {
        router.navigate(Add.name);
    })
});