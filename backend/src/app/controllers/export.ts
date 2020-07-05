import { QueryBuilder } from "knex";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { TableNames } from "../../lib/enums";
import { transformReportForFrontend } from "../../lib/report";
import * as reportController from "../controllers/report";
import { createExcelReport, sendExcelFile } from "../../lib/export";
import * as reportSerializer from "../serializers/report"

export const exportReportProjectByHours = async (req: Request, res) => {
    let data = await reportController.generateReportProjectByHours(req, res);
    createExcelReport('Report per project', reportSerializer.getReportProjectByHours(data));
    sendExcelFile(res);
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

export const generateReportBudget = async (req: Request, res) => {
    let data = await reportController.generateReportBudget(req, res);
    createExcelReport('Project Profitability', reportSerializer.getBudgetReport(data));
    sendExcelFile(res);
}