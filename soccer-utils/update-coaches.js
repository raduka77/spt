import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';

const DownloadCoaches = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('coaches');
  let allCoaches = [];

  const options = {
    projection: {
      _id: 0,
      id: 1,
      name: 1,
    },
  };

  await col.find({}, options).forEach(doc => {
    allCoaches.push(doc);
  });

  fs.writeFileSync(
    `../json_soccer/coaches.json`,
    JSON.stringify(allCoaches, null, 2),
    'utf-8'
  );
  console.log('done');
  MongoConnection.close();
};

await DownloadCoaches();
