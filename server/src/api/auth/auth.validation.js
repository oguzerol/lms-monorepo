import Joi from "joi";

export const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

export const register = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
  }),
};

export const resetPassword = {
  body: Joi.object({
    resetLink: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  }),
};

export const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};
