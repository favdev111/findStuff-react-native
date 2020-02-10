import Joi from "@hapi/joi";

export const signupValidation = (data: object) => {
  const userSchema = Joi.object().keys({
    // name: Joi.string()
    //     .min(3)
    //     .required(),
    // username: Joi.string()
    //     .required(),
    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'mx'] } })
    //     .required(),
    phone: Joi.string().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  return userSchema.validate(data);
};

export const postValidation = (data: object) => {
  const postSchema = Joi.object().keys({
    title: Joi.string()
      .min(3)
      .required(),
    url: Joi.string()
      .min(5)
      .required(),
    content: Joi.string().required(),
    image: Joi.string()
  });

  return postSchema.validate(data);
};

export const signinValidation = (data: object) => {
  const userSchema = Joi.object({
    // email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return userSchema.validate(data);
};

export const loginValidation = (data: object) => {
  const adminSchema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return adminSchema.validate(data);
};

export const registerValidation = (data: object) => {
  const adminSchema = Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  return adminSchema.validate(data);
};
