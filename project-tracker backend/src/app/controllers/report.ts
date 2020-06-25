import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum('timeRecords.spentTime as timeSpent');
    const report = await query;
    res.json(parseReportForFrontendGeneric(report, 'userName', 'projectName', 'timeSpent'));
}
export const parseReportForFrontendGeneric = (report: Array<object>, columnName: string, rowName: string, data: string): object => {
    let columnNames = getUniqueColumnNames(report);
    let finalObject = {};
    columnNames.forEach(column => finalObject[column] = (new Object()));
    Object.keys(finalObject).forEach(key => {
        report.forEach(element => {
            if (element[rowName] === key) {
                finalObject[element[rowName]][element[columnName]] = element[data];
            }
        });
    })
    calculateAndAddTotal(finalObject);
    return finalObject;
}

const getUniqueColumnNames = (report): Array<any> => {
    let uniqueColumnNames = new Set();
    report.forEach(x => uniqueColumnNames.add(x.projectName));
    return Array.from(uniqueColumnNames);
}
export const calculateAndAddTotal = (finalObject: object) => {
    Object.keys(finalObject).forEach(element => {
        let sum = 0;
        Object.values(finalObject[element]).forEach(element2 => {
            sum += +element2;
        })
        finalObject[element]['total'] = sum;
    });
}