import Joi from "@hapi/joi";

class Validator {
  static isValidPicture(file) {
    if (typeof file === "undefined") return false;
    return /\.(gif|jpg|jpeg|tiff|png)$/i.test(file[0].path);
  }

  static account(email, password) {
    let accountSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .error(new Error("Password is not valid")),
    });

    return accountSchema.validate({ email, password });
  }

  static category(category) {
    let categorySchema = Joi.object({
      name: Joi.string().required(),
      status: Joi.string().valid("active", "inactive").allow(""),
    });
    return categorySchema.validate(category);
  }

  static product(product) {
    let productSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      currency: Joi.string().valid("USD", "UAE", "RWF").required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
    });
    return productSchema.validate(product);
  }
}

export default Validator;
