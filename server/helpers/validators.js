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

  static user(user) {
    let userSchema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "rw", "fr"] }
      }),
      dob: Joi.date()
        .greater("1-1-1974")
        .allow(""),
      gender: Joi.string()
        .valid("MALE", "FEMALE")
        .uppercase()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    });
    return userSchema.validate(user);
  }
}

export default Validator;
