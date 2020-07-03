import {database} from "../../lib/database";
import {Request} from "express";
import {ActionLabel} from "../models/actionLabel";

export const destroy = (actionLabel) => {
  return {
    name: actionLabel.name + ' ' + '(deleted)',
    deletedAt: database.raw('UNIX_TIMESTAMP()')
  }
}

export const create = (req: Request): ActionLabel => {
  return {
    projectId: req.body.projectId,
    name: req.body.name
  }
}

export const show = (actionLabel: ActionLabel): ActionLabel => {
  return {
    id: actionLabel.id,
    projectId: actionLabel.projectId,
    name: actionLabel.name,
    createdAt: actionLabel.createdAt,
    updatedAt: actionLabel.updatedAt
  }
}

export const index = (actionLabels: Array<ActionLabel>): Array<ActionLabel> => {
  return actionLabels.map((actionLabel: ActionLabel) => show(actionLabel));
}
