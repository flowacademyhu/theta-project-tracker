import {database} from "../../lib/database";

export const destroy = (project) => {
  return {
    name: project.name + ' ' + '(deleted)',
    deletedAt: database.raw('CURRENT_TIMESTAMP'),
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}
