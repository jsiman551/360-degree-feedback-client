import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPerformanceMessage, renderStars } from "../../utils/helpers";
import Loading from "../loading";
import { fetchEmployeeReport } from "../../redux/thunks/reportThunks";
import { ReportProps } from "../../types";

const Report: React.FC<ReportProps> = ({ employeeId, token }) => {
    const dispatch = useAppDispatch();
    const { report, loading: reportLoading, error: reportError } = useAppSelector((state) => state.report);

    useEffect(() => {
        if (employeeId && token) {
            dispatch(fetchEmployeeReport({ employeeId, token }));
        }
    }, [employeeId, token, dispatch]);

    return (
        <div className="bg-slate-100 dark:bg-slate-800 shadow-lg p-6 rounded-lg mb-8 text-center">
            {reportLoading ? (
                <Loading size="sm" className="h-0" />
            ) : reportError ? (
                <p className="text-red-600 dark:text-red-400 text-center">{reportError}</p>
            ) : report ? (
                report.evaluations.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-bold mb-2">Performance Report</h2>
                        <div className="my-2">{renderStars(report.averageScore)}</div>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            {getPerformanceMessage(report.averageScore)}
                        </p>
                    </div>
                ) : (
                    <p className="text-slate-600 dark:text-slate-300">
                        No evaluations available for this employee yet.
                    </p>
                )
            ) : (
                <p className="text-slate-600 dark:text-slate-300">No report available.</p>
            )}
        </div>
    )
}

export default Report;
