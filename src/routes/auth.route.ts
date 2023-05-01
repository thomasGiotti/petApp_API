import express from 'express';
import {
  loginEmailHandler,
  loginPhoneNumberHandler,
  registerHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import {
  createUserSchema,
  loginUserWithEmailSchema,
  loginUserWithPhoneNumberSchema,
} from '../schemas/user.schema';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post(
  '/loginWithEmail',
  validate(loginUserWithEmailSchema),
  loginEmailHandler
);
router.post(
  '/loginWithPhoneNumber',
  validate(loginUserWithPhoneNumberSchema),
  loginPhoneNumberHandler
);

export default router;
