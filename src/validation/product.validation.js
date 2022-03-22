import joi from 'joi';

  const create = {
    headers: joi.object().keys({
        authorization: joi.string().required(),
      }),
    body: joi.object().keys({
      Name: joi.string().required(),
      Description: joi.string().required(),
      ImageURI: joi.string().uri().required(),
      Sold: joi.boolean().required(),
      Price: joi.number().required(),
      Brand: joi.string().required(),
      Seller: joi.string().required(),
    }),
  };

  const selectAll = {
    headers: joi.object().keys({
        authorization: joi.string().required(),
      }),
  };

  const selectAllFromUser = {
    headers: joi.object().keys({
        authorization: joi.string().required(),
      }),
    body: joi.object().keys({
      UserId: joi.string().required(),
    }),
  };

  export {create, selectAllFromUser, selectAll};