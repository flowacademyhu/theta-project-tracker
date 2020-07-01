import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {Milestone} from "../models/milestone";
import * as milestoneSerializer from "../serializers/milestone";

export const index = async (req: Request, res: Response) => {
  try {
    let query: QueryBuilder = database(TableNames.milestones).where({projectId: req.params.projectId, deletedAt: 0}).select();
    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
      query = query.offset(req.query.offset);
    }
    const milestones: Array<Milestone> = await query;
    res.status(200).json(milestoneSerializer.index(milestones));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
