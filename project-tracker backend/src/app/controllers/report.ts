import { QueryBuilder } from "knex";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {TableNames} from "../../lib/enums";

export const generateReport = () => {

}

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords)
    .join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id')
    .join(TableNames.projects, 'milestones.projectId', '=', 'projects.id')
    .join(TableNames.users, 'users.id', '=', 'timeRecords.userId')
    .select('projects.name as projectName', database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.id as projectId', 'users.id as userId')
    .groupBy('users.id', 'projects.id')
    .sum('timeRecords.spentTime as timeSpent');
    const projectByHours = await query;
    //res.json(projectByHours);
    parseReportProjectByHours((projectByHours), res);
}

export const generateReportProjectByHours2 = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users)
    .join(TableNames.timeRecords, 'users.id', 'timeRecords.userId')
    .join(TableNames.milestones, 'milestones.id', 'timeRecords.milestoneId')
    .join(TableNames.projects, 'milestones.projectId', 'projects.id')
    .select(database.raw('concat(users.firstName, " ", users.lastName) as userName'), 'projects.name as projectName')
    .groupBy('userName', 'projectName')
    .sum('timeRecords.spentTime as timeSpent');
    const projectByHours = await query;
    //res.json(projectByHours);
    parseReportProjectByHours((projectByHours), res);
}

export const parseReportProjectByHours = (projectByHours, res: Response) => {
    let projects = [];
    let users = [];
    let sum = 0;

    projectByHours.forEach(element => {
        console.log(element);
        projects[element.projectId - 1] = ({id: element.projectId, projectName: element.projectName, totalTime: sum + element.timeSpent});
        sum += element.timeSpent;
            users[element.userId - 1] = [element.userId, element.userName, [].push({ projectId: project.id, timeSpent: element.timeSpent})];
        //users[element.userId - 1] = [element.userId, element.userName, [{ projectId: projects.id: element.timeSpent}]];
    });
    
    console.log('***********************************');
    console.log(projects);
    console.log(users);
    //console.log(users[1][2].projectId);
    console.log('***********************************');
    res.json(projects);
}
/*export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users).join(TableNames.projectUsers, 'users.id', '=', 'projectUsers.userId').where({ projectId: req.params.projectId }).select();
    if (req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
        query = query.offset(req.query.offset);
    }
    const users: Array<User> = await query;
    res.json(userSerializer.index(users));
};
*/