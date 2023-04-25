// import fetch from 'node-fetch';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';

const CreateDBFiles = function () {
  let internalFile = [];

  /// load tournaments

  const atpTours = JSON.parse(
    fs.readFileSync('../json_tennis/atp-leagues.json', 'utf8')
  );
  const wtaTours = JSON.parse(
    fs.readFileSync('../json_tennis/wta-leagues.json', 'utf8')
  );

  //// load slugs

  const atpToursSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-leagues-slugs.json', 'utf8')
  );
  const wtaToursSlugs = JSON.parse(
    fs.readFileSync('../slugs/wta-leagues-slugs.json', 'utf8')
  );

  atpTours.forEach((league, index, arr) => {
    console.log(
      `League: ${league.properName} (id: ${league.id}), item ${index} from ${arr.length}`
    );
    const theSlug = atpToursSlugs.find(e => e.id == league.id);

    if (theSlug) {
      let teamPath = '';

      const prepareSlug = theSlug.slug.replaceAll('atp-', '');

      const playerSlug = prepareSlug;

      const lettersTeam = playerSlug.slice(0, 2);
      console.log(lettersTeam);
      //// taie "-" din path (de obicei e al doilea caracter)
      if (lettersTeam.includes('-')) {
        teamPath = `/db/tennis/atp-leagues/${lettersTeam[0]}`;
      } else {
        teamPath = `/db/tennis/atp-leagues/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
      }

      let teamFullPath = `${teamPath}/${league.id}`;

      if (!fs.existsSync(teamFullPath)) {
        //// make dir if dir doesn't exist and write file
        console.log(`directory doesn't exist, making dir, writing file`);
        fs.mkdirSync(teamFullPath, { recursive: true });

        const x = {
          ...league,
          leagueSlug: theSlug.slug,
          dbLocation: `${teamFullPath}/${league.id}.json`,
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
          name: league.properName,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        internalFile.push(y);
      } else {
        /// just write file
        console.log(`directory EXIST, just writing file`);

        const x = {
          ...league,
          leagueSlug: theSlug.slug,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        /// internal object
        const y = {
          id: league.id,
          name: league.properName,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        internalFile.push(y);

        fs.writeFileSync(
          `${teamFullPath}/${league.id}.json`,
          JSON.stringify(x, null, 2),
          'utf-8'
        );
      }
    }
  });

  wtaTours.forEach((league, index, arr) => {
    console.log(
      `League: ${league.properName} (id: ${league.id}), item ${index} from ${arr.length}`
    );
    const theSlug = wtaToursSlugs.find(e => e.id == league.id);

    if (theSlug) {
      let teamPath = '';

      const prepareSlug = theSlug.slug.replaceAll('wta-', '');

      const playerSlug = prepareSlug;

      const lettersTeam = playerSlug.slice(0, 2);
      console.log(lettersTeam);
      //// taie "-" din path (de obicei e al doilea caracter)
      if (lettersTeam.includes('-')) {
        teamPath = `/db/tennis/wta-leagues/${lettersTeam[0]}`;
      } else {
        teamPath = `/db/tennis/wta-leagues/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
      }

      let teamFullPath = `${teamPath}/${league.id}`;

      if (!fs.existsSync(teamFullPath)) {
        //// make dir if dir doesn't exist and write file
        console.log(`directory doesn't exist, making dir, writing file`);
        fs.mkdirSync(teamFullPath, { recursive: true });

        const x = {
          ...league,
          leagueSlug: theSlug.slug,
          dbLocation: `${teamFullPath}/${league.id}.json`,
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
          name: league.properName,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        internalFile.push(y);
      } else {
        /// just write file
        console.log(`directory EXIST, just writing file`);

        const x = {
          ...league,
          leagueSlug: theSlug.slug,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        /// internal object
        const y = {
          id: league.id,
          name: league.properName,
          dbLocation: `${teamFullPath}/${league.id}.json`,
        };
        internalFile.push(y);

        fs.writeFileSync(
          `${teamFullPath}/${league.id}.json`,
          JSON.stringify(x, null, 2),
          'utf-8'
        );
      }
    }
  });

  fs.writeFileSync(
    `../json_tennis/internal-leagues-db.json`,
    JSON.stringify(internalFile, null, 2),
    'utf-8'
  );
  // MongoConnection.close();
};

const makeCheckSlugs = function () {
  let ATPSlugs = [];
  let WTASlugs = [];

  /// load tournaments
  const atpTours = JSON.parse(
    fs.readFileSync('../json_tennis/atp-leagues.json', 'utf8')
  );
  const wtaTours = JSON.parse(
    fs.readFileSync('../json_tennis/wta-leagues.json', 'utf8')
  );

  //// load slugs

  const atpToursSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-leagues-slugs.json', 'utf8')
  );
  const wtaToursSlugs = JSON.parse(
    fs.readFileSync('../slugs/wta-leagues-slugs.json', 'utf8')
  );

  const makeSlug = function (leagueName) {
    let slug = slugify(leagueName, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.,()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    return slug;
  };

  const checkSlug = function (leagueId, leagueName, slugArr, tour) {
    const isSlug = slugArr.find(e => e.id == leagueId);

    if (!isSlug) {
      console.log(`slug NOT FOUND for ${leagueName}`);
      const x = {
        id: leagueId,
        slug: makeSlug(leagueName),
      };
      slugArr.push(x);
      fs.writeFileSync(
        `../slugs/${tour}-leagues-slugs.json`,
        JSON.stringify(slugArr, null, 2),
        'utf-8'
      );
    } else {
      console.log(`OK -> ${leagueId} ${leagueName} ${tour}`);
    }
  };

  atpTours.forEach(league => {
    //// make slugs below

    // const x = {
    //   id: league.id,
    //   slug: makeSlug(league.properName),
    // };
    // ATPSlugs.push(x);
    // fs.writeFileSync(
    //   `../slugs/atp-leagues-slugs.json`,
    //   JSON.stringify(ATPSlugs, null, 2),
    //   'utf-8'
    // );

    // // check slugs here

    checkSlug(league.id, league.properName, atpToursSlugs, 'atp');
  });

  wtaTours.forEach(league => {
    //// make slugs below

    // const x = {
    //   id: league.id,
    //   slug: makeSlug(league.properName),
    // };
    // WTASlugs.push(x);
    // fs.writeFileSync(
    //   `../slugs/wta-leagues-slugs.json`,
    //   JSON.stringify(WTASlugs, null, 2),
    //   'utf-8'
    // );

    //// check slugs here

    checkSlug(league.id, league.properName, wtaToursSlugs, 'wta');
  });

  // MongoConnection.close();
};

const FetchWTALeagues = async () => {
  let leagues = [];
  let convertedLeagues = [];
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('toursWTA');
  const options = {
    projection: {
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    leagues.push(doc);
  });

  leagues.forEach(league => {
    let leagueName = '';
    leagueName = `WTA ${league.name}`;

    if (league.id == 13828) {
      leagueName = `WTA New York`;
    }

    if (league.id == 11860) {
      leagueName = `Women's Olympic Tournament`;
    }

    if (league.id == 11864) {
      leagueName = `WTA Finals`;
    }

    if (league.id == 2566) {
      leagueName = `WTA Sydney`;
    }

    if (league.id == 2646) {
      leagueName = `WTA Tashkent`;
    }

    if (league.id == 18556) {
      leagueName = `WTA Granby`;
    }

    if (league.id == 19504) {
      leagueName = `WTA Guadalajara 2`;
    }

    if (league.id == 15075) {
      leagueName = `WTA Lexington`;
    }

    if (league.id == 19352) {
      leagueName = `WTA Monastir`;
    }

    if (league.id == 19309) {
      leagueName = `WTA Tallinn`;
    }

    if (league.id == 3235) {
      leagueName = `WTA Berlin 2`;
    }

    if (league.id == 14585) {
      leagueName = `WTA Slam 2020`;
    }

    const x = {
      ...league,
      properName: leagueName,
    };
    convertedLeagues.push(x);
  });

  fs.writeFileSync(
    `../json_tennis/wta-leagues.json`,
    JSON.stringify(convertedLeagues, null, 2),
    'utf-8'
  );

  // MongoConnection.close();
};

const FetchATPLeagues = async () => {
  let leagues = [];
  let convertedLeagues = [];
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('toursATP');
  const options = {
    projection: {
      _id: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    leagues.push(doc);
  });

  leagues.forEach(league => {
    let leagueName = '';
    leagueName = `ATP ${league.name}`;

    if (league.id == 14548) {
      leagueName = `ATP Mallorca`;
    }

    if (league.id == 11852) {
      leagueName = `Men's Olympic Tournament`;
    }

    if (league.id == 2517) {
      leagueName = `ATP Finals`;
    }

    if (league.id == 14491) {
      leagueName = `ATP Cup`;
    }

    if (league.id == 19400) {
      leagueName = `ATP Gijon`;
    }

    if (league.id == 19441) {
      leagueName = `ATP Naples`;
    }

    if (league.id == 16886) {
      leagueName = `ATP Parma`;
    }

    if (league.id == 15950) {
      leagueName = `ATP Sardinia`;
    }

    if (league.id == 19303) {
      leagueName = `ATP Seoul`;
    }

    if (league.id == 2482) {
      leagueName = `ATP Sydney`;
    }

    if (league.id == 19307) {
      leagueName = `ATP Tel Aviv`;
    }

    if (league.id == 11851) {
      leagueName = `ATP World Team Cup Dusseldorf`;
    }

    if (league.id == 14584) {
      leagueName = `ATP Slam 2020`;
    }

    const x = {
      ...league,
      properName: leagueName,
    };
    convertedLeagues.push(x);
  });

  fs.writeFileSync(
    `../json_tennis/atp-leagues.json`,
    JSON.stringify(convertedLeagues, null, 2),
    'utf-8'
  );

  // MongoConnection.close();
};

export { FetchWTALeagues, FetchATPLeagues, makeCheckSlugs, CreateDBFiles };
