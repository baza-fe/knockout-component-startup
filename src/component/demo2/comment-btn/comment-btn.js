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
            return {
                'class': [
                    this.componentInfo.name,
                    `${this.componentInfo.name}-${this.theme()}`
                ].join(' ')
            }
        }
    },

    style,
    template
};
