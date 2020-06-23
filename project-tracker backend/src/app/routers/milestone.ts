import {Router} from 'express';
import * as milestoneController from '../controllers/milestone';
import {authorization} from "../../lib/auth";

export const router: Router = Router({mergeParams: true});

router.get('/', milestoneController.index);
router.get('/:id', milestoneController.show);
router.use(authorization);
router.post('/', milestoneController.create);
router.put('/:id', milestoneController.update);
router.delete('/:id', milestoneController.destroy); 
