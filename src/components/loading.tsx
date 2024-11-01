import React from 'react';

interface LoadingProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ size = 'md' }) => {
    return (
        <span className={`loading loading-spinner loading-${size}`}></span>
    );
};

export default Loading;
