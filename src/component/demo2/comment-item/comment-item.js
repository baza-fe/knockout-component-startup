import style from './comment-item.scss';
import template from './comment-item.tpl';

export default {
    props: {
        title: ko.types.string,
        comment: ko.types.string
    },

    style,
    template
};
