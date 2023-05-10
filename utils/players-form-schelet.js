import fs from 'fs';
import { DateTime } from 'luxon';
import { default as converter } from 'number-to-words';

const formOfPlayersOnHO = function (match, homeData, awayData) {
  let of = {
    homeForm: '',
    homeForm_RO: '',
    homeForm_IT: '',
    homeForm_ES: '',
    homeForm_PT: '',
    homeForm_FR: '',
    homeForm_DE: '',
    homeForm_CZ: '',
    homeForm_PL: '',
    awayForm: '',
    awayForm_RO: '',
    awayForm_IT: '',
    awayForm_ES: '',
    awayForm_PT: '',
    awayForm_FR: '',
    awayForm_DE: '',
    awayForm_CZ: '',
    awayForm_PL: '',
  };

  if (typeof match.groundType !== 'undefined') {
    if (match.groundType === 'Hardcourt outdoor') {
      const homeFormOnHO = homeData.hardcourtOutdoorStats;
      const awayFormOnHO = awayData.hardcourtOutdoorStats;

      //// begin HOME

      if (homeFormOnHO.totalMatches == 0) {
        of.homeForm = `${homeData.properName} hasn't played any matches on outdoor hard courts yet, so we can't show any statistics at the moment.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (homeFormOnHO.totalMatches >= 1 && homeFormOnHO.totalMatches < 5) {
        // console.log(`win perc ${homeFormOnHO.winPerc}%`);

        of.homeForm = `${
          homeData.properName
        } has only played ${converter.toWords(
          homeFormOnHO.totalMatches
        )} matches on clay this season, which isn't a lot, but we can still extract some statistics from them.`;

        if (homeFormOnHO.winPerc >= 75) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on clay indicates a strong start to the season on this surface. However, it remains to be seen if he can maintain this level of performance as the season progresses.`;
        }

        if (homeFormOnHO.winPerc < 75 && homeFormOnHO.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on clay indicates a promising start to the season on this surface. Nonetheless, the question remains whether he can sustain this level of performance throughout the remainder of the season.`;
        }

        if (homeFormOnHO.winPerc < 50 && homeFormOnHO.winPerc >= 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage of ${homeFormOnHO.winPerc}% on clay suggests a challenging start to the season on this surface. However, the uncertainty still lingers over whether he can recover and showcase a better level of performance in the upcoming matches of the season.`;
        }

        if (homeFormOnHO.winPerc < 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on clay suggests a disappointing start to the season on this surface. In order to improve his results, he needs to step up his game and perform at a higher level.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (homeFormOnHO.totalMatches >= 5) {
        // console.log(`win perc ${homeFormOnHO.winPerc}%`);
        of.homeForm = `In the current season, ${homeData.properName} has played a sufficient number of matches on clay, allowing for a comprehensive analysis of his form on this surface.`;

        if (homeFormOnHO.winPerc >= 80) {
          of.homeForm =
            of.homeForm +
            ` His win rate on clay currently stands at an impressive ${homeFormOnHO.winPerc}%, having emerged victorious in ${homeFormOnHO.won} matches and suffered defeat in ${homeFormOnHO.lost}. This performance can certainly be regarded as excellent.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnHO.titles[0].titleName}).`;
            }

            if (homeFormOnHO.titles.length > 1) {
              let titles = [];

              homeFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 80 && homeFormOnHO.winPerc >= 65) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage on clay stands at ${homeFormOnHO.winPerc}%, indicating a strong overall form on this surface.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnHO.titles[0].titleName}).`;
            }

            if (homeFormOnHO.titles.length > 1) {
              let titles = [];

              homeFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 65 && homeFormOnHO.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current form on clay can be deemed acceptable, though there is certainly room for improvement.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnHO.titles[0].titleName}).`;
            }

            if (homeFormOnHO.titles.length > 1) {
              let titles = [];

              homeFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 50) {
          of.homeForm =
            of.homeForm +
            ` His current form on clay courts is less than ideal, with only a ${homeFormOnHO.winPerc}% win rate in his matches played.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnHO.titles[0].titleName}).`;
            }

            if (homeFormOnHO.titles.length > 1) {
              let titles = [];

              homeFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }
      }

      //// begin AWAY

      if (awayFormOnHO.totalMatches == 0) {
        of.awayForm = `At present, we are unable to display any statistics for ${awayData.properName} as there have been no matches played by him on clay courts thus far.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (awayFormOnHO.totalMatches >= 1 && awayFormOnHO.totalMatches < 5) {
        // console.log(`win perc ${awayFormOnHO.winPerc}%`);

        of.awayForm = `Although there haven't been many matches played by ${
          awayData.properName
        } on clay this season - only ${converter.toWords(
          awayFormOnHO.totalMatches
        )} to be exact - we can still extract some statistics from these matches.`;

        if (awayFormOnHO.winPerc >= 75) {
          of.awayForm =
            of.awayForm +
            ` It appears that ${awayData.lastName} has had a strong start to the season on clay, as indicated by his current win percentage of ${awayFormOnHO.winPerc}%. Nevertheless, it remains to be seen whether he can sustain this level of performance as the season moves forward.`;
        }

        if (awayFormOnHO.winPerc < 75 && awayFormOnHO.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` The present win percentage of ${awayFormOnHO.winPerc}% on clay by ${awayData.lastName} presents a promising start to the season on this surface. Nevertheless, it raises the question of whether he can maintain this level of performance for the rest of the season.`;
        }

        if (awayFormOnHO.winPerc < 50 && awayFormOnHO.winPerc >= 40) {
          of.awayForm =
            of.awayForm +
            ` The win percentage of ${awayFormOnHO.winPerc}% on clay by ${awayData.properName} portrays a tough start to the season on this surface. Nonetheless, there is still uncertainty as to whether he can bounce back and deliver a better performance in the upcoming matches of the season.`;
        }

        if (awayFormOnHO.winPerc < 40) {
          of.awayForm =
            of.awayForm +
            ` It seems that ${awayData.lastName} has had a discouraging start to the season on clay, with a current win percentage of ${awayFormOnHO.winPerc}%. To enhance his results, the player will need to elevate his game.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (awayFormOnHO.totalMatches >= 5) {
        // console.log(`win perc ${awayFormOnHO.winPerc}%`);
        of.awayForm = `During this season, ${awayData.properName} has played an adequate amount of matches on clay, thus enabling a thorough evaluation of his form on this surface.`;

        if (awayFormOnHO.winPerc >= 80) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName} has an impressive win rate of ${
              awayFormOnHO.winPerc
            }% on clay, having won ${converter.toWords(
              awayFormOnHO.won
            )} matches and lost ${converter.toWords(
              awayFormOnHO.lost
            )}. Such a remarkable performance can undoubtedly be viewed as excellent.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a single title on clay this season (${awayFormOnHO.titles[0].titleName}).`;
            }

            if (awayFormOnHO.titles.length > 1) {
              let titles = [];

              awayFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 80 && awayFormOnHO.winPerc >= 65) {
          of.awayForm =
            of.awayForm +
            ` With a current win percentage of ${awayFormOnHO.winPerc}% on clay, ${awayData.properName} has displayed a robust form on this surface overall.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a single title on clay this season (${awayFormOnHO.titles[0].titleName}).`;
            }

            if (awayFormOnHO.titles.length > 1) {
              let titles = [];

              awayFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 65 && awayFormOnHO.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` While ${awayData.lastName}'s current form on clay can be considered satisfactory, there is certainly potential for improvement.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a single title on clay this season (${awayFormOnHO.titles[0].titleName}).`;
            }

            if (awayFormOnHO.titles.length > 1) {
              let titles = [];

              awayFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 50) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName}'s performance on clay courts is suboptimal, with a win rate of only ${awayFormOnHO.winPerc}% in his matches played.`;

          /// check for titles
          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a single title on clay this season (${awayFormOnHO.titles[0].titleName}).`;
            }

            if (awayFormOnHO.titles.length > 1) {
              let titles = [];

              awayFormOnHO.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHO.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;
            }
          }
        }
      }
    }
  }
  return of;
  // console.log(of);
};

export { formOfPlayersOnHO };
