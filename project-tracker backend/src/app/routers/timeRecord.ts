import { Router } from 'express';
import * as timeRecordController from '../controllers/timeRecord';

export const router: Router = Router({ mergeParams: true });

router.get('/', timeRecordController.index);
router.get('/:timeRecordId', timeRecordController.show);
router.post('/', timeRecordController.create);
router.put('/:timeRecordId', timeRecordController.update);
router.delete('/:timeRecordId', timeRecordController.destroy);
