import eventMixin from '../../../js/mixin/event';
import style from './comment-btn.scss';
import template from './comment-btn.tpl';

export default {
    constructor(opts) {
        this.text = ko.observable(opts.text);
        this.theme = opts.theme;
    },

    defaults: {
        theme: 'default'
    },

    mixins: [
        eventMixin
    ],

    methods: {
        _onClick(vm, ev) {
            if (this.opts.onClick) {
                this.opts.onClick.apply(this, arguments);
            }

            this.trigger('click', vm, ev);
        },

        _getRootAttrBind() {
            return {
                'class': [
                    this.componentInfo.name,
                    `${this.componentInfo.name}-${this.theme}`
                ].join(' ')
            }
        }
    },

    style,
    template
};
