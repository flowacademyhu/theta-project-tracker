import { QueryBuilder } from "knex";
import { database } from "./database";
import { Request, Response } from "express";
import { TableNames } from "./enums";

export const queryReportProjectByHours = async () => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        database.raw('sum(timeRecords.spentTime + timeRecords.overTime) as timeSpent'),
        'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    return(report);  
}

export const queryReportProjectByCost = async () => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName',
        database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    return(report);  
}

export const queryReportUserByHours = async () => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        'projects.id as projectId', 'users.id as userId',database.raw('sum(timeRecords.spentTime + timeRecords.overTime) as timeSpent'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName');
    const report = await query;
    return(report);  
}

export const queryReportUserByCost = async () => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
        'projects.id as projectId', 'users.id as userId', database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    const report = await query;
    return(report);  
}

export const queryReportBudget = async () => {
    let query: QueryBuilder = database(TableNames.timeRecords)
    .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
    .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
    .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
    .select('projects.name as projectName')
    .select(database.raw('sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime)) as "actualCosts"'))
    .select('projects.budget as budgetCosts')
    .select(database.raw('projects.budget -(sum(users.costToCompanyPerHour * (timeRecords.spentTime + timeRecords.overTime))) as "overUnder"'))
    .groupBy('projects.name', 'projects.budget')
    const report = await query;
    return(report);  
}
