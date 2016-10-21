import '../comment-btn/comment-btn';
import eventMixin from '../../../js/mixin/event';
import style from './comment-form.scss';
import template from './comment-form.tpl';

const ERR_EMPTY_TITLE = '请输入标题';
const ERR_EMPTY_COMMENT = '请输入评论';

export default {
    props: {
        title: ko.types.string,
        comment: ko.types.string
    },

    mixins: [
        eventMixin
    ],

    methods: {
        created() {
            this._onSubmit = this._onSubmit.bind(this);
            this._onClear = this._onClear.bind(this);
        },

        ready() {
            this.clear();
        },

        validate() {
            if (!this.title()) {
                return ERR_EMPTY_TITLE;
            }

            if (!this.comment()) {
                return ERR_EMPTY_COMMENT;
            }
        },

        submit() {
            const errMsg = this.validate();

            if (errMsg) {
                return alert(errMsg);
            }

            this.trigger('submit', {
                title: this.title(),
                comment: this.comment()
            });
        },

        clear() {
            this.title('');
            this.comment('');
            this.trigger('clear');
        },

        _onSubmit() {
            this.submit();
            this.clear();
        },

        _onClear() {
            this.clear();
        }
    },

    style,
    template
};
