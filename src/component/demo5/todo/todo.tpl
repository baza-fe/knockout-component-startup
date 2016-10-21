<div class="todo">
    <ul class="todo-undo" data-bind="foreach: { data: todoList, as: 'todo' }">
        <li data-bind="style: { 'text-decoration': todo.finish() ? 'line-through' : '' }">
            <span data-bind=" text: todo.title"></span>
            <span data-bind=" text: todo.content"></span>
            <input type="checkbox" data-bind="checked: finish" />
        </li>
    </ul>
    <div data-bind="visible: !todoList().length">press enter and add a new todo:</div>
    <input type="text" data-bind="event: { keydown: onInputKeyDown }">
</div>
