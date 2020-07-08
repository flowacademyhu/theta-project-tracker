import {Router} from 'express';
import * as timeRecordController from '../controllers/timeRecord';

export const router: Router = Router({mergeParams: true});

router.get('/', timeRecordController.index);
router.post('/', timeRecordController.create);
router.put('/', timeRecordController.update);
router.delete('/', timeRecordController.destroy);
