import React from 'react';
import { LoadingProps } from '../types';

const Loading: React.FC<LoadingProps> = ({ size = 'md' }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className={`loading loading-spinner loading-${size}`} />
        </div>
    );
};

export default Loading;
