import * as Knex from 'knex';
import { QueryBuilder } from 'knex';
import * as configs from '../../config/database.json';
const config = configs[process.env.NODE_ENV || 'development'];

export const database = Knex(config as Knex.Config);
