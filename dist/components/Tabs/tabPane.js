import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabContext } from './tabs';
var TabPane = function (props) {
    var context = useContext(TabContext);
    var children = props.children, index = props.index;
    var classes = classNames('tab-item');
    return (React.createElement("div", { className: classes, style: { display: "" + (index === context.index ? 'block' : 'none') } }, children));
};
TabPane.displayName = 'TabPane';
export default TabPane;
