import {transformBudgetReport, transformReportForFrontend} from "../../lib/report"

export const getReportProjectByHours = (report) => {
    return transformReportForFrontend(report, 'userName', 'projectName', 'timeSpent');
}
export const getReportProjectByCost = (report) => {
    return transformReportForFrontend(report, 'userName', 'projectName', 'cost');
}
export const getReportUserByHours = (report) => {
    return transformReportForFrontend(report, 'projectName', 'userName', 'timeSpent');
}
export const getReportUserByCost = (report) => {
    return transformReportForFrontend(report, 'projectName', 'userName', 'cost');
}
export const getBudgetReport = (report) => {
        return transformBudgetReport(report);
}
