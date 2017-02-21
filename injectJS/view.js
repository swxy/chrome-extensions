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

/**
 * 共用类，定义html切换
 * @constructor
 */
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

List.prototype = extend(new Common(), {
    init: function () {
        var self = this;
        this.parse(function (entries) {
            var html = Template(self.tpl, entries);
            self.show(html);
            self.bind();
        });
    },
    parse: function (callback) {
        this.model.list(callback);
    },
    bind: function () {
        this.container.querySelector('.list-container')
            .addEventListener('click', function (event) {
                var target = event.target;
                // 编辑按钮或者查看按钮
                if (target.tagName === 'BUTTON') {
                    var key = target.parentNode.dataset['key'];
                    var type = target.dataset['type'];
                    if (type === 'edit') {
                        router.navigate(Add.name, key);
                    }
                    else {
                        router.navigate(Detail.name, key);
                    }
                }
            });
    }
});

function Add(model) {
    this.dom = document.querySelector('#addTpl');
    this.tpl = this.dom.innerHTML;
    this.model = model;
}

Add.prototype = extend(new Common(), {
    init: function (key) {
        var self = this;
        this.model.get(key, function (entry) {
            var key = Object.keys(entry);
            var data = {};
            if (key.length) {
                key = key[0];
                data = entry[key];
            }
            console.log(data);
            var html = Template(self.tpl, data);
            self.show(html);
            self.bind();
        })
    },
    bind: function () {
        var self = this;
        self.container.querySelector('.add-container')
            .addEventListener('click', function (event) {
                var target = event.target;
                if (target.tagName === 'BUTTON') {
                    var type = target.dataset['type'];
                    if (type === 'save' && self.saveFormData()) {
                        router.navigate(List.name);
                    }
                    else {
                        router.navigate(List.name);
                    }
                }
            });
    },
    saveFormData: function () {
        var $ = document.querySelector.bind(document);
        var $domain = $('#domain');
        var $script = $('#script');

        var dValue = $domain.value.trim();
        var sValue = $script.value.trim();
        if (!dValue || !sValue) {
            this.showError();
            return false;
        }

        console.log(dValue, sValue);
        // 保存到本地
        var data = {};
        data[dValue] = {domain: dValue, script: sValue, checked: true};
        this.model.set(data, function () {
            console.log('save to local success');
            $domain.value = '';
            $script.value = '';
        });
        return true
    },
    showError: function () {
        var $error = document.querySelector('#error');
        $error.style.display = 'block';
    }
});

function Detail(model) {
    this.dom = document.querySelector('#viewTpl');
    this.tpl = this.dom.innerHTML;
    this.model = model;
}

Detail.prototype = extend(new Common(), {
    init: function (key) {
        var self = this;
        this.model.get(key, function (entry) {
            var key = Object.keys(entry);
            var data = {};
            if (key.length) {
                key = key[0];
                data = entry[key];
            }
            var html = Template(self.tpl, data);
            self.show(html);
            self.bind();
        })
    },
    bind: function () {
        this.container.querySelector('.view-container')
            .addEventListener('click', function (event) {
                var target = event.target;
                console.log(target);
                if (target.tagName === 'BUTTON') {
                    router.navigate(List.name);
                }
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

    var detail = new Detail(model);
    router.addRule(Detail.name, detail);

    return router;
}

window.router = init();

document.addEventListener('DOMContentLoaded', function () {
    router.navigate(List.name);
    document.querySelector('.add').addEventListener('click', function (e) {
        router.navigate(Add.name);
    })
});

// document.querySelectorAll('#top-bar').forEach(function(item){item.style.display="none"});
// document.querySelector('#adbox').style.display="none";