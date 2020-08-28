import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var TabContext = createContext({ index: 0 });
var Tabs = function (props) {
    var onSelect = props.onSelect, children = props.children;
    var _a = useState(0), activeIndex = _a[0], setActiveIndex = _a[1];
    var Provider = TabContext.Provider;
    var passedContext = {
        index: activeIndex
    };
    var handleClick = function (e, index) {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var renderTabList = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames('tabs-tab', {
                'is-active': activeIndex === index,
                'is-disabled': disabled
            });
            return (React.createElement("li", { className: classes, key: index, onClick: function (e) { return handleClick(e, index); } }, label));
        });
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabPane') {
                return React.cloneElement(childElement, {
                    index: index
                });
            }
            else {
                console.error('Tabs children show be TabPane Element');
            }
        });
    };
    return (React.createElement("div", { className: 'levi-tabs' },
        React.createElement("div", { className: 'tabList' }, renderTabList()),
        React.createElement(Provider, { value: passedContext },
            React.createElement("div", { className: 'tabHolder' }, renderChildren()))));
};
export default Tabs;
