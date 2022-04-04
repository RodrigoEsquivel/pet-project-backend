import pkg from 'express';
import httpStatus from 'http-status';
import { catchAsync, log } from '../util/general.js';
import { processLogin, processCreate, processDelete, processUpdate, processRead, processValidateEmail } from '../middleware/user.middleware.js';

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
    create: catchAsync(async (req, res) => {
        const { Email, Password, Name, LastName, Role } = req.body;
        const response = await processCreate(Email, Password, Name, LastName, Role).catch(
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
    deleteUser: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const { UserId } = req.body;
        const response = await processDelete(Token, UserId).catch(
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
    update: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const { UserId, Email, Password, NewPassword, Name, LastName, Role } = req.body;
        const response = await processUpdate(Token, UserId, Email, Password, NewPassword, Name, LastName, Role).catch(
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
    read: catchAsync(async (req, res) => {
        const Token = req.headers.authorization || '';
        const { UserId } = req.body;
        const response = await processRead(Token, UserId).catch(
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
    validateEmail: catchAsync(async (req, res) => {
        const { Email } = req.body;
        const response = await processValidateEmail(Email).catch(
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