import Joi from '@hapi/joi';

export const paginationSchema = Joi.object({
  pageNumber: Joi.number().integer().min(0).required(),
  pageSize: Joi.number().integer().min(1).max(100).required()
}).unknown(true);

export const createUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required()
});