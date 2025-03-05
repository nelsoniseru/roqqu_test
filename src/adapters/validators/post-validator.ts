import Joi from '@hapi/joi';

export const createPostSchema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required()
  });
  
  export const postsQuerySchema = Joi.object({
    userId: Joi.number().integer().min(1).required()
  }).unknown(true);