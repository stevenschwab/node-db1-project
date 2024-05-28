const db = require('../data/db-config.js');

const getAll = () => {
  db('accounts')
}

const getById = id => {
  db('accounts').where('id', id).first();
}

const create = account => {
  const [accountId] = db('accounts').insert(account)
  getById(accountId)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
