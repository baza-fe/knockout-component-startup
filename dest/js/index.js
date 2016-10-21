(function () {
'use strict';

var style = ".todo {\n  position: relative; }\n";

var template = "<div class=\"todo\">\n    <ul class=\"todo-undo\" data-bind=\"foreach: { data: todoList, as: 'todo' }\">\n        <li data-bind=\"style: { 'text-decoration': todo.finish() ? 'line-through' : '' }\">\n            <span data-bind=\" text: todo.title\"></span>\n            <span data-bind=\" text: todo.content\"></span>\n            <input type=\"checkbox\" data-bind=\"checked: finish\" />\n        </li>\n    </ul>\n    <div data-bind=\"visible: !todoList().length\">press enter and add a new todo:</div>\n    <input type=\"text\" data-bind=\"event: { keydown: onInputKeyDown }\">\n</div>\n";

var __ko_component_label__ = 'todo';
var __ko_component_style__ = '';
var __ko_component_template__ = '';
var todo = ko.types.shape({
    title: ko.types.string,
    content: ko.types.string,
    finish: ko.types.boolean
});

var __ko_component__ = {
    props: {
        todoList: ko.types.arrayOf(todo)
    },

    methods: {
        created: function created() {
            this.onInputKeyDown = this.onInputKeyDown.bind(this);
        },
        add: function add(title, content) {
            if (!title) {
                return;
            }

            this.todoList.push({
                title: title,
                content: content
            });
        },
        onInputKeyDown: function onInputKeyDown(vm, ev) {
            if (ev.keyCode === 13) {
                this.add(ev.target.value);
                ev.target.value = '';
            }

            return true;
        }
    },

    style: style,
    template: template
};
__ko_component__.name = __ko_component__.name || __ko_component_label__;
__ko_component__.style = __ko_component__.style || __ko_component_style__;
__ko_component__.template = __ko_component__.template || __ko_component_template__;
ko.components.register(__ko_component__);

// import '../../component/demo1/markdown-editor/markdown-editor';
// import '../../component/demo2/comment-box/comment-box';
// import '../../component/demo3/index/index';
// import '../../component/demo4/person/person';
ko.applyBindings(null);

}());
