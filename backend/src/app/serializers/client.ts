import {database} from "../../lib/database";
import {Request} from "express";
import {Client} from "../models/client";

export const destroy = (client)=> {
  return {
    name: client.name + ' ' + '(deleted)',
    deletedAt: database.raw('UNIX_TIMESTAMP()')
  }
}

export const create = (req: Request): Client => {
  return {
    name: req.body.name,
    description: req.body.description
  }
}
