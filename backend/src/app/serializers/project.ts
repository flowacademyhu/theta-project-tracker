import {database} from "../../lib/database";

export const destroy = (project) => {
  return {
    name: project.name + ' ' + '(deleted)',
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}
