import Joi from "joi";

export const skillsSchema = Joi.object({
  skills: Joi.array().items(Joi.string()).min(1).required(),
});

export const newCandidateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  skills: Joi.array().items(Joi.string()).min(1).required(),
});
