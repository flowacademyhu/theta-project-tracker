import {Router} from 'express';
import * as projectController from '../controllers/project';
import {authorization} from "../../lib/auth";

export const router: Router = Router({mergeParams: true});

router.use(authorization);
router.get('/:id', projectController.show);
router.get('/', projectController.index);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.destroy);
