import {Project} from "../models/project";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.projects).select().whereNull('deletedAt');
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const projects: Array<Project> = await query;
  res.status(200).json(projects);
};

export const show = async (req: Request, res: Response) => {
  try {
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).whereNull('deletedAt').first();
    if (project) {
      res.status(200).json(project);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const project: Project = {
      name: req.body.name,
      clientId: req.body.clientId,
      description: req.body.description,
      budget: req.body.budget
    }
    await database(TableNames.projects).insert(project);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).whereNull('deletedAt').first();
    if (project) {
      const newProject: Project = {
        name: req.body.name,
        clientId: req.body.clientId,
        description: req.body.description,
        budget: req.body.budget
      }
      await database(TableNames.projects).update(newProject).where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).whereNull('deletedAt').first();
    if (project) {
      await database(TableNames.projects).update('deletedAt', database.raw('CURRENT_TIMESTAMP')).where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
