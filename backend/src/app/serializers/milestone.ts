import {database} from "../../lib/database";

export const destroy = (milestone) => {
  return {
    name: milestone.name + ' ' + '(deleted)',
    deletedAt: database.raw('UNIX_TIMESTAMP()')
  }
}
