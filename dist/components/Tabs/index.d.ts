import { FC } from 'react';
import { TabsProps } from './tabs';
import { TabPaneProps } from './tabPane';
export declare type ITabsComponent = FC<TabsProps> & {
    TabPane: FC<TabPaneProps>;
};
