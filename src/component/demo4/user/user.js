import style from './user.scss';
import template from './user.tpl';

export default {
    props: {
        firstName: ko.types.String,
        lastName:  ko.types.String
    },

    style,
    template
}
