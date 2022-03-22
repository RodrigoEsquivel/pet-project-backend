import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';
import { Products } from '../models/product.js';
import {
  AUTH_FAILED,
  LOGIN_SUCCESS,
  USER_CREATED,
  USER_CREATED_FAILED,
  PRODUCT_CREATED,
  PRODUCT_CREATED_FAILED
} from '../util/static.js';
import { encodeSession, decodeSession } from '../util/auth.js';


const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
const processCreate= async (
    Token,
    Name,
    Description,
    ImageURI,
    Sold,
    Price,
    Brand,
    Seller
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
    const product = await Products.create({
        name: Name, 
        description: Description,
        imageURI: ImageURI, 
        sold: Sold, 
        price: Price,
        brand: Brand,
        seller: Seller
      }).catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (product) {
      return {
         responseStatus: 200,
         responseProcess: {
         ...PRODUCT_CREATED,
         message: 'Product created successfully',
         TIMESTAMP: Date.now(),
        },
      };     
    }
    return {
      responseStatus: 401,
      responseProcess: {
        ...PRODUCT_CREATED_FAILED,
        message: 'Product creation failed',
        TIMESTAMP: Date.now(),
      },
    };
  };

  const processSelectAll = async (
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

  const processSelectAllFromUser = async (
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


  export {processCreate, processSelectAllFromUser, processSelectAll};