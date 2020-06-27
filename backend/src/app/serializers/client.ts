import {database} from "../../lib/database";

export const destroy = (client)=> {
  return {
    name: client.name + ' ' + '(deleted)',
    deletedAt: database.raw('CURRENT_TIMESTAMP'),
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}
