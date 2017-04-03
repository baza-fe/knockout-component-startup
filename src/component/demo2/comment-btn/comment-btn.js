import eventMixin from '../../../js/mixin/event';
import style from './comment-btn.scss';
import template from './comment-btn.tpl';

export default {
    props: {
        text: ko.types.string,
        theme: {
            type: ko.types.oneOf('default', 'primary', 'danger'),
            default: 'default'
        }
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
            const name = this.componentInfo.name;

            return {
                'class': [
                    name,
                    `${name}-${this.theme()}`
                ].join(' ')
            };
        }
    },

    style,
    template
};
