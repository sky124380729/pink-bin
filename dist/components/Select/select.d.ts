import React, { FC, SelectHTMLAttributes } from 'react';
declare type valueType = string | number;
declare type SelectFun = (val: valueType) => void;
declare type SelectMode = 'single' | 'multiple';
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange'> {
    mode?: SelectMode;
    className?: string;
    disabled?: boolean;
    onSelect?: SelectFun;
    onChange?: (value: valueType | valueType[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}
export interface OptionProps {
    value: string | number;
    disabled?: boolean;
}
export interface ISelectContext {
    onSelect: SelectFun;
    selectedArr: valueType[];
}
export declare const SelectContext: React.Context<ISelectContext>;
declare const Select: FC<SelectProps>;
export declare const Option: FC<OptionProps>;
export default Select;
