import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';
import { Users } from '../models/user.js';
import {
  AUTH_FAILED,
  LOGIN_SUCCESS,
  USER_CREATED,
  USER_CREATED_FAILED,
  USER_DELETED,
  USER_DELETED_FAILED,
  USER_READ,
  USER_READ_FAILED,
  USER_UPDATED,
  USER_UPDATED_FAILED
} from '../util/static.js';
import { encodeSession, decodeSession } from '../util/auth.js';


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
                id: user._id,
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

  const processDelete = async (
    Token,
    UserId
  ) => {
    const session = decodeSession(jwtSecretKey, Token);
    if (session.type !== 'valid') {
        return {
        responseStatus: 401,
        responseProcess: {
            ...INVALID_TOKEN,
            TIMESTAMP: Date.now(),
        },
        };
    }
    const deletedUser = await Users.deleteOne({_id: UserId}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (deletedUser['deletedCount']===1) {
          return {
            responseStatus: 200,
            responseProcess: {
              ...USER_DELETED,
              TIMESTAMP: Date.now(),
            },
          };
    }
        return {
          responseStatus: 400,
          responseProcess: {
            ...USER_DELETED_FAILED,
            message: 'Error in the deletion of the user',
            TIMESTAMP: Date.now(),
          },
        }; 
  };

  const processUpdate= async (
    Token,
    UserId,
    Email,
    Password,
    NewPassword,
    Name,
    LastName,
    Role
  ) => {
    const session = decodeSession(jwtSecretKey, Token);
    if (session.type !== 'valid') {
        return {
        responseStatus: 401,
        responseProcess: {
            ...INVALID_TOKEN,
            TIMESTAMP: Date.now(),
        },
        };
    }
    const foundUser = await Users.findOne({_id: UserId}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if(!foundUser){
      return {
        responseStatus: 200,
        responseProcess: {
          ...USER_UPDATED_FAILED,
          message: 'User not found',
          TIMESTAMP: Date.now(),
        },
      };
    }
    if(comparePassword(Password, foundUser.password)){
      const user = await Users.updateOne({_id: UserId},{
        email: Email, 
        password: bcrypt.hashSync(NewPassword, 10),
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
    if (user.acknowledged) {
      return {
         responseStatus: 200,
         responseProcess: {
         ...USER_UPDATED,
         message: 'User updated successfully',
         TIMESTAMP: Date.now(),
        },
      };     
    }
    } 
    return {
      responseStatus: 401,
      responseProcess: {
        ...USER_UPDATED_FAILED,
        message: 'User update failed',
        TIMESTAMP: Date.now(),
      },
    };
  };

  const processRead = async (
    Token,
    UserId
  ) => {
    const session = decodeSession(jwtSecretKey, Token);
    if (session.type !== 'valid') {
        return {
        responseStatus: 401,
        responseProcess: {
            ...INVALID_TOKEN,
            TIMESTAMP: Date.now(),
        },
        };
    }
    const user = await Users.findOne({_id: UserId}, 'name lastName email role').exec().catch((error) => {
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
              ...USER_READ,
              user,
              TIMESTAMP: Date.now(),
            },
          };
    }
        return {
          responseStatus: 400,
          responseProcess: {
            ...USER_READ_FAILED,
            message: 'Error in the reading of the user',
            TIMESTAMP: Date.now(),
          },
        }; 
  };

  


  export {processLogin, processCreate, processDelete, processUpdate, processRead};