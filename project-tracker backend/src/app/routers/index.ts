import {Router} from 'express';
import {router as loginRouter} from './login';
import {router as milestoneRouter} from './milestone';


export const router: Router = Router({mergeParams: true});
router.use('/login', loginRouter);
router.use('/milestone', milestoneRouter);

