import express from 'express';
import {
  findOneUserHandler,
  getAllUsersHandler,
  getMeHandler,
  updateUserHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { restrictTo } from '../middleware/restrictTo';
import { requireUser } from '../middleware/requireUser';
import { EnumRole } from '../enums/role.enum';
import { updatePasswordSchema, updateUserSchema } from '../schemas/user.schema';
import { validate } from '../middleware/validate';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo(EnumRole.ADMIN), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);
router.put('/update', validate(updateUserSchema), updateUserHandler);
router.get('/:id', findOneUserHandler);
export default router;
