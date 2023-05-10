import { MongoConnection, MongoDbName } from './mongo-tennis.js';

const AtpH2H = async (homeTeam, awayTeam) => {
  console.log('starting AtpH2H');
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('atpMatches');
  let matches = [];
  const options = {
    projection: {
      'homeTeam.id': 1,
      'awayTeam.id': 1,
      startTimestamp: 1,
      status: 1,
      tournament: 1,
      roundInfo: 1,
      groundType: 1,
      customId: 1,
      id: 1,
      winnerCode: 1,
      _id: 0,
    },
  };

  let H2H = {
    walkout: 0,
    homeTeamWins: 0,
    awayTeamWins: 0,

    homeWinsUndefined: 0,
    homeWinsClay: 0,
    homeWinsGrass: 0,
    homeWinsOutHard: 0,
    homeWinsIndHard: 0,
    homeWinsInFinals: 0,

    awayWinsUndefined: 0,
    awayWinsClay: 0,
    awayWinsGrass: 0,
    awayWinsOutHard: 0,
    awayWinsIndHard: 0,
    awayWinsInFinals: 0,
  };

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
      if (doc.status.type === 'finished') {
        if (doc.homeTeam.id === homeTeam && doc.awayTeam.id === awayTeam) {
          if (doc.winnerCode === 0) {
            H2H.walkout++;
          }
          if (doc.winnerCode === 1) {
            if (typeof doc.groundType === 'undefined') {
              H2H.homeWinsUndefined++;
            }

            if (
              doc.groundType === 'Clay' ||
              doc.groundType === 'Red clay' ||
              doc.groundType === 'Red clay indoor' ||
              doc.groundType === 'Green clay'
            ) {
              H2H.homeWinsClay++;
            }

            if (doc.groundType === 'Hardcourt indoor') {
              H2H.homeWinsIndHard++;
            }

            if (doc.groundType === 'Hardcourt outdoor') {
              H2H.homeWinsOutHard++;
            }

            if (doc.groundType === 'Grass') {
              H2H.homeWinsGrass++;
            }
            if (typeof doc.roundInfo !== 'undefined') {
              if (doc.roundInfo.name === 'Final') {
                H2H.homeWinsInFinals++;
              }
            }
            H2H.homeTeamWins++;
          }
          if (doc.winnerCode === 2) {
            if (typeof doc.groundType === 'undefined') {
              H2H.awayWinsUndefined++;
            }

            if (
              doc.groundType === 'Clay' ||
              doc.groundType === 'Red clay' ||
              doc.groundType === 'Red clay indoor' ||
              doc.groundType === 'Green clay'
            ) {
              H2H.awayWinsClay++;
            }

            if (doc.groundType === 'Hardcourt indoor') {
              H2H.awayWinsIndHard++;
            }

            if (doc.groundType === 'Hardcourt outdoor') {
              H2H.awayWinsOutHard++;
            }

            if (doc.groundType === 'Grass') {
              H2H.awayWinsGrass++;
            }
            if (typeof doc.roundInfo !== 'undefined') {
              if (doc.roundInfo.name === 'Final') {
                H2H.awayWinsInFinals++;
              }
            }
            H2H.awayTeamWins++;
          }
        }

        if (doc.homeTeam.id === awayTeam && doc.awayTeam.id === homeTeam) {
          if (doc.winnerCode === 0) {
            H2H.walkout++;
          }
          if (doc.winnerCode === 1) {
            if (typeof doc.groundType === 'undefined') {
              H2H.awayWinsUndefined++;
            }

            if (
              doc.groundType === 'Clay' ||
              doc.groundType === 'Red clay' ||
              doc.groundType === 'Red clay indoor' ||
              doc.groundType === 'Green clay'
            ) {
              H2H.awayWinsClay++;
            }

            if (doc.groundType === 'Hardcourt indoor') {
              H2H.awayWinsIndHard++;
            }

            if (doc.groundType === 'Hardcourt outdoor') {
              H2H.awayWinsOutHard++;
            }

            if (doc.groundType === 'Grass') {
              H2H.awayWinsGrass++;
            }
            if (typeof doc.roundInfo !== 'undefined') {
              if (doc.roundInfo.name === 'Final') {
                H2H.awayWinsInFinals++;
              }
            }
            H2H.awayTeamWins++;
          }
          if (doc.winnerCode === 2) {
            if (typeof doc.groundType === 'undefined') {
              H2H.homeWinsUndefined++;
            }

            if (
              doc.groundType === 'Clay' ||
              doc.groundType === 'Red clay' ||
              doc.groundType === 'Red clay indoor' ||
              doc.groundType === 'Green clay'
            ) {
              H2H.homeWinsClay++;
            }

            if (doc.groundType === 'Hardcourt indoor') {
              H2H.homeWinsIndHard++;
            }

            if (doc.groundType === 'Hardcourt outdoor') {
              H2H.homeWinsOutHard++;
            }

            if (doc.groundType === 'Grass') {
              H2H.homeWinsGrass++;
            }
            if (typeof doc.roundInfo !== 'undefined') {
              if (doc.roundInfo.name === 'Final') {
                H2H.homeWinsInFinals++;
              }
            }
            H2H.homeTeamWins++;
          }
        }
      }
    });

  return H2H;
};

export { AtpH2H };
