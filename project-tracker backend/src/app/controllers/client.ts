import { Client } from "../models/client";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import * as clientSerializer from '../serializers/client';
import * as bcrypt from 'bcrypt';
import { QueryBuilder } from "knex";
import { TableNames } from "../../lib/table_names";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.clients).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const clients: Array<Client> = await query;
  res.json(clientSerializer.index(clients));
};

export const show = async (req: Request, res: Response) => {
  try {
    const client: Client = await database(TableNames.clients).select().where({ id: req.params.id }).first();
    if (typeof client !== 'undefined') {
      res.json(clientSerializer.show(client));
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const client: Client = {
      name: req.body.name,
      description: req.body.description
    }
    await database(TableNames.clients).insert(client);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const client: Client = await database(TableNames.clients).select().where({ id: req.params.id }).first();
    if (client) {
      const newClient: Client = {
        name: req.body.name,
        description: req.body.description
      }
      await database(TableNames.clients).update(newClient).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const client: Client = await database(TableNames.clients).select().where({ id: req.params.id }).first();
    if (client) {
      await database(TableNames.clients).delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}
