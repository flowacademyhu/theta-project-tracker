import { Router } from 'express';
import * as actionLabelController from '../controllers/actionLabel';
import {authorization} from "../../lib/auth";

export const router: Router = Router({ mergeParams: true });

router.get('/', actionLabelController.index);
router.get('/:actionLabelId', actionLabelController.show);
router.use(authorization);
router.post('/', actionLabelController.create);
router.put('/:actionLabelId', actionLabelController.update);
router.delete('/:actionLabelId', actionLabelController.destroy);
