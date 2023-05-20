import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import { GetLastMatch } from './soccer-last-match.js';
// import { MakeForm } from './soccer-team-form.js';

const AllMatches = async matchArr => {
  let homeId;
  let awayId;

  let homeLastMatch;
  let awayLastMatch;
  let homeForm;

  for await (const match of matchArr) {
    console.log(
      `========= start match ${match.id} ${match.name} =============`
    );
    for await (const team of match.participants) {
      if (team.meta.location === 'home') {
        homeId = team.id;
      }

      if (team.meta.location === 'away') {
        awayId = team.id;
      }
    }

    homeLastMatch = await GetLastMatch(homeId);
    awayLastMatch = await GetLastMatch(awayId);

    // homeForm = await MakeForm(homeId);
    console.log(`========= end match =============\n`);
  }
};

export { AllMatches };
