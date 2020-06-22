import { Router } from 'express';
import * as timeRecordController from '../controllers/timeRecord';
import {authorization} from "../../lib/auth";

export const router: Router = Router({ mergeParams: true });

router.get('/:timeRecordId', timeRecordController.show);
router.post('/', timeRecordController.create);
router.put('/:timeRecordId', timeRecordController.update);
router.delete('/:timeRecordId', timeRecordController.destroy);
router.use(authorization)
router.get('/', timeRecordController.index);

