import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { TabPaneProps } from './tabPane'

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
            const childElement = child as React.FunctionComponentElement<TabPaneProps>
            const { label, disabled } = childElement.props
            const classes = classNames('tabs-tab', {
                'is-active': activeIndex === index,
                'is-disabled': disabled
            })
            return (
                <li className={classes} key={index} onClick={(e) => handleClick(e, index)}>
                    {label}
                </li>
            )
        })
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabPaneProps>
            const { displayName } = childElement.type
            if (displayName === 'TabPane') {
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error('Tabs children show be TabPane Element')
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
