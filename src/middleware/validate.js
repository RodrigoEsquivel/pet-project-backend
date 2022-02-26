import joi from 'joi';
import httpStatus from 'http-status';
import pkg from 'express';
import { pick } from '../util/general.js';
import { BAD_REQUEST } from '../util/static.js';

const { NextFunction, Request, Response } = pkg;

const validate = (schema) => (
    req,
    res,
    next,
  ) => {
    const validSchema = pick(schema, [
      'params',
      'query',
      'body',
      'file',
      'header',
    ]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = joi
      .compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);
  
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return res.status(httpStatus.BAD_REQUEST).send({
        ...BAD_REQUEST,
        MESSAGE: errorMessage,
        TIMESTAMP: new Date().getTime(),
      });
    }
    Object.assign(req, value); 
    return next();
  };

  export default validate;