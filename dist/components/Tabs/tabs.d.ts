import React from 'react';
declare type SelectFun = (index: number) => void;
export interface TabsProps {
    onSelect?: SelectFun;
}
export interface TabContext {
    index: number;
}
export declare const TabContext: React.Context<TabContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
