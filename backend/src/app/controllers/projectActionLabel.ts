import {ActionLabel} from "../models/actionLabel";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as actionLabelSerializer from "../serializers/actionLabel";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.actionLabels).where({projectId: req.params.projectId, deletedAt: 0}).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const actionLabels: Array<ActionLabel> = await query;
  res.status(200).json(actionLabelSerializer.index(actionLabels))
}
