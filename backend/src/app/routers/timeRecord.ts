import {Router} from 'express';
import * as timeRecordController from '../controllers/timeRecord';

export const router: Router = Router({mergeParams: true});

router.get('/:timeRecordId', timeRecordController.index);
router.post('/', timeRecordController.create);
router.put('/:timeRecordId', timeRecordController.update);
router.delete('/:timeRecordId', timeRecordController.destroy);
