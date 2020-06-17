import { Router } from 'express';
import { router as userRouter } from './user';
import {router as loginRouter} from './login';

export const router: Router = Router({mergeParams: true});
router.use('/user', userRouter);
router.use('/login', loginRouter);

