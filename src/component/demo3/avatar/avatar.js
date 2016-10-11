import style from './avatar.scss';
import template from './avatar.tpl';

export default {
    constructor(opts) {
        this.src = opts.src;
        this.alt = opts.alt;
    },

    defaults: {
        src: '',
        alt: ''
    },

    methods: {
        _getImageAttrBind() {
            return {
                src: this.src,
                alt: ''
            };
        }
    },

    style,
    template
}
