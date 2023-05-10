import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

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
