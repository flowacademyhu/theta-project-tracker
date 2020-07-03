import {Router} from 'express';
import * as projectActionLabelController from '../controllers/projectActionLabel';

export const router: Router = Router({mergeParams: true});

router.get('/', projectActionLabelController.index);
