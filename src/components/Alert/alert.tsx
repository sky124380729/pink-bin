import React, { useState } from 'react'
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

    return flag ? (
        <div className={classes}>
            {title && <p className='title'>{title}</p>}
            <p className='message'>{message}</p>
            {closeable && (
                <span className='alert-close-btn' onClick={(e) => setFlag(false)}>
                    ×
                </span>
            )}
        </div>
    ) : (
        <></>
    )
}

Alert.defaultProps = {
    message: 'this is alert!',
    closeable: true
}

export default Alert
