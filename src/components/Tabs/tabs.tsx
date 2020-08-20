import React from 'react'

type TabType = 'line' | 'card'

interface TabsProps {
    type?: TabType
}

const Tabs: React.FC<TabsProps> = (props) => {
    const { type, children } = props
    console.log(type)
    return <ul>{children}</ul>
}

Tabs.defaultProps = {
    type: 'line'
}

export default Tabs
