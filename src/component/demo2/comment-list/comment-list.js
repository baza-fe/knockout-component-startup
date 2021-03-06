import '../comment-item/comment-item'
import style from './comment-list.scss'
import template from './comment-list.tpl'

export default {
  props: {
    comments: ko.types.arrayOf(
            ko.types.shape({
              title: ko.types.string,
              comment: ko.types.string
            })
        )
  },

  methods: {
    addComment (title, comment) {
      this.comments.push({
        title: title,
        comment: comment
      })
    }
  },

  style,
  template
}
