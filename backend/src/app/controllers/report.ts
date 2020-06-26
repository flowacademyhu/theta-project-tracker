import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";
import { transformReportForFrontend } from "../../lib/report";

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum('timeRecords.spentTime as timeSpent');
    const report = await query;
    res.json(transformReportForFrontend(report, 'userName', 'projectName', 'timeSpent'));
}

export const generateReportProjectByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum(database.raw('users.costToCompanyPerHour * timeRecords.spentTime'));
    const report = await query;
    res.json(transformReportForFrontend(report, 'userName', 'projectName', 'sum(users.costToCompanyPerHour * timeRecords.spentTime)'));
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
    res.json(transformReportForFrontend(report, 'projectName', 'userName', 'timeSpent'));
}

export const generateReportUserByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
        .sum(database.raw('timeRecords.spentTime * users.costToCompanyPerHour'));
    const report = await query;
    res.json(transformReportForFrontend(report, 'projectName', 'userName', 'sum(timeRecords.spentTime * users.costToCompanyPerHour)'));
}
