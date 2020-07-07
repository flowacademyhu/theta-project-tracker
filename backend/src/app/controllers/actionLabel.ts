import {ActionLabel} from "../models/actionLabel";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as actionLabelSerializer from "../serializers/actionLabel";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.actionLabels).where({deletedAt: 0}).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const actionLabels: Array<ActionLabel> = await query;
  res.status(200).json(actionLabelSerializer.index(actionLabels));
};

export const show = async (req: Request, res: Response) => {
  try {
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.actionLabelId, deletedAt: 0}).first();
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
    const duplicate: ActionLabel = await database(TableNames.actionLabels).select()
      .where({projectId: req.body.projectId, name: req.body.name}).first();
    if (duplicate) {
      res.sendStatus(400);
    } else {
      const actionLabel: ActionLabel = actionLabelSerializer.create(req);
      await database(TableNames.actionLabels).insert(actionLabel);
      res.sendStatus(201);
    }

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.actionLabelId, deletedAt: 0}).first();
    if (actionLabel) {
      const newActionLabel: ActionLabel = actionLabelSerializer.create(req);
      await database(TableNames.actionLabels).update(newActionLabel).where({id: req.params.actionLabelId});
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
    const actionLabel: ActionLabel = await database(TableNames.actionLabels).select().where({id: req.params.actionLabelId, deletedAt: 0}).first();
    if (actionLabel) {
      await database(TableNames.actionLabels).update(actionLabelSerializer.destroy(actionLabel)).where({id: req.params.actionLabelId});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
