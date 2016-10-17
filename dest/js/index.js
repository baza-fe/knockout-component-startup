(function () {
'use strict';

var style = ".list {\n  position: relative; }\n\n.list .active {\n  color: red; }\n";

var template = "<div class=\"list\" data-bind=\"foreach: users\">\n    <li data-bind=\"click: $parent.onClick, attr: { class: active() ? 'active' : '' }\">\n        <span data-bind=\"text: firstName\"></span>\n        <span data-bind=\"text: lastName\"></span>\n    </li>\n</div>\n";

var __ko_component_label__ = 'list';
var __ko_component_style__ = '';
var __ko_component_template__ = '';
var __ko_component__ = {
    constructor: function constructor(opts) {
        this.onClick = this.onClick.bind(this);
    },


    props: {
        users: ko.types.arrayOf(ko.types.shape({
            firstName: {
                type: ko.types.String,
                required: true
            },
            lastName: ko.types.String,
            active: {
                type: ko.types.Boolean,
                default: false
            }
        }))
    },

    methods: {
        onClick: function onClick(vm, ev) {
            this.users().forEach(function (item) {
                if (item !== vm) {
                    item.active(false);
                }
            });

            vm.active(true);
        }
    },

    style: style,
    template: template
};
__ko_component__.name = __ko_component__.name || __ko_component_label__;
__ko_component__.style = __ko_component__.style || __ko_component_style__;
__ko_component__.template = __ko_component__.template || __ko_component_template__;
ko.components.register(__ko_component__);

var style$1 = ".comment-item {\n  position: relative; }\n\n.comment-item-title {\n  margin: 0; }\n";

var template$1 = "<div class=\"comment-item\">\n    <h2 class=\"comment-item-title\" data-bind=\"text: title\"></h2>\n    <p class=\"comment-item-comment\" data-bind=\"text: comment\"></p>\n</div>\n";

var __ko_component_label__$3 = 'comment-item';
var __ko_component_style__$3 = '';
var __ko_component_template__$3 = '';
var __ko_component__$6 = {
    constructor: function constructor(opts) {
        this.title = ko.observable(opts.title);
        this.comment = ko.observable(opts.comment);
    },


    defaults: {
        title: '',
        comment: ''
    },

    style: style$1,
    template: template$1
};
__ko_component__$6.name = __ko_component__$6.name || __ko_component_label__$3;
__ko_component__$6.style = __ko_component__$6.style || __ko_component_style__$3;
__ko_component__$6.template = __ko_component__$6.template || __ko_component_template__$3;
ko.components.register(__ko_component__$6);

var style$2 = ".comment-list {\n  position: relative; }\n\n.comment-list-wrapper {\n  list-style: none;\n  padding-left: 0; }\n\n.comment-list-item {\n  border-bottom: solid 1px #999999; }\n\n.comment-list-item:last-child {\n  border-bottom: none; }\n";

var template$2 = "<div class=\"comment-list\">\n    <ul class=\"comment-list-wrapper\" data-bind=\"foreach: comments\">\n        <li class=\"comment-list-item\">\n            <comment-item k-title=\"title\" k-comment=\"comment\"></comment-item>\n        </li>\n    </ul>\n</div>\n";

var __ko_component_label__$2 = 'comment-list';
var __ko_component_style__$2 = '';
var __ko_component_template__$2 = '';
var __ko_component__$4 = {
    constructor: function constructor(opts) {
        this.comments = ko.observableArray(opts.comments);
    },


    defaults: {
        comments: []
    },

    methods: {
        addComment: function addComment(title, comment) {
            this.comments.push({
                title: title,
                comment: comment
            });
        }
    },

    style: style$2,
    template: template$2
};
__ko_component__$4.name = __ko_component__$4.name || __ko_component_label__$2;
__ko_component__$4.style = __ko_component__$4.style || __ko_component_style__$2;
__ko_component__$4.template = __ko_component__$4.template || __ko_component_template__$2;
ko.components.register(__ko_component__$4);

var slice = Array.prototype.slice;
var noop = function noop() {};

function word(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

function onName(name) {
  return 'on' + name.split(/[^a-zA-Z0-9]/).reduce(function (rst, w) {
    rst += word(w) || '';
    return rst;
  }, '');
}

var eventMixin = {
  on: function on(name, cb) {
    this._events = this._events || {};
    (this._events[name] = this._events[name] || []).push(cb || noop);
    return this;
  },
  off: function off(name, cb) {
    if (!this._events) return this;
    var queue, index;
    if (!(queue = this._events[name])) return this;
    if (typeof cb === 'function') (index = queue.indexOf(cb)) !== -1 && (queue[index] = noop);else this._events[name] = queue.map(function () {
      return noop;
    });
    return this;
  },
  once: function once(name, cb) {
    var _this = this,
        _arguments = arguments;

    var tmp = function tmp() {
      cb.apply(_this, slice.call(_arguments));
      _this.off(name, tmp);
    };
    this.on(name, tmp);
    return this;
  },
  trigger: function trigger(name) {
    var _this2 = this;

    if (!this._events) return this;
    var queue;
    if (!(queue = this._events[name])) return this;
    var data = slice.call(arguments, 1);
    queue.forEach(function (cb) {
      return cb.apply(_this2, data);
    });
    queue = this._events[name];
    (queue = queue.filter(function (cb) {
      return cb !== noop;
    })).length === 0 ? delete this._events[name] : this._events[name] = queue;
    return this;
  },
  fireAll: function fireAll() {
    var args = slice.call(arguments);
    var name = onName(args[0]);
    this.props[name] && this.props[name].apply(this, args.slice(1));
    return this.fire.apply(this, args);
  }
};

var style$3 = ".comment-btn {\n  color: #999999;\n  border: none;\n  border-radius: 3px;\n  position: relative; }\n\n.comment-btn-default {\n  background-color: #ececec; }\n\n.comment-btn-primary {\n  color: #ffffff;\n  background-color: #38bc9c; }\n\n.comment-btn-danger {\n  color: #ffffff;\n  background-color: #ff493c; }\n";

var template$3 = "<button data-bind=\"text: text, attr: _getRootAttrBind(), click: _onClick\"></button>\n";

var __ko_component_label__$5 = 'comment-btn';
var __ko_component_style__$5 = '';
var __ko_component_template__$5 = '';
var __ko_component__$10 = {
    constructor: function constructor(opts) {
        this.text = ko.observable(opts.text);
        this.theme = opts.theme;
    },


    defaults: {
        theme: 'default'
    },

    mixins: [eventMixin],

    methods: {
        _onClick: function _onClick(vm, ev) {
            if (this.opts.onClick) {
                this.opts.onClick.apply(this, arguments);
            }

            this.trigger('click', vm, ev);
        },
        _getRootAttrBind: function _getRootAttrBind() {
            return {
                'class': [this.componentInfo.name, this.componentInfo.name + '-' + this.theme].join(' ')
            };
        }
    },

    style: style$3,
    template: template$3
};
__ko_component__$10.name = __ko_component__$10.name || __ko_component_label__$5;
__ko_component__$10.style = __ko_component__$10.style || __ko_component_style__$5;
__ko_component__$10.template = __ko_component__$10.template || __ko_component_template__$5;
ko.components.register(__ko_component__$10);

var style$4 = ".comment-form {\n  position: relative; }\n\n.comment-form-input, .comment-form-textarea {\n  border: solid 1px #999999;\n  display: block;\n  width: 100%;\n  margin-bottom: 10px; }\n";

var template$4 = "<div class=\"comment-form\">\n    <input class=\"comment-form-input\" data-bind=\"value: title\" placeholder=\"请输入标题\" />\n    <textarea class=\"comment-form-textarea\" data-bind=\"value: comment\" placeholder=\"请输入评论\"></textarea>\n    <comment-btn text=\"发送\" theme=\"primary\" on-click=\"_onSubmit\"></comment-btn>\n    <comment-btn text=\"清除\" theme=\"danger\" on-click=\"_onClear\"></comment-btn>\n</div>\n";

var __ko_component_label__$4 = 'comment-form';
var __ko_component_style__$4 = '';
var __ko_component_template__$4 = '';
var ERR_EMPTY_TITLE = '请输入标题';
var ERR_EMPTY_COMMENT = '请输入评论';

var __ko_component__$8 = {
    constructor: function constructor(opts) {
        this.title = ko.observable(opts.title);
        this.comment = ko.observable(opts.comment);

        this._onSubmit = this._onSubmit.bind(this);
        this._onClear = this._onClear.bind(this);
    },


    defaults: {
        title: '',
        comment: ''
    },

    mixins: [eventMixin],

    methods: {
        ready: function ready() {
            this.clear();
        },
        validate: function validate() {
            if (!this.title()) {
                return ERR_EMPTY_TITLE;
            }

            if (!this.comment()) {
                return ERR_EMPTY_COMMENT;
            }
        },
        submit: function submit() {
            var errMsg = this.validate();

            if (errMsg) {
                return alert(errMsg);
            }

            this.trigger('submit', {
                title: this.title(),
                comment: this.comment()
            });
        },
        clear: function clear() {
            this.title('');
            this.comment('');
            this.trigger('clear');
        },
        _onSubmit: function _onSubmit() {
            this.submit();
            this.clear();
        },
        _onClear: function _onClear() {
            this.clear();
        }
    },

    style: style$4,
    template: template$4
};
__ko_component__$8.name = __ko_component__$8.name || __ko_component_label__$4;
__ko_component__$8.style = __ko_component__$8.style || __ko_component_style__$4;
__ko_component__$8.template = __ko_component__$8.template || __ko_component_template__$4;
ko.components.register(__ko_component__$8);

var style$5 = ".comment-box {\n  width: 300px;\n  margin-left: auto;\n  margin-right: auto;\n  position: relative; }\n";

var template$5 = "<div class=\"comment-box\">\n    <comment-list></comment-list>\n    <hr />\n    <comment-form></comment-form>\n</div>\n";

var __ko_component_label__$1 = 'comment-box';
var __ko_component_style__$1 = '';
var __ko_component_template__$1 = '';
var __ko_component__$2 = {
    constructor: function constructor(opts) {
        this._onFormSubmitted = this._onFormSubmitted.bind(this);
    },


    methods: {
        ready: function ready() {
            this.commentList = this.ref('comment-list');
            this.commentForm = this.ref('comment-form');

            this.commentForm.on('submit', this._onFormSubmitted);
        },
        _onFormSubmitted: function _onFormSubmitted(comment) {
            this.commentList.addComment(comment.title, comment.comment);
        }
    },

    style: style$5,
    template: template$5
};
__ko_component__$2.name = __ko_component__$2.name || __ko_component_label__$1;
__ko_component__$2.style = __ko_component__$2.style || __ko_component_style__$1;
__ko_component__$2.template = __ko_component__$2.template || __ko_component_template__$1;
ko.components.register(__ko_component__$2);

var template$6 = "<div class=\"headline ui-basis\">\n    <div class=\"g g--row\">\n        <div class=\"c\"></div>\n        <div class=\"c c--3of5\">\n            <h1 class=\"h tac\" data-bind=\"text: text\"></h1>\n        </div>\n        <div class=\"c\"></div>\n    </div>\n</div>\n";

var __ko_component_label__$7 = 'headline';
var __ko_component_style__$7 = '';
var __ko_component_template__$7 = '';
var __ko_component__$14 = {
    constructor: function constructor(opts) {
        this.text = opts.text;
    },


    defaults: {
        text: '标题'
    },

    template: template$6
};
__ko_component__$14.name = __ko_component__$14.name || __ko_component_label__$7;
__ko_component__$14.style = __ko_component__$14.style || __ko_component_style__$7;
__ko_component__$14.template = __ko_component__$14.template || __ko_component_template__$7;
ko.components.register(__ko_component__$14);

var style$6 = ".avatar {\n  width: 24px;\n  height: 24px;\n  position: relative; }\n\n.avatar-img {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%; }\n";

var template$7 = "<div class=\"avatar\">\n    <img class=\"avatar-img\" data-bind=\"attr: _getImageAttrBind()\" />\n</div>\n";

var __ko_component_label__$10 = 'avatar';
var __ko_component_style__$10 = '';
var __ko_component_template__$10 = '';
var __ko_component__$20 = {
    constructor: function constructor(opts) {
        this.src = opts.src;
        this.alt = opts.alt;
    },


    defaults: {
        src: '',
        alt: ''
    },

    methods: {
        _getImageAttrBind: function _getImageAttrBind() {
            return {
                src: this.src,
                alt: ''
            };
        }
    },

    style: style$6,
    template: template$7
};
__ko_component__$20.name = __ko_component__$20.name || __ko_component_label__$10;
__ko_component__$20.style = __ko_component__$20.style || __ko_component_style__$10;
__ko_component__$20.template = __ko_component__$20.template || __ko_component_template__$10;
ko.components.register(__ko_component__$20);

var style$7 = ".topic {\n  margin-left: 10px;\n  margin-right: 10px;\n  position: relative; }\n\n.topic-header, .topic-title, .topic-content {\n  margin-bottom: 0; }\n\n.topic-title {\n  margin-bottom: 20px; }\n\n.topic-content {\n  color: #6d6d6d; }\n";

var template$8 = "<div class=\"topic\">\n    <p class=\"topic-header\">\n        <avatar k-src=\"avatar\"></avatar>\n        <span class=\"topic-author\" data-bind=\"text: author\"></span>\n    </p>\n    <h2 class=\"topic-title\" data-bind=\"text: title\"></h2>\n    <p class=\"topic-content\" data-bind=\"html: content\"></p>\n</div>\n";

var __ko_component_label__$9 = 'topic';
var __ko_component_style__$9 = '';
var __ko_component_template__$9 = '';
var __ko_component__$18 = {
    constructor: function constructor(opts) {
        this.author = opts.author;
        this.title = opts.title;
        this.content = opts.content;
        this.avatar = opts.avatar;
    },


    defaults: {
        author: '',
        lable: '',
        title: '',
        content: ''
    },

    style: style$7,
    template: template$8
};
__ko_component__$18.name = __ko_component__$18.name || __ko_component_label__$9;
__ko_component__$18.style = __ko_component__$18.style || __ko_component_style__$9;
__ko_component__$18.template = __ko_component__$18.template || __ko_component_template__$9;
ko.components.register(__ko_component__$18);

var style$8 = ".topic-list {\n  position: relative; }\n";

var template$9 = "<div class=\"topic-list\">\n    <ul class=\"topic-list-wrapper vlist vlist--loose vlist--basis vlist--solid\" data-bind=\"foreach: topics\">\n        <li class=\"topic-list-item\">\n            <topic k-avatar=\"avatar\"\n                   k-author=\"author\"\n                   k-title=\"title\"\n                   k-content=\"content\">\n            </topic>\n        </li>\n    </ul>\n</div>\n";

var __ko_component_label__$8 = 'topic-list';
var __ko_component_style__$8 = '';
var __ko_component_template__$8 = '';
var __ko_component__$16 = {
    constructor: function constructor(opts) {
        this.url = opts.url;
        this.topics = ko.observableArray(opts.topics);
    },


    defaults: {
        url: '',
        topics: []
    },

    methods: {
        _getTopics: function _getTopics() {
            return $.get(this.url).then(function (result) {
                return result.data.map(function (item) {
                    return {
                        avatar: item.author.avatar_url,
                        author: item.author.loginname,
                        title: item.title,
                        content: item.content
                    };
                });
            });
        },
        fetch: function fetch() {
            var _this = this;

            return this._getTopics().then(function (topics) {
                topics.forEach(function (topic) {
                    _this.topics.push(topic);
                });
            });
        }
    },

    style: style$8,
    template: template$9
};
__ko_component__$16.name = __ko_component__$16.name || __ko_component_label__$8;
__ko_component__$16.style = __ko_component__$16.style || __ko_component_style__$8;
__ko_component__$16.template = __ko_component__$16.template || __ko_component_template__$8;
ko.components.register(__ko_component__$16);

var style$9 = ".index {\n  position: relative; }\n";

var template$10 = "<div class=\"index\">\n    <headline text=\"CNode\"></headline>\n    <topic-list k-url=\"url\"></topic-list>\n</div>\n";

var __ko_component_label__$6 = 'index';
var __ko_component_style__$6 = '';
var __ko_component_template__$6 = '';
var __ko_component__$12 = {
    constructor: function constructor(opts) {
        this.url = opts.url;
    },


    defaults: {
        url: ''
    },

    methods: {
        ready: function ready() {
            this.topicList = this.ref('topic-list');
            this.topicList.fetch();
        }
    },

    style: style$9,
    template: template$10
};
__ko_component__$12.name = __ko_component__$12.name || __ko_component_label__$6;
__ko_component__$12.style = __ko_component__$12.style || __ko_component_style__$6;
__ko_component__$12.template = __ko_component__$12.template || __ko_component_template__$6;
ko.components.register(__ko_component__$12);

ko.components.apply('body');

}());
