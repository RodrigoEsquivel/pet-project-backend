import pkg from 'express';
import httpStatus from 'http-status';
import { catchAsync, log } from '../util/general.js';
import { processCreate, processSelectAll, processSelectAllFromUser } from '../middleware/product.middleware.js';

const {Request, Response } = pkg;
//NEEDS TO BE MODIFIED
export default {
    create: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const { Name, Description, ImageURI, Sold, Price, Brand, Seller } = req.body;
        const response = await processCreate(Token, Name, Description, ImageURI, Sold, Price, Brand, Seller).catch(
        (error) => {
            log.error({
            STATUS: 'error',
            DESCRIPTION: 'Error PROCESS request!',
            STACK: error.stack,
            });
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            STATUS: 'fatal',
            DESCRIPTION:
                'Error in the request! If this error persists please contact support.',
            TIMESTAMP: new Date().getTime(),
            });
        },
        );
        if (response) res.status(response.responseStatus).send(response.responseProcess);
    }),
    selectAll: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const response = await processSelectAll(Token).catch(
        (error) => {
            log.error({
            STATUS: 'error',
            DESCRIPTION: 'Error PROCESS request!',
            STACK: error.stack,
            });
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            STATUS: 'fatal',
            DESCRIPTION:
                'Error in the request! If this error persists please contact support.',
            TIMESTAMP: new Date().getTime(),
            });
        },
        );
        if (response) res.status(response.responseStatus).send(response.responseProcess);
    }),
    selectAllFromUser: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const { UserId } = req.body;
        const response = await processSelectAllFromUser(Token, UserId).catch(
        (error) => {
            log.error({
            STATUS: 'error',
            DESCRIPTION: 'Error PROCESS request!',
            STACK: error.stack,
            });
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            STATUS: 'fatal',
            DESCRIPTION:
                'Error in the request! If this error persists please contact support.',
            TIMESTAMP: new Date().getTime(),
            });
        },
        );
        if (response) res.status(response.responseStatus).send(response.responseProcess);
    }),
};