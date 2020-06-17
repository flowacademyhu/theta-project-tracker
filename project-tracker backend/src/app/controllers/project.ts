import { Project } from "../models/project";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as projectSerializer from '../serializers/project';
import * as bcrypt from 'bcrypt';
import { QueryBuilder } from "knex";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database('projects').select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const projects: Array<Project> = await query;
  res.json(projectSerializer.index(projects));
};

export const show = async (req: Request, res: Response) => {
  try {
    const project: Project = await database('projects').select().where({ id: req.params.id }).first();
    console.log(project);
    if (typeof project !== 'undefined') {
      res.json(projectSerializer.show(project));
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log('REQ', req.body.password, 'HASH', encryptedPassword)
    const project: Project = {
      name: req.body.name,
      clientId: req.body.clientId,
      description: req.body.description,
      budget: req.body.budget
    }
    await database('projects').insert(project);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const project: Project = await database('projects').select().where({ id: req.params.id }).first();
    if (project) {
      const newProject: Project = {
        name: req.body.name,
        clientId: req.body.clientId,
        description: req.body.description,
        budget: req.body.budget
      }
      await database('projects').update(newProject).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const project: Project = await database('projects').select().where({ id: req.params.id }).first();
    if (project) {
      await database('projects').delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}