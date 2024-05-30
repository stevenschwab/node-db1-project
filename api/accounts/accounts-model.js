const db = require('../../data/db-config');

const getAll = async ({ limit, sortby, sortdir } = {}) => {
  let query = db('accounts');

  if (sortby) {
    query = query.orderBy(sortby, sortdir || 'asc');
  }
  if (limit) {
    query = query.limit(limit);
  }

  return await query;
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
  await db('accounts').where('id', id).del();
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
