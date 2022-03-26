const Joi = require("@hapi/joi");

const loginValidation = (data:any) => {
    const schema = Joi.object({
        mail: Joi.string().required().mail(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports.loginValidation = loginValidation;