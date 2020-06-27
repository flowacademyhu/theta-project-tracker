import {database} from "../../lib/database";

export const destroy = (client)=> {
  return {
    name: client.name + ' ' + '(deleted)',
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}
