import {Router} from 'express';
import * as timeRecordController from '../controllers/timeRecord';
import {adminAuthorization} from "../../lib/authorization/admin";

export const router: Router = Router({mergeParams: true});

router.get('/:timeRecordId', timeRecordController.show);
router.post('/', timeRecordController.create);
router.put('/:timeRecordId', timeRecordController.update);
router.delete('/:timeRecordId', timeRecordController.destroy);
router.use(adminAuthorization)
router.get('/', timeRecordController.index);
router.get('/dates', timeRecordController.getStartAndEndDates);
