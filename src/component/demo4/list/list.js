import style from './list.scss';
import template from './list.tpl';

export default {
    constructor(opts) {
        this.onClick = this.onClick.bind(this);
    },

    props: {
        users: ko.types.arrayOf(
            ko.types.shape({
                firstName: {
                    type: ko.types.String,
                    required: true
                },
                lastName: ko.types.String,
                active: {
                    type: ko.types.Boolean,
                    default: false
                }
            })
        )
    },

    methods: {
        onClick(vm, ev) {
            this.users().forEach((item) => {
                if (item !== vm) {
                    item.active(false);
                }
            });

            vm.active(true);
        }
    },

    style,
    template
};
