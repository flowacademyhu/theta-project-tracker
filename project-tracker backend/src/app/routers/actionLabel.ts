import { Router } from 'express';
import * as actionLabelController from '../controllers/actionLabel';

export const router: Router = Router({ mergeParams: true });

router.get('/', actionLabelController.index);
router.get('/:actionLabelId', actionLabelController.show);
router.post('/', actionLabelController.create);
router.put('/:actionLabelId', actionLabelController.update);
router.delete('/:actionLabelId', actionLabelController.destroy);
