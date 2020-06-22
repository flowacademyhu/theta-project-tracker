import { QueryBuilder } from "knex";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {TableNames} from "../../lib/enums";

export const generateReport = () => {

}

export const generateReportProjectByHours = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.timeRecords).join(TableNames.milestones, 'timeRecords.milestoneId', '=', 'milestones.id').join(TableNames.projects, 'milestones.projectId', '=', 'projects.id').select();
    const projectByHours = await query;
    res.json(projectByHours);
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