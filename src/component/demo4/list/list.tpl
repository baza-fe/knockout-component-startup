<div class="list" data-bind="foreach: users">
    <li data-bind="click: $parent.onClick, attr: { class: active() ? 'active' : '' }">
        <span data-bind="text: firstName"></span>
        <span data-bind="text: lastName"></span>
    </li>
</div>
