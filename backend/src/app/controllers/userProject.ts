import {Project} from "../models/project";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {Roles, TableNames} from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
  let userId: number;
  if (res.locals.user.role !== Roles.admin) {
    userId = res.locals.user.id;
  } else {
    userId = +req.params.userId;
  }
  let query: QueryBuilder = database(TableNames.projects)
    .join(TableNames.projectUsers, 'projects.id', '=', 'projectUsers.projectId')
    .where({userId: userId}).whereNull('projects.deletedAt').select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const projects: Array<Project> = await query;
  res.status(200).json(projects);
}
