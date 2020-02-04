import Joi from "@hapi/joi";

class Validator {
  static account(email, password) {
    let accountSchema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .messages({
          string: `Invalid Password Format`
        })
    });

    return accountSchema.validate({ email, password });
  }

  static category(category) {
    let categorySchema = Joi.object({
      name: Joi.string().required(),
      status: Joi.string()
        .valid("active", "inactive")
        .allow("")
    });
    return categorySchema.validate(category);
  }

  static product(product) {
    let productSchema = Joi.object({
      name: Joi.string().required(),
      currency: Joi.string()
        .valid("USD", "UAE", "RWF")
        .required(),
      description: Joi.string().required(),
      category: Joi.string().required()
    });
    return productSchema.validate(product);
  }
}

export default Validator;
