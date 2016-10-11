import template from './headline.tpl';

export default {
    constructor(opts) {
        this.text = opts.text;
    },

    defaults: {
        text: '标题'
    },

    template
}
