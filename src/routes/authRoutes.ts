
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateSchema } from '../middleware/validateSchema'
import { loginSchema, registerSchema } from '../schemas/authSchema';


const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);

export default router;