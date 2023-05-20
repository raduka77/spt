import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import { AllMatches } from './make-preview.js';

const CurrentTime = async () => {
  let now = new Date().getTime();
  let currentTime = Math.floor(now / 1000);
  return currentTime;
};

const CalculateEpoch = async current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'yyyy-MM-dd',
    {
      setZone: true,
    }
  );

  return matchDate;
};

const currentTime = await CurrentTime();

const startDate = currentTime - 86400;
const endDate = currentTime + 259200;
console.log(startDate, endDate);

const DownloadMatches = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('matchesCurrSeason');
  let fromDb = [];

  const options = {
    projection: {
      _id: 0,
    },
  };

  await col
    .find(
      {
        $and: [
          { starting_at_timestamp: { $gt: startDate } },
          { starting_at_timestamp: { $lt: endDate } },
          {
            $or: [
              { league_id: 8 },
              { league_id: 72 },
              { league_id: 9 },
              { league_id: 12 },
              { league_id: 82 },
              { league_id: 208 },
              { league_id: 262 },
              { league_id: 301 },
              { league_id: 384 },
              { league_id: 453 },
              { league_id: 462 },
              { league_id: 474 },
              { league_id: 501 },
              { league_id: 564 },
              { league_id: 600 },
              { league_id: 72 },
              { league_id: 648 },
              { league_id: 2 },
              { league_id: 5 },
              { league_id: 2286 },
              { league_id: 1325 },
              { league_id: 1538 },
            ],
          },
        ],
      },
      options
    )
    .forEach(doc => {
      fromDb.push(doc);
    });

  await AllMatches(fromDb);

  //   MongoConnection.close();
};

await DownloadMatches();
