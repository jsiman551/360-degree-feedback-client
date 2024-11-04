import React from "react";
import { EmployeeCardProps } from "../../../types";
import Button from "../../button";

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEvaluate, onView, isCurrentUser }) => (
    <div className={`bg-slate-100 dark:bg-slate-800 shadow-lg rounded-lg p-4 m-2 ${isCurrentUser ? 'border border-blue-500' : ''}`}>
        <h2 className="font-bold">{employee.username}</h2>
        <p>ID: {employee._id}</p>
        <p>Email: {employee.email}</p>
        <p>Role: {employee.role}</p>

        <div className="flex space-x-2 mt-2">
            {!isCurrentUser && (<Button onClick={() => onEvaluate(employee._id)} className="bg-blue-500 dark:bg-blue-600 text-white">Evaluate</Button>)}
            <Button onClick={() => onView(employee._id)} variant="ghost" color="neutral" className="hover:underline text-blue-600 dark:text-blue-400">View Evaluations</Button>
        </div>
    </div>
);

export default EmployeeCard;
