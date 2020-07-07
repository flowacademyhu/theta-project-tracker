import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";
import * as reportSerializer from "../serializers/report"

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.id', '=', 'userId')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            database.raw('sum(timeRecords.normalHours + timeRecords.overTime) as timeSpent'),
            'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(reportSerializer.getReportProjectByHours(report));
}

export const generateReportProjectByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.id', '=', 'userId')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName',
            database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(reportSerializer.getReportProjectByCost(report));
}

export const generateReportUserByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.id', '=', 'userId')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            'projects.id as projectId', 'users.id as userId', database.raw('sum(timeRecords.normalHours + timeRecords.overTime) as timeSpent'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName');
    const report = await query;
    res.json(reportSerializer.getReportUserByHours(report));
}

export const generateReportUserByCost = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.id', '=', 'userId')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            'projects.id as projectId', 'users.id as userId', database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    res.json(reportSerializer.getReportUserByCost(report));
}

export const generateReportBudget = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.id', '=', 'userId')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName')
        .select(database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as "actualCosts"'))
        .select('projects.budget as budgetCosts')
        .select(database.raw('projects.budget -(sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime))) as "overUnder"'))
        .groupBy('projects.name', 'projects.budget')
    const report = await query;
    res.json(reportSerializer.getBudgetReport(report));
}
