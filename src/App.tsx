import React, { useState } from 'react'
// import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

// import Menu from './components/Menx/menu'
// import MenuItem from './components/Menx/menuItem'
// import SubMenu from './components/Menx/subMenu'

import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

import Transiton from './components/Transition/transition'
import Button from './components/Button/button'
import Input from './components/Input/input'

import AutoComplete from './components/AutoComplete/autoComplete'

import Select, { Option } from './components/Select/select'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import Icon from './components/Icon/icon'
library.add(fas)

const App: React.FC = () => {
    const [show, setShow] = useState(false)
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then((res) => res.json())
            .then(({ items }) => {
                const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
                return formatItems
            })
    }
    const handleVisibleChange = (flag: boolean) => {
        // console.log(flag)
    }
    const handleChange = (item: any) => {
        console.log(item)
    }
    return (
        <div className='App'>
            <header className='App-header'>
                <div style={{ display: 'flex' }}>
                    <Select mode='multiple' onVisibleChange={handleVisibleChange} onChange={handleChange} style={{ width: '300px', marginRight: '20px' }}>
                        <Option value='jack'>Jack</Option>
                        <Option value='lucy'>Lucy</Option>
                        <Option value='levi'>Levi</Option>
                        <Option value='disabled' disabled>
                            Disabled
                        </Option>
                    </Select>
                    <Select onVisibleChange={handleVisibleChange} onChange={handleChange} style={{ width: '300px' }}>
                        <Option value='jack'>Jack</Option>
                        <Option value='lucy'>Lucy</Option>
                        <Option value='disabled' disabled>
                            Disabled
                        </Option>
                    </Select>
                </div>

                {/* <AutoComplete value='11' fetchSuggestions={handleFetch}></AutoComplete> */}
                <Input style={{ width: '200px' }} icon='cocktail'></Input>
                <Alert title='试试' type='primary' animation='zoom-in-top'></Alert>
                {/* <Icon icon='coffee' theme='danger' size='10x'></Icon> */}
                <Tabs onSelect={(index) => alert(index)}>
                    <TabItem label='card1'>this is card one</TabItem>
                    <TabItem disabled label='card2'>
                        this is card two
                    </TabItem>
                    <TabItem label='card3'>this is card three</TabItem>
                </Tabs>
                <Menu defaultIndex={'1'} mode='vertical'>
                    <MenuItem>menu-item-0</MenuItem>
                    <MenuItem>menu-item-1</MenuItem>
                    <MenuItem>menu-item-2</MenuItem>
                    <SubMenu title='呵呵'>
                        <MenuItem>menu-item-3-0</MenuItem>
                        <MenuItem>menu-item-3-1</MenuItem>
                        <MenuItem>menu-item-3-2</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu defaultOpenSubMenus={['3']}>
                    <MenuItem>menu-item-0</MenuItem>
                    <MenuItem>menu-item-1</MenuItem>
                    <MenuItem>menu-item-2</MenuItem>
                    <SubMenu title='呵呵'>
                        <MenuItem>menu-item-3-0</MenuItem>
                        <MenuItem>menu-item-3-1</MenuItem>
                        <MenuItem>menu-item-3-2</MenuItem>
                    </SubMenu>
                </Menu>
                <Button
                    size='lg'
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    Toggle
                </Button>
                <Transiton in={show} timeout={300} animation='zoom-in-left'>
                    <div>
                        <p>111</p>
                        <p>111</p>
                        <p>111</p>
                        <p>111</p>
                        <p>111</p>
                        <p>111</p>
                    </div>
                </Transiton>
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
