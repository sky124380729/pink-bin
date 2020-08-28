var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useClickOutside from '../../hooks/useClickOutside';
// eslint-disable-next-line @typescript-eslint/no-empty-function
export var SelectContext = createContext({ onSelect: function () { }, selectedArr: [] });
var Select = function (props) {
    var disabled = props.disabled, children = props.children, onSelect = props.onSelect, className = props.className, mode = props.mode, onChange = props.onChange, onVisibleChange = props.onVisibleChange, restProps = __rest(props, ["disabled", "children", "onSelect", "className", "mode", "onChange", "onVisibleChange"]);
    var _a = useState(''), value = _a[0], setValue = _a[1];
    var _b = useState(false), optionVisible = _b[0], setOptionVisible = _b[1];
    var _c = useState([]), selectedArr = _c[0], setSelectedArr = _c[1];
    var componentRef = useRef(null);
    //TODO: 此处创建了一个标识，通过这个我们可以只在更新时候运行effect
    // 当然，项目中可能经常遇到这么个情况，我们可以把它创建为一个自定义hook
    var triggered = useRef(false);
    var classes = classNames('levi-select', className);
    var handleClick = function (e) {
        triggered.current = true;
        setOptionVisible(true);
    };
    var Provider = SelectContext.Provider;
    useClickOutside(componentRef, function () {
        setOptionVisible(false);
        triggered.current = false;
    });
    // 单选事件
    var handleSingle = function (value) {
        setValue(value);
        setOptionVisible(false);
        if (onSelect) {
            onSelect(value);
        }
    };
    // 多选事件
    var handleMultiple = function (value) {
        // 如果已经存在，那么删除
        var index = selectedArr.indexOf(value);
        if (index !== -1) {
            var list = __spreadArrays(selectedArr);
            list.splice(index, 1);
            setSelectedArr(list);
        }
        else {
            setSelectedArr(__spreadArrays(selectedArr, [value]));
        }
    };
    var handleIconClick = function (value) {
        var index = selectedArr.indexOf(value);
        var list = __spreadArrays(selectedArr);
        list.splice(index, 1);
        setSelectedArr(list);
    };
    //TODO: setState其实可以传一个函数，这样就可以解决这个问题啦
    useEffect(function () {
        onVisibleChange && triggered.current && onVisibleChange(optionVisible);
    }, [onVisibleChange, optionVisible]);
    useEffect(function () {
        onChange && triggered.current && onChange(value);
    }, [onChange, value]);
    useEffect(function () {
        onChange && triggered.current && onChange(selectedArr);
    }, [onChange, selectedArr]);
    // 事件处理集合
    var handleSelect = function (value) {
        if (mode === 'single') {
            handleSingle(value);
        }
        else {
            handleMultiple(value);
        }
    };
    var passedContext = {
        onSelect: handleSelect,
        selectedArr: selectedArr
    };
    var renderOptions = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'Option') {
                return child;
            }
            else {
                console.error('Select child should be Component Option');
            }
        });
    };
    var renderInput = function () {
        var inner = React.createElement(Input, { disabled: disabled, value: value, readOnly: true, onClick: handleClick });
        if (mode === 'single')
            return inner;
        else {
            return (React.createElement("div", { className: 'tagWrapper' },
                selectedArr.map(function (tag, index) { return (React.createElement("span", { className: 'tag', key: index },
                    tag,
                    React.createElement(Icon, { icon: 'times', onClick: function () {
                            handleIconClick(tag);
                        } }))); }),
                inner));
        }
    };
    return (React.createElement("div", __assign({ className: classes }, restProps, { ref: componentRef }),
        renderInput(),
        React.createElement(Transition, { in: optionVisible, animation: 'zoom-in-top', timeout: 300 },
            React.createElement(Provider, { value: passedContext },
                React.createElement("ul", { className: 'levi-select-wrapper' }, renderOptions())))));
};
Select.defaultProps = {
    mode: 'single'
};
export var Option = function (props) {
    var _a = useContext(SelectContext), onSelect = _a.onSelect, selectedArr = _a.selectedArr;
    var disabled = props.disabled, value = props.value, children = props.children;
    var classes = classNames('levi-select-option', {
        'is-disabled': disabled,
        'is-active': selectedArr.includes(value)
    });
    return (React.createElement("li", { className: classes, onClick: function () {
            onSelect(value);
        } }, children));
};
Option.displayName = 'Option';
export default Select;
