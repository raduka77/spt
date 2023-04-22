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

const ausOpen = function (statsArr, isHome) {
  // console.log('function received something');
  let matchStat = [];
  let noOfSets = statsArr.length - 1;

  let TEMPfirstServePerc = 0;
  let TEMPsecondServePerc = 0;
  let TEMPFSPointsPerc = 0;
  let TEMPSSPointsPerc = 0;
  // let TEMPBreakPointsSaved = 0;

  // for breaks
  // let howManyZeroBreaks = 0;

  let ausOpen = {
    aces: 0,
    doubleFaults: 0,
    firstServeTotalNum: 0,
    firstServerInNum: 0,
    secondServeTotalNum: 0,
    secondServerInNum: 0,
    firstServePerc: 0,
    secondServePerc: 0,
    firstServePointsTotal: 0,
    firstServePointsWon: 0,
    firstServePointsPerc: 0,
    secondServePointsTotal: 0,
    secondServePointsWon: 0,
    secondServePointsPerc: 0,
    breakPointsReceivedTotal: 0,
    breakPointsSavedNum: 0,
    breakPointsConverted: 0,
    tieBreaks: 0,
  };

  statsArr.forEach(el => {
    if (
      el.period === '1ST' ||
      el.period === '2ND' ||
      el.period === '3RD' ||
      el.period === '4TH' ||
      el.period === '5TH'
    ) {
      el.groups.forEach(item => {
        item.statisticsItems.forEach(stat => {
          matchStat.push(stat);
        });
      });
    }
  });

  //// if is away
  if (!isHome) {
    matchStat.forEach(el => {
      if (el.name === 'Aces') {
        // console.log(el.away);
        const num = Number(el.away);
        ausOpen.aces = ausOpen.aces + num;
      }

      if (el.name === 'Double faults') {
        // console.log(el.away);
        const num = Number(el.away);
        ausOpen.doubleFaults = ausOpen.doubleFaults + num;
      }

      if (el.name === 'Break points converted') {
        // console.log(el.away);
        const num = Number(el.away);
        ausOpen.breakPointsConverted = ausOpen.breakPointsConverted + num;
      }

      if (el.name === 'First serve') {
        const twoNumbers = el.away.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const firstServeNumbers = firstNumber.split('/');

        const firstServeIn = Number(firstServeNumbers[0]);
        const firstServeTotal = Number(firstServeNumbers[1]);

        /// handle the percentage and assign values
        const firstServePercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPfirstServePerc = TEMPfirstServePerc + firstServePercent;

        // assign values to final object
        ausOpen.firstServePerc = Math.trunc(TEMPfirstServePerc / noOfSets);
        ausOpen.firstServeTotalNum =
          ausOpen.firstServeTotalNum + firstServeTotal;
        ausOpen.firstServerInNum = ausOpen.firstServerInNum + firstServeIn;
      }

      if (el.name === 'Second serve') {
        const twoNumbers = el.away.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const secondServeNumbers = firstNumber.split('/');

        const secondServeIn = Number(secondServeNumbers[0]);
        const secondServeTotal = Number(secondServeNumbers[1]);

        /// handle the percentage and assign values
        const secondServePercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPsecondServePerc = TEMPsecondServePerc + secondServePercent;

        // assign values to final object
        ausOpen.secondServePerc = Math.trunc(TEMPsecondServePerc / noOfSets);
        ausOpen.secondServeTotalNum =
          ausOpen.secondServeTotalNum + secondServeTotal;
        ausOpen.secondServerInNum = ausOpen.secondServerInNum + secondServeIn;
      }

      if (el.name === 'First serve points') {
        const twoNumbers = el.away.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const FSPointsNumbers = firstNumber.split('/');

        const FSPointsWon = Number(FSPointsNumbers[0]);
        const FSPointsTotal = Number(FSPointsNumbers[1]);

        /// handle the percentage and assign values
        const FSPointsPercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPFSPointsPerc = TEMPFSPointsPerc + FSPointsPercent;

        // assign values to final object
        ausOpen.firstServePointsPerc = Math.trunc(TEMPFSPointsPerc / noOfSets);
        ausOpen.firstServePointsTotal =
          ausOpen.firstServePointsTotal + FSPointsTotal;
        ausOpen.firstServePointsWon = ausOpen.firstServePointsWon + FSPointsWon;
      }

      if (el.name === 'Second serve points') {
        const twoNumbers = el.away.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const SSPointsNumbers = firstNumber.split('/');

        const SSPointsWon = Number(SSPointsNumbers[0]);
        const SSPointsTotal = Number(SSPointsNumbers[1]);

        /// handle the percentage and assign values
        const SSPointsPercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPSSPointsPerc = TEMPSSPointsPerc + SSPointsPercent;

        // assign values to final object
        ausOpen.secondServePointsPerc = Math.trunc(TEMPSSPointsPerc / noOfSets);
        ausOpen.secondServePointsTotal =
          ausOpen.secondServePointsTotal + SSPointsTotal;
        ausOpen.secondServePointsWon =
          ausOpen.secondServePointsWon + SSPointsWon;
      }

      if (el.name === 'Break points saved') {
        const twoNumbers = el.away.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const BreakPoints = firstNumber.split('/');

        const BreakPointsSaved = Number(BreakPoints[0]);
        const BreakPointsTotal = Number(BreakPoints[1]);

        /// handle the percentage and assign values
        // const BreakPointsPercent = Number(
        //   secondNumber.replace('(', '').replace(')', '').replace('%', '')
        // );
        // TEMPBreakPointsSaved = TEMPBreakPointsSaved + BreakPointsPercent;

        /// find if the player got 0 received breaks, in order to divide properly
        // if (BreakPointsSaved == 0 && BreakPointsTotal == 0) {
        //   howManyZeroBreaks++;
        // }

        // assign values to final object

        // here pay attention to noOfSets and zero received breaks in order to get the right percentage
        // ausOpen.breakPointsSavedPerc = Math.trunc(
        //   TEMPBreakPointsSaved / (noOfSets - howManyZeroBreaks)
        // );
        ausOpen.breakPointsReceivedTotal =
          ausOpen.breakPointsReceivedTotal + BreakPointsTotal;
        ausOpen.breakPointsSavedNum =
          ausOpen.breakPointsSavedNum + BreakPointsSaved;
      }

      if (el.name === 'Tiebreaks') {
        const num = Number(el.away);
        ausOpen.tieBreaks = ausOpen.tieBreaks + num;
      }
    });
  }

  //// if is home
  if (isHome) {
    matchStat.forEach(el => {
      if (el.name === 'Aces') {
        // console.log(el.away);
        const num = Number(el.home);
        ausOpen.aces = ausOpen.aces + num;
      }

      if (el.name === 'Double faults') {
        // console.log(el.away);
        const num = Number(el.home);
        ausOpen.doubleFaults = ausOpen.doubleFaults + num;
      }

      if (el.name === 'Break points converted') {
        // console.log(el.away);
        const num = Number(el.home);
        ausOpen.breakPointsConverted = ausOpen.breakPointsConverted + num;
      }

      if (el.name === 'First serve') {
        const twoNumbers = el.home.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const firstServeNumbers = firstNumber.split('/');

        const firstServeIn = Number(firstServeNumbers[0]);
        const firstServeTotal = Number(firstServeNumbers[1]);

        /// handle the percentage and assign values
        const firstServePercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPfirstServePerc = TEMPfirstServePerc + firstServePercent;

        // assign values to final object
        ausOpen.firstServePerc = Math.trunc(TEMPfirstServePerc / noOfSets);
        ausOpen.firstServeTotalNum =
          ausOpen.firstServeTotalNum + firstServeTotal;
        ausOpen.firstServerInNum = ausOpen.firstServerInNum + firstServeIn;
      }

      if (el.name === 'Second serve') {
        const twoNumbers = el.home.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const secondServeNumbers = firstNumber.split('/');

        const secondServeIn = Number(secondServeNumbers[0]);
        const secondServeTotal = Number(secondServeNumbers[1]);

        /// handle the percentage and assign values
        const secondServePercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPsecondServePerc = TEMPsecondServePerc + secondServePercent;

        // assign values to final object
        ausOpen.secondServePerc = Math.trunc(TEMPsecondServePerc / noOfSets);
        ausOpen.secondServeTotalNum =
          ausOpen.secondServeTotalNum + secondServeTotal;
        ausOpen.secondServerInNum = ausOpen.secondServerInNum + secondServeIn;
      }

      if (el.name === 'First serve points') {
        const twoNumbers = el.home.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const FSPointsNumbers = firstNumber.split('/');

        const FSPointsWon = Number(FSPointsNumbers[0]);
        const FSPointsTotal = Number(FSPointsNumbers[1]);

        /// handle the percentage and assign values
        const FSPointsPercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPFSPointsPerc = TEMPFSPointsPerc + FSPointsPercent;

        // assign values to final object
        ausOpen.firstServePointsPerc = Math.trunc(TEMPFSPointsPerc / noOfSets);
        ausOpen.firstServePointsTotal =
          ausOpen.firstServePointsTotal + FSPointsTotal;
        ausOpen.firstServePointsWon = ausOpen.firstServePointsWon + FSPointsWon;
      }

      if (el.name === 'Second serve points') {
        const twoNumbers = el.home.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const SSPointsNumbers = firstNumber.split('/');

        const SSPointsWon = Number(SSPointsNumbers[0]);
        const SSPointsTotal = Number(SSPointsNumbers[1]);

        /// handle the percentage and assign values
        const SSPointsPercent = Number(
          secondNumber.replace('(', '').replace(')', '').replace('%', '')
        );
        TEMPSSPointsPerc = TEMPSSPointsPerc + SSPointsPercent;

        // assign values to final object
        ausOpen.secondServePointsPerc = Math.trunc(TEMPSSPointsPerc / noOfSets);
        ausOpen.secondServePointsTotal =
          ausOpen.secondServePointsTotal + SSPointsTotal;
        ausOpen.secondServePointsWon =
          ausOpen.secondServePointsWon + SSPointsWon;
      }

      if (el.name === 'Break points saved') {
        const twoNumbers = el.home.split(' ');
        ///split the original
        const firstNumber = twoNumbers[0];
        const secondNumber = twoNumbers[1];

        /// split the numbers and assign values

        const BreakPoints = firstNumber.split('/');

        const BreakPointsSaved = Number(BreakPoints[0]);
        const BreakPointsTotal = Number(BreakPoints[1]);

        /// handle the percentage and assign values
        // const BreakPointsPercent = Number(
        //   secondNumber.replace('(', '').replace(')', '').replace('%', '')
        // );
        // TEMPBreakPointsSaved = TEMPBreakPointsSaved + BreakPointsPercent;

        /// find if the player got 0 received breaks, in order to divide properly
        // if (BreakPointsSaved == 0 && BreakPointsTotal == 0) {
        //   howManyZeroBreaks++;
        // }

        // assign values to final object

        // here pay attention to noOfSets and zero received breaks in order to get the right percentage
        // ausOpen.breakPointsSavedPerc = Math.trunc(
        //   TEMPBreakPointsSaved / (noOfSets - howManyZeroBreaks)
        // );
        ausOpen.breakPointsReceivedTotal =
          ausOpen.breakPointsReceivedTotal + BreakPointsTotal;
        ausOpen.breakPointsSavedNum =
          ausOpen.breakPointsSavedNum + BreakPointsSaved;
      }

      if (el.name === 'Tiebreaks') {
        const num = Number(el.home);
        ausOpen.tieBreaks = ausOpen.tieBreaks + num;
      }
    });
  }
  // console.log(ausOpen);
  return ausOpen;
};

/// Generate Stats

const makePlayerStats = function (playerId) {
  let playerMatches = [];
  const seasonMatches = JSON.parse(
    fs.readFileSync('../json_tennis/atp-matches.json', 'utf8')
  );

  // get player matches from all matches
  seasonMatches.forEach(match => {
    if (match.status.type === 'finished') {
      if (match.homeTeam.type == 1 && match.awayTeam.type == 1) {
        if (match.homeTeam.id === playerId || match.awayTeam.id === playerId) {
          playerMatches.push(match);
        }
      }
    }
  });

  let HOMatches = 0;
  let HOTitles = [];
  let HOMatchesWon = 0;
  let HOMatchesLost = 0;

  /// per category
  let seasonAcesHO = [];
  let seasonDfHO = [];
  let seasonBreakPointsConvertedHO = [];

  let seasonFServeHOTotal = [];
  let seasonFServeInHO = [];
  let seasonFServeHOPerc = [];

  let seasonSServeHOTotal = [];
  let seasonSServeInHO = [];
  let seasonSServeHOPerc = [];

  let seasonFServeHOPointsTotal = [];
  let seasonFServePointsInHO = [];
  let seasonFServePointsHOPerc = [];

  let seasonSServeHOPointsTotal = [];
  let seasonSServePointsInHO = [];
  let seasonSServePointsHOPerc = [];

  let seasonBreakPointsReceivedTotalHo = [];
  let seasonBreakPointsSavedNumHO = [];
  // let seasonBreakSavedHOPerc = [];

  let seasonTieBreaksHO = [];

  //// HARDCOURT OUTDOOR
  playerMatches.forEach(playerMatch => {
    /// check if home or away
    if (playerMatch.homeTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (playerMatch.groundType === 'Hardcourt outdoor') {
          // add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 1
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            HOTitles.push(title);
          }
          /// add win/loss

          if (playerMatch.winnerCode == 1) {
            HOMatchesWon++;
          }

          if (playerMatch.winnerCode == 2) {
            HOMatchesLost++;
          }

          /// add to general matches for hc outdoor

          HOMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              const res = ausOpen(playerMatch.matchStats, true);
              seasonAcesHO.push(res.aces);
              seasonDfHO.push(res.doubleFaults);
              seasonBreakPointsConvertedHO.push(res.breakPointsConverted);

              seasonFServeHOTotal.push(res.firstServeTotalNum);
              seasonFServeInHO.push(res.firstServerInNum);
              seasonFServeHOPerc.push(res.firstServePerc);

              seasonSServeHOTotal.push(res.secondServeTotalNum);
              seasonSServeInHO.push(res.secondServerInNum);
              seasonSServeHOPerc.push(res.secondServePerc);

              seasonFServeHOPointsTotal.push(res.firstServePointsTotal);
              seasonFServePointsInHO.push(res.firstServePointsWon);
              seasonFServePointsHOPerc.push(res.firstServePointsPerc);

              seasonSServeHOPointsTotal.push(res.secondServePointsTotal);
              seasonSServePointsInHO.push(res.secondServePointsWon);
              seasonSServePointsHOPerc.push(res.secondServePointsPerc);

              seasonBreakPointsReceivedTotalHo.push(
                res.breakPointsReceivedTotal
              );
              seasonBreakPointsSavedNumHO.push(res.breakPointsSavedNum);
              // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              seasonTieBreaksHO.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.home);
                        const num = Number(item.home);
                        seasonAcesHO.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonDfHO.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonBreakPointsConvertedHO.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHOTotal.push(firstServeTotal);
                        seasonFServeInHO.push(firstServeIn);
                        seasonFServeHOPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHOTotal.push(secondServeTotal);
                        seasonSServeInHO.push(secondServeIn);
                        seasonSServeHOPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHOPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInHO.push(FServePointsIn);
                        seasonFServePointsHOPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHOPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInHO.push(SServePointsIn);
                        seasonSServePointsHOPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalHo.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumHO.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.home);
                        seasonTieBreaksHO.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }

    /// if away

    if (playerMatch.awayTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (playerMatch.groundType === 'Hardcourt outdoor') {
          /// add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 2
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            HOTitles.push(title);
          }
          /// add win/loss
          if (playerMatch.winnerCode == 2) {
            HOMatchesWon++;
          }

          if (playerMatch.winnerCode == 1) {
            HOMatchesLost++;
          }

          HOMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              const res = ausOpen(playerMatch.matchStats, false);
              seasonAcesHO.push(res.aces);
              seasonDfHO.push(res.doubleFaults);
              seasonBreakPointsConvertedHO.push(res.breakPointsConverted);

              seasonFServeHOTotal.push(res.firstServeTotalNum);
              seasonFServeInHO.push(res.firstServerInNum);
              seasonFServeHOPerc.push(res.firstServePerc);

              seasonSServeHOTotal.push(res.secondServeTotalNum);
              seasonSServeInHO.push(res.secondServerInNum);
              seasonSServeHOPerc.push(res.secondServePerc);

              seasonFServeHOPointsTotal.push(res.firstServePointsTotal);
              seasonFServePointsInHO.push(res.firstServePointsWon);
              seasonFServePointsHOPerc.push(res.firstServePointsPerc);

              seasonSServeHOPointsTotal.push(res.secondServePointsTotal);
              seasonSServePointsInHO.push(res.secondServePointsWon);
              seasonSServePointsHOPerc.push(res.secondServePointsPerc);

              seasonBreakPointsReceivedTotalHo.push(
                res.breakPointsReceivedTotal
              );
              seasonBreakPointsSavedNumHO.push(res.breakPointsSavedNum);
              // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              seasonTieBreaksHO.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.away);
                        const num = Number(item.away);
                        seasonAcesHO.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonDfHO.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonBreakPointsConvertedHO.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHOTotal.push(firstServeTotal);
                        seasonFServeInHO.push(firstServeIn);
                        seasonFServeHOPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHOTotal.push(secondServeTotal);
                        seasonSServeInHO.push(secondServeIn);
                        seasonSServeHOPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHOPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInHO.push(FServePointsIn);
                        seasonFServePointsHOPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHOPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInHO.push(SServePointsIn);
                        seasonSServePointsHOPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalHo.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumHO.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.away);
                        seasonTieBreaksHO.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }
  });

  let HIMatches = 0;
  let HITitles = [];
  let HIMatchesWon = 0;
  let HIMatchesLost = 0;

  /// per category
  let seasonAcesHI = [];
  let seasonDfHI = [];
  let seasonBreakPointsConvertedHI = [];

  let seasonFServeHITotal = [];
  let seasonFServeInHI = [];
  let seasonFServeHIPerc = [];

  let seasonSServeHITotal = [];
  let seasonSServeInHI = [];
  let seasonSServeHIPerc = [];

  let seasonFServeHIPointsTotal = [];
  let seasonFServePointsInHI = [];
  let seasonFServePointsHIPerc = [];

  let seasonSServeHIPointsTotal = [];
  let seasonSServePointsInHI = [];
  let seasonSServePointsHIPerc = [];

  let seasonBreakPointsReceivedTotalHI = [];
  let seasonBreakPointsSavedNumHI = [];
  // let seasonBreakSavedHOPerc = [];

  let seasonTieBreaksHI = [];

  //// HARDCOURT INDOOR
  playerMatches.forEach(playerMatch => {
    /// check if home or away
    if (playerMatch.homeTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (playerMatch.groundType === 'Hardcourt indoor') {
          // add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 1
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            HITitles.push(title);
          }
          /// add win/loss

          if (playerMatch.winnerCode == 1) {
            HIMatchesWon++;
          }

          if (playerMatch.winnerCode == 2) {
            HIMatchesLost++;
          }

          /// add to general matches for hc outdoor

          HIMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              const res = ausOpen(playerMatch.matchStats, true);
              seasonAcesHI.push(res.aces);
              seasonDfHI.push(res.doubleFaults);
              seasonBreakPointsConvertedHI.push(res.breakPointsConverted);

              seasonFServeHITotal.push(res.firstServeTotalNum);
              seasonFServeInHI.push(res.firstServerInNum);
              seasonFServeHIPerc.push(res.firstServePerc);

              seasonSServeHITotal.push(res.secondServeTotalNum);
              seasonSServeInHI.push(res.secondServerInNum);
              seasonSServeHIPerc.push(res.secondServePerc);

              seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              seasonFServePointsInHI.push(res.firstServePointsWon);
              seasonFServePointsHIPerc.push(res.firstServePointsPerc);

              seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              seasonSServePointsInHI.push(res.secondServePointsWon);
              seasonSServePointsHIPerc.push(res.secondServePointsPerc);

              seasonBreakPointsReceivedTotalHI.push(
                res.breakPointsReceivedTotal
              );
              seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.home);
                        const num = Number(item.home);
                        seasonAcesHI.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonDfHI.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonBreakPointsConvertedHI.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHITotal.push(firstServeTotal);
                        seasonFServeInHI.push(firstServeIn);
                        seasonFServeHIPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHITotal.push(secondServeTotal);
                        seasonSServeInHI.push(secondServeIn);
                        seasonSServeHIPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHIPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInHI.push(FServePointsIn);
                        seasonFServePointsHIPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHIPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInHI.push(SServePointsIn);
                        seasonSServePointsHIPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalHI.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumHI.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.home);
                        seasonTieBreaksHI.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }

    /// if away

    if (playerMatch.awayTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (playerMatch.groundType === 'Hardcourt indoor') {
          /// add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 2
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            HITitles.push(title);
          }
          /// add win/loss
          if (playerMatch.winnerCode == 2) {
            HIMatchesWon++;
          }

          if (playerMatch.winnerCode == 1) {
            HIMatchesLost++;
          }

          HIMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              const res = ausOpen(playerMatch.matchStats, false);
              seasonAcesHI.push(res.aces);
              seasonDfHI.push(res.doubleFaults);
              seasonBreakPointsConvertedHI.push(res.breakPointsConverted);

              seasonFServeHITotal.push(res.firstServeTotalNum);
              seasonFServeInHI.push(res.firstServerInNum);
              seasonFServeHIPerc.push(res.firstServePerc);

              seasonSServeHITotal.push(res.secondServeTotalNum);
              seasonSServeInHI.push(res.secondServerInNum);
              seasonSServeHIPerc.push(res.secondServePerc);

              seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              seasonFServePointsInHI.push(res.firstServePointsWon);
              seasonFServePointsHIPerc.push(res.firstServePointsPerc);

              seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              seasonSServePointsInHI.push(res.secondServePointsWon);
              seasonSServePointsHIPerc.push(res.secondServePointsPerc);

              seasonBreakPointsReceivedTotalHI.push(
                res.breakPointsReceivedTotal
              );
              seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.away);
                        const num = Number(item.away);
                        seasonAcesHI.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonDfHI.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonBreakPointsConvertedHI.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHITotal.push(firstServeTotal);
                        seasonFServeInHI.push(firstServeIn);
                        seasonFServeHIPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHITotal.push(secondServeTotal);
                        seasonSServeInHI.push(secondServeIn);
                        seasonSServeHIPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeHIPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInHI.push(FServePointsIn);
                        seasonFServePointsHIPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeHIPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInHI.push(SServePointsIn);
                        seasonSServePointsHIPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalHI.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumHI.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.away);
                        seasonTieBreaksHI.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }
  });

  let ClayMatches = 0;
  let ClayTitles = [];
  let ClayMatchesWon = 0;
  let ClayMatchesLost = 0;

  /// per category
  let seasonAcesClay = [];
  let seasonDfClay = [];
  let seasonBreakPointsConvertedClay = [];

  let seasonFServeClayTotal = [];
  let seasonFServeInClay = [];
  let seasonFServeClayPerc = [];

  let seasonSServeClayTotal = [];
  let seasonSServeInClay = [];
  let seasonSServeClayPerc = [];

  let seasonFServeClayPointsTotal = [];
  let seasonFServePointsInClay = [];
  let seasonFServePointsClayPerc = [];

  let seasonSServeClayPointsTotal = [];
  let seasonSServePointsInClay = [];
  let seasonSServePointsClayPerc = [];

  let seasonBreakPointsReceivedTotalClay = [];
  let seasonBreakPointsSavedNumClay = [];
  // let seasonBreakSavedHOPerc = [];

  let seasonTieBreaksClay = [];

  //// CLAY
  playerMatches.forEach(playerMatch => {
    /// check if home or away
    if (playerMatch.homeTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (
          playerMatch.groundType === 'Clay' ||
          playerMatch.groundType === 'Red clay'
        ) {
          // add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 1
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            ClayTitles.push(title);
          }
          /// add win/loss

          if (playerMatch.winnerCode == 1) {
            ClayMatchesWon++;
          }

          if (playerMatch.winnerCode == 2) {
            ClayMatchesLost++;
          }

          /// add to general matches for hc outdoor

          ClayMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              // const res = ausOpen(playerMatch.matchStats, true);
              // seasonAcesHI.push(res.aces);
              // seasonDfHI.push(res.doubleFaults);
              // seasonBreakPointsConvertedHI.push(res.breakPointsConverted);
              // seasonFServeHITotal.push(res.firstServeTotalNum);
              // seasonFServeInHI.push(res.firstServerInNum);
              // seasonFServeHIPerc.push(res.firstServePerc);
              // seasonSServeHITotal.push(res.secondServeTotalNum);
              // seasonSServeInHI.push(res.secondServerInNum);
              // seasonSServeHIPerc.push(res.secondServePerc);
              // seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              // seasonFServePointsInHI.push(res.firstServePointsWon);
              // seasonFServePointsHIPerc.push(res.firstServePointsPerc);
              // seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              // seasonSServePointsInHI.push(res.secondServePointsWon);
              // seasonSServePointsHIPerc.push(res.secondServePointsPerc);
              // seasonBreakPointsReceivedTotalHI.push(
              //   res.breakPointsReceivedTotal
              // );
              // seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              // seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.home);
                        const num = Number(item.home);
                        seasonAcesClay.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonDfClay.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonBreakPointsConvertedClay.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeClayTotal.push(firstServeTotal);
                        seasonFServeInClay.push(firstServeIn);
                        seasonFServeClayPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeClayTotal.push(secondServeTotal);
                        seasonSServeInClay.push(secondServeIn);
                        seasonSServeClayPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeClayPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInClay.push(FServePointsIn);
                        seasonFServePointsClayPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeClayPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInClay.push(SServePointsIn);
                        seasonSServePointsClayPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalClay.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumClay.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.home);
                        seasonTieBreaksClay.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }

    /// if away

    if (playerMatch.awayTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (
          playerMatch.groundType === 'Clay' ||
          playerMatch.groundType === 'Red clay'
        ) {
          /// add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 2
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            ClayTitles.push(title);
          }
          /// add win/loss
          if (playerMatch.winnerCode == 2) {
            ClayMatchesWon++;
          }

          if (playerMatch.winnerCode == 1) {
            ClayMatchesLost++;
          }

          ClayMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              // const res = ausOpen(playerMatch.matchStats, false);
              // seasonAcesHI.push(res.aces);
              // seasonDfHI.push(res.doubleFaults);
              // seasonBreakPointsConvertedHI.push(res.breakPointsConverted);
              // seasonFServeHITotal.push(res.firstServeTotalNum);
              // seasonFServeInHI.push(res.firstServerInNum);
              // seasonFServeHIPerc.push(res.firstServePerc);
              // seasonSServeHITotal.push(res.secondServeTotalNum);
              // seasonSServeInHI.push(res.secondServerInNum);
              // seasonSServeHIPerc.push(res.secondServePerc);
              // seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              // seasonFServePointsInHI.push(res.firstServePointsWon);
              // seasonFServePointsHIPerc.push(res.firstServePointsPerc);
              // seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              // seasonSServePointsInHI.push(res.secondServePointsWon);
              // seasonSServePointsHIPerc.push(res.secondServePointsPerc);
              // seasonBreakPointsReceivedTotalHI.push(
              //   res.breakPointsReceivedTotal
              // );
              // seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              // seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.away);
                        const num = Number(item.away);
                        seasonAcesClay.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonDfClay.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonBreakPointsConvertedClay.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeClayTotal.push(firstServeTotal);
                        seasonFServeInClay.push(firstServeIn);
                        seasonFServeClayPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeClayTotal.push(secondServeTotal);
                        seasonSServeInClay.push(secondServeIn);
                        seasonSServeClayPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeClayPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInClay.push(FServePointsIn);
                        seasonFServePointsClayPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeClayPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInClay.push(SServePointsIn);
                        seasonSServePointsClayPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalClay.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumClay.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.away);
                        seasonTieBreaksClay.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }
  });

  let GrassMatches = 0;
  let GrassTitles = [];
  let GrassMatchesWon = 0;
  let GrassMatchesLost = 0;

  /// per category
  let seasonAcesGrass = [];
  let seasonDfGrass = [];
  let seasonBreakPointsConvertedGrass = [];

  let seasonFServeGrassTotal = [];
  let seasonFServeInGrass = [];
  let seasonFServeGrassPerc = [];

  let seasonSServeGrassTotal = [];
  let seasonSServeInGrass = [];
  let seasonSServeGrassPerc = [];

  let seasonFServeGrassPointsTotal = [];
  let seasonFServePointsInGrass = [];
  let seasonFServePointsGrassPerc = [];

  let seasonSServeGrassPointsTotal = [];
  let seasonSServePointsInGrass = [];
  let seasonSServePointsGrassPerc = [];

  let seasonBreakPointsReceivedTotalGrass = [];
  let seasonBreakPointsSavedNumGrass = [];
  // let seasonBreakSavedHOPerc = [];

  let seasonTieBreaksGrass = [];

  //// Grass
  playerMatches.forEach(playerMatch => {
    /// check if home or away
    if (playerMatch.homeTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND Grass
        if (playerMatch.groundType === 'Grass') {
          // add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 1
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            GrassTitles.push(title);
          }
          /// add win/loss

          if (playerMatch.winnerCode == 1) {
            GrassMatchesWon++;
          }

          if (playerMatch.winnerCode == 2) {
            GrassMatchesLost++;
          }

          /// add to general matches for hc outdoor

          GrassMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              // const res = ausOpen(playerMatch.matchStats, true);
              // seasonAcesHI.push(res.aces);
              // seasonDfHI.push(res.doubleFaults);
              // seasonBreakPointsConvertedHI.push(res.breakPointsConverted);
              // seasonFServeHITotal.push(res.firstServeTotalNum);
              // seasonFServeInHI.push(res.firstServerInNum);
              // seasonFServeHIPerc.push(res.firstServePerc);
              // seasonSServeHITotal.push(res.secondServeTotalNum);
              // seasonSServeInHI.push(res.secondServerInNum);
              // seasonSServeHIPerc.push(res.secondServePerc);
              // seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              // seasonFServePointsInHI.push(res.firstServePointsWon);
              // seasonFServePointsHIPerc.push(res.firstServePointsPerc);
              // seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              // seasonSServePointsInHI.push(res.secondServePointsWon);
              // seasonSServePointsHIPerc.push(res.secondServePointsPerc);
              // seasonBreakPointsReceivedTotalHI.push(
              //   res.breakPointsReceivedTotal
              // );
              // seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              // seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.home);
                        const num = Number(item.home);
                        seasonAcesGrass.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonDfGrass.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.home);
                        const num = Number(item.home);

                        seasonBreakPointsConvertedGrass.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeGrassTotal.push(firstServeTotal);
                        seasonFServeInGrass.push(firstServeIn);
                        seasonFServeGrassPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeGrassTotal.push(secondServeTotal);
                        seasonSServeInGrass.push(secondServeIn);
                        seasonSServeGrassPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeGrassPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInGrass.push(FServePointsIn);
                        seasonFServePointsGrassPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeGrassPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInGrass.push(SServePointsIn);
                        seasonSServePointsGrassPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.home.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalGrass.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumGrass.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.home);
                        seasonTieBreaksGrass.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }

    /// if away

    if (playerMatch.awayTeam.id === playerId) {
      if (
        typeof playerMatch.groundType !== 'undefined' &&
        playerMatch.groundType !== null
      ) {
        /////// GROUND HardCourts Outdoor
        if (playerMatch.groundType === 'Grass') {
          /// add titles
          if (
            typeof playerMatch.roundInfo !== 'undefined' &&
            playerMatch.roundInfo !== 'null' &&
            playerMatch.roundInfo.name === 'Final' &&
            playerMatch.winnerCode == 2
          ) {
            const title = {
              titleName: playerMatch.tournament.uniqueTournament.name,
            };
            GrassTitles.push(title);
          }
          /// add win/loss
          if (playerMatch.winnerCode == 2) {
            GrassMatchesWon++;
          }

          if (playerMatch.winnerCode == 1) {
            GrassMatchesLost++;
          }

          GrassMatches++;

          if (
            typeof playerMatch.matchStats !== 'undefined' &&
            playerMatch.matchStats !== null &&
            playerMatch.matchStats.length > 0
          ) {
            /// for AUS OPEN, call separate function
            if (playerMatch.tournament.uniqueTournament.id == 2363) {
              // const res = ausOpen(playerMatch.matchStats, false);
              // seasonAcesHI.push(res.aces);
              // seasonDfHI.push(res.doubleFaults);
              // seasonBreakPointsConvertedHI.push(res.breakPointsConverted);
              // seasonFServeHITotal.push(res.firstServeTotalNum);
              // seasonFServeInHI.push(res.firstServerInNum);
              // seasonFServeHIPerc.push(res.firstServePerc);
              // seasonSServeHITotal.push(res.secondServeTotalNum);
              // seasonSServeInHI.push(res.secondServerInNum);
              // seasonSServeHIPerc.push(res.secondServePerc);
              // seasonFServeHIPointsTotal.push(res.firstServePointsTotal);
              // seasonFServePointsInHI.push(res.firstServePointsWon);
              // seasonFServePointsHIPerc.push(res.firstServePointsPerc);
              // seasonSServeHIPointsTotal.push(res.secondServePointsTotal);
              // seasonSServePointsInHI.push(res.secondServePointsWon);
              // seasonSServePointsHIPerc.push(res.secondServePointsPerc);
              // seasonBreakPointsReceivedTotalHI.push(
              //   res.breakPointsReceivedTotal
              // );
              // seasonBreakPointsSavedNumHI.push(res.breakPointsSavedNum);
              // // seasonBreakSavedHOPerc.push(res.breakPointsSavedPerc);
              // seasonTieBreaksHI.push(res.tieBreaks);
            } else {
              playerMatch.matchStats.forEach(stat => {
                // console.log(stat);
                if (
                  typeof stat.groups !== 'undefined' &&
                  stat.groups !== null &&
                  stat.period === 'ALL' &&
                  stat.groups.length > 0
                ) {
                  stat.groups.forEach(el => {
                    // console.log(el);
                    el.statisticsItems.forEach(item => {
                      // // console.log(item);
                      // allStatsHardOutdoor.push(item);
                      if (item.name === 'Aces') {
                        // console.log(item.away);
                        const num = Number(item.away);
                        seasonAcesGrass.push(num);
                      }

                      if (item.name === 'Double faults') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonDfGrass.push(num);
                      }

                      if (item.name === 'Break points converted') {
                        // console.log(item.away);
                        const num = Number(item.away);

                        seasonBreakPointsConvertedGrass.push(num);
                      }

                      if (item.name === 'First serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const firstServeNumbers = firstNumber.split('/');

                        const firstServeIn = Number(firstServeNumbers[0]);
                        const firstServeTotal = Number(firstServeNumbers[1]);

                        /// handle the percentage
                        const firstServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeGrassTotal.push(firstServeTotal);
                        seasonFServeInGrass.push(firstServeIn);
                        seasonFServeGrassPerc.push(firstServePercent);
                      }

                      if (item.name === 'Second serve') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const secondServeNumbers = firstNumber.split('/');

                        const secondServeIn = Number(secondServeNumbers[0]);
                        const secondServeTotal = Number(secondServeNumbers[1]);

                        /// handle the percentage
                        const secondServePercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeGrassTotal.push(secondServeTotal);
                        seasonSServeInGrass.push(secondServeIn);
                        seasonSServeGrassPerc.push(secondServePercent);
                      }

                      if (item.name === 'First serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const FSPointsNumbers = firstNumber.split('/');

                        const FServePointsIn = Number(FSPointsNumbers[0]);
                        const FServePointsTotal = Number(FSPointsNumbers[1]);

                        /// handle the percentage
                        const FServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonFServeGrassPointsTotal.push(FServePointsTotal);
                        seasonFServePointsInGrass.push(FServePointsIn);
                        seasonFServePointsGrassPerc.push(FServePointsPercent);
                      }

                      if (item.name === 'Second serve points') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const SSPointsNumbers = firstNumber.split('/');

                        const SServePointsIn = Number(SSPointsNumbers[0]);
                        const SServePointsTotal = Number(SSPointsNumbers[1]);

                        /// handle the percentage
                        const SServePointsPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonSServeGrassPointsTotal.push(SServePointsTotal);
                        seasonSServePointsInGrass.push(SServePointsIn);
                        seasonSServePointsGrassPerc.push(SServePointsPercent);
                      }

                      if (item.name === 'Break points saved') {
                        const twoNumbers = item.away.split(' ');
                        ///split the original
                        const firstNumber = twoNumbers[0];
                        const secondNumber = twoNumbers[1];

                        /// split the numbers

                        const BreakPointsNumbers = firstNumber.split('/');

                        const BreakPointsSaved = Number(BreakPointsNumbers[0]);
                        const BreakPointsAgainstTotal = Number(
                          BreakPointsNumbers[1]
                        );

                        /// handle the percentage
                        const BreakPointsSavedPercent = Number(
                          secondNumber
                            .replace('(', '')
                            .replace(')', '')
                            .replace('%', '')
                        );

                        seasonBreakPointsReceivedTotalGrass.push(
                          BreakPointsAgainstTotal
                        );
                        seasonBreakPointsSavedNumGrass.push(BreakPointsSaved);
                        // seasonBreakSavedHOPerc.push(BreakPointsSavedPercent);
                      }

                      if (item.name === 'Tiebreaks') {
                        const num = Number(item.away);
                        seasonTieBreaksGrass.push(num);
                      }
                    });
                  });
                }
              });
            }
          }
        }
      }
    }
  });

  let HOStats = {
    totalMatches: HOMatches,
    won: HOMatchesWon,
    lost: HOMatchesLost,
    winPerc: 0,
    titles: HOTitles,
    acesTotal: 0,
    acesAvg: 0,
    doubleFaultsTotal: 0,
    doubleFaultsAvg: 0,
    breakPointsTotal: 0,
    breaksConvAvg: 0,
    firstServeTotal: 0,
    firstServeIn: 0,
    firstServePerc: 0,
    secondServeTotal: 0,
    secondServeIn: 0,
    secondServePerc: 0,
    firstServePointsTotal: 0,
    firstServePointsWon: 0,
    firstServePointsPerc: 0,
    secondServePointsTotal: 0,
    secondServePointsWon: 0,
    secondServePointsPerc: 0,
    breakPointsAgainst: 0,
    breakPointsSaved: 0,
    breakPointsSavedPerc: 0,
    tieBreaks: 0,
  };

  if (HOMatches > 0) {
    HOStats.winPerc = Number(((HOMatchesWon / HOMatches) * 100).toFixed(2));
  }

  if (seasonAcesHO.length > 0) {
    HOStats.acesTotal = seasonAcesHO.reduce((a, b) => a + b);
    HOStats.acesAvg = Number(
      (seasonAcesHO.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (seasonDfHO.length > 0) {
    HOStats.doubleFaultsTotal = seasonDfHO.reduce((a, b) => a + b);
    HOStats.doubleFaultsAvg = Number(
      (seasonDfHO.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (seasonBreakPointsConvertedHO.length > 0) {
    HOStats.breakPointsTotal = seasonBreakPointsConvertedHO.reduce(
      (a, b) => a + b
    );
    HOStats.breaksConvAvg = Number(
      (
        seasonBreakPointsConvertedHO.reduce((a, b) => a + b) / HOMatches
      ).toFixed(2)
    );
  }

  if (
    seasonFServeHOTotal.length > 0 &&
    seasonFServeInHO.length > 0 &&
    seasonFServeHOPerc.length > 0
  ) {
    HOStats.firstServeTotal = seasonFServeHOTotal.reduce((a, b) => a + b);

    HOStats.firstServeIn = seasonFServeInHO.reduce((a, b) => a + b);

    HOStats.firstServePerc = Number(
      (seasonFServeHOPerc.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (
    seasonSServeHOTotal.length > 0 &&
    seasonSServeInHO.length > 0 &&
    seasonSServeHOPerc.length > 0
  ) {
    HOStats.secondServeTotal = seasonSServeHOTotal.reduce((a, b) => a + b);

    HOStats.secondServeIn = seasonSServeInHO.reduce((a, b) => a + b);

    HOStats.secondServePerc = Number(
      (seasonSServeHOPerc.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (
    seasonFServeHOPointsTotal.length > 0 &&
    seasonFServePointsInHO.length > 0 &&
    seasonFServePointsHOPerc.length > 0
  ) {
    HOStats.firstServePointsTotal = seasonFServeHOPointsTotal.reduce(
      (a, b) => a + b
    );

    HOStats.firstServePointsWon = seasonFServePointsInHO.reduce(
      (a, b) => a + b
    );

    HOStats.firstServePointsPerc = Number(
      (seasonFServePointsHOPerc.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (
    seasonSServeHOPointsTotal.length > 0 &&
    seasonSServePointsInHO.length > 0 &&
    seasonSServePointsHOPerc.length > 0
  ) {
    HOStats.secondServePointsTotal = seasonSServeHOPointsTotal.reduce(
      (a, b) => a + b
    );

    HOStats.secondServePointsWon = seasonSServePointsInHO.reduce(
      (a, b) => a + b
    );

    HOStats.secondServePointsPerc = Number(
      (seasonSServePointsHOPerc.reduce((a, b) => a + b) / HOMatches).toFixed(2)
    );
  }

  if (
    seasonBreakPointsReceivedTotalHo.length > 0 &&
    seasonBreakPointsSavedNumHO.length > 0
  ) {
    HOStats.breakPointsAgainst = seasonBreakPointsReceivedTotalHo.reduce(
      (a, b) => a + b
    );

    HOStats.breakPointsSaved = seasonBreakPointsSavedNumHO.reduce(
      (a, b) => a + b
    );

    HOStats.breakPointsSavedPerc = Number(
      ((HOStats.breakPointsSaved / HOStats.breakPointsAgainst) * 100).toFixed(2)
    );
  }

  if (seasonTieBreaksHO.length > 0) {
    HOStats.tieBreaks = seasonTieBreaksHO.reduce((a, b) => a + b);
  }

  /// values for HardCourt Indoor

  let HIStats = {
    totalMatches: HIMatches,
    won: HIMatchesWon,
    lost: HIMatchesLost,
    winPerc: 0,
    titles: HITitles,
    acesTotal: 0,
    acesAvg: 0,
    doubleFaultsTotal: 0,
    doubleFaultsAvg: 0,
    breakPointsTotal: 0,
    breaksConvAvg: 0,
    firstServeTotal: 0,
    firstServeIn: 0,
    firstServePerc: 0,
    secondServeTotal: 0,
    secondServeIn: 0,
    secondServePerc: 0,
    firstServePointsTotal: 0,
    firstServePointsWon: 0,
    firstServePointsPerc: 0,
    secondServePointsTotal: 0,
    secondServePointsWon: 0,
    secondServePointsPerc: 0,
    breakPointsAgainst: 0,
    breakPointsSaved: 0,
    breakPointsSavedPerc: 0,
    tieBreaks: 0,
  };

  if (HIMatches > 0) {
    HIStats.winPerc = Number(((HIMatchesWon / HIMatches) * 100).toFixed(2));
  }

  if (seasonAcesHI.length > 0) {
    HIStats.acesTotal = seasonAcesHI.reduce((a, b) => a + b);
    HIStats.acesAvg = Number(
      (seasonAcesHI.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (seasonDfHI.length > 0) {
    HIStats.doubleFaultsTotal = seasonDfHI.reduce((a, b) => a + b);
    HIStats.doubleFaultsAvg = Number(
      (seasonDfHI.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (seasonBreakPointsConvertedHI.length > 0) {
    HIStats.breakPointsTotal = seasonBreakPointsConvertedHI.reduce(
      (a, b) => a + b
    );
    HIStats.breaksConvAvg = Number(
      (
        seasonBreakPointsConvertedHI.reduce((a, b) => a + b) / HIMatches
      ).toFixed(2)
    );
  }

  if (
    seasonFServeHITotal.length > 0 &&
    seasonFServeInHI.length > 0 &&
    seasonFServeHIPerc.length > 0
  ) {
    HIStats.firstServeTotal = seasonFServeHITotal.reduce((a, b) => a + b);

    HIStats.firstServeIn = seasonFServeInHI.reduce((a, b) => a + b);

    HIStats.firstServePerc = Number(
      (seasonFServeHIPerc.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (
    seasonSServeHITotal.length > 0 &&
    seasonSServeInHI.length > 0 &&
    seasonSServeHIPerc.length > 0
  ) {
    HIStats.secondServeTotal = seasonSServeHITotal.reduce((a, b) => a + b);

    HIStats.secondServeIn = seasonSServeInHI.reduce((a, b) => a + b);

    HIStats.secondServePerc = Number(
      (seasonSServeHIPerc.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (
    seasonFServeHIPointsTotal.length > 0 &&
    seasonFServePointsInHI.length > 0 &&
    seasonFServePointsHIPerc.length > 0
  ) {
    HIStats.firstServePointsTotal = seasonFServeHIPointsTotal.reduce(
      (a, b) => a + b
    );

    HIStats.firstServePointsWon = seasonFServePointsInHI.reduce(
      (a, b) => a + b
    );

    HIStats.firstServePointsPerc = Number(
      (seasonFServePointsHIPerc.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (
    seasonSServeHIPointsTotal.length > 0 &&
    seasonSServePointsInHI.length > 0 &&
    seasonSServePointsHIPerc.length > 0
  ) {
    HIStats.secondServePointsTotal = seasonSServeHIPointsTotal.reduce(
      (a, b) => a + b
    );

    HIStats.secondServePointsWon = seasonSServePointsInHI.reduce(
      (a, b) => a + b
    );

    HIStats.secondServePointsPerc = Number(
      (seasonSServePointsHIPerc.reduce((a, b) => a + b) / HIMatches).toFixed(2)
    );
  }

  if (
    seasonBreakPointsReceivedTotalHI.length > 0 &&
    seasonBreakPointsSavedNumHI.length > 0
  ) {
    HIStats.breakPointsAgainst = seasonBreakPointsReceivedTotalHI.reduce(
      (a, b) => a + b
    );

    HIStats.breakPointsSaved = seasonBreakPointsSavedNumHI.reduce(
      (a, b) => a + b
    );

    HIStats.breakPointsSavedPerc = Number(
      ((HIStats.breakPointsSaved / HIStats.breakPointsAgainst) * 100).toFixed(2)
    );
  }

  if (seasonTieBreaksHI.length > 0) {
    HIStats.tieBreaks = seasonTieBreaksHI.reduce((a, b) => a + b);
  }

  /// values for clay

  let ClayStats = {
    totalMatches: ClayMatches,
    won: ClayMatchesWon,
    lost: ClayMatchesLost,
    winPerc: 0,
    titles: ClayTitles,
    acesTotal: 0,
    acesAvg: 0,
    doubleFaultsTotal: 0,
    doubleFaultsAvg: 0,
    breakPointsTotal: 0,
    breaksConvAvg: 0,
    firstServeTotal: 0,
    firstServeIn: 0,
    firstServePerc: 0,
    secondServeTotal: 0,
    secondServeIn: 0,
    secondServePerc: 0,
    firstServePointsTotal: 0,
    firstServePointsWon: 0,
    firstServePointsPerc: 0,
    secondServePointsTotal: 0,
    secondServePointsWon: 0,
    secondServePointsPerc: 0,
    breakPointsAgainst: 0,
    breakPointsSaved: 0,
    breakPointsSavedPerc: 0,
    tieBreaks: 0,
  };

  if (ClayMatches > 0) {
    ClayStats.winPerc = Number(
      ((ClayMatchesWon / ClayMatches) * 100).toFixed(2)
    );
  }

  if (seasonAcesClay.length > 0) {
    ClayStats.acesTotal = seasonAcesClay.reduce((a, b) => a + b);
    ClayStats.acesAvg = Number(
      (seasonAcesClay.reduce((a, b) => a + b) / ClayMatches).toFixed(2)
    );
  }

  if (seasonDfClay.length > 0) {
    ClayStats.doubleFaultsTotal = seasonDfClay.reduce((a, b) => a + b);
    ClayStats.doubleFaultsAvg = Number(
      (seasonDfClay.reduce((a, b) => a + b) / ClayMatches).toFixed(2)
    );
  }

  if (seasonBreakPointsConvertedClay.length > 0) {
    ClayStats.breakPointsTotal = seasonBreakPointsConvertedClay.reduce(
      (a, b) => a + b
    );
    ClayStats.breaksConvAvg = Number(
      (
        seasonBreakPointsConvertedClay.reduce((a, b) => a + b) / ClayMatches
      ).toFixed(2)
    );
  }

  if (
    seasonFServeClayTotal.length > 0 &&
    seasonFServeInClay.length > 0 &&
    seasonFServeClayPerc.length > 0
  ) {
    ClayStats.firstServeTotal = seasonFServeClayTotal.reduce((a, b) => a + b);

    ClayStats.firstServeIn = seasonFServeInClay.reduce((a, b) => a + b);

    ClayStats.firstServePerc = Number(
      (seasonFServeClayPerc.reduce((a, b) => a + b) / ClayMatches).toFixed(2)
    );
  }

  if (
    seasonSServeClayTotal.length > 0 &&
    seasonSServeInClay.length > 0 &&
    seasonSServeClayPerc.length > 0
  ) {
    ClayStats.secondServeTotal = seasonSServeClayTotal.reduce((a, b) => a + b);

    ClayStats.secondServeIn = seasonSServeInClay.reduce((a, b) => a + b);

    ClayStats.secondServePerc = Number(
      (seasonSServeClayPerc.reduce((a, b) => a + b) / ClayMatches).toFixed(2)
    );
  }

  if (
    seasonFServeClayPointsTotal.length > 0 &&
    seasonFServePointsInClay.length > 0 &&
    seasonFServePointsClayPerc.length > 0
  ) {
    ClayStats.firstServePointsTotal = seasonFServeClayPointsTotal.reduce(
      (a, b) => a + b
    );

    ClayStats.firstServePointsWon = seasonFServePointsInClay.reduce(
      (a, b) => a + b
    );

    ClayStats.firstServePointsPerc = Number(
      (
        seasonFServePointsClayPerc.reduce((a, b) => a + b) / ClayMatches
      ).toFixed(2)
    );
  }

  if (
    seasonSServeClayPointsTotal.length > 0 &&
    seasonSServePointsInClay.length > 0 &&
    seasonSServePointsClayPerc.length > 0
  ) {
    ClayStats.secondServePointsTotal = seasonSServeClayPointsTotal.reduce(
      (a, b) => a + b
    );

    ClayStats.secondServePointsWon = seasonSServePointsInClay.reduce(
      (a, b) => a + b
    );

    ClayStats.secondServePointsPerc = Number(
      (
        seasonSServePointsClayPerc.reduce((a, b) => a + b) / ClayMatches
      ).toFixed(2)
    );
  }

  if (
    seasonBreakPointsReceivedTotalClay.length > 0 &&
    seasonBreakPointsSavedNumClay.length > 0
  ) {
    ClayStats.breakPointsAgainst = seasonBreakPointsReceivedTotalClay.reduce(
      (a, b) => a + b
    );

    ClayStats.breakPointsSaved = seasonBreakPointsSavedNumClay.reduce(
      (a, b) => a + b
    );

    ClayStats.breakPointsSavedPerc = Number(
      (
        (ClayStats.breakPointsSaved / ClayStats.breakPointsAgainst) *
        100
      ).toFixed(2)
    );
  }

  if (seasonTieBreaksClay.length > 0) {
    ClayStats.tieBreaks = seasonTieBreaksClay.reduce((a, b) => a + b);
  }

  //// values for Grass

  let GrassStats = {
    totalMatches: GrassMatches,
    won: GrassMatchesWon,
    lost: GrassMatchesLost,
    winPerc: 0,
    titles: GrassTitles,
    acesTotal: 0,
    acesAvg: 0,
    doubleFaultsTotal: 0,
    doubleFaultsAvg: 0,
    breakPointsTotal: 0,
    breaksConvAvg: 0,
    firstServeTotal: 0,
    firstServeIn: 0,
    firstServePerc: 0,
    secondServeTotal: 0,
    secondServeIn: 0,
    secondServePerc: 0,
    firstServePointsTotal: 0,
    firstServePointsWon: 0,
    firstServePointsPerc: 0,
    secondServePointsTotal: 0,
    secondServePointsWon: 0,
    secondServePointsPerc: 0,
    breakPointsAgainst: 0,
    breakPointsSaved: 0,
    breakPointsSavedPerc: 0,
    tieBreaks: 0,
  };

  if (GrassMatches > 0) {
    GrassStats.winPerc = Number(
      ((GrassMatchesWon / GrassMatches) * 100).toFixed(2)
    );
  }

  if (seasonAcesGrass.length > 0) {
    GrassStats.acesTotal = seasonAcesGrass.reduce((a, b) => a + b);
    GrassStats.acesAvg = Number(
      (seasonAcesGrass.reduce((a, b) => a + b) / GrassMatches).toFixed(2)
    );
  }

  if (seasonDfGrass.length > 0) {
    GrassStats.doubleFaultsTotal = seasonDfGrass.reduce((a, b) => a + b);
    GrassStats.doubleFaultsAvg = Number(
      (seasonDfGrass.reduce((a, b) => a + b) / GrassMatches).toFixed(2)
    );
  }

  if (seasonBreakPointsConvertedGrass.length > 0) {
    GrassStats.breakPointsTotal = seasonBreakPointsConvertedGrass.reduce(
      (a, b) => a + b
    );
    GrassStats.breaksConvAvg = Number(
      (
        seasonBreakPointsConvertedGrass.reduce((a, b) => a + b) / GrassMatches
      ).toFixed(2)
    );
  }

  if (
    seasonFServeGrassTotal.length > 0 &&
    seasonFServeInGrass.length > 0 &&
    seasonFServeGrassPerc.length > 0
  ) {
    GrassStats.firstServeTotal = seasonFServeGrassTotal.reduce((a, b) => a + b);

    GrassStats.firstServeIn = seasonFServeInGrass.reduce((a, b) => a + b);

    GrassStats.firstServePerc = Number(
      (seasonFServeGrassPerc.reduce((a, b) => a + b) / GrassMatches).toFixed(2)
    );
  }

  if (
    seasonSServeGrassTotal.length > 0 &&
    seasonSServeInGrass.length > 0 &&
    seasonSServeGrassPerc.length > 0
  ) {
    GrassStats.secondServeTotal = seasonSServeGrassTotal.reduce(
      (a, b) => a + b
    );

    GrassStats.secondServeIn = seasonSServeInGrass.reduce((a, b) => a + b);

    GrassStats.secondServePerc = Number(
      (seasonSServeGrassPerc.reduce((a, b) => a + b) / GrassMatches).toFixed(2)
    );
  }

  if (
    seasonFServeGrassPointsTotal.length > 0 &&
    seasonFServePointsInGrass.length > 0 &&
    seasonFServePointsGrassPerc.length > 0
  ) {
    GrassStats.firstServePointsTotal = seasonFServeGrassPointsTotal.reduce(
      (a, b) => a + b
    );

    GrassStats.firstServePointsWon = seasonFServePointsInGrass.reduce(
      (a, b) => a + b
    );

    GrassStats.firstServePointsPerc = Number(
      (
        seasonFServePointsGrassPerc.reduce((a, b) => a + b) / GrassMatches
      ).toFixed(2)
    );
  }

  if (
    seasonSServeGrassPointsTotal.length > 0 &&
    seasonSServePointsInGrass.length > 0 &&
    seasonSServePointsGrassPerc.length > 0
  ) {
    GrassStats.secondServePointsTotal = seasonSServeGrassPointsTotal.reduce(
      (a, b) => a + b
    );

    GrassStats.secondServePointsWon = seasonSServePointsInGrass.reduce(
      (a, b) => a + b
    );

    GrassStats.secondServePointsPerc = Number(
      (
        seasonSServePointsGrassPerc.reduce((a, b) => a + b) / GrassMatches
      ).toFixed(2)
    );
  }

  if (
    seasonBreakPointsReceivedTotalGrass.length > 0 &&
    seasonBreakPointsSavedNumGrass.length > 0
  ) {
    GrassStats.breakPointsAgainst = seasonBreakPointsReceivedTotalGrass.reduce(
      (a, b) => a + b
    );

    GrassStats.breakPointsSaved = seasonBreakPointsSavedNumGrass.reduce(
      (a, b) => a + b
    );

    GrassStats.breakPointsSavedPerc = Number(
      (
        (GrassStats.breakPointsSaved / GrassStats.breakPointsAgainst) *
        100
      ).toFixed(2)
    );
  }

  if (seasonTieBreaksGrass.length > 0) {
    GrassStats.tieBreaks = seasonTieBreaksGrass.reduce((a, b) => a + b);
  }

  /////sdds
  const x = {
    hardcourtOutdoorStats: HOStats,
    hardcourtIndoorStats: HIStats,
    redClayStats: ClayStats,
    grassStats: GrassStats,
  };

  console.log('making stats for ' + playerId);

  // console.log(HOStats);
  // console.log(HIStats);
  MongoConnection.close();
};

//// create db files

const CreateDBFiles = async () => {
  let internalFile = [];
  const playersATPSlugs = JSON.parse(
    fs.readFileSync('../slugs/atp-players-slugs.json', 'utf8')
  );

  const playersATP = JSON.parse(
    fs.readFileSync('../json_tennis/atp-players.json', 'utf8')
  );

  playersATP.forEach((player, index, arr) => {
    console.log(
      `Player: ${player.properName} (id: ${player.id}), item ${index} from ${arr.length}`
    );
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
        //// make dir if dir doesn't exist and write file
        console.log(`directory doesn't exist, making dir, writing file`);
        fs.mkdirSync(teamFullPath, { recursive: true });

        const x = {
          ...player,
          ...makePlayerStats(player.id),
          playerSlug: playerSlug,
          dbLocation: `${teamFullPath}/${player.id}.json`,
        };

        internalFile.push(x);
      } else {
        /// just write file
        console.log(`directory EXIST, just writing file`);

        const x = {
          ...player,
          ...makePlayerStats(player.id),
          playerSlug: playerSlug,
          dbLocation: `${teamFullPath}/${player.id}.json`,
        };
        internalFile.push(x);
        fs.writeFileSync(
          `${teamFullPath}/${player.id}.json`,
          JSON.stringify(x, null, 2),
          'utf-8'
        );
      }
    }
  });
  fs.writeFileSync(
    `../json_tennis/internal-players-db.json`,
    JSON.stringify(internalFile, null, 2),
    'utf-8'
  );
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
// makePlayerStats(163504);
// makePlayerStats(136042);

await CreateDBFiles();

// await FetchMatches();

// makeCheckSlugsATP();

// await FetchPlayers();

// AtpH2H(101101, 14486);

// export { AtpH2H };
