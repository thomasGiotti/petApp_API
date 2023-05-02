import { NextFunction, Request, Response } from 'express';
import {
  findAllUsers,
  findUserById,
  updateUser,
} from '../services/user.service';
import { UpdateUserInput } from '../schemas/user.schema';
import { Types } from 'mongoose';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const findOneUserHandler = async (
  req: Request<{ id: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;
    const user = await updateUser(userId, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid user id',
      });
    }
    next(err);
  }
};
