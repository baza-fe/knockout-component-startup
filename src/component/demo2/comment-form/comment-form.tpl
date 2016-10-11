<div class="comment-form">
    <input class="comment-form-input" data-bind="value: title" placeholder="请输入标题" />
    <textarea class="comment-form-textarea" data-bind="value: comment" placeholder="请输入评论"></textarea>
    <comment-btn text="发送" theme="primary" on-click="_onSubmit"></comment-btn>
    <comment-btn text="清除" theme="danger" on-click="_onClear"></comment-btn>
</div>
