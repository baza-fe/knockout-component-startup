import style from './scroller.scss';
import template from './scroller.tpl';

export default {
    props: {
        height: ko.types.number,
        scrollTop: ko.types.number,
        scrollHeight: ko.types.number,

        active: ko.types.boolean,
        enableBar: { type: ko.types.Boolean, default: true },
        enableDrag: { type: ko.types.Boolean, default: true },
        enableTrack: { type: ko.types.Boolean, default: true }
    },

    methods: {
        created() {
            this._onWrapperScrolled = this._onWrapperScrolled.bind(this);
            this._onFaceMouseDown = this._onFaceMouseDown.bind(this);
            this._onGlobalMouseUp = this._onGlobalMouseUp.bind(this);
            this._onGloalMouseMove = this._onGloalMouseMove.bind(this);
        },

        ready() {
            this._wrapper = this.componentInfo.element.querySelector('.scroller-wrapper');
            this.refresh();
        },

        refresh(node = this._wrapper) {
            this.height(node.clientHeight);
            this.scrollTop(node.scrollTop);
            this.scrollHeight(node.scrollHeight);
        },

        _getRootAttrBind() {
            const name = this.componentInfo.name;

            return {
                class: [
                    name,
                    this.active() ? 'active' : '',
                    this.enableDrag() ? `${name}-drag` : '',
                    this.enableTrack() ? `${name}-track` : ''
                ].join(' ')
            };
        },

        _getWrapperEventBind() {
            const events = {};

            if (this.enableBar()) {
                events['scroll'] = this._onWrapperScrolled;
            }

            return events;
        },

        _getFaceEventBind() {
            const events = {};

            if (this.enableDrag()) {
                events['mousedown'] = this._onFaceMouseDown;
                events['mouseup'] = this._onFaceMouseUp;
                events['mousemove'] = this._onFaceMouseMove;
            }

            return events;
        },

        _getFaceStyleBind() {
            return {
                marginTop: `${this.faceTop()}px`,
                height: `${this.faceHeight()}px`
            };
        },

        _installGlobalEvents() {
            document.addEventListener('mouseup', this._onGlobalMouseUp);
            document.addEventListener('mousemove', this._onGloalMouseMove);
        },

        _uninstallGlobalEvents() {
            document.removeEventListener('mouseup', this._onGlobalMouseUp);
            document.removeEventListener('mousemove', this._onGloalMouseMove);
        },

        _onWrapperScrolled(vm, ev) {
            this.refresh(ev.target);
        },

        _onFaceMouseDown(vm, ev) {
            this._pageY = ev.pageY;
            this._faceTop = this.faceTop();
            this._installGlobalEvents();
            this.active(true);
        },

        _onGlobalMouseUp(ev) {
            this._uninstallGlobalEvents();
            this.active(false);
        },

        _onGloalMouseMove(ev) {
            const height = this.height();
            const scrollHeight = this.scrollHeight();
            const expectY = this._faceTop + ev.pageY - this._pageY;
            const actualY = Math.min(height - this.faceHeight(), Math.max(expectY, 0));

            this._wrapper.scrollTop = actualY * scrollHeight / height;
        }
    },

    pureComputed: {
        faceTop() {
            const height = this.height();
            const scrollTop = this.scrollTop();
            const scrollHeight = this.scrollHeight();

            return scrollTop * height / scrollHeight;
        },

        faceHeight() {
            const height = this.height();
            const scrollHeight = this.scrollHeight();

            if (height === scrollHeight) {
                return height;
            } else {
                return height * height / scrollHeight;
            }
        }
    },

    style,
    template
}
