import style from './avatar.scss';
import template from './avatar.tpl';

export default {
    props: {
        src: ko.types.string,
        alt: ko.types.string
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
