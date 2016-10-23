<div class="scroller" data-bind="attr: _getRootAttrBind()">
    <div class="scroller-wrapper" data-bind="event: _getWrapperEventBind()">
        <div class="scroller-body">
            <!-- ko template: { nodes: componentInfo.templateNodes, data: $data } --><!-- /ko -->
        </div>
    </div>
    <div class="scroller-shadow" data-bind="visible: enableBar">
        <div class="scroller-face" data-bind="style: _getFaceStyleBind(), event: _getFaceEventBind()"></div>
    </div>
</div>
