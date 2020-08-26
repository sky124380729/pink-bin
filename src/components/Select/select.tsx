import React, { FC, useState, MouseEvent, useRef, createContext, useContext, SelectHTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'
import Input from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useClickOutside from '../../hooks/useClickOutside'

type valueType = string | number
type SelectFun = (val: valueType) => void
type SelectMode = 'single' | 'multiple'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange'> {
    mode?: SelectMode
    className?: string
    disabled?: boolean
    onSelect?: SelectFun
    onChange?: (value: valueType | valueType[]) => void
    onVisibleChange?: (visible: boolean) => void
}

export interface OptionProps {
    value: string | number
    disabled?: boolean
}

export interface ISelectContext {
    onSelect: SelectFun
    selectedArr: valueType[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SelectContext = createContext<ISelectContext>({ onSelect: () => {}, selectedArr: [] })

const Select: FC<SelectProps> = (props) => {
    const { disabled, children, onSelect, className, mode, onChange, onVisibleChange, ...restProps } = props
    const [value, setValue] = useState<string | number>('')
    const [optionVisible, setOptionVisible] = useState(false)
    const [selectedArr, setSelectedArr] = useState<valueType[]>([])
    const componentRef = useRef<HTMLDivElement>(null)
    const triggered = useRef(false)
    const classes = classNames('levi-select', className)
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        triggered.current = true
        setOptionVisible(true)
    }
    const { Provider } = SelectContext
    useClickOutside(componentRef, () => {
        setOptionVisible(false)
        triggered.current = false
    })

    // 单选事件
    const handleSingle = (value: valueType) => {
        setValue(value)
        setOptionVisible(false)
        if (onSelect) {
            onSelect(value)
        }
    }
    // 多选事件
    const handleMultiple = (value: valueType) => {
        // 如果已经存在，那么删除
        const index = selectedArr.indexOf(value)
        if (index !== -1) {
            const list = [...selectedArr]
            list.splice(index, 1)
            setSelectedArr(list)
        } else {
            setSelectedArr([...selectedArr, value])
        }
    }
    const handleIconClick = (value: valueType) => {
        const index = selectedArr.indexOf(value)
        const list = [...selectedArr]
        list.splice(index, 1)
        setSelectedArr(list)
    }
    useEffect(() => {
        onVisibleChange && triggered.current && onVisibleChange(optionVisible)
    }, [onVisibleChange, optionVisible])

    useEffect(() => {
        onChange && triggered.current && onChange(value)
    }, [onChange, value])

    useEffect(() => {
        onChange && triggered.current && onChange(selectedArr)
    }, [onChange, selectedArr])

    // 事件处理集合
    const handleSelect = (value: valueType) => {
        if (mode === 'single') {
            handleSingle(value)
        } else {
            handleMultiple(value)
        }
    }

    const passedContext: ISelectContext = {
        onSelect: handleSelect,
        selectedArr
    }

    const renderOptions = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<HTMLElement>
            const { displayName } = childElement.type
            if (displayName === 'Option') {
                return child
            } else {
                console.error('Select child should be Component Option')
            }
        })
    }
    const renderInput = () => {
        const inner = <Input disabled={disabled} value={value} readOnly onClick={handleClick}></Input>
        if (mode === 'single') return inner
        else {
            return (
                <div className='tagWrapper'>
                    {selectedArr.map((tag, index) => (
                        <span className='tag' key={index}>
                            {tag}
                            <Icon
                                icon='times'
                                onClick={() => {
                                    handleIconClick(tag)
                                }}
                            ></Icon>
                        </span>
                    ))}
                    {inner}
                </div>
            )
        }
    }
    return (
        <div className={classes} {...restProps} ref={componentRef}>
            {renderInput()}
            <Transition in={optionVisible} animation='zoom-in-top' timeout={300}>
                <Provider value={passedContext}>
                    <ul className='levi-select-wrapper'>{renderOptions()}</ul>
                </Provider>
            </Transition>
        </div>
    )
}
Select.defaultProps = {
    mode: 'single'
}

export const Option: FC<OptionProps> = (props) => {
    const { onSelect, selectedArr } = useContext(SelectContext)
    const { disabled, value, children } = props
    const classes = classNames('levi-select-option', {
        'is-disabled': disabled,
        'is-active': selectedArr.includes(value)
    })
    return (
        <li
            className={classes}
            onClick={() => {
                onSelect(value)
            }}
        >
            {children}
        </li>
    )
}

Option.displayName = 'Option'

export default Select
