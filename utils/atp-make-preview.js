'use strict';
import fs from 'fs';
import { DateTime } from 'luxon';
import { AtpH2H } from './make-h2h-atp.js';
import { ATPProcessLastMatch } from './atp-process-last-match.js';
import { predictionByRank } from './atp-pred-by-rank.js';
import { formOfPlayersOnClay } from './atp-form-on-clay.js';
import { formOfPlayersOnHO } from './atp-form-on-out-hard.js';
import { formOfPlayersOnHI } from './atp-form-on-ind-hard.js';
import { formOfPlayersOnGrass } from './atp-form-on-grass.js';
import { TextForLastMatch } from './atp-text-last-match.js';
import { predictionByOdds } from './atp-pred-by-odds.js';
import { predictionByH2H } from './atp-pred-by-h2h.js';
import { makeSchemaData } from './schema-time.js';
import { handleNotStarted, handleFinished } from './handle-matches.js';
import { path } from '../paths.js';

/// local ONLY!
let local = [];
///

/// time
const calculateHour = current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'HH:mm',
    {
      setZone: true,
    }
  );

  return matchDate;
};

/// date
const calculateEpoch = current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'dd MMM yyyy',
    {
      setZone: true,
    }
  );

  return matchDate;
};

/// this function generates the match json

const MakePreview = async (match, homeData, awayData) => {
  /// load tournaments names and slugs
  const tourSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-leagues-slugs.json', 'utf8')
  );

  const toursATP = JSON.parse(
    fs.readFileSync('../json_tennis/atp-leagues.json', 'utf8')
  );

  const siteMapUrls = JSON.parse(
    fs.readFileSync(`${path}/tennis/atp-sitemap.json`, 'utf8')
  );

  //// find tournaments proper names

  let tourName;
  let tourSlug;

  if (typeof match.matchTour !== 'undefined') {
    const theTour = tourSlugs.find(e => e.id == match.matchTour);

    if (theTour) {
      tourSlug = theTour.slug;
    }

    const theName = toursATP.find(e => e.id == match.matchTour);
    if (theName) {
      tourName = theName.properName;
    }
  }

  const internalId = `${homeData.id}@${awayData.id}`;
  const matchSlug = `${homeData.playerSlug}-vs-${awayData.playerSlug}`;

  //// handle NOT STARTED matches
  if (match.status.type === 'notstarted') {
    console.log(`=======${match.id}==========================`);
    const h2h = await AtpH2H(homeData.id, awayData.id);
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
      homeLastMatch = await ATPProcessLastMatch(lastHmatch, homeData.id);
      // console.log(homeLastMatch);
    } else {
      homeLastMatch = await ATPProcessLastMatch(undefined, homeData.id);
    }

    if (
      typeof awayData.recentMatches !== 'undefined' &&
      awayData.recentMatches !== null &&
      awayData.recentMatches.length > 0
    ) {
      const lastAmatch = awayData.recentMatches.at(-1);

      console.log('sending ' + awayData.properName);
      awayLastMatch = await ATPProcessLastMatch(lastAmatch, awayData.id);
      // console.log(awayLastMatch);
    } else {
      awayLastMatch = await ATPProcessLastMatch(undefined, awayData.id);
    }

    // console.log(h2h);

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

    const startDate = calculateEpoch(match.startTimestamp);
    const startHour = calculateHour(match.startTimestamp);

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
      tourName: tourName,
      tourSlug: tourSlug,
      startDate: startDate,
      startHour: startHour,
      homePlayerData: homeData,
      awayPlayerData: awayData,
      H2H: h2h,
      homeLastMatch: textLastMatchHome,
      awayLastMatch: textLastMatchAway,
      formOnTheSurface: formOnSurface,
      predictionH2H: predByH2H,
      predictionRank: predByRank,
      predictionOdds: predByOdds,
      ...(await makeSchemaData(match)),
    };

    let langSitemap = [];
    const enSlug = {
      lang: 'en',
      url: `https://www.sportpredictions.net/atp-tennis-predictions/${matchSlug}-prediction-live-stream/`,
    };

    const itSlug = {
      lang: 'it',
      url: `https://www.sportpredictions.net/it/pronostici-tennis-atp/${matchSlug}-pronostico-live-stream/`,
    };

    const esSlug = {
      lang: 'es',
      url: `https://www.sportpredictions.net/es/pronosticos-tenis-atp/${matchSlug}-prediccion-en-vivo/`,
    };

    const ptSlug = {
      lang: 'pt',
      url: `https://www.sportpredictions.net/pt/previsoes-tenis-atp/${matchSlug}-previsao-ao-vivo/`,
    };

    const frSlug = {
      lang: 'fr',
      url: `https://www.sportpredictions.net/fr/pronos-tennis-atp/${matchSlug}-prono-stream/`,
    };

    const roSlug = {
      lang: 'ro',
      url: `https://www.sportpredictions.net/ro/pronosticuri-tenis-atp/${matchSlug}-pronostic-stream-direct/`,
    };

    const deSlug = {
      lang: 'de',
      url: `https://www.sportpredictions.net/de/atp-tennis-vorhersagen/${matchSlug}-vorhersage-live-stream/`,
    };

    const czSlug = {
      lang: 'cs',
      url: `https://www.sportpredictions.net/cs/atp-tenisove-predpovedi/${matchSlug}-predikce-live-stream/`,
    };

    const plSlug = {
      lang: 'pl',
      url: `https://www.sportpredictions.net/pl/prognozy-tenisowe-atp/${matchSlug}-prognoza-na-zywo/`,
    };

    langSitemap.push(
      enSlug,
      itSlug,
      esSlug,
      ptSlug,
      frSlug,
      roSlug,
      deSlug,
      czSlug,
      plSlug
    );

    let siteMapObj = {
      matchId: internalId,
      url: `https://www.sportpredictions.net/atp-tennis-predictions/${matchSlug}-prediction-live-stream/`,
      links: langSitemap,
    };

    const isUrl = siteMapUrls.find(e => e.matchId === internalId);

    if (!isUrl) {
      siteMapUrls.push(siteMapObj);

      fs.writeFileSync(
        `${path}/tennis/atp-sitemap.json`,
        JSON.stringify(siteMapUrls, null, 2),
        'utf-8'
      );
    }

    // LOCAL ONLY!!!!!!!!!!!
    local.push(matchObj);
    // fs.writeFileSync(
    //   `../local_test/tennis-ns.json`,
    //   JSON.stringify(local, null, 2),
    //   'utf-8'
    // );
    //////////////////////////

    await handleNotStarted(matchObj);
    console.log('=================================');
  }

  if (match.status.type === 'finished') {
    await handleFinished(match, homeData, awayData);
  }
};

export { MakePreview };
