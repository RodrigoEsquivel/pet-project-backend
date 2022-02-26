import joi from 'joi';


const login = {
    body: joi.object().keys({
      Email: joi.string().email({ tlds: { allow: false } }),
      Password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        )
        .required(),
    }),
  };

  export {login};