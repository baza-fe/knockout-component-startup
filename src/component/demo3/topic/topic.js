import '../avatar/avatar'
import style from './topic.scss'
import template from './topic.tpl'

export default {
  props: {
    avatar: ko.types.string,
    author: ko.types.string,
    title: ko.types.string,
    content: ko.types.string
  },

  style,
  template
}
