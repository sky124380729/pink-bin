import React, { useState } from 'react';
import Icon from '../Icon/icon';
import Transiton from '../Transition/transition';
import classNames from 'classnames';
var Alert = function (props) {
    var _a;
    var _b = useState(true), flag = _b[0], setFlag = _b[1];
    var type = props.type, title = props.title, message = props.message, closeable = props.closeable, animation = props.animation;
    var classes = classNames('alert', (_a = {},
        _a["alert-" + type] = type,
        _a));
    return (React.createElement(Transiton, { timeout: 300, in: flag, animation: animation },
        React.createElement("div", { className: classes },
            title && React.createElement("p", { className: 'title' }, title),
            React.createElement("p", { className: 'message' }, message),
            closeable && (React.createElement("span", { className: 'alert-close-btn', onClick: function (e) { return setFlag(false); } },
                React.createElement(Icon, { icon: 'times' }))))));
};
Alert.defaultProps = {
    message: 'this is alert!',
    closeable: true
};
export default Alert;
