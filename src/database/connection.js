import {mongoose} from 'mongoose';
import {log} from '../util/general.js';
import {mongoDBURI} from '../configuration/config.js'
const dbConnection = async () => { 
  try { 
    await mongoose.connect(mongoDBURI, { 
          useNewUrlParser: true,  
          useUnifiedTopology: true
        }) 
      } catch(err) { 
        log.error({
          STATUS: 'error',
          DESCRIPTION: 'Error in DB connection!',
          STACK: err.stack,
          }); 
          throw new Error('Error in DB connection.');
      }
    }

export {dbConnection};