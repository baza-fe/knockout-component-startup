import template from './headline.tpl';

export default {
    props: {
        text: {
            type: ko.types.String,
            default: '标题'
        }
    },

    template
}
