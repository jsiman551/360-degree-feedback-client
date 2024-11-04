import { ButtonHTMLAttributes } from "react";

export type EmployeeType = {
    _id: string;
    username: string;
    email: string;
    role: string;
}

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Employee';
}

export type EvaluationData = {
    employeeId: string;
    score: number;
    comments: string;
}


export type FeedbackData = {
    evaluationId: string;
    feedbackText: string;
    score: number;
}

export type AddFeedbackFormProps = {
    evaluationId: string;
    token: string;
    onClose: () => void;
    onFeedbackAdded: () => void;
}

export type AddFeedbackFormData = {
    score: number;
    feedbackText: string;
}

export type EvaluationFormProps = {
    employeeId: string;
    token: string;
    onClose: () => void;
}

export type EvaluationFormData = {
    score: number;
    comments: string;
}

export type LoginFormValues = {
    username: string;
    password: string;
}

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Employee';
}

export type RegisterFormProps = {
    onRegisterSuccess: () => void;
    onClose: () => void;
}

export type UpdateEvaluationFormProps = {
    evaluationId: string;
    initialScore: number;
    initialComments: string;
    token: string;
    onClose: () => void;
    onUpdateSuccess: () => void;
}

export type LoadingProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
}

export type ReportProps = {
    employeeId: string | undefined;
    token: string | null;
}

export type EmployeeCardProps = {
    employee: EmployeeType;
    onEvaluate: (id: string) => void;
    onView: (id: string) => void;
    isCurrentUser: boolean
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline" | "ghost" | "link";
    color?: "primary" | "secondary" | "accent" | "neutral";
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    inputSize?: 'input-lg' | 'input-md' | 'input-sm' | 'input-xs';
}
