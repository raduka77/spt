// import fetch from 'node-fetch';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async, { all } from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import FetchPlayers from '../utils/tennis-utils.js';
import makeCheckSlugsATP from '../utils/tennis-utils.js';
import FetchMatches from '../utils/tennis-utils.js';
import CreateDBFiles from '../utils/tennis-utils.js';

await CreateDBFiles();

await FetchMatches();

await FetchPlayers();

makeCheckSlugsATP();

await FetchMatches();

await CreateDBFiles();
