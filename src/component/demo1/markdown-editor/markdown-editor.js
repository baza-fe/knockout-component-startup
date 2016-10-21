import marked from 'marked';
import style from './markdown-editor.scss';
import template from './markdown-editor.tpl';

export default {
    props: {
        markdown: ko.types.string,
        html: ko.types.string
    },

    methods: {
        created() {
            this._onMarkdownChanged = this._onMarkdownChanged.bind(this);
        },

        ready() {
            this.markdown.subscribe(this._onMarkdownChanged);
        },

        _convertMarkdownToHTML(markdown) {
            return markdown ? marked(markdown) : '';
        },

        _onMarkdownChanged(markdown) {
            this.html(this._convertMarkdownToHTML(markdown));
        }
    },

    style,
    template
};
