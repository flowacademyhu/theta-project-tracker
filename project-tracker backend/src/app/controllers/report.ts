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
    res.json(transformReportForFrontendGeneric(report, 'userName', 'projectName', 'timeSpent'));
}
export const generateReportProjectByPounds = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum(database.raw('users.costToCompanyPerHour * timeRecords.spentTime'));
    const report = await query;
    console.log(report);
    //res.json(report);
    res.json(transformReportForFrontendGeneric(report, 'userName', 'projectName', 'sum(users.costToCompanyPerHour * timeRecords.spentTime)'));
}

export const generateReportUserByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum('timeRecords.spentTime as timeSpent');
        const report = await query;
        console.log(report);
    res.json(transformReportForFrontendGeneric(report, 'projectName', 'userName', 'timeSpent'));
}


export const generateReportUserByPounds = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum(database.raw('timeRecords.spentTime * users.costToCompanyPerHour'));
    const report = await query;
    //res.json(report);
    res.json(transformReportForFrontendGeneric(report, 'projectName', 'userName', 'sum(timeRecords.spentTime * users.costToCompanyPerHour)'));
}

export const transformReportForFrontendGeneric = (report: Array<object>, columnName: string, rowName: string, data: string): object => {
    let columnNames = getUniqueRowNames(report, rowName);
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

const getUniqueRowNames = (report, rowName): Array<any> => {
    let uniqueRowNames = new Set();
    report.forEach(x => uniqueRowNames.add(x[rowName]));
    return Array.from(uniqueRowNames);
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