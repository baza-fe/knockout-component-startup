import style from './comment-item.scss';
import template from './comment-item.tpl';

export default {
    constructor(opts) {
        this.title = ko.observable(opts.title);
        this.comment = ko.observable(opts.comment);
    },

    defaults: {
        title: '',
        comment: ''
    },

    style,
    template
};
