import bcrypt from 'bcryptjs';
import { jwtSecretKey } from '../configuration/config.js';
import { log } from '../util/general.js';
import { Products } from '../models/product.js';
import {
  PRODUCT_CREATED,
  PRODUCT_CREATED_FAILED,
  PRODUCTS_SELECTED,
  PRODUCTS_SELECTED_FAILED,
  PRODUCTS_BY_USER_SELECTED,
  PRODUCTS_BY_USER_SELECTED_FAILED
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
      responseStatus: 400,
      responseProcess: {
        ...PRODUCT_CREATED_FAILED,
        message: 'Product creation failed',
        TIMESTAMP: Date.now(),
      },
    };
  };

const processSelectAll = async (Token) => {
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
    const products = await Products.find({}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (products) {
          return {
            responseStatus: 200,
            responseProcess: {
              ...PRODUCTS_SELECTED,
              products,
              TIMESTAMP: Date.now(),
            },
          };
    }
        return {
          responseStatus: 400,
          responseProcess: {
            ...PRODUCTS_SELECTED_FAILED,
            message: 'Error in the selection of products',
            TIMESTAMP: Date.now(),
          },
        };    
  };

  const processSelectAllFromUser = async (
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
    const products = await Products.find({seller: UserId}).exec().catch((error) => {
      log.error({
        STATUS: 'error',
        DESCRIPTION: 'Error in DB request.',
        STACK: error.stack,
      });
      throw new Error('Error in DB request.');
    });
    if (products) {
          return {
            responseStatus: 200,
            responseProcess: {
              ...PRODUCTS_BY_USER_SELECTED,
              products,
              TIMESTAMP: Date.now(),
            },
          };
    }
        return {
          responseStatus: 400,
          responseProcess: {
            ...PRODUCTS_BY_USER_SELECTED_FAILED,
            message: 'Error in the selection of products',
            TIMESTAMP: Date.now(),
          },
        }; 
  };


  export {processCreate, processSelectAllFromUser, processSelectAll};