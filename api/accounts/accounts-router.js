const router = require('express').Router();
const Accounts = require('./accounts-model');
const { 
  checkAccountPayload, 
  checkAccountNameUnique, 
  checkAccountId 
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something bad happened in the accounts-router",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
