// import fetch from 'node-fetch';
import fs from 'fs';
import { ATPFetchCurrentMatches } from '../utils/atp-current-matches.js';
import { MakePreview } from '../utils/atp-make-preview.js';
import { path } from '../paths.js';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

const playersATPInternal = JSON.parse(
  fs.readFileSync('../json_tennis/atp-internal-players-db.json', 'utf8')
);

const Start = async () => {
  console.log(
    `\n******************\nstarting at ${new Date()}\n******************`
  );
  const atpMatches = await ATPFetchCurrentMatches();

  for await (const match of atpMatches) {
    // if (
    //   typeof match.matchOdds !== 'undefined' &&
    //   match.matchOdds !== null &&
    //   match.matchOdds.length > 0
    // ) {
    /// identify teams
    const homePlayerData = playersATPInternal.find(
      e => e.id == match.homeTeam.id
    );
    const awayPlayerData = playersATPInternal.find(
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
    // }
  }
  console.log('finished');
  console.log(
    `\n******************\nEnding at ${new Date()}\n******************`
  );
  process.exit(0);
};

await Start();
