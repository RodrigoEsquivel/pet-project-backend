import tracer from 'tracer';

const log = tracer.colorConsole();

const pick = (object, keys) => keys.reduce((_obj, key) => {
    const obj = { ..._obj };
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});

  const catchAsync = (fn) => (
    req,
    res,
    next,
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export {log, pick, catchAsync};