import express from 'express';
import { validate } from '../middleware/validate';
import { createPetSchema, updatePetSchema } from '../schemas/pet.schema';
import {
  petRegisterHandler,
  searchPetsHandler,
  updatePetHandler,
} from '../controllers/pet.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post('/create', validate(createPetSchema), petRegisterHandler);
router.put('/update/:id', validate(updatePetSchema), updatePetHandler);
router.get('/search', searchPetsHandler);

export default router;
