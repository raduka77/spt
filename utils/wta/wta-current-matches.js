import { DateTime } from 'luxon';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

/// this function gets all the current matches (based on epoch and returns an array)

const calculateEpoch = current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'dd-MM-yyyy',
    {
      setZone: true,
    }
  );

  return matchDate;
};

const CurrentTime = async () => {
  let now = new Date().getTime();
  let currentTime = Math.floor(now / 1000);
  return currentTime;
};

const currentTime = await CurrentTime();

const startInterval = currentTime - 604800;
const endInterval = currentTime + 172800;

const WTAFetchCurrentMatches = async () => {
  let matches = [];
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('wtaMatches');
  const options = {
    projection: {
      _id: 0,
    },
  };

  await col
    .find(
      {
        $and: [
          { startTimestamp: { $gt: startInterval } },
          { startTimestamp: { $lt: endInterval } },
        ],
      },
      options
    )
    .forEach(doc => {
      console.log(
        `importing ${doc.slug} *** ${doc.status.type} *** ${calculateEpoch(
          doc.startTimestamp
        )} *** ${doc.id}`
      );

      matches.push(doc);
    });

  console.log(`Matches: ${matches.length}`);
  // MongoConnection.close();
  return matches;
};

export { WTAFetchCurrentMatches };
