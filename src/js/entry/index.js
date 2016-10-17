import '../../component/demo1/markdown-editor/markdown-editor';
import '../../component/demo2/comment-box/comment-box';
import '../../component/demo3/index/index';

ko.applyBindings({
    users: [
        {
            active: true,
            firstName: 'jim',
            lastName: 1
        },
        {
            firstName: 'lei',
            lastName: 'li'
        },
        {
            firstName: 'pony',
            lastName: 'ma'
        }
    ]
});
