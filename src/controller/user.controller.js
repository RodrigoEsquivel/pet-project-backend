import pkg from 'express';
import httpStatus from 'http-status';
import { catchAsync, log } from '../util/general.js';
import { processLogin } from '../middleware/user.middleware';

const {Request, Response } = pkg;

export default {
    login: catchAsync(async (req, res) => {
        const { Email, Password } = req.body;
        const response = await processLogin(Email, Password).catch(
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