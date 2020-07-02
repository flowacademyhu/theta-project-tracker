import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";
import { transformReportForFrontend, transformBudgetReportForFrontend } from "../../lib/report";

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        database.raw('sum(timeRecords.spentTime + timeRecords.overTime) as timeSpent'),
        'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(transformReportForFrontend(report, 'userName', 'projectName', 'timeSpent'));
}

export const generateReportProjectByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName',
        database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(transformReportForFrontend(report, 'userName', 'projectName', 'cost'));
}

export const generateReportUserByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        'projects.id as projectId', 'users.id as userId',database.raw('sum(timeRecords.spentTime + timeRecords.overTime) as timeSpent'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName');
    const report = await query;
    res.json(transformReportForFrontend(report, 'projectName', 'userName', 'timeSpent'));
}

export const generateReportUserByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        'projects.id as projectId', 'users.id as userId', database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(transformReportForFrontend(report, 'projectName', 'userName', 'cost'));
}

export const generateReportBudget = async (req: Request, res: Response) => {
    let subquery: QueryBuilder = database(TableNames.timeRecords)
    .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
    .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
    .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
    .select('projects.name as Project Name')
    .select(database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as "Actual costs"'))
    .select('projects.budget as Budget costs')
    .select(database.raw('projects.budget -(sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime))) as "(Over)/Under"'))
    .groupBy('projects.name', 'projects.budget')
    const subReport = await subquery;
    res.json(transformBudgetReportForFrontend(subReport));
}