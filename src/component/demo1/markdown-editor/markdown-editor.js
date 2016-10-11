import marked from 'marked';
import style from './markdown-editor.scss';
import template from './markdown-editor.tpl';

export default {
    constructor(opts) {
        this.html = ko.observable(opts.html);
        this.markdown = ko.observable(opts.markdown);

        this._onMarkdownChanged = this._onMarkdownChanged.bind(this);
    },

    defaults: {
        markdown: '',
        html: ''
    },

    methods: {
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