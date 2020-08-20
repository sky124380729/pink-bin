import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (index: string) => void

export interface IMenuProps {
    defaultIndex?: string
    className?: string
    mode?: MenuMode
    onSelect?: SelectCallback
    defaultOpenSubMenus?: string[]
}

export interface IMenuContext {
    index?: string
    mode?: MenuMode
    onSelect?: SelectCallback
    defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<IMenuProps> = (props) => {
    const { defaultIndex, className, mode, children, onSelect, defaultOpenSubMenus } = props
    const [currentActive, setActive] = useState(defaultIndex)
    const { Provider } = MenuContext

    const classes = classNames('levi-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error('Warning:Menu has a child which is not a MenuItem Component')
            }
        })
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    return (
        <ul className={classes}>
            <Provider value={passedContext}>{renderChildren()}</Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu
