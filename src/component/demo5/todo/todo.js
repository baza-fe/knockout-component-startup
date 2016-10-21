import style from './todo.scss';
import template from './todo.tpl';

const todo = ko.types.shape({
    title: ko.types.string,
    content: ko.types.string,
    finish: ko.types.boolean
});

export default {
    props: {
        todoList: ko.types.arrayOf(todo)
    },

    methods: {
        created() {
            this.onInputKeyDown = this.onInputKeyDown.bind(this);
        },

        add(title, content) {
            if (!title) {
                return;
            }

            this.todoList.push({
                title: title,
                content: content
            });
        },

        onInputKeyDown(vm, ev) {
            if (ev.keyCode === 13) {
                this.add(ev.target.value);
                ev.target.value = '';
            }

            return true;
        }
    },

    style,
    template
}
