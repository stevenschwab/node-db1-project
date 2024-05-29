const db = require('../data/db-config.js');

const getAll = async () => {
  return await db('accounts');
}

const getById = async id => {
  return await db('accounts').where('id', id).first();
}

const getByName = async name => {
  return await db('accounts').where('name', name).first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async id => {
  const deletedAccount = await getById(id);
  await db('accounts').where('id', id).delete();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
