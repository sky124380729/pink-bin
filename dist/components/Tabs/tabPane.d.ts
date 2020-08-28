import React from 'react';
export interface TabPaneProps {
    index?: number;
    disabled?: boolean;
    label: string;
}
declare const TabPane: React.FC<TabPaneProps>;
export default TabPane;
