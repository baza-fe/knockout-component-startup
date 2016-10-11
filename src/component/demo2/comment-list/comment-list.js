import '../comment-item/comment-item';
import style from './comment-list.scss';
import template from './comment-list.tpl';

export default {
    constructor(opts) {
        this.comments = ko.observableArray(opts.comments);
    },

    defaults: {
        comments: []
    },

    methods: {
        addComment(title, comment) {
            this.comments.push({
                title: title,
                comment: comment
            });
        }
    },

    style,
    template
};
