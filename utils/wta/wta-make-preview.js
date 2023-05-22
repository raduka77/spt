import { WtaH2H } from './make-h2h-wta.js';
import { WTAProcessLastMatch } from './wta-process-last-match.js';
import { predictionByRank } from './wta-pred-by-rank.js';
import { formOfPlayersOnClay } from './wta-form-on-clay.js';
import { formOfPlayersOnHO } from './wta-form-on-out-hard.js';
import { formOfPlayersOnHI } from './wta-form-on-ind-hard.js';
import { formOfPlayersOnGrass } from './wta-form-on-grass.js';
import { TextForLastMatch } from './wta-text-last-match.js';
import { predictionByOdds } from './wta-pred-by-odds.js';
import { predictionByH2H } from './wta-pred-by-h2h.js';
import { handleNotStarted, handleFinished } from './handle-matches.js';

import fs from 'fs';

/// this function generates the match json

const MakePreview = async (match, homeData, awayData) => {
  const internalId = `${homeData.id}@${awayData.id}`;
  const matchSlug = `${homeData.playerSlug}-vs-${awayData.playerSlug}`;

  //// handle NOT STARTED matches
  if (match.status.type === 'notstarted') {
    // console.log(h2h);
    console.log(
      `=============${match.id}===${homeData.id}===${awayData.id}==============`
    );
    const h2h = await WtaH2H(homeData.id, awayData.id);
    let homeLastMatch;
    let awayLastMatch;
    let formOnSurface;
    let groundForFunction; /// for H2H stats on different grounds
    if (
      typeof homeData.recentMatches !== 'undefined' &&
      homeData.recentMatches !== null &&
      homeData.recentMatches.length > 0
    ) {
      const lastHmatch = homeData.recentMatches.at(-1);

      console.log('sending ' + homeData.properName);
      homeLastMatch = await WTAProcessLastMatch(lastHmatch, homeData.id);
      // console.log(homeLastMatch);
    }
    console.log(awayData);
    if (
      typeof awayData.recentMatches !== 'undefined' &&
      awayData.recentMatches !== null &&
      awayData.recentMatches.length > 0
    ) {
      const lastAmatch = awayData.recentMatches.at(-1);

      console.log('sending ' + awayData.properName);
      awayLastMatch = await WTAProcessLastMatch(lastAmatch, awayData.id);
      // console.log(awayLastMatch);
    }

    // // console.log(h2h);

    if (typeof match.groundType !== 'undefined') {
      groundForFunction = match.groundType;
      if (
        match.groundType === 'Clay' ||
        match.groundType === 'Red clay' ||
        match.groundType === 'Red clay indoor' ||
        match.groundType === 'Green clay'
      ) {
        formOnSurface = formOfPlayersOnClay(match, homeData, awayData);
      }

      if (match.groundType === 'Hardcourt outdoor') {
        formOnSurface = formOfPlayersOnHO(match, homeData, awayData);
      }

      if (match.groundType === 'Hardcourt indoor') {
        formOnSurface = formOfPlayersOnHI(match, homeData, awayData);
      }

      if (match.groundType === 'Grass') {
        formOnSurface = formOfPlayersOnGrass(match, homeData, awayData);
      }
    }

    const predByH2H = predictionByH2H(
      h2h,
      homeData,
      awayData,
      groundForFunction
    );

    const textLastMatchHome = TextForLastMatch(homeData, homeLastMatch);
    const textLastMatchAway = TextForLastMatch(awayData, awayLastMatch);

    const predByRank = predictionByRank(homeData, awayData);
    const predByOdds = predictionByOdds(match, homeData, awayData);

    let matchObj = {
      internalId: internalId,
      matchSlug: matchSlug,
      match: match,
      homePlayerData: homeData,
      awayPlayerData: awayData,
      H2H: h2h,
      homeLastMatch: textLastMatchHome,
      awayLastMatch: textLastMatchAway,
      formOnTheSurface: formOnSurface,
      predictionH2H: predByH2H,
      predictionRank: predByRank,
      predictionOdds: predByOdds,
    };

    // // console.log(matchObj);

    await handleNotStarted(matchObj);
    console.log('=================================');
  }

  if (match.status.type === 'finished') {
    await handleFinished(match, homeData, awayData);
  }
};

export { MakePreview };
