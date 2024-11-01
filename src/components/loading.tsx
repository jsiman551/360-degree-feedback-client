import React from 'react';

interface LoadingProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ size = 'md' }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className={`loading loading-spinner loading-${size}`} />
        </div>
    );
};

export default Loading;
