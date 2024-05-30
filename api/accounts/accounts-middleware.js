const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return next({ status: 400, message: "name and budget are required" })
  }

  name = name.trim()
  
  if (name.length < 3 || name.length > 100) {
    return next({ status: 400, message: "name of account must be between 3 and 100" })
  }

  if (typeof budget !== 'number' || isNaN(budget)) {
    return next({ status: 400, message: "budget of account must be a number" })
  }
  
  if (budget < 0 || budget > 1000000) {
    return next({ status: 400, message: "budget of account is too large or too small" })
  }

  req.body.name = name;
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const { name } = req.body;

    const trimmedName = name.trim();
    const existingAccount = await Accounts.getByName(trimmedName);

    if (existingAccount) {
      return next({ status: 400, message: "that name is taken" })
    }

    next();
  } catch (error) {
    next(error);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);

    if (!account) {
      return next({ status: 404, message: "account not found" })
    }

    next();
  } catch (error) {
    next(error);
  }
}

exports.checkAccountNameUniqueOnUpdate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const trimmedName = name.trim();
    const existingAccount = await Accounts.getByName(trimmedName);

    if (existingAccount && existingAccount.id !== Number(req.params.id)) {
      return next({ status: 400, message: "that name is taken" })
    }

    next()
  } catch (error) {
    next(error);
  }
}