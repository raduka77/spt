import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

import {
  FetchPlayers,
  makeCheckSlugsWTA,
  FetchMatches,
  CreateDBFiles,
} from '../utils/tennis-wta-utils.js';

const Start = async () => {
  console.log(
    `\n******************\nStarting at ${new Date()}\n******************`
  );
  await FetchPlayers();

  makeCheckSlugsWTA();

  await FetchMatches();

  await CreateDBFiles();
  console.log(
    `\n******************\nEnding at ${new Date()}\n******************`
  );
  process.exit(0);
};

await Start();

// const RunUpdater = async ({ interval = 60, callback }) => {
//   console.log(
//     `Started WTA match updater with interval of `,
//     interval,
//     ` seconds`
//   );
//   const MilisecondInterval = interval * 1000;

//   let timerId = setTimeout(async function tick() {
//     console.log(`Updating all WTA...`);
//     await Start();

//     timerId = setTimeout(tick, MilisecondInterval); // (*)
//   }, 1);
// };

// RunUpdater({
//   interval: 3600, // in seconds - 3600 - 1 hour
// });
