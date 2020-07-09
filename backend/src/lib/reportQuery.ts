import { QueryBuilder } from "knex";
import { database } from "./database";
import { TableNames } from "./enums";
import moment = require("moment");

const DATE_FORMAT = 'YYYY-MM-DD';

export const queryReportProjectByHours = async (req) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.userId', '=', 'users.id')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            database.raw('sum(timeRecords.normalHours + timeRecords.overTime) as timeSpent'),
            'projects.id as projectId', 'users.id as userId')
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    if (req.query.projects) {
        const filterArray = JSON.parse(req.query.projects);
        query = query.whereIn('projectId', filterArray);
    }
    if (req.query.from) {
        let from = moment(req.query.from).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '>=', from);
    }
    if (req.query.to) {
        let to = moment(req.query.to).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '<=', to);
    }
    const report = await query;
    return (report);
}

export const queryReportProjectByCost = async (req) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.userId', '=', 'users.id')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName',
            database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    if (req.query.projects) {
        const filterArray = JSON.parse(req.query.projects);
        query = query.whereIn('projectId', filterArray);
    }
    if (req.query.from) {
        let from = moment(req.query.from).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '>=', from);
    }
    if (req.query.to) {
        let to = moment(req.query.to).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '<=', to);
    }
    const report = await query;
    return (report);
}

export const queryReportUserByHours = async (req) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.userId', '=', 'users.id')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            'projects.id as projectId', 'users.id as userId', database.raw('sum(timeRecords.normalHours + timeRecords.overTime) as timeSpent'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName');
    if (req.query.users) {
        const filterArray = JSON.parse(req.query.projects);
        query = query.whereIn('userId', filterArray);
    }
    if (req.query.from) {
        let from = moment(req.query.from).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '>=', from);
    }
    if (req.query.to) {
        let to = moment(req.query.to).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '<=', to);
    }
    const report = await query;
    return (report);
}

export const queryReportUserByCost = async (req) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.userId', '=', 'users.id')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'),
            'projects.id as projectId', 'users.id as userId', database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as cost'))
        .groupBy('users.id', 'projects.id', 'projectName', 'userName')
    if (req.query.users) {
        const filterArray = JSON.parse(req.query.projects);
        query = query.whereIn('userId', filterArray);
    }
    if (req.query.from) {
        let from = moment(req.query.from).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '>=', from);
    }
    if (req.query.to) {
        let to = moment(req.query.to).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '<=', to);
    }
    const report = await query;
    return (report);
}

export const queryReportBudget = async (req) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
        .join(TableNames.userTimeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
        .join(TableNames.users, 'userTimeRecords.userId', '=', 'users.id')
        .join(TableNames.milestones, 'userTimeRecords.milestoneId', '=', 'milestones.id')
        .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
        .select('projects.name as projectName, projects.id')
        .select(database.raw('sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime)) as "actualCosts"'))
        .select('projects.budget as budgetCosts')
        .select(database.raw('projects.budget -(sum(users.costToCompanyPerHour * (timeRecords.normalHours + timeRecords.overTime))) as "overUnder"'))
        .groupBy('projects.name', 'projects.budget')
    if (req.query.projects) {
        const filterArray = JSON.parse(req.query.projects);
        query = query.whereIn('projectId', filterArray);
    }
    if (req.query.from) {
        let from = moment(req.query.from).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '>=', from);
    }
    if (req.query.to) {
        let to = moment(req.query.to).format(DATE_FORMAT);
        query = query.where('timeRecords.date', '<=', to);
    }
    const report = await query;
    return (report);
}
