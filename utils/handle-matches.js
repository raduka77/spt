import { path } from '../paths.js';
import fs from 'fs';
/// for local test
// let all = [];

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

/////// handle FINISHED MATCH

const handleFinished = async (match, homeData, awayData) => {
  let homeMatches = [];
  let awayMatches = [];
  let finalScoreArr = [];
  let setScore1 = {
    home: 0,
    away: 0,
    won: '',
  };
  let setScore2 = {
    home: 0,
    away: 0,
    won: '',
  };
  let setScore3 = {
    home: 0,
    away: 0,
    won: '',
  };
  let setScore4 = {
    home: 0,
    away: 0,
    won: '',
  };
  let setScore5 = {
    home: 0,
    away: 0,
    won: '',
  };
  let matchStatus = '';

  ///// Preparing scores

  if (match.status.description === 'Walkover') {
    matchStatus = 'walkover';
  }
  if (match.status.description === 'Retired') {
    matchStatus = 'retired';
  }
  if (match.status.description === 'Ended') {
    matchStatus = 'ok';
  }

  /// period 1
  if (
    typeof match.homeScore.period1 !== 'undefined' &&
    typeof match.awayScore.period1 !== 'undefined'
  ) {
    if (typeof match.homeScore.period1TieBreak !== 'undefined') {
      if (match.homeScore.period1TieBreak > match.awayScore.period1TieBreak) {
        setScore1.home = 7;
        setScore1.away = 6;
        setScore1.won = 'home';
      }
      if (match.homeScore.period1TieBreak < match.awayScore.period1TieBreak) {
        setScore1.home = 6;
        setScore1.away = 7;
        setScore1.won = 'away';
      }
    }

    if (match.homeScore.period1 > match.awayScore.period1) {
      setScore1.home = match.homeScore.period1;
      setScore1.away = match.awayScore.period1;
      setScore1.won = 'home';
    }

    if (match.homeScore.period1 < match.awayScore.period1) {
      setScore1.home = match.homeScore.period1;
      setScore1.away = match.awayScore.period1;
      setScore1.won = 'away';
    }

    finalScoreArr.push(setScore1);
  }

  /// period 2
  if (
    typeof match.homeScore.period2 !== 'undefined' &&
    typeof match.awayScore.period2 !== 'undefined'
  ) {
    if (typeof match.homeScore.period2TieBreak !== 'undefined') {
      if (match.homeScore.period2TieBreak > match.awayScore.period2TieBreak) {
        setScore2.home = 7;
        setScore2.away = 6;
        setScore2.won = 'home';
        // finalScoreArr.push(setScore);
      }
      if (match.homeScore.period2TieBreak < match.awayScore.period2TieBreak) {
        setScore2.home = 6;
        setScore2.away = 7;
        setScore2.won = 'away';
        // finalScoreArr.push(setScore);
      }
    }

    if (match.homeScore.period2 > match.awayScore.period2) {
      setScore2.home = match.homeScore.period2;
      setScore2.away = match.awayScore.period2;
      setScore2.won = 'home';
      // finalScoreArr.push(setScore);
    }

    if (match.homeScore.period2 < match.awayScore.period2) {
      setScore2.home = match.homeScore.period2;
      setScore2.away = match.awayScore.period2;
      setScore2.won = 'away';
    }
    finalScoreArr.push(setScore2);
  }

  /// period 3
  if (
    typeof match.homeScore.period3 !== 'undefined' &&
    typeof match.awayScore.period3 !== 'undefined'
  ) {
    if (typeof match.homeScore.period3TieBreak !== 'undefined') {
      if (match.homeScore.period3TieBreak > match.awayScore.period3TieBreak) {
        setScore3.home = 7;
        setScore3.away = 6;
        setScore3.won = 'home';
        // finalScoreArr.push(setScore);
      }
      if (match.homeScore.period3TieBreak < match.awayScore.period3TieBreak) {
        setScore3.home = 6;
        setScore3.away = 7;
        setScore3.won = 'away';
        // finalScoreArr.push(setScore);
      }
    }

    if (match.homeScore.period3 > match.awayScore.period3) {
      setScore3.home = match.homeScore.period3;
      setScore3.away = match.awayScore.period3;
      setScore3.won = 'home';
      // finalScoreArr.push(setScore);
    }

    if (match.homeScore.period3 < match.awayScore.period3) {
      setScore3.home = match.homeScore.period3;
      setScore3.away = match.awayScore.period3;
      setScore3.won = 'away';
    }
    finalScoreArr.push(setScore3);
  }

  /// period 4
  if (
    typeof match.homeScore.period4 !== 'undefined' &&
    typeof match.awayScore.period4 !== 'undefined'
  ) {
    if (typeof match.homeScore.period4TieBreak !== 'undefined') {
      if (match.homeScore.period4TieBreak > match.awayScore.period4TieBreak) {
        setScore4.home = 7;
        setScore4.away = 6;
        setScore4.won = 'home';
        // finalScoreArr.push(setScore);
      }
      if (match.homeScore.period4TieBreak < match.awayScore.period4TieBreak) {
        setScore4.home = 6;
        setScore4.away = 7;
        setScore4.won = 'away';
        // finalScoreArr.push(setScore);
      }
    }

    if (match.homeScore.period4 > match.awayScore.period4) {
      setScore4.home = match.homeScore.period4;
      setScore4.away = match.awayScore.period4;
      setScore4.won = 'home';
      // finalScoreArr.push(setScore);
    }

    if (match.homeScore.period4 < match.awayScore.period4) {
      setScore4.home = match.homeScore.period4;
      setScore4.away = match.awayScore.period4;
      setScore4.won = 'away';
    }
    finalScoreArr.push(setScore4);
  }

  /// period 5
  if (
    typeof match.homeScore.period5 !== 'undefined' &&
    typeof match.awayScore.period5 !== 'undefined'
  ) {
    if (typeof match.homeScore.period5TieBreak !== 'undefined') {
      if (match.homeScore.period5TieBreak > match.awayScore.period5TieBreak) {
        setScore5.home = 7;
        setScore5.away = 6;
        setScore5.won = 'home';
        // finalScoreArr.push(setScore);
      }
      if (match.homeScore.period5TieBreak < match.awayScore.period5TieBreak) {
        setScore5.home = 6;
        setScore5.away = 7;
        setScore5.won = 'away';
        // finalScoreArr.push(setScore);
      }
    }

    if (match.homeScore.period5 > match.awayScore.period5) {
      setScore5.home = match.homeScore.period5;
      setScore5.away = match.awayScore.period5;
      setScore5.won = 'home';
      // finalScoreArr.push(setScore);
    }

    if (match.homeScore.period5 < match.awayScore.period5) {
      setScore5.home = match.homeScore.period5;
      setScore5.away = match.awayScore.period5;
      setScore5.won = 'away';
    }
    finalScoreArr.push(setScore5);
  }

  ////// end scores and states

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
    console.log(matchFullPath);
    const matchJson = JSON.parse(fs.readFileSync(matchFullPath, 'utf8'));

    console.log('file loaded succesfully');

    const updated = {
      internalId: matchJson.internalId,
      matchSlug: matchJson.matchSlug,
      match: match,
      tourName: matchJson.tourName,
      tourSlug: matchJson.tourSlug,
      homePlayerData: matchJson.homePlayerData,
      awayPlayerData: matchJson.awayPlayerData,
      H2H: matchJson.H2H,
      homeLastMatch: matchJson.homeLastMatch,
      awayLastMatch: matchJson.awayLastMatch,
      formOnTheSurface: matchJson.formOnTheSurface,
      predictionH2H: matchJson.predictionH2H,
      predictionRank: matchJson.predictionRank,
      predictionOdds: matchJson.predictionOdds,
      matchStatus: matchStatus,
      matchScoreArray: finalScoreArr,
    };

    //// local test
    // all.push(updated);
    // fs.writeFileSync(
    //   `../local_test/tennis.json`,
    //   JSON.stringify(all, null, 2),
    //   'utf-8'
    // );
    //// end local test
    console.log('>>>> updating match file...');
    console.log(matchFullPath);
    fs.writeFileSync(matchFullPath, JSON.stringify(updated, null, 2), 'utf-8');
  } else {
    console.log(
      '!!!! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX match json not found'
    );
  }

  ///// HANDLE TEAMS MATCHES JSON
  ///// HOME TEAM
  let homeTeamPath = homeData.dbFolder;
  let awayTeamPath = awayData.dbFolder;

  if (fs.existsSync(homeTeamPath)) {
    console.log(`*** HOME player directory found, checking for match file...`);

    if (fs.existsSync(`${homeTeamPath}/matches.json`)) {
      console.log('********* player match file found, updating...');
      console.log(`Home matches file path: ${homeTeamPath}/matches.json`);
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
      console.log('!!!! player match file NOT found, creating one...');
      console.log(`Home matches file path: ${homeTeamPath}/matches.json`);
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
      console.log('********* player match file found, updating...');
      console.log(`Away matches file path: ${awayTeamPath}/matches.json`);
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
      console.log(`Home path: ${awayTeamPath}/matches.json`);
      console.log(`Away matches file path: ${awayTeamPath}/matches.json`);
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
