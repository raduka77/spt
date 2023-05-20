'use strict';

import { DateTime } from 'luxon';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

/// this function gets all the current matches (based on epoch and returns an array)
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'QN1wpQCBhemshcAaSwQxq9ykvMyOp1zD8hVjsnWO6NJDhNzFxI',
    'X-RapidAPI-Host': 'sofasport.p.rapidapi.com',
  },
};

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

const startInterval = currentTime - 604800; //86400
const endInterval = currentTime + 172800; // 172800

const ATPFetchCurrentMatches = async () => {
  let matches = [];
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('atpMatches');
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

export { ATPFetchCurrentMatches };
