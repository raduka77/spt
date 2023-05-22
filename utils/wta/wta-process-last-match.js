import { DateTime } from 'luxon';
import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-tennis.js';

// this function generates stats for the last match of any ATP player and returns an object

const playersATPInternal = JSON.parse(
  fs.readFileSync('../json_tennis/wta-internal-players-db.json', 'utf8')
);

const internalLeagues = JSON.parse(
  fs.readFileSync('../json_tennis/internal-leagues-db.json', 'utf8')
);

const calculateEpoch = current => {
  const matchDate = DateTime.fromSeconds(current, { zone: 'utc' }).toFormat(
    'dd-MM-yyyy',
    {
      setZone: true,
    }
  );

  return matchDate;
};

const WTAProcessLastMatch = async (matchId, playerId) => {
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('wtaMatches');

  let matches = [];

  const options = {
    projection: {
      _id: 0,
    },
  };

  let lastMatch = {
    date: '',
    opponent: '',
    surface: '',
    tournament: '',
    score: '',
    won: '',
    opponentRank: 0,
    walkover: false,
  };

  await col.find({ id: matchId }, options).forEach(doc => {
    if (
      typeof doc.homeScore !== 'undefined' &&
      doc.homeScore !== null &&
      typeof doc.awayScore !== 'undefined' &&
      doc.awayScore !== null
    ) {
      if (
        typeof doc.homeScore.period1 !== 'undefined' &&
        typeof doc.awayScore.period1 !== 'undefined'
      ) {
        lastMatch.score = `${doc.homeScore.period1}-${doc.awayScore.period1}`;
        if (
          typeof doc.homeScore.period2 !== 'undefined' &&
          typeof doc.awayScore.period2 !== 'undefined'
        ) {
          lastMatch.score = `${doc.homeScore.period1}-${doc.awayScore.period1}, ${doc.homeScore.period2}-${doc.awayScore.period2}`;

          if (
            typeof doc.homeScore.period3 !== 'undefined' &&
            typeof doc.awayScore.period3 !== 'undefined'
          ) {
            lastMatch.score = `${doc.homeScore.period1}-${doc.awayScore.period1}, ${doc.homeScore.period2}-${doc.awayScore.period2}, ${doc.homeScore.period3}-${doc.awayScore.period3}`;

            if (
              typeof doc.homeScore.period4 !== 'undefined' &&
              typeof doc.awayScore.period4 !== 'undefined'
            ) {
              lastMatch.score = `${doc.homeScore.period1}-${doc.awayScore.period1}, ${doc.homeScore.period2}-${doc.awayScore.period2}, ${doc.homeScore.period3}-${doc.awayScore.period3}, ${doc.homeScore.period4}-${doc.awayScore.period4}`;

              if (
                typeof doc.homeScore.period5 !== 'undefined' &&
                typeof doc.awayScore.period5 !== 'undefined'
              ) {
                lastMatch.score = `${doc.homeScore.period1}-${doc.awayScore.period1}, ${doc.homeScore.period2}-${doc.awayScore.period2}, ${doc.homeScore.period3}-${doc.awayScore.period3}, ${doc.homeScore.period4}-${doc.awayScore.period4}, ${doc.homeScore.period5}-${doc.awayScore.period5}`;
              }
            }
          }
        }
      }
    }

    lastMatch.date = calculateEpoch(doc.startTimestamp);

    if (doc.winnerCode == 0) {
      lastMatch.walkover = 'true';
    }

    if (typeof doc.groundType !== 'undefined' && doc.groundType !== null) {
      lastMatch.surface = doc.groundType.toLowerCase();
    }

    if (
      typeof doc.tournament.uniqueTournament !== 'undefined' &&
      doc.tournament.uniqueTournament !== null
    ) {
      const tour = internalLeagues.find(
        e => e.id == doc.tournament.uniqueTournament.id
      );

      if (tour) {
        lastMatch.tournament = tour.name;
      } else {
        lastMatch.tournament = 'n/a';
      }
    }

    if (doc.homeTeam.id == playerId) {
      const opp = playersATPInternal.find(e => e.id == doc.awayTeam.id);
      lastMatch.opponent = opp.name;

      if (doc.winnerCode == 1) {
        lastMatch.won = 'true';
      }

      if (doc.winnerCode == 2) {
        lastMatch.won = 'false';
      }

      if (
        typeof doc.awayTeam.ranking !== 'undefined' &&
        doc.awayTeam.ranking !== null
      ) {
        lastMatch.opponentRank = doc.awayTeam.ranking;
      }
    }

    if (doc.awayTeam.id == playerId) {
      const opp = playersATPInternal.find(e => e.id == doc.homeTeam.id);
      lastMatch.opponent = opp.name;

      if (doc.winnerCode == 2) {
        lastMatch.won = 'true';
      }

      if (doc.winnerCode == 1) {
        lastMatch.won = 'false';
      }

      if (
        typeof doc.homeTeam.ranking !== 'undefined' &&
        doc.homeTeam.ranking !== null
      ) {
        lastMatch.opponentRank = doc.homeTeam.ranking;
      }
    }
  });
  console.log(lastMatch);
  return lastMatch;
};

export { WTAProcessLastMatch };
