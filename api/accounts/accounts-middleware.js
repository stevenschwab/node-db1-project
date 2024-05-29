const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return next({ status: 400, message: "name and budget are required" })
  }
  
  if (name.trim().length < 3 || name.trim().length > 100) {
    return next({ status: 400, message: "name of account must be between 3 and 100" })
  }
  
  if (isNaN(budget)) {
    return next({ status: 400, message: "budget of account must be a number" })
  }
  
  if (budget < 0 || budget > 1000000) {
    return next({ status: 400, message: "budget of account is too large or too small" })
  }

  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  
}

exports.checkAccountId = async (req, res, next) => {
  const account = await db('accounts').where('id', req.params.id).first();

  if (!account) {
    return next({ status: 404, message: "account not found" })
  }

  next();
}
