import {ActionLabel} from "../models/actionLabel";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.actionLabels).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const actionLabels: Array<ActionLabel> = await query;
  res.status(200).json(actionLabels);
};

export const show = async (req: Request, res: Response) => {
  try {
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.id}).first();
    if (actionLabel) {
      res.status(200).json(actionLabel);
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
    const actionLabel: ActionLabel = {
      name: req.params.name
    }
    await database(TableNames.actionLabels).insert(actionLabel);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.id}).first();
    if (actionLabel) {
      const newActionLabel: ActionLabel = {
        name: req.body.name
      }
      await database(TableNames.actionLabels).update(newActionLabel).where({id: req.params.id});
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
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.id}).first();
    if (actionLabel) {
      await database(TableNames.actionLabels).delete().where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
