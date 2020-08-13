import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'

const App: React.FC = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <Button
                    className='sd'
                    autoFocus
                    onClick={(e) => {
                        e.preventDefault()
                        alert(1)
                    }}
                >
                    Hello
                </Button>
                <Button size={ButtonSize.Large}>Hello</Button>
                <Button size={ButtonSize.Small}>Hello</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
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
            </header>
        </div>
    )
}

export default App
