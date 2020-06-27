import {database} from "../../lib/database";

export const destroy = (milestone) => {
  return {
    name: milestone.name + ' ' + '(deleted)',
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}
