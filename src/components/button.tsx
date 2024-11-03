import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
    variant = "solid",
    color = "primary",
    size = "md",
    className = "",
    children,
    ...props
}) => {
    // Dynamic classes based on props
    const baseClass = "btn";
    const variantClass = variant === "solid" ? "" : `btn-${variant}`;
    const colorClass = color ? `btn-${color}` : "";
    const sizeClass = size ? `btn-${size}` : "";

    return (
        <button
            className={`${baseClass} ${variantClass} ${colorClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
