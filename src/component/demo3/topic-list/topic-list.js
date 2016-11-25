import '../topic/topic';
import style from './topic-list.scss';
import template from './topic-list.tpl';

export default {
    props: {
        url: ko.types.string,
        topics: ko.types.arrayOf(
            ko.types.shape({
                avatar: ko.types.string,
                author: ko.types.string,
                title: ko.types.string,
                content: ko.types.string
            })
        )
    },

    methods: {
        _getTopics() {
            return $.get(this.url())
                .then((result) => {
                    return result.data.map((item) => {
                        return {
                            avatar: item.author.avatar_url,
                            author: item.author.loginname,
                            title: item.title,
                            content: item.content
                        };
                    });
                });
        },

        fetch() {
            return this._getTopics()
                .then((topics) => {
                    topics.forEach((topic) => {
                        this.topics.push(topic);
                    });
                });
        }
    },

    style,
    template
}
