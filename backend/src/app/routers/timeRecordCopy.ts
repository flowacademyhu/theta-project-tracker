import {Router} from 'express';
import * as timeRecordCopyController from '../controllers/timeRecordCopy';

export const router: Router = Router({mergeParams: true});

router.post('/', timeRecordCopyController.create);
