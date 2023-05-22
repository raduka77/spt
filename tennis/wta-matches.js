// import fetch from 'node-fetch';
import fs from 'fs';
import { WTAFetchCurrentMatches } from '../utils/wta/wta-current-matches.js';
import { MakePreview } from '../utils/wta/wta-make-preview.js';
import { path } from '../paths.js';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

const playersWTAInternal = JSON.parse(
  fs.readFileSync('../json_tennis/wta-internal-players-db.json', 'utf8')
);

const Start = async () => {
  console.log(
    `\n******************\nStarting at ${new Date()}\n******************`
  );
  const wtaMatches = await WTAFetchCurrentMatches();

  for await (const match of wtaMatches) {
    if (
      typeof match.matchOdds !== 'undefined' &&
      match.matchOdds !== null &&
      match.matchOdds.length > 0
    ) {
      //// init match id internal

      /// identify teams
      const homePlayerData = playersWTAInternal.find(
        e => e.id == match.homeTeam.id
      );
      const awayPlayerData = playersWTAInternal.find(
        e => e.id == match.awayTeam.id
      );

      /// load team data
      const homePlayer = JSON.parse(
        fs.readFileSync(`${homePlayerData.dbLocation}`, 'utf8')
      );

      const awayPlayer = JSON.parse(
        fs.readFileSync(`${awayPlayerData.dbLocation}`, 'utf8')
      );
      await MakePreview(match, homePlayer, awayPlayer);
    }
  }
  console.log('finished');
  console.log(
    `\n******************\nEnding at ${new Date()}\n******************`
  );
  process.exit(0);
};

// const RunUpdater = async ({ interval = 60, callback }) => {
//   console.log(
//     `Started WTA match updater with interval of `,
//     interval,
//     ` seconds`
//   );
//   const MilisecondInterval = interval * 1000;

//   let timerId = setTimeout(async function tick() {
//     console.log(`Updating WTA MATCHES...`);
//     await Start();

//     timerId = setTimeout(tick, MilisecondInterval); // (*)
//   }, 1);
// };

// RunUpdater({
//   interval: 3600, // in seconds - 3600 - 1 hour
// });
