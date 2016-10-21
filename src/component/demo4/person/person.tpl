<div class="person">
    <p data-bind="with: profile">
        My name is <span data-bind="text: name.first"></span><span data-bind="text: name.middle"></span><span data-bind="text: name.last"></span>.I am <span data-bind="text: age"></span> years old.
    </p>
    <p>
        I am living in
        <span data-bind="foreach: { data: addressList, as: 'address' }">
            <br>
            <span data-bind="text: location"></span>
            <span data-bind="text: city"></span>
            <span data-bind="text: province"></span>
            <span data-bind="text: country"></span>
        </span>
    </p>
</div>
