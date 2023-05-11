import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async, { all } from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import {
  FetchWTALeagues,
  FetchATPLeagues,
  makeCheckSlugs,
  CreateDBFiles,
} from '../utils/tennis-leagues-utils.js';

const Start = async () => {
  await FetchWTALeagues();
  await FetchATPLeagues();
  makeCheckSlugs();
  CreateDBFiles();

  await MongoConnection.close();
};

const RunUpdater = async ({ interval = 60, callback }) => {
  console.log(`Started match updater with interval of `, interval, ` seconds`);
  const MilisecondInterval = interval * 1000;

  let timerId = setTimeout(async function tick() {
    console.log(`Updating tennis leagues...`);
    await Start();

    timerId = setTimeout(tick, MilisecondInterval); // (*)
  }, 1);
};

RunUpdater({
  interval: 1, // in seconds - 3600 - 1 hour
});
