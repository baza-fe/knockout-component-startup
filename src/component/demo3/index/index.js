import '../headline/headline';
import '../topic-list/topic-list';
import style from './index.scss';
import template from './index.tpl';

export default {
    constructor(opts) {
        this.url = opts.url;
    },

    defaults: {
        url: ''
    },

    methods: {
        ready() {
            this.topicList = this.ref('topic-list');
            this.topicList.fetch();
        }
    },

    style,
    template
}
