import { getAllUser, signIn, signUp, updateUser } from '../controllers/user.controller.js';
import express from 'express';
import { checkAuth, checkRole } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.get('/',checkAuth, checkRole, getAllUser)

router.post('/sign-up',signUp)

router.post('/sign-in',signIn)

router.put('/:id',checkAuth, updateUser)

export default router