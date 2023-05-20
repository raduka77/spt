import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import { path } from '../paths.js';
import { formatCoach } from './rewrite-coaches.js';

const MakeCheckSlugs = async () => {
  const soccerTeamSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-teams-slugs.json`, 'utf8')
  );

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('teams');
  let allTeams = [];
  let slugsArr = [];

  const options = {
    projection: {
      _id: 0,
      id: 1,
      name: 1,
    },
  };

  await col.find({}, options).forEach(doc => {
    allTeams.push(doc);
  });

  console.log(`pushed ${allTeams.length} teams...`);

  const makeSlug = function (teamName) {
    let slug = slugify(teamName, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.,()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    return slug;
  };

  const checkSlug = function (id, name) {
    const isSlug = soccerTeamSlugs.find(e => e.id == id);

    if (!isSlug) {
      console.log(`--------------------- slug NOT FOUND for ${name}`);
      const x = {
        id: id,
        slug: makeSlug(name),
      };
      soccerTeamSlugs.push(x);
      fs.writeFileSync(
        `../slugs/soccer-teams-slugs.json`,
        JSON.stringify(soccerTeamSlugs, null, 2),
        'utf-8'
      );
    } else {
      console.log(`OK`);
    }
  };

  allTeams.forEach(team => {
    // make slugs below
    // const x = {
    //   id: team.id,
    //   slug: makeSlug(team.name),
    // };
    // slugsArr.push(x);
    // fs.writeFileSync(
    //   `../slugs/soccer-teams-slugs.json`,
    //   JSON.stringify(slugsArr, null, 2),
    //   'utf-8'
    // );
    /// check slugs here
    /// first check if player is singles
    //   // console.log(`checking slug for ${player.properName}`);
    checkSlug(team.id, team.name);
  });

  // MongoConnection.close();
};

//// update teams

const UpdateSelectedTeams = async () => {
  const soccerTeamSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-teams-slugs.json`, 'utf8')
  );

  const soccerCoaches = JSON.parse(
    fs.readFileSync(`../json_soccer/coaches.json`, 'utf8')
  );

  let selectedTeams = [];
  let internalFile = [];

  const optionsSelected = {
    projection: {
      _id: 0,
    },
  };

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('teams');

  console.log('fetching teams for updates...');

  await col.find({}, optionsSelected).forEach(doc => {
    selectedTeams.push(doc);
  });

  console.log(`pushing ${selectedTeams.length} teams for updates...`);
  console.log('updating selected teams...');

  /// start loop into all teams
  for await (const team of selectedTeams) {
    let teamPath = '';
    let theSlug;
    let coachId;
    let coachName;

    let latestMatches;

    //// fetch and insert latest matches
    const db = MongoConnection.db(MongoDbName);
    const colLatest = db.collection('latestMatches');

    const optionsLatest = {
      projection: {
        _id: 0,
      },
    };

    await colLatest.find({ teamId: team.id }, optionsLatest).forEach(doc => {
      latestMatches = doc.latestMatches;
    });

    /// find assign slug
    const whichTeam = soccerTeamSlugs.find(e => e.id == team.id);
    if (whichTeam) {
      theSlug = whichTeam.slug;
    } else {
      console.log(`no slug for ${team.id}......`);
    }

    /// find coach id
    if (team.coaches.length > 0) {
      for await (const coach of team.coaches) {
        if (coach.active) {
          coachId = coach.coach_id;
        }
      }
    }

    //// find coache name and format it
    const whichCoach = soccerCoaches.find(e => e.id == coachId);

    if (whichCoach) {
      coachName = await formatCoach(whichCoach.name);
    }

    //// begin writing db files

    const lettersTeam = theSlug.slice(0, 2);

    //// taie "-" din path (de obicei e al doilea caracter)
    if (lettersTeam.includes('-')) {
      teamPath = `${path}/soccer/teams/${lettersTeam[0]}`;
    } else {
      teamPath = `${path}/soccer/teams/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
    }

    let teamFullPath = `${teamPath}/${team.id}`;

    if (!fs.existsSync(teamFullPath)) {
      //// make dir if dir doesn't exist and write file
      console.log(
        `directory doesn't exist, making dir, writing file for id ${team.id}`
      );
      fs.mkdirSync(teamFullPath, { recursive: true });
      console.log(lettersTeam);
      const x = {
        ...team,
        slug: theSlug,
        coachName: coachName,
        latestMatches: latestMatches,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${team.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );
      /// internal object
      const y = {
        id: team.id,
        name: team.name,
        dbLocation: `${teamFullPath}/${team.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
    } else {
      /// just write file
      console.log(`directory EXIST, just writing file for id ${team.id}`);
      console.log(lettersTeam);
      const x = {
        ...team,
        slug: theSlug,
        coachName: coachName,
        latestMatches: latestMatches,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${team.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );

      /// internal object
      const y = {
        id: team.id,
        name: team.name,
        dbLocation: `${teamFullPath}/${team.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
      //// write db file
    }
  }

  fs.writeFileSync(
    `../json_soccer/internal-teams-db.json`,
    JSON.stringify(internalFile, null, 2),
    'utf-8'
  );
  console.log('done');
  MongoConnection.close();
};

await MakeCheckSlugs();
await UpdateSelectedTeams();
