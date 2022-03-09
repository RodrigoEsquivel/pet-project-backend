import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';
import { Users } from '../models/user.js';
import {
  AUTH_FAILED,
  LOGIN_SUCCESS,
  USER_CREATED,
  USER_CREATED_FAILED,
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
const processCreate= async (
    Email,
    Password,
    Name,
    LastName,
    Role
  ) => {
    const userAlreadyCreated = await Users.findOne({email: Email}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if(userAlreadyCreated){
      return {
        responseStatus: 200,
        responseProcess: {
          ...USER_CREATED_FAILED,
          message: 'Email already registered',
          TIMESTAMP: Date.now(),
        },
      };
    }
    const user = await Users.create({
        email: Email, 
        password: bcrypt.hashSync(Password, 10),
        name: Name, 
        lastName: LastName, 
        role: Role,
      }).catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (user) {
      return {
         responseStatus: 200,
         responseProcess: {
         ...USER_CREATED,
         message: 'User created successfully',
         TIMESTAMP: Date.now(),
        },
      };     
    }
    return {
      responseStatus: 401,
      responseProcess: {
        ...USER_CREATED_FAILED,
        message: 'User creation failed',
        TIMESTAMP: Date.now(),
      },
    };
  };

  


  export {processLogin, processCreate};