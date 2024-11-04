import React from 'react';
import { LoadingProps } from '../types';

const Loading: React.FC<LoadingProps> = ({ size = 'md', className = "" }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`loading loading-spinner loading-${size}`} />
        </div>
    );
};

export default Loading;
