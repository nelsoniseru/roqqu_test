import { Request, Response } from 'express';
import { UserService } from '../../application/services/user.service';
import { createUserSchema, paginationSchema } from '../validators/user-validator';
import logger from '../../infrastructure/logger';

export class UserController {
  constructor(private userService: UserService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = paginationSchema.validate(req.query);
      if (error) {
        res.status(400).json({ status: false, message: error.details[0].message });
        logger.error(`error: ${error.details[0].message}`);
        return
      }

      const { pageNumber, pageSize } = value;
      const users = await this.userService.getUsers(pageNumber, pageSize);
      res.status(200).json({ status: true, message: "user found successfully", users });
    } catch (error) {
    }
  }

  async getCount(req: Request, res: Response): Promise<void> {
    try {
      logger.info(`About to get total number of user in the system`);
      const count = await this.userService.getUserCount();
      logger.info(`user count found successfully: ${JSON.stringify(count)}`);
      res.status(200).json({ status: true, message: "user count found successfully", count });
    } catch (error) {
      logger.error(`Error getting user: ${error}`);
      res.status(400).json({ status: false, message: `${error}` });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        logger.error(`invalid id: ${id}`);
        res.json({ status: false, message: "invalid id" });
        return
      }
      const user = await this.userService.getUserById(id);
      logger.info(`user found successfully: ${JSON.stringify(user)}`);

      res.status(200).json({ status: true, message: "user found successfully", user });

      res.json();
    } catch (error) {
      logger.error(`Error getting user: ${error}`);
      res.status(400).json({ status: false, message: `${error}` });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      logger.info('creating a new user');
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        res.status(400).json({ status: false, message: error.details[0].message });
        logger.error(`error: ${error.details[0].message}`);
        return
      }
      const user = await this.userService.createUser(value);
      logger.info(`user created successfully: ${JSON.stringify(user)}`);
      res.status(200).json({ status: true, message: "user created successfully", user });
    } catch (error) {
      logger.error(`Error creating user: ${error}`);
      res.status(400).json({ status: false, message: `${error}` });

    }
  }
}