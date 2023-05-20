import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import slugify from 'slugify';
import { path } from '../paths.js';

const MakeCheckSlugsPlayers = async () => {
  const soccerPlayersSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-players-slugs.json`, 'utf8')
  );

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('selectedPlayers');
  let allPlayers = [];
  let slugsArr = [];

  const options = {
    projection: {
      _id: 0,
      id: 1,
      name: 1,
    },
  };

  await col.find({}, options).forEach(doc => {
    allPlayers.push(doc);
  });

  console.log(`pushed ${allPlayers.length} players...`);

  const makeSlug = function (playerName, playerId) {
    let finalSlug;
    let slug = slugify(playerName, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.,()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    finalSlug = `${slug}-${playerId}`;
    return finalSlug;
  };

  const checkSlug = function (id, name) {
    const isSlug = soccerPlayersSlugs.find(e => e.id == id);

    if (!isSlug) {
      console.log(`--------------------- slug NOT FOUND for ${name}`);
      const x = {
        id: id,
        slug: makeSlug(name, id),
      };
      soccerPlayersSlugs.push(x);
      fs.writeFileSync(
        `../slugs/soccer-players-slugs.json`,
        JSON.stringify(soccerPlayersSlugs, null, 2),
        'utf-8'
      );
    } else {
      console.log(`OK`);
    }
  };

  allPlayers.forEach(player => {
    //// make slugs below
    // const x = {
    //   id: player.id,
    //   slug: makeSlug(player.name, player.id),
    // };
    // slugsArr.push(x);

    // fs.writeFileSync(
    //   `../slugs/soccer-players-slugs.json`,
    //   JSON.stringify(slugsArr, null, 2),
    //   'utf-8'
    // );
    /// check slugs here
    /// first check if player is singles

    //   // console.log(`checking slug for ${player.properName}`);
    checkSlug(player.id, player.name);
  });

  MongoConnection.close();
};

///// insert/update players to db

const UpdateSelectedPlayers = async () => {
  const soccerPlayersSlugs = JSON.parse(
    fs.readFileSync(`../slugs/soccer-players-slugs.json`, 'utf8')
  );

  let selectedPlayers = [];
  let internalFile = [];

  const optionsSelected = {
    projection: {
      _id: 0,
    },
  };

  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('selectedPlayers');

  console.log('fetching players for updates...');

  await col.find({}, optionsSelected).forEach(doc => {
    selectedPlayers.push(doc);
  });

  console.log(`pushing ${selectedPlayers.length} teams for updates...`);
  console.log('updating selected teams...');

  /// start loop into all teams
  for await (const player of selectedPlayers) {
    let teamPath = '';
    let theSlug;

    /// find assign slug
    const whichPlayer = soccerPlayersSlugs.find(e => e.id == player.id);
    if (whichPlayer) {
      theSlug = whichPlayer.slug;
    } else {
      console.log(`no slug for ${player.id}......`);
    }

    //// begin writing db files

    const lettersTeam = theSlug.slice(0, 2);

    //// taie "-" din path (de obicei e al doilea caracter)
    if (lettersTeam.includes('-')) {
      teamPath = `${path}/soccer/players/${lettersTeam[0]}`;
    } else {
      teamPath = `${path}/soccer/players/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
    }

    let teamFullPath = `${teamPath}/${player.id}`;

    if (!fs.existsSync(teamFullPath)) {
      //// make dir if dir doesn't exist and write file
      console.log(
        `directory doesn't exist, making dir, writing file for id ${player.id}`
      );
      fs.mkdirSync(teamFullPath, { recursive: true });
      console.log(lettersTeam);
      const x = {
        ...player,
        slug: theSlug,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${player.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );
      /// internal object
      const y = {
        id: player.id,
        name: player.name,
        dbLocation: `${teamFullPath}/${player.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
    } else {
      /// just write file
      console.log(`directory EXIST, just writing file for id ${player.id}`);
      console.log(lettersTeam);
      const x = {
        ...player,
        slug: theSlug,
      };

      //// write db file
      fs.writeFileSync(
        `${teamFullPath}/${player.id}.json`,
        JSON.stringify(x, null, 2),
        'utf-8'
      );

      /// internal object
      const y = {
        id: team.id,
        name: team.name,
        dbLocation: `${teamFullPath}/${player.id}.json`,
        dbFolder: `${teamFullPath}`,
      };
      internalFile.push(y);
      //// write db file
    }
  }

  fs.writeFileSync(
    `../json_soccer/internal-players-db.json`,
    JSON.stringify(internalFile, null, 2),
    'utf-8'
  );
  console.log('done');
  MongoConnection.close();
};

// await MakeCheckSlugsPlayers();
await UpdateSelectedPlayers();
