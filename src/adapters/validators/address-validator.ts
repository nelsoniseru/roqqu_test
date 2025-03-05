import Joi from '@hapi/joi';

export const createAddressSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  street: Joi.string().min(1).required(),
  city: Joi.string().min(1).required(),
  country: Joi.string().min(1).required(),
  postalCode: Joi.string().min(1).required()
});

export const updateAddressSchema = Joi.object({
  street: Joi.string().min(1),
  city: Joi.string().min(1),
  country: Joi.string().min(1),
  postalCode: Joi.string().min(1)
}).min(1); 

