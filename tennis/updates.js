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
} from '../utils/tennis-utils.js';

await FetchPlayers();

makeCheckSlugsATP();

await FetchMatches();

await CreateDBFiles();
