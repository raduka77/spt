import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import { path } from '../paths.js';

const MakeCheckSlugsLeagues = async () => {
  const soccerLeaguesSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-leagues-slugs.json`, 'utf8')
  );

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('leagues');
  let allLeagues = [];
  let slugsArr = [];

  const options = {
    projection: {
      _id: 0,
      id: 1,
      name: 1,
      country: 1,
    },
  };

  await col.find({}, options).forEach(doc => {
    allLeagues.push(doc);
  });

  console.log(`pushed ${allLeagues.length} leagues...`);

  const makeSlug = function (name, country) {
    let finalSlug;
    let slug = slugify(name, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.,()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    let slug2 = slugify(country, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.,()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    finalSlug = `${slug2}-${slug}`;
    return finalSlug;
  };

  const checkSlug = function (id, name, country) {
    const isSlug = soccerLeaguesSlugs.find(e => e.id == id);

    if (!isSlug) {
      console.log(`--------------------- slug NOT FOUND for ${name}`);
      const x = {
        id: id,
        slug: makeSlug(name, country),
      };
      soccerLeaguesSlugs.push(x);
      fs.writeFileSync(
        `../slugs/soccer-leagues-slugs.json`,
        JSON.stringify(soccerLeaguesSlugs, null, 2),
        'utf-8'
      );
    } else {
      console.log(`OK`);
    }
  };

  allLeagues.forEach(league => {
    // make slugs below
    // const x = {
    //   id: league.id,
    //   slug: makeSlug(league.name, league.country.name),
    // };
    // slugsArr.push(x);
    // fs.writeFileSync(
    //   `../slugs/soccer-leagues-slugs.json`,
    //   JSON.stringify(slugsArr, null, 2),
    //   'utf-8'
    // );
    /// check slugs here
    /// first check if player is singles
    //   // console.log(`checking slug for ${player.properName}`);
    checkSlug(league.id, league.name, league.country.name);
  });

  MongoConnection.close();
};

///// insert/update players to db

const UpdateLeagues = async () => {
  const soccerLeaguesSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-leagues-slugs.json`, 'utf8')
  );

  let fromDb = [];
  let internalFile = [];

  const optionsSelected = {
    projection: {
      _id: 0,
    },
  };

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('leagues');

  console.log('fetching leagues for updates...');

  await col.find({}, optionsSelected).forEach(doc => {
    fromDb.push(doc);
  });

  console.log(`pushing ${fromDb.length} leagues for updates...`);
  console.log('updating selected leagues...');

  /// start loop into all teams
  for await (const league of fromDb) {
    let teamPath = '';
    let theSlug;

    /// find assign slug
    const whichLeague = soccerLeaguesSlugs.find(e => e.id == league.id);
    if (whichLeague) {
      theSlug = whichLeague.slug;
    } else {
      console.log(`no slug for ${league.id}......`);
    }

    //// begin writing db files

    const lettersTeam = theSlug.slice(0, 2);

    //// taie "-" din path (de obicei e al doilea caracter)
    if (lettersTeam.includes('-')) {
      teamPath = `${path}/soccer/leagues/${lettersTeam[0]}`;
    } else {
      teamPath = `${path}/soccer/leagues/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
    }

    let teamFullPath = `${teamPath}/${league.id}`;

    if (!fs.existsSync(teamFullPath)) {
      //// make dir if dir doesn't exist and write file
      console.log(
        `directory doesn't exist, making dir, writing file for id ${league.id}`
      );
      fs.mkdirSync(teamFullPath, { recursive: true });
      console.log(lettersTeam);
      const x = {
        ...league,
        slug: theSlug,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${league.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );
      /// internal object
      const y = {
        id: league.id,
        name: league.name,
        dbLocation: `${teamFullPath}/${league.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
    } else {
      /// just write file
      console.log(`directory EXIST, just writing file for id ${league.id}`);
      console.log(lettersTeam);
      const x = {
        ...league,
        slug: theSlug,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${league.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );

      /// internal object
      const y = {
        id: league.id,
        name: league.name,
        dbLocation: `${teamFullPath}/${league.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
      //// write db file
    }
  }

  fs.writeFileSync(
    `../json_soccer/internal-leagues-db.json`,
    JSON.stringify(internalFile, null, 2),
    'utf-8'
  );
  console.log('done');
  MongoConnection.close();
};

// await MakeCheckSlugsLeagues();
await UpdateLeagues();
