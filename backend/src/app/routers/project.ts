import {Router} from 'express';
import * as projectController from '../controllers/project';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.use(adminAuthorization);
router.get('/:id', projectController.show);
router.get('/', projectController.index);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.destroy);
