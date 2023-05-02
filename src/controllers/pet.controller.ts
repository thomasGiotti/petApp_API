import { Request, Response, NextFunction } from 'express';
import { CreatePetInput, UpdatePetInput } from '../schemas/pet.schema';
import { createPet, findPet, updatePet } from '../services/pet.service';
import { FilterQuery, QueryOptions, Types } from 'mongoose';
import PetModel, { Pet } from '../models/pet.model';

export const petRegisterHandler = async (
  req: Request<{}, {}, CreatePetInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, race, birthDate, description, sex, characteristic } = req.body;
  try {
    const userId = res.locals.user._id;
    const pet = await createPet(userId, {
      name,
      race,
      birthDate,
      description,
      sex,
      characteristic,
    });
    res.status(201).json({
      status: 'success',
      data: {
        pet,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'something went wrong',
      });
    }
    next(err);
  }
};

export const updatePetHandler = async (
  req: Request<{ id: string }, {}, UpdatePetInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const pet = await updatePet(id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        pet,
      },
    });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid pet id',
      });
    }
    next(err);
  }
};

export const searchPetsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: FilterQuery<Pet> = {};
    const options: QueryOptions = { lean: true };

    const searchParams = req.query;

    Object.keys(searchParams).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(PetModel, key)) {
        const searchValue = searchParams[key];
        if (typeof searchValue === 'string') {
          query[key] = new RegExp(searchValue, 'i');
        } else {
          query[key] = searchValue;
        }
      }
    });

    const pets = await findPet(query, options);
    if (!pets) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pets not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        pets,
      },
    });
  } catch (err) {
    next(err);
  }
};
