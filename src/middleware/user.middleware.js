import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';
import { Users } from '../models/user.js';
import {
  AUTH_FAILED,
  LOGIN_SUCCESS,
} from '../util/static.js';
import { encodeSession } from '../util/auth.js';


const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
const processLogin = async (
    Email,
    Password
  ) => {
    const user = await Users.findOne({email: Email}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (user) {
        if (comparePassword(Password, user.password)) {
          const TOKEN = encodeSession(jwtSecretKey, {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            rol: user.role,
            dateCreated: Date.now(),
          });
          return {
            responseStatus: 200,
            responseProcess: {
              ...LOGIN_SUCCESS,
              ...TOKEN,
              userData: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                rol: user.role,
              },
              TIMESTAMP: Date.now(),
            },
          };
        }
        return {
          responseStatus: 401,
          responseProcess: {
            ...AUTH_FAILED,
            message: 'Incorrect email and/or password',
            TIMESTAMP: Date.now(),
          },
        };
      
    }
    return {
      responseStatus: 401,
      responseProcess: {
        ...AUTH_FAILED,
        message: 'Incorrect email and/or password.',
        TIMESTAMP: Date.now(),
      },
    };
  };


  export {processLogin};