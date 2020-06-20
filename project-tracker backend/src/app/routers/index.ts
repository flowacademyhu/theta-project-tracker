import {Router} from 'express';
import {router as loginRouter} from './login';
import {router as userRouter} from './user';
import {router as milestoneRouter} from './milestone';
import {router as clientRouter} from './client';
import {router as projectRouter} from './project';
import {router as timeRecordRouter} from './timeRecord';
import {router as actionLabelRouter} from './actionLabel';

export const router: Router = Router({mergeParams: true});
router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/project', projectRouter);
router.use('/milestone', milestoneRouter);
router.use('/timeRecord', timeRecordRouter);
router.use('/actionLabel', actionLabelRouter);
