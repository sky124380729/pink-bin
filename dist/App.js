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
import React, { useState } from 'react';
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
// import Menu from './components/Menx/menu'
// import MenuItem from './components/Menx/menuItem'
// import SubMenu from './components/Menx/subMenu'
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabPane';
import Transiton from './components/Transition/transition';
import Button from './components/Button/button';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Select, { Option } from './components/Select/select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from './components/Icon/icon';
import Upload from './components/Upload/upload';
// import Progress from './components/Progress/progress'
// import Icon from './components/Icon/icon'
library.add(fas);
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var handleFetch = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            var formatItems = items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
            return formatItems;
        });
    };
    var handleVisibleChange = function (flag) {
        // console.log(flag)
    };
    var handleChange = function (item) {
        console.log(item);
    };
    var handleFileChange = function (file) {
        console.log(file);
    };
    return (React.createElement("div", { className: 'App' },
        React.createElement("header", { className: 'App-header' },
            React.createElement("div", { style: { width: '300px', marginBottom: '20px' } },
                React.createElement(Upload
                // action='https://jsonplaceholder.typicode.com/posts'
                , { 
                    // action='https://jsonplaceholder.typicode.com/posts'
                    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', multiple: true, onChange: handleFileChange, onRemove: function (file) {
                        console.log(file);
                    }, drag: true },
                    React.createElement(Icon, { icon: 'upload', size: '5x', theme: 'secondary' }),
                    React.createElement("br", null),
                    React.createElement("p", null, "Drag file over to upload"))),
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement(Select, { mode: 'multiple', onVisibleChange: handleVisibleChange, onChange: handleChange, style: { width: '300px', marginRight: '20px' } },
                    React.createElement(Option, { value: 'jack' }, "Jack"),
                    React.createElement(Option, { value: 'lucy' }, "Lucy"),
                    React.createElement(Option, { value: 'levi' }, "Levi"),
                    React.createElement(Option, { value: 'disabled', disabled: true }, "Disabled")),
                React.createElement(Select, { onVisibleChange: handleVisibleChange, onChange: handleChange, style: { width: '300px' } },
                    React.createElement(Option, { value: 'jack' }, "Jack"),
                    React.createElement(Option, { value: 'lucy' }, "Lucy"),
                    React.createElement(Option, { value: 'disabled', disabled: true }, "Disabled"))),
            React.createElement(AutoComplete, { value: '11', fetchSuggestions: handleFetch }),
            React.createElement(Input, { style: { width: '200px' }, icon: 'cocktail' }),
            React.createElement(Alert, { title: '\u8BD5\u8BD5', type: 'primary', animation: 'zoom-in-top' }),
            React.createElement(Tabs, { onSelect: function (index) { return alert(index); } },
                React.createElement(TabItem, { label: 'card1' }, "this is card one"),
                React.createElement(TabItem, { disabled: true, label: 'card2' }, "this is card two"),
                React.createElement(TabItem, { label: 'card3' }, "this is card three")),
            React.createElement(Menu, { defaultIndex: '1', mode: 'vertical' },
                React.createElement(MenuItem, null, "menu-item-0"),
                React.createElement(MenuItem, null, "menu-item-1"),
                React.createElement(MenuItem, null, "menu-item-2"),
                React.createElement(SubMenu, { title: '\u5475\u5475' },
                    React.createElement(MenuItem, null, "menu-item-3-0"),
                    React.createElement(MenuItem, null, "menu-item-3-1"),
                    React.createElement(MenuItem, null, "menu-item-3-2"))),
            React.createElement(Menu, { defaultOpenSubMenus: ['3'] },
                React.createElement(MenuItem, null, "menu-item-0"),
                React.createElement(MenuItem, null, "menu-item-1"),
                React.createElement(MenuItem, null, "menu-item-2"),
                React.createElement(SubMenu, { title: '\u5475\u5475' },
                    React.createElement(MenuItem, null, "menu-item-3-0"),
                    React.createElement(MenuItem, null, "menu-item-3-1"),
                    React.createElement(MenuItem, null, "menu-item-3-2"))),
            React.createElement(Button, { size: 'lg', onClick: function () {
                    setShow(!show);
                } }, "Toggle"),
            React.createElement(Transiton, { in: show, timeout: 300, animation: 'zoom-in-left' },
                React.createElement("div", null,
                    React.createElement("p", null, "111"),
                    React.createElement("p", null, "111"),
                    React.createElement("p", null, "111"),
                    React.createElement("p", null, "111"),
                    React.createElement("p", null, "111"),
                    React.createElement("p", null, "111"))))));
};
export default App;
