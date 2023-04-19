// import fetch from 'node-fetch';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';
import async, { all } from 'async';
import requests from 'sync-request';
import { DateTime } from 'luxon';
import slugify from 'slugify';

const year2023Start = 1672531200;
const year2023End = 1704067199;

const CalculateEpoch = current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'yyyy-MM-dd',
    {
      setZone: true,
    }
  );

  return matchDate;
};

const AtpH2H = async (homeTeam, awayTeam) => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('atpMatches');
  let matches = [];
  const options = {
    projection: {
      'homeTeam.id': 1,
      'awayTeam.id': 1,
      startTimestamp: 1,
      tournament: 1,
      roundInfo: 1,
      groundType: 1,
      customId: 1,
      id: 1,
      winnerCode: 1,
      _id: 0,
    },
  };
  let walkout = 0;
  let homeTeamWins = 0;
  let awayTeamWins = 0;

  let homeWinsClay = 0;
  let homeWinsGrass = 0;
  let homeWinsOutHard = 0;
  let homeWinsIndHard = 0;
  let homeWinsInFinals = 0;

  let awayWinsClay = 0;
  let awayWinsGrass = 0;
  let awayWinsOutHard = 0;
  let awayWinsIndHard = 0;
  let awayWinsInFinals = 0;

  await col
    .find(
      {
        $or: [
          { $and: [{ 'homeTeam.id': homeTeam }, { 'awayTeam.id': awayTeam }] },
          { $and: [{ 'homeTeam.id': awayTeam }, { 'awayTeam.id': homeTeam }] },
        ],
      },
      options
    )
    .forEach(doc => {
      if (typeof doc.roundInfo !== 'undefined') {
        console.log(
          `${doc.id} - ${CalculateEpoch(doc.startTimestamp)} - ${
            doc.tournament.name
          } ${doc.roundInfo.name}`
        );
      } else {
        console.log(
          `${doc.id} - ${CalculateEpoch(doc.startTimestamp)} - ${
            doc.tournament.name
          } no round`
        );
      }

      if (doc.homeTeam.id === homeTeam && doc.awayTeam.id === awayTeam) {
        if (doc.winnerCode === 0) {
          walkout++;
        }
        if (doc.winnerCode === 1) {
          if (doc.groundType === 'Clay' || doc.groundType === 'Red clay') {
            homeWinsClay++;
          }

          if (doc.groundType === 'Hardcourt indoor') {
            homeWinsIndHard++;
          }

          if (doc.groundType === 'Hardcourt outdoor') {
            homeWinsOutHard++;
          }

          if (doc.groundType === 'Grass') {
            homeWinsGrass++;
          }
          if (typeof doc.roundInfo !== 'undefined') {
            if (doc.roundInfo.name === 'Final') {
              homeWinsInFinals++;
            }
          }
          homeTeamWins++;
        }
        if (doc.winnerCode === 2) {
          if (doc.groundType === 'Clay' || doc.groundType === 'Red clay') {
            awayWinsClay++;
          }

          if (doc.groundType === 'Hardcourt indoor') {
            awayWinsIndHard++;
          }

          if (doc.groundType === 'Hardcourt outdoor') {
            awayWinsOutHard++;
          }

          if (doc.groundType === 'Grass') {
            awayWinsGrass++;
          }
          if (typeof doc.roundInfo !== 'undefined') {
            if (doc.roundInfo.name === 'Final') {
              awayWinsInFinals++;
            }
          }
          awayTeamWins++;
        }
      }

      if (doc.homeTeam.id === awayTeam && doc.awayTeam.id === homeTeam) {
        if (doc.winnerCode === 0) {
          walkout++;
        }
        if (doc.winnerCode === 1) {
          if (doc.groundType === 'Clay' || doc.groundType === 'Red clay') {
            awayWinsClay++;
          }

          if (doc.groundType === 'Hardcourt indoor') {
            awayWinsIndHard++;
          }

          if (doc.groundType === 'Hardcourt outdoor') {
            awayWinsOutHard++;
          }

          if (doc.groundType === 'Grass') {
            awayWinsGrass++;
          }
          if (typeof doc.roundInfo !== 'undefined') {
            if (doc.roundInfo.name === 'Final') {
              awayWinsInFinals++;
            }
          }
          awayTeamWins++;
        }
        if (doc.winnerCode === 2) {
          if (doc.groundType === 'Clay' || doc.groundType === 'Red clay') {
            homeWinsClay++;
          }

          if (doc.groundType === 'Hardcourt indoor') {
            homeWinsIndHard++;
          }

          if (doc.groundType === 'Hardcourt outdoor') {
            homeWinsOutHard++;
          }

          if (doc.groundType === 'Grass') {
            homeWinsGrass++;
          }
          if (typeof doc.roundInfo !== 'undefined') {
            if (doc.roundInfo.name === 'Final') {
              homeWinsInFinals++;
            }
          }
          homeTeamWins++;
        }
      }
    });

  console.log(
    `Player ${homeTeam} won ${homeTeamWins} - Clay ${homeWinsClay}, Hard Outdoor ${homeWinsOutHard}, Hard Indoor ${homeWinsIndHard}, Grass ${homeWinsGrass}. Finals Win: ${homeWinsInFinals}`
  );
  console.log(
    `Player ${awayTeam} won ${awayTeamWins} - Clay ${awayWinsClay}, Hard Outdoor ${awayWinsOutHard}, Hard Indoor ${awayWinsIndHard}, Grass ${awayWinsGrass}. Finals Win: ${awayWinsInFinals}`
  );
};

const createDBFiles = function () {
  const playersATPSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-players-slugs.json', 'utf8')
  );

  const playersATP = JSON.parse(
    fs.readFileSync('../json_tennis/atp-players.json', 'utf8')
  );

  playersATP.forEach(player => {
    const theSlug = playersATPSlugs.find(e => e.id == player.id);

    if (theSlug) {
      let teamPath = '';
      const playerSlug = theSlug.slug;

      const lettersTeam = playerSlug.slice(0, 2);
      console.log(lettersTeam);
      //// taie "-" din path (de obicei e al doilea caracter)
      if (lettersTeam.includes('-')) {
        teamPath = `/db/tennis/teams/${lettersTeam[0]}`;
      } else {
        teamPath = `/db/tennis/teams/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
      }

      let teamFullPath = `${teamPath}/${player.id}`;

      if (!fs.existsSync(teamFullPath)) {
        //// make dir if dir doesnt exist and write file
        console.log(`directory doesn't exist, making dir, writing file`);
        fs.mkdirSync(teamFullPath, { recursive: true });
        fs.writeFileSync(
          `${teamFullPath}/${player.id}.json`,
          JSON.stringify(player, null, 2),
          'utf-8'
        );
      } else {
        /// just write file
        console.log(`directory EXIST, just writing file`);
        fs.writeFileSync(
          `${teamFullPath}/${player.id}.json`,
          JSON.stringify(player, null, 2),
          'utf-8'
        );
      }
    }
  });
  MongoConnection.close();
};

//// make check slugs

const makeCheckSlugsATP = function () {
  let ATPSlugs = [];
  const playersATP = JSON.parse(
    fs.readFileSync('../json_tennis/atp-players.json', 'utf8')
  );
  const playersATPSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-players-slugs.json', 'utf8')
  );

  const makeSlug = function (teamName) {
    let slug = slugify(teamName, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.()/'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'en', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    return slug;
  };

  const checkSlug = function (playerId, playerName) {
    const isSlug = playersATPSlugs.find(e => e.id == playerId);

    if (!isSlug) {
      console.log(`slug NOT FOUND for ${playerName}`);
      const x = {
        id: playerId,
        slug: makeSlug(playerName),
      };
      playersATPSlugs.push(x);
      fs.writeFileSync(
        `../slugs/atp-players-slugs.json`,
        JSON.stringify(playersATPSlugs, null, 2),
        'utf-8'
      );
    } else {
      console.log(`OK`);
    }
  };

  playersATP.forEach(player => {
    //// make slugs below
    // if (player.type == 1) {
    //   const x = {
    //     id: player.id,
    //     slug: makeSlug(player.properName),
    //   };
    //   ATPSlugs.push(x);
    //   fs.writeFileSync(
    //     `../slugs/atp-players-slugs.json`,
    //     JSON.stringify(ATPSlugs, null, 2),
    //     'utf-8'
    //   );
    // }

    /// check slugs here
    /// first check if player is singles
    if (player.type == 1) {
      // console.log(`checking slug for ${player.properName}`);
      checkSlug(player.id, player.properName);
    }
  });
  MongoConnection.close();
};

/// fetch all season matches

const FetchMatches = async () => {
  let matches = [];
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('atpMatches');
  const options = {
    projection: {
      _id: 0,
    },
  };

  await col
    .find(
      {
        $and: [
          { startTimestamp: { $gt: year2023Start } },
          { startTimestamp: { $lt: year2023End } },
        ],
      },
      options
    )
    .forEach(doc => {
      matches.push(doc);
    });

  console.log(matches);

  fs.writeFileSync(
    `../json_tennis/atp-matches.json`,
    JSON.stringify(matches, null, 2),
    'utf-8'
  );

  MongoConnection.close();
};

/// fetch all players

const FetchPlayers = async () => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('playersATP');
  let players = [];
  let newPlayers = [];
  const options = {
    projection: {
      _id: 0,
      recentForm: 0,
      nearEvents: 0,
    },
  };

  await col.find({}, options).forEach(doc => {
    players.push(doc);
  });

  console.log(players);

  players.forEach(player => {
    let theFullName = '';
    if (player.fullName.includes(',')) {
      theFullName = player.fullName.split(', ');
    } else {
      theFullName = player.fullName.split(' ');
    }

    const x = {
      ...player,
      properName: `${theFullName[1]} ${theFullName[0]}`,
      firstName: theFullName[1],
      lastName: theFullName[0],
    };

    newPlayers.push(x);
    fs.writeFileSync(
      `../json_tennis/atp-players.json`,
      JSON.stringify(newPlayers, null, 2),
      'utf-8'
    );
  });

  MongoConnection.close();
};

createDBFiles();

// await FetchMatches();

// makeCheckSlugsATP();

// await FetchPlayers();

// AtpH2H(101101, 14486);

// export { AtpH2H };
