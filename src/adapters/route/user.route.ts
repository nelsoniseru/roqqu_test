import express from 'express';
import { UserController } from '../controllers/user.controller';

export const createUserRouter = (userController: UserController) => {
  const router = express.Router();

  router.get('/', userController.getAll.bind(userController));
  router.get('/count', userController.getCount.bind(userController));
  router.get('/:id', userController.getById.bind(userController));
  router.post('/', userController.create.bind(userController));

  return router;
};
