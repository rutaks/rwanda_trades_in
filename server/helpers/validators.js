import Joi from "@hapi/joi";

class Validator {
  static isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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

  static admin(admin) {
    let adminSchema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(),
    });

    return adminSchema.validate(admin);
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

  static productRequest(productRequest) {
    let accountSchema = Joi.object({
      clientNames: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().allow(""),
      quantity: Joi.number().required(),
      product: Joi.string().required(),
    });

    return accountSchema.validate(productRequest);
  }
}

export default Validator;
