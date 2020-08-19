import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

const App: React.FC = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <Menu
                    defaultIndex={0}
                    mode='vertical'
                    onSelect={(index) => {
                        alert(index)
                    }}
                >
                    <MenuItem index={0}>cool link</MenuItem>
                    <MenuItem index={1} disabled>
                        cool link2
                    </MenuItem>
                    <MenuItem index={2}>cool link3</MenuItem>
                </Menu>

                <div>
                    <Button
                        className='sd'
                        onClick={(e) => {
                            e.preventDefault()
                            alert(1)
                        }}
                    >
                        Hello
                    </Button>
                    <Button autoFocus size={ButtonSize.Large}>
                        Hello
                    </Button>
                    <Button size={ButtonSize.Small}>Hello</Button>
                    <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
                        Hello
                    </Button>
                    <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
                        Hello
                    </Button>
                    <Button disabled btnType={ButtonType.Link} href='http://www.baidu.com'>
                        Baidu Link
                    </Button>
                    <Button btnType={ButtonType.Link} href='http://www.baidu.com' target='_blank'>
                        Baidu Link
                    </Button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                        Learn React
                    </a>
                </div>

                <Alert title='呵呵' type='success'></Alert>
                <Alert title='呵呵' type='primary'></Alert>
                <Alert title='呵呵' type='danger' closeable={false}></Alert>
                <Alert title='呵呵' type='warning'></Alert>
                <Alert title='呵呵' type='default'></Alert>
            </header>
        </div>
    )
}

export default App
