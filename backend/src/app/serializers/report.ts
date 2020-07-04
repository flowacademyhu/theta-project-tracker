import {getUniqueRowNames, transformReportForFrontend} from "../../lib/report"

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
    let rowNames = getUniqueRowNames(report, 'projectName');
    let finalObject = {};
    rowNames.forEach(row => finalObject[row] = (new Object()));
    Object.keys(finalObject).forEach(key => {
        report.forEach(individualResult => {
            if (individualResult['projectName'] === key) {
                finalObject[key]['actualCosts'] = individualResult['actualCosts'];
                finalObject[key]['budgetCosts'] = individualResult['budgetCosts'];
                finalObject[key]['overUnder'] = individualResult['overUnder'];
            }
        });
    })
    return finalObject;
}

