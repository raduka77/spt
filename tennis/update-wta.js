// import fetch from 'node-fetch';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async, { all } from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import {
  FetchPlayers,
  makeCheckSlugsWTA,
  FetchMatches,
  CreateDBFiles,
} from '../utils/tennis-wta-utils.js';

await FetchPlayers();

makeCheckSlugsWTA();

await FetchMatches();

await CreateDBFiles();

await MongoConnection.close();
