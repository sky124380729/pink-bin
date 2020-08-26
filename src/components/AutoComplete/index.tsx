import React, { FC, useState, ChangeEvent, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'

interface DataSourceObject {
    value: string
}
type DataSourceType<T = Record<string, any>> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (item: string) => DataSourceObject[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption } = props
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const [sugguestions, setSuggestions] = useState<DataSourceType[]>([])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestions(value)
            if (results instanceof Promise) {
                setLoading(true)
                results.then((data) => {
                    setSuggestions(data)
                    setLoading(false)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceObject) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <ul>
                {sugguestions.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                        {renderTemplate(item)}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            <Input value={inputValue} onChange={handleChange}></Input>
            {loading && <Icon icon='spinner' spin></Icon>}
            {sugguestions.length > 0 && generateDropdown()}
        </>
    )
}

export default AutoComplete
