import React from 'react';
import { AnimationName } from '../Transition/transition';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning' | 'primary';
interface AlertProps {
    type?: AlertType;
    title?: string;
    message?: string;
    animation?: AnimationName;
    closeable?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
