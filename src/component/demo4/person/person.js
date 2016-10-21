import style from './person.scss';
import template from './person.tpl';

export default {
    props: {
        profile: ko.types.shape({
            name: ko.types.shape({
                first: ko.types.String,
                middle: ko.types.string,
                last: ko.types.String
            }),
            age: ko.types.Number
        }),

        addressList: ko.types.arrayOf(
            ko.types.shape({
                country: ko.types.string,
                province: ko.types.string,
                city: ko.types.String,
                location: ko.types.String,
            })
        )
    },

    methods: {
        created() {
            this.profile.name.first('ming');
            this.profile.name.last('yao');
            this.profile.age(2016 - 1980);
            this.addressList.push({
                country: 'china',
                city: 'shanghai',
                location: 'xuhui'
            });
            this.addressList.push({
                country: 'america',
                province: 'texas',
                city: 'houston',
                location: 'unknow'
            });
        },

        ready() {
        }
    },

    style,
    template
}
