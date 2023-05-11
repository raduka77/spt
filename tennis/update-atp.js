// import fetch from 'node-fetch';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async, { all } from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import {
  FetchPlayers,
  makeCheckSlugsATP,
  FetchMatches,
  CreateDBFiles,
} from '../utils/tennis-atp-utils.js';

const Start = async () => {
  await FetchPlayers();

  makeCheckSlugsATP();

  await FetchMatches();

  await CreateDBFiles();

  await MongoConnection.close();
};

const RunUpdater = async ({ interval = 60, callback }) => {
  console.log(
    `Started WTA match updater with interval of `,
    interval,
    ` seconds`
  );
  const MilisecondInterval = interval * 1000;

  let timerId = setTimeout(async function tick() {
    console.log(`Updating tennis leagues...`);
    await Start();

    timerId = setTimeout(tick, MilisecondInterval); // (*)
  }, 1);
};

RunUpdater({
  interval: 3600, // in seconds - 3600 - 1 hour
});
