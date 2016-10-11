import '../comment-list/comment-list';
import '../comment-form/comment-form';
import style from './comment-box.scss';
import template from './comment-box.tpl';

export default {
    constructor(opts) {
        this._onFormSubmitted = this._onFormSubmitted.bind(this);
    },

    methods: {
        ready() {
            this.commentList = this.ref('comment-list');
            this.commentForm = this.ref('comment-form');

            this.commentForm.on('submit', this._onFormSubmitted);
        },

        _onFormSubmitted(comment) {
            this.commentList.addComment(comment.title, comment.comment);
        }
    },

    style,
    template
};
