import PetModel, { Pet } from '../models/pet.model';
import UserModel from '../models/user.model';
import { UpdatePetInput } from '../schemas/pet.schema';
import { FilterQuery, QueryOptions } from 'mongoose';

export const createPet = async (id: string, input: Partial<Pet>) => {
  const pet = await PetModel.create(input);

  await UserModel.findByIdAndUpdate(id, { pets: pet });

  return pet;
};

export const findPet = async (
  query: FilterQuery<Pet>,
  options: QueryOptions = {}
) => {
  return await PetModel.findOne(query, {}, options);
};

export const updatePet = async (petId: string, data: UpdatePetInput) => {
  const pet = await PetModel.findByIdAndUpdate(petId, data, {
    new: true,
    runValidators: true,
  });
  return pet;
};
