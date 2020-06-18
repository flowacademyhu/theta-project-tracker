import { Project } from "../models/project";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { QueryBuilder } from "knex";
import { TableNames } from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.projects).join(TableNames.projectUsers, 'projects.id', '=', 'projectUsers.projectId').where({ userId: req.params.userId }).select();
    if (req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
        query = query.offset(req.query.offset);
    }
    const projects: Array<Project> = await query;
    res.json(projects);
};
