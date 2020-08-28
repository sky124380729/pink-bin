import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabContext } from './tabs'
export interface TabPaneProps {
    index?: number
    disabled?: boolean
    label: string
}

const TabPane: React.FC<TabPaneProps> = (props) => {
    const context = useContext(TabContext)
    const { children, index } = props
    const classes = classNames('tab-item')
    return (
        <div className={classes} style={{ display: `${index === context.index ? 'block' : 'none'}` }}>
            {children}
        </div>
    )
}

TabPane.displayName = 'TabPane'

export default TabPane
