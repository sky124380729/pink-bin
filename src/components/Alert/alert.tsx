import React, { useState } from 'react'
import Icon from '../Icon/icon'
import Transiton from '../Transition/transition'
import classNames from 'classnames'

export type AlertType = 'success' | 'default' | 'danger' | 'warning' | 'primary'

interface AlertProps {
    type?: AlertType
    title?: string
    message?: string
    closeable?: boolean
}

const Alert: React.FC<AlertProps> = (props) => {
    const [flag, setFlag] = useState(true)

    const { type, title, message, closeable } = props

    const classes = classNames('alert', {
        [`alert-${type}`]: type
    })

    return (
        <Transiton timeout={300} in={flag} animation='zoom-in-top'>
            <div className={classes}>
                {title && <p className='title'>{title}</p>}
                <p className='message'>{message}</p>
                {closeable && (
                    <span className='alert-close-btn' onClick={(e) => setFlag(false)}>
                        <Icon icon='times'></Icon>
                    </span>
                )}
            </div>
        </Transiton>
    )
}

Alert.defaultProps = {
    message: 'this is alert!',
    closeable: true
}

export default Alert
