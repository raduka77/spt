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

await FetchWTALeagues();
await FetchATPLeagues();
makeCheckSlugs();
CreateDBFiles();

await MongoConnection.close();
