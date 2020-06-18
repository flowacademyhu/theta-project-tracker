import { Router } from 'express';
import { router as userRouter } from './user';
import {router as loginRouter} from './login';
import {router as milestoneRouter} from './milestone';


export const router: Router = Router({mergeParams: true});
router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/milestone', milestoneRouter);

