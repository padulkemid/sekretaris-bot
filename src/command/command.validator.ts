import Joi from 'joi';

const defaultCommandValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

const commonCommandValidator = Joi.array()
  .items(defaultCommandValidator)
  .required();

const commandValidator = {
  commonCommandValidator
};

export default commandValidator;
