import {Router} from 'express';
import {router as loginRouter} from './login';
import {router as userRouter} from './user';
import {router as milestoneRouter} from './milestone';
import {router as clientRouter} from './client';
import {router as projectRouter} from './project';
import {router as projectUserRouter} from './projectUser';
import {router as userProjectRouter} from './userProject';

export const router: Router = Router({mergeParams: true});
router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/project', projectRouter);
router.use('/milestone', milestoneRouter);
router.use('/project/:projectId/user', projectUserRouter);
router.use('/user/:userId/project', userProjectRouter);
