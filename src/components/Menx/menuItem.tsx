import React from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string
    disabled?: boolean
    className?: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, children } = props
    const context = React.useContext(MenuContext)
    const classes = classNames('menu-item', {
        'is-active': context.index === index,
        'is-disabled': disabled
    })
    const handleClick = (e: React.MouseEvent) => {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
