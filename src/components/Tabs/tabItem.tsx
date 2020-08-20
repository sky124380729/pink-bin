import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabContext } from './tabs'
export interface TabItemProps {
    index?: number
    disabled?: boolean
    label: string
}

const TabItem: React.FC<TabItemProps> = (props) => {
    const context = useContext(TabContext)
    const { children, index } = props
    const classes = classNames('tab-item')
    return (
        <div className={classes} style={{ display: `${index === context.index ? 'block' : 'none'}` }}>
            {children}
        </div>
    )
}

TabItem.displayName = 'TabItem'

export default TabItem
