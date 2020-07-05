import {transformReportForFrontend, transformBudgetReport} from "../../lib/report"

export const getReportProjectByHours = (report: object[]) => {
    return transformReportForFrontend(report, 'userName', 'projectName', 'timeSpent');
}
export const getReportProjectByCost = (report: object[]) => {
    return transformReportForFrontend(report, 'userName', 'projectName', 'cost');
}
export const getReportUserByHours = (report: object[]) => {
    return transformReportForFrontend(report, 'projectName', 'userName', 'timeSpent');
}
export const getReportUserByCost = (report: object[]) => {
    return transformReportForFrontend(report, 'projectName', 'userName', 'cost');
}
export const getBudgetReport = (report: object[]) => {
    return transformBudgetReport(report);
}
