import {Project} from "../models/project";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as projectSerializer from "../serializers/project";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.projects).select().where({deletedAt: 0});
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
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).where({deletedAt: 0}).first();
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
    const duplicate: Project = await database(TableNames.projects).select().where({name: req.body.name}).first();
    if (duplicate) {
      res.sendStatus(400);
    } else {
      const project: Project = projectSerializer.create(req);
      await database(TableNames.projects).insert(project);
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).where({deletedAt: 0}).first();
    if (project) {
      const newProject: Project = projectSerializer.create(req);
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
    const project: Project = await database(TableNames.projects).select().where({id: req.params.id}).where({deletedAt: 0}).first();
    if (project) {
      await database(TableNames.projects).update(projectSerializer.destroy(project)).where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
