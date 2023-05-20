import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { path } from '../paths.js';

const DownloadRefs = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('refs');
  let fromDb = [];

  const options = {
    projection: {
      _id: 0,
      id: 1,
      name: 1,
    },
  };

  await col.find({}, options).forEach(doc => {
    fromDb.push(doc);
  });

  fs.writeFileSync(
    `../json_soccer/refs.json`,
    JSON.stringify(fromDb, null, 2),
    'utf-8'
  );
  console.log('done');
  //   MongoConnection.close();
};

const DownloadTypes = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('types');
  let fromDb = [];

  const options = {
    projection: {
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    fromDb.push(doc);
  });

  fs.writeFileSync(
    `../json_soccer/types.json`,
    JSON.stringify(fromDb, null, 2),
    'utf-8'
  );
  console.log('done');
  //   MongoConnection.close();
};

const DownloadStates = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('states');
  let fromDb = [];

  const options = {
    projection: {
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    fromDb.push(doc);
  });

  fs.writeFileSync(
    `../json_soccer/states.json`,
    JSON.stringify(fromDb, null, 2),
    'utf-8'
  );
  console.log('done');
  //   MongoConnection.close();
};

const DownloadTV = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('tv');
  let fromDb = [];

  const options = {
    projection: {
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    fromDb.push(doc);
  });

  fs.writeFileSync(
    `../json_soccer/tv.json`,
    JSON.stringify(fromDb, null, 2),
    'utf-8'
  );
  console.log('done');
  MongoConnection.close();
};

await DownloadRefs();
await DownloadTypes();
await DownloadStates();
await DownloadTV();
