import {Router} from 'express';
import {router as loginRouter} from './login';

export const router: Router = Router({mergeParams: true});
router.use('/login', loginRouter);
