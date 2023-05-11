import { path } from '../paths.js';
import fs from 'fs';

const handleNotStarted = async matchObj => {
  /// save the match

  let matchPath = '';
  const htName = matchObj.homePlayerData.playerSlug;

  const lettersTeam = htName.slice(0, 2);

  //// taie "-" din path (de obicei e al doilea caracter)
  if (lettersTeam.includes('-')) {
    matchPath = `${path}/tennis/atp-matches/${lettersTeam[0]}`;
  } else {
    matchPath = `${path}/tennis/atp-matches/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
  }

  let matchFullPath = `${matchPath}/${matchObj.homePlayerData.id}`;
  // console.log(matchFullPath);
  if (!fs.existsSync(matchFullPath)) {
    //// make dir if dir doesn't exist and write file
    console.log(`directory doesn't exist, making dir, writing file`);
    console.log(
      `Id: ${matchObj.match.id}, dir: ${matchFullPath}/${matchObj.awayPlayerData.id}.json`
    );
    fs.mkdirSync(matchFullPath, { recursive: true });

    //// write db file
    fs.writeFileSync(
      `${matchFullPath}/${matchObj.awayPlayerData.id}.json`,
      JSON.stringify(matchObj, null, 2),
      'utf-8'
    );
  } else {
    /// just write file
    console.log(`directory EXIST, just writing file`);
    console.log(
      `Id: ${matchObj.match.id}, dir: ${matchFullPath}/${matchObj.awayPlayerData.id}.json`
    );
    //// write db file
    fs.writeFileSync(
      `${matchFullPath}/${matchObj.awayPlayerData.id}.json`,
      JSON.stringify(matchObj, null, 2),
      'utf-8'
    );
  }
};

const handleFinished = async (match, homeData, awayData) => {
  let homeMatches = [];
  let awayMatches = [];
  console.log(
    `------- Updating finished match ${match.id} and matches for players ${homeData.lastName} / ${awayData.lastName}`
  );
  //// HANDLE MATCH JSON
  ///// check if json exists
  let matchPath = '';
  const htName = homeData.playerSlug;

  const lettersTeam = htName.slice(0, 2);

  //// taie "-" din path (de obicei e al doilea caracter)
  if (lettersTeam.includes('-')) {
    matchPath = `${path}/tennis/atp-matches/${lettersTeam[0]}`;
  } else {
    matchPath = `${path}/tennis/atp-matches/${lettersTeam[0]}/${lettersTeam[0]}${lettersTeam[1]}`;
  }

  let matchFullPath = `${matchPath}/${homeData.id}/${awayData.id}.json`;

  if (fs.existsSync(matchFullPath)) {
    console.log(`loading previous json...`);

    const matchJson = JSON.parse(fs.readFileSync(matchFullPath, 'utf8'));

    console.log('file loaded succesfully');

    const updated = {
      internalId: matchJson.internalId,
      matchSlug: matchJson.matchSlug,
      match: match,
      homePlayerData: matchJson.homePlayerData,
      awayPlayerData: matchJson.awayPlayerData,
      H2H: matchJson.H2H,
      homeLastMatch: matchJson.homeLastMatch,
      awayLastMatch: matchJson.awayLastMatch,
      formOnTheSurface: matchJson.formOnTheSurface,
      predictionH2H: matchJson.predictionH2H,
      predictionRank: matchJson.predictionRank,
      predictionOdds: matchJson.predictionOdds,
    };

    console.log('>>>> updating match file...');

    fs.writeFileSync(matchFullPath, JSON.stringify(updated, null, 2), 'utf-8');
  } else {
    console.log('match json not found');
  }

  ///// HANDLE TEAMS MATCHES JSON
  ///// HOME TEAM
  let homeTeamPath = homeData.dbFolder;
  let awayTeamPath = awayData.dbFolder;

  if (fs.existsSync(homeTeamPath)) {
    console.log(`*** HOME player directory found, checking for match file...`);

    if (fs.existsSync(`${homeTeamPath}/matches.json`)) {
      console.log('********* match file found, updating...');
      console.log(`Home path: ${homeTeamPath}/matches.json`);
      /// loading match json
      const priorHomeMatches = JSON.parse(
        fs.readFileSync(`${homeTeamPath}/matches.json`, 'utf8')
      );

      const homeNewArr = priorHomeMatches.filter(
        e => e.internalId !== `${homeData.id}@${awayData.id}`
      );

      const hm = {
        matchSlug: `${homeData.playerSlug}-vs-${awayData.playerSlug}`,
        internalId: `${homeData.id}@${awayData.id}`,
        matchName: `${homeData.lastName} vs ${awayData.lastName}`,
        matchDate: match.startTimestamp,
      };

      homeNewArr.push(hm);

      fs.writeFileSync(
        `${homeTeamPath}/matches.json`,
        JSON.stringify(homeNewArr, null, 2),
        'utf-8'
      );
    }

    if (!fs.existsSync(`${homeTeamPath}/matches.json`)) {
      console.log(`Home path: ${homeTeamPath}/matches.json`);
      console.log('!!!! match file NOT found, creating one...');
      /// declaring match obj
      const hm = {
        matchSlug: `${homeData.playerSlug}-vs-${awayData.playerSlug}`,
        internalId: `${homeData.id}@${awayData.id}`,
        matchName: `${homeData.lastName} vs ${awayData.lastName}`,
        matchDate: match.startTimestamp,
      };
      homeMatches.push(hm);

      fs.writeFileSync(
        `${homeTeamPath}/matches.json`,
        JSON.stringify(homeMatches, null, 2),
        'utf-8'
      );
    }
  }

  //// MATCHES FOR AWAY
  if (fs.existsSync(awayTeamPath)) {
    console.log(`*** AWAY Player directory found, checking for match file...`);

    if (fs.existsSync(`${awayTeamPath}/matches.json`)) {
      console.log('********* match file found, updating...');
      console.log(`Away path: ${awayTeamPath}/matches.json`);
      /// loading match json
      const priorAwayMatches = JSON.parse(
        fs.readFileSync(`${awayTeamPath}/matches.json`, 'utf8')
      );

      const awayNewArr = priorAwayMatches.filter(
        e => e.internalId !== `${homeData.id}@${awayData.id}`
      );

      const am = {
        matchSlug: `${homeData.playerSlug}-vs-${awayData.playerSlug}`,
        internalId: `${homeData.id}@${awayData.id}`,
        matchName: `${homeData.lastName} vs ${awayData.lastName}`,
        matchDate: match.startTimestamp,
      };

      awayNewArr.push(am);

      fs.writeFileSync(
        `${awayTeamPath}/matches.json`,
        JSON.stringify(awayNewArr, null, 2),
        'utf-8'
      );
    }

    if (!fs.existsSync(`${awayTeamPath}/matches.json`)) {
      console.log('!!!! match file NOT found, creating one...');
      console.log(`Home path: ${awayTeamPath}/matches.json`);
      /// declaring match obj
      const am = {
        matchSlug: `${homeData.playerSlug}-vs-${awayData.playerSlug}`,
        internalId: `${homeData.id}@${awayData.id}`,
        matchName: `${homeData.lastName} vs ${awayData.lastName}`,
        matchDate: match.startTimestamp,
      };
      awayMatches.push(am);

      fs.writeFileSync(
        `${awayTeamPath}/matches.json`,
        JSON.stringify(awayMatches, null, 2),
        'utf-8'
      );
    }
  }
  console.log(`------- Finished updating\n`);
};

export { handleNotStarted, handleFinished };
