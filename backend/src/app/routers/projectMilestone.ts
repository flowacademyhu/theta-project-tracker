import {Router} from 'express';
import * as projectMilestoneController from "../controllers/projectMilestone";

export const router: Router = Router({mergeParams: true});

router.get('/:projectId', projectMilestoneController.index);
