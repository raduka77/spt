import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import { CalculateEpochDate } from './date-utils.js';

const soccerTeams = JSON.parse(
  fs.readFileSync(`../json_soccer/internal-teams-db.json`, 'utf8')
);

const soccerLeagues = JSON.parse(
  fs.readFileSync(`../json_soccer/internal-leagues-db.json`, 'utf8')
);

const MakeForm = async (teamId, league, season, isHome) => {
  /// last 8
  let teamWon = 0;
  let teamLost = 0;
  let teamDraw = 0;
  let teamScored = 0;
  let teamConc = 0;
  let numberLastMatches = 0;

  const teamDbLocation = soccerTeams.find(e => e.id == teamId);

  const teamData = JSON.parse(
    fs.readFileSync(teamDbLocation.dbLocation, 'utf8')
  );

  if (
    typeof teamData.latestMatches !== 'undefined' &&
    teamData.latestMatches.length > 0
  ) {
    numberLastMatches = teamData.latestMatches.length;
    teamData.latestMatches.forEach(el => {
      if (el.status === 'W') {
        teamWon++;
      }

      if (el.status === 'L') {
        teamLost++;
      }

      if (el.status === 'D') {
        teamDraw++;
      }

      if (el.homeOrAway === 'home') {
        teamScored = teamScored + el.homeScore;
        teamConc = teamConc + el.awayScore;
      }

      if (el.homeOrAway === 'away') {
        teamScored = teamScored + el.awayScore;
        teamConc = teamConc + el.homeScore;
      }
    });
  }

  console.log(
    `WON: ${teamWon}, LOST: ${teamLost}, DRAW: ${teamDraw} --- Scored: ${teamScored}, Conceded: ${teamConc} (number of matches: ${numberLastMatches})`
  );

  //// overall form

  let homeWon;
  let homeLost;
  let homeDraw;
  let homeScored;
  let homeConc;
  let homeFailedToScore;
  let totalHomeMatches;

  let awayWon;
  let awayLost;
  let awayDraw;
  let awayScored;
  let awayConc;
  let awayFailedToScore;
  let totalAwayMatches;

  let homeBTTS;
  let awayBTTS;
  let teamGoalsOverUnder;
  let teamTotalWins;
  let teamTotalDraws;
  let teamTotalLost;
  let teamTotalScored;
  let teamTotalConc;
  let teamTotalFailedToScore;

  if (
    typeof teamData.teamFullStatsActive !== 'undefined' &&
    teamData.teamFullStatsActive.length > 0
  ) {
    teamData.teamFullStatsActive.forEach(el => {
      if (el.id == season && el.league_id == league) {
        if (
          typeof el.seasonStats !== 'undefined' &&
          el.seasonStats.length > 0
        ) {
          el.seasonStats.forEach(element => {
            if (
              typeof element.details !== 'undefined' &&
              element.details.length > 0
            ) {
              element.details.forEach(stat => {
                /// get the stats

                if (stat.type.id == 214) {
                  if (isHome) {
                    homeWon = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayWon = stat.value.away.count;
                  }

                  teamTotalWins = stat.value.all.count;
                }

                if (stat.type.id == 216) {
                  if (isHome) {
                    homeLost = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayLost = stat.value.away.count;
                  }

                  teamTotalLost = stat.value.all.count;
                }

                if (stat.type.id == 215) {
                  if (isHome) {
                    homeDraw = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayDraw = stat.value.away.count;
                  }

                  teamTotalDraws = stat.value.all.count;
                }

                if (stat.type.id == 52) {
                  if (isHome) {
                    homeScored = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayScored = stat.value.away.count;
                  }

                  teamTotalScored = stat.value.all.count;
                }

                if (stat.type.id == 88) {
                  if (isHome) {
                    homeConc = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayConc = stat.value.away.count;
                  }

                  teamTotalConc = stat.value.all.count;
                }

                if (stat.type.id == 575) {
                  if (isHome) {
                    homeFailedToScore = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayFailedToScore = stat.value.away.count;
                  }

                  teamTotalFailedToScore = stat.value.all.count;
                }

                if (stat.type.id == 192) {
                  if (isHome) {
                    homeBTTS = stat.value.home.count;
                  }

                  if (!isHome) {
                    awayBTTS = stat.value.away.count;
                  }
                }

                if (stat.type.id == 191) {
                  teamGoalsOverUnder = stat.value;
                }
              });
            }
          });
        }
      }
    });
  }
  totalHomeMatches = homeWon + homeLost + homeDraw;
  totalAwayMatches = awayWon + awayLost + awayDraw;

  console.log('HomeW: ' + homeWon);
  console.log('HomeL : ' + homeLost);
  console.log('HomeD : ' + homeDraw);
  console.log('Home Scored : ' + homeScored);
  console.log('Home Conc: ' + homeConc);
  console.log('Home FTS: ' + homeFailedToScore);
  console.log('Home total m: ' + totalHomeMatches);
  console.log('AwayW: ' + awayWon);
  console.log('AwayL: ' + awayLost);
  console.log('AwayD: ' + awayDraw);
  console.log('Away scored: ' + awayScored);
  console.log('Away Conc: ' + awayConc);
  console.log('Away FTS: ' + awayFailedToScore);
  console.log('Away total m: ' + totalAwayMatches);
  console.log('Home bbts: ' + homeBTTS);
  console.log('Away btts: ' + awayBTTS);
  console.log('Team OU: ' + teamGoalsOverUnder);
  console.log('Team W: ' + teamTotalWins);
  console.log('Team D: ' + teamTotalDraws);
  console.log('Team L: ' + teamTotalLost);
  console.log('Team SCORED: ' + teamTotalScored);
  console.log('Team CONC: ' + teamTotalConc);
  console.log('Team FTS: ' + teamTotalFailedToScore);
};

await MakeForm(9, 2, 19699, false);

// export { MakeForm };
