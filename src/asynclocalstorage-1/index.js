// @ts-check
const express = require('express');
const { setTimeout } = require('timers/promises');
const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid');

const asyncLocalStorage = new AsyncLocalStorage();

const logger = {
  log: (...args) => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      args.unshift(`[REQUEST_ID=${store.requestId}]`);
    }
    console.log(...args);
  },
  error: (...args) => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      args.unshift(`[REQUEST_ID=${store.requestId}]`);
    }
    console.error(...args);
  }
};

const app = express();

app.use((req, res, next) => {
  const requestId = uuidv4();
  const startTime = Date.now();
  asyncLocalStorage.run({ requestId, startTime }, () => {
    logger.log('BEGIN');
    next();
  });
  res.on('finish', () => logger.log(`END [REQ_TIME=${(Date.now() - startTime) / 1000}s]`));
});

app.get('/', async (req, res, next) => {
  try {
    const data = await apiCall1(Date.now());
    res.json(data);
  } catch (err) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    logger.error(`FAIL [REQ_TIME=${(Date.now() - store.startTime) / 1000}s]`, err);
  } else {
    logger.error('FAIL ', err);
  }
  res.status(500).json({ error: 'SOMETHING_WRONG' });
});

const port = 3000;
app.listen(port, () => console.log(`Express server listening on port ${port}`));

async function apiCall1(x) {
  await setTimeout(500);
  if (Math.random() < 0.1) {
    throw new Error('BUMP');
  }
  logger.log('YAHOOOOO INSIDE apiCall1');
  return apiCall2(x);
}

async function apiCall2(x) {
  await setTimeout(500);
  logger.log('YAHOOOOO INSIDE apiCall2');
  return { ok: x };
}
