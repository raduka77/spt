import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
const Surfaces = async (homeTeam, awayTeam) => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('wtaMatches');
  let surfaces = [];
  const options = {
    projection: {
      groundType: 1,
      id: 1,
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    surfaces.push(doc.groundType);

    if (typeof doc.groundType === 'undefined') {
      console.log(doc.id);
    }
  });

  // convert to set to get uniques
  const set = new Set(surfaces);

  // make array again
  let final = Array.from(set);
  console.log(final);
};
await Surfaces();
