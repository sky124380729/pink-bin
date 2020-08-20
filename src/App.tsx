import React from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
// import Alert from './components/Alert/alert'
// import Menu from './components/Menu/menu'
// import MenuItem from './components/Menu/menuItem'
// import SubMenu from './components/Menu/subMenu'

import Menu from './components/Menx/menu'
import MenuItem from './components/Menx/menuItem'
import SubMenu from './components/Menx/subMenu'

import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

const App: React.FC = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <Tabs onSelect={(index) => alert(index)}>
                    <TabItem label='card1'>this is card one</TabItem>
                    <TabItem disabled label='card2'>
                        this is card two
                    </TabItem>
                    <TabItem label='card3'>this is card three</TabItem>
                </Tabs>

                <Menu defaultIndex={'1'} mode='vertical' defaultOpenSubMenus={['3']}>
                    <MenuItem>menu-item-0</MenuItem>
                    <MenuItem>menu-item-1</MenuItem>
                    <MenuItem>menu-item-2</MenuItem>
                    <SubMenu title='呵呵'>
                        <MenuItem>menu-item-3-0</MenuItem>
                        <MenuItem>menu-item-3-1</MenuItem>
                        <MenuItem>menu-item-3-2</MenuItem>
                    </SubMenu>
                </Menu>
                {/* <Menu
                    defaultIndex='0'
                    defaultOpenSubMenus={['2']}
                    mode='vertical'
                    onSelect={(index) => {
                        alert(index)
                    }}
                >
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link2</MenuItem>
                    <SubMenu title='dropdown'>
                        <MenuItem>dropdown1</MenuItem>
                        <MenuItem>dropdown2</MenuItem>
                        <MenuItem>dropdown3</MenuItem>
                    </SubMenu>
                    <MenuItem>cool link3</MenuItem>
                </Menu> */}
            </header>
        </div>
    )
}

export default App
