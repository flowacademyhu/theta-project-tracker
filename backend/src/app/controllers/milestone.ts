import {Milestone} from "../models/milestone";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as milestoneSerializer from "../serializers/milestone";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.milestones).select().where({deletedAt: 0});
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const milestones: Array<Milestone> = await query;
  res.status(200).json(milestoneSerializer.index(milestones));
};

export const show = async (req: Request, res: Response) => {
  try {
    const milestone: Milestone = await database(TableNames.milestones).select().where({id: req.params.id}).where({deletedAt: 0}).first();
    if (milestone) {
      res.status(200).json(milestoneSerializer.show(milestone));
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
    const duplicate: Milestone = await database(TableNames.milestones).select()
      .where({name: req.body.name, projectId: req.body.projectId}).first();
    if (duplicate) {
      res.sendStatus(400);
    } else {
      const milestone: Milestone = milestoneSerializer.create(req);
      await database(TableNames.milestones).insert(milestone);
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const milestone: Milestone = await database(TableNames.milestones).select().where({id: req.params.id}).where({deletedAt: 0}).first();
    if (milestone) {
      const newMilestone: Milestone = milestoneSerializer.create(req);
      await database(TableNames.milestones).update(newMilestone).where({id: req.params.id});
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
    const milestone: Milestone = await database(TableNames.milestones).select().where({id: req.params.id}).first();
    if (milestone) {
      await database(TableNames.milestones).update(milestoneSerializer.destroy(milestone)).where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
