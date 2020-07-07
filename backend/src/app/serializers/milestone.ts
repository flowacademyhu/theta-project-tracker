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

export const show = (milestone): Milestone => {
  return {
    id: milestone.id,
    name: milestone.name,
    projectId: milestone.projectId,
    description: milestone.description,
    createdAt: milestone.createdAt,
    updatedAt: milestone.updatedAt
  }
}

export const index = (milestones: Array<Milestone>): Array<Milestone> => {
  return milestones.map((milestone: Milestone) => show(milestone));
}
