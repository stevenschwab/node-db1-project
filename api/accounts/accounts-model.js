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
  db('accounts').where('id', id).update(account)
  getById(id)
}

const deleteById = id => {
  db('accounts').where('id', id).delete()
  getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
