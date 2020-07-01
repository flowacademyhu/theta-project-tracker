import {database} from "../../lib/database";
import {Request} from "express";
import {Milestone} from "../models/milestone";

export const destroy = (milestone) => {
  return {
    name: milestone.name + ' ' + '(deleted)',
    deletedAt: database.raw('UNIX_TIMESTAMP()')
  }
}

export const create = (req: Request): Milestone => {
  return {
    name: req.body.name,
    projectId: req.body.projectId,
    description: req.body.description,
  }
}
