import express from 'express';

import { login, signUp } from '../controllers/auth.js';

const router = express.Router();


router.post('/signin', login);
router.post('/signup', signUp);


export default router;