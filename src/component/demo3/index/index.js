import '../headline/headline';
import '../topic-list/topic-list';
import style from './index.scss';
import template from './index.tpl';

export default {
    props: {
        url: ko.types.string
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
