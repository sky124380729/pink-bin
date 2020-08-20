import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

type TabType = 'line' | 'card'
type SelectFun = (index: number) => void
export interface TabsProps {
    onSelect?: SelectFun
}

export interface TabContext {
    index: number
}

export const TabContext = createContext<TabContext>({ index: 0 })

const Tabs: React.FC<TabsProps> = (props) => {
    const { onSelect, children } = props
    const [activeIndex, setActiveIndex] = useState(0)

    const { Provider } = TabContext
    const passedContext: TabContext = {
        index: activeIndex
    }
    const handleClick = (e: React.MouseEvent, index: number) => {
        setActiveIndex(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const renderTabList = () => {
        return React.Children.map(children, (child, index) => {
            const classes = classNames('tabs-tab', {
                'is-active': activeIndex === index
            })
            const childElement = child as React.FunctionComponentElement<TabItemProps>
            const { label } = childElement.props
            return (
                <li className={classes} key={index} onClick={(e) => handleClick(e, index)}>
                    {label}
                </li>
            )
        })
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>
            const { displayName } = childElement.type
            if (displayName === 'TabItem') {
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error('Tabs children show be TabItem Element')
            }
        })
    }
    return (
        <div className='levi-tabs'>
            <div className='tabList'>{renderTabList()}</div>
            <Provider value={passedContext}>
                <div className='tabHolder'>{renderChildren()}</div>
            </Provider>
        </div>
    )
}

export default Tabs
