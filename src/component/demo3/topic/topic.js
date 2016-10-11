import '../avatar/avatar';
import style from './topic.scss';
import template from './topic.tpl';

export default {
    constructor(opts) {
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

    style,
    template
}
