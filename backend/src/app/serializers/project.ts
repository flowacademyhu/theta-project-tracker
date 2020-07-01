import {database} from "../../lib/database";
import {Project} from "../models/project";
import {Request} from "express";

export const destroy = (project) => {
  return {
    name: project.name + ' ' + '(deleted)',
    deletedAt: database.raw('UNIX_TIMESTAMP()')
  }
}

export const create = (req: Request): Project => {
  return {
    name: req.body.name,
    clientId: req.body.clientId,
    description: req.body.description,
    budget: req.body.budget
  }
}
