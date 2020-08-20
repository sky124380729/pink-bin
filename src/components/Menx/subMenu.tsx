import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
interface SubMenuProps {
    title: string
    index?: string
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const context = useContext(MenuContext)
    const { index, children, title, className } = props
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
    const classes = classNames('menu-item', 'submenu-item', className)
    const [menuOpen, setOpen] = useState(isOpend)
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvent = context.mode === 'vertical' ? { onClick: handleClick } : {}
    const hoverEvent =
        context.mode !== 'vertical'
            ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                      handleMouse(e, true)
                  },
                  onMouseLeave: (e: React.MouseEvent) => {
                      handleMouse(e, false)
                  }
              }
            : {}
    const renderChildren = () => {
        const subMenuclasses = classNames('levi-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning:Menu has a child which is not a MenuItem Component')
            }
        })
        return <ul className={subMenuclasses}>{childrenComponent}</ul>
    }
    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className='submenu-title' {...clickEvent}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'

export default SubMenu
