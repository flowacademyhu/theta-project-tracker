import { Router } from 'express';
import { router as userRouter } from './user';
export const router: Router = Router({mergeParams: true});

router.use('/user', userRouter);