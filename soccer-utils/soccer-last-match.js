import fs from 'fs';
import { MongoConnection, MongoDbName } from './mongo-soccer.js';
import { DateTime } from 'luxon';
import { CalculateEpochDate } from './date-utils.js';

const soccerTeamSlugs = JSON.parse(
  fs.readFileSync(`../json_soccer/internal-teams-db.json`, 'utf8')
);

const GetLastMatch = async teamId => {
  let lastMatchData;
  let lastMatchId;
  let isHomeAway;
  let wonLostDraw;
  let homeScore;
  let awayScore;
  let matchDate;
  let matchLeague;
  let nameOpp;

  let lastM = {
    text: '',
    text_RO: '',
    text_IT: '',
    text_ES: '',
    text_PT: '',
    text_FR: '',
    text_DE: '',
    text_CZ: '',
    text_PL: '',
    goals: '-',
    yellowCards: '-',
    yellowRed: '-',
    redCards: '-',
    ballPosNumb: 0,
    ballPoss: '-',
    dangAttacks: '-',
    shotsOnTarget: '-',
    corners: '-',
  };

  const teamDbLocation = soccerTeamSlugs.find(e => e.id == teamId);

  const teamData = JSON.parse(
    fs.readFileSync(teamDbLocation.dbLocation, 'utf8')
  );

  // console.log(`team is ${teamData.name}`);

  if (typeof teamData.latest !== 'undefined' && teamData.latest.length > 0) {
    lastMatchId = teamData.latest[0].id;
  }
  // console.log(lastMatchId);
  const DbOptions = {
    projection: {
      _id: 0,
      odds: 0,
      lineups: 0,
      tvstations: 0,
    },
  };
  const db = MongoConnection.db(MongoDbName);
  const col = db.collection('matchesCurrSeason');

  await col.find({ id: lastMatchId }, DbOptions).forEach(doc => {
    lastMatchData = doc;
  });

  ////// LAST MATCH LOADED

  // console.log(lastMatchData.name);

  /// set date of last match
  matchDate = await CalculateEpochDate(lastMatchData.starting_at_timestamp);

  /// set match league name
  if (lastMatchData.league.name.includes('Friendlies')) {
    matchLeague = `Club Friendlies`;
  } else {
    matchLeague = lastMatchData.league.name;
  }

  if (
    typeof lastMatchData.participants !== 'undefined' &&
    lastMatchData.participants.length > 0
  ) {
    /// home or away, set opponent name

    if (lastMatchData.participants[0].id == teamId) {
      isHomeAway = lastMatchData.participants[0].meta.location;
      nameOpp = lastMatchData.participants[1].name;
    }

    if (lastMatchData.participants[1].id == teamId) {
      isHomeAway = lastMatchData.participants[1].meta.location;
      nameOpp = lastMatchData.participants[0].name;
    }

    /// WDL?

    /// won, lost?
    if (lastMatchData.participants[0].id == teamId) {
      if (lastMatchData.participants[0].meta.winner) {
        wonLostDraw = 'won';
      }
      if (!lastMatchData.participants[0].meta.winner) {
        wonLostDraw = 'lost';
      }
      if (
        lastMatchData.participants[0].meta.winner === false &&
        lastMatchData.participants[1].meta.winner === false
      ) {
        wonLostDraw = 'draw';
      }
    }
    if (lastMatchData.participants[1].id == teamId) {
      if (lastMatchData.participants[1].meta.winner) {
        wonLostDraw = 'won';
      }
      if (!lastMatchData.participants[1].meta.winner) {
        wonLostDraw = 'lost';
      }
      if (
        lastMatchData.participants[0].meta.winner === false &&
        lastMatchData.participants[1].meta.winner === false
      ) {
        wonLostDraw = 'draw';
      }
    }
  }

  /// get the scores
  lastMatchData.scores.forEach(el => {
    if (el.description === 'CURRENT') {
      if (el.score.participant === 'home') {
        homeScore = el.score.goals;
      }
      if (el.score.participant === 'away') {
        awayScore = el.score.goals;
      }
    }
  });

  /// get goalscorers

  let goalScorers = [];
  let yellow = [];
  let red = [];
  let yellowred = [];

  if (
    typeof lastMatchData.events !== 'undefined' &&
    lastMatchData.events.length > 0
  ) {
    lastMatchData.events.forEach(event => {
      if (event.participant_id == teamId) {
        if (event.type_id == 19) {
          if (event.extra_minute !== null) {
            yellow.push(
              `${event.player_name} ${event.minute}+${event.extra_minute}'`
            );
          } else {
            yellow.push(`${event.player_name} ${event.minute}'`);
          }
        }

        if (event.type_id == 20) {
          if (event.extra_minute !== null) {
            red.push(
              `${event.player_name} ${event.minute}+${event.extra_minute}'`
            );
          } else {
            red.push(`${event.player_name} ${event.minute}'`);
          }
        }

        if (event.type_id == 21) {
          if (event.extra_minute !== null) {
            yellowred.push(
              `${event.player_name} ${event.minute}+${event.extra_minute}'`
            );
          } else {
            yellowred.push(`${event.player_name} ${event.minute}'`);
          }
        }
      }
    });
  }

  if (isHomeAway === 'home' && homeScore > 0) {
    if (
      typeof lastMatchData.events !== 'undefined' &&
      lastMatchData.events.length > 0
    ) {
      lastMatchData.events.forEach(event => {
        if (event.participant_id == teamId) {
          if (event.type_id == 14) {
            if (event.extra_minute !== null) {
              goalScorers.push(
                `${event.player_name} ${event.minute}+${event.extra_minute}'`
              );
            } else {
              goalScorers.push(`${event.player_name} ${event.minute}'`);
            }
          }

          if (event.type_id == 15) {
            if (event.extra_minute !== null) {
              goalScorers.push(
                `${event.player_name} (OG) ${event.minute}+${event.extra_minute}'`
              );
            } else {
              goalScorers.push(`${event.player_name} (OG) ${event.minute}'`);
            }
          }

          if (event.type_id == 16) {
            if (event.extra_minute !== null) {
              goalScorers.push(
                `${event.player_name} (PEN) ${event.minute}+${event.extra_minute}'`
              );
            } else {
              goalScorers.push(`${event.player_name} (PEN) ${event.minute}'`);
            }
          }
        }
      });
    }
  }

  if (isHomeAway === 'away' && awayScore > 0) {
    if (
      typeof lastMatchData.events !== 'undefined' &&
      lastMatchData.events.length > 0
    ) {
      lastMatchData.events.forEach(event => {
        if (event.participant_id == teamId) {
          if (event.type_id == 14) {
            goalScorers.push(`${event.player_name} ${event.minute}'`);
          }

          if (event.type_id == 15) {
            goalScorers.push(`${event.player_name} (OG) ${event.minute}'`);
          }

          if (event.type_id == 16) {
            goalScorers.push(`${event.player_name} (PEN) ${event.minute}'`);
          }
        }
      });
    }
  }
  lastM.goals = goalScorers.join(', ');
  lastM.yellowCards = yellow.join(', ');
  lastM.redCards = red.join(', ');
  lastM.yellowRed = yellowred.join(', ');
  //// get the stats

  // ballPoss: '-', 45
  // dangAttacks: '-', 44
  // shotsOnTarget: '-', 86
  // corners: '-', 34

  if (
    typeof lastMatchData.statistics !== 'undefined' &&
    lastMatchData.statistics.length > 0
  ) {
    lastMatchData.statistics.forEach(el => {
      if (el.participant_id == teamId) {
        if (el.type_id == 45) {
          lastM.ballPosNumb = el.data.value;
          lastM.ballPoss = `${el.data.value}%`;
        }
        if (el.type_id == 44) {
          lastM.dangAttacks = `${el.data.value}`;
        }

        if (el.type_id == 86) {
          lastM.shotsOnTarget = `${el.data.value}`;
        }
        if (el.type_id == 34) {
          lastM.corners = `${el.data.value}`;
        }
      }
    });
  }

  if (isHomeAway === 'home') {
    if (wonLostDraw === 'won') {
      lastM.text = `The last match for ${teamData.name} was a home win against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o victorie pe teren propriu împotriva lui ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata una vittoria in casa contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue una victoria en casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `A última partida do ${teamData.name} foi uma vitória em casa contra o ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} a été une victoire à domicile contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war ein Heimsieg gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} ausgetragen. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `V posledním zápase ${teamData.name} zvítězil doma nad ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se odehrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `${teamData.name} poprzedni mecz był wygrany u siebie przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }

    if (wonLostDraw === 'lost') {
      lastM.text = `The last match for ${teamData.name} was a home loss against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o înfrângere pe teren propriu cu ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata una sconfitta in casa contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue una derrota en casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `O último jogo do ${teamData.name} foi uma derrota em casa contra o ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} a été une défaite à domicile contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war eine Heimniederlage gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} ausgetragen. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `V posledním zápase tým ${teamData.name} prohrál doma s týmem ${nameOpp}. Zápas ${lastMatchData.name} (${homeScore}-${awayScore}) se hrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `${teamData.name} poprzedni mecz był przegrany u siebie przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }

    if (wonLostDraw === 'draw') {
      lastM.text = `The last match for ${teamData.name} was a home draw against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o remiză pe teren propriu cu ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata un pareggio in casa contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue un empate en casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `O último jogo de ${teamData.name} foi um empate em casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} a été un match nul à domicile contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war ein Unentschieden gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} bestritten. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `Posledním zápasem týmu ${teamData.name} byla domácí remíza proti ${nameOpp}. Zápas ${lastMatchData.name} (${homeScore}-${awayScore}) se hrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `${teamData.name} poprzedni mecz był remisem u siebie przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }
  }

  if (isHomeAway === 'away') {
    if (wonLostDraw === 'won') {
      lastM.text = `The last match for ${teamData.name} was an away win against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o victorie în deplasare împotriva lui ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata una vittoria in trasferta contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue una victoria como visitante contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `O último jogo de ${teamData.name} foi uma vitória fora contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} a été une victoire à l'extérieur contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war ein Auswärtssieg gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} bestritten. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `Posledním zápasem týmu ${teamData.name} byla výhra venku proti ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se odehrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `${teamData.name} poprzedni mecz był wygrany na wyjeździe przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }

    if (wonLostDraw === 'lost') {
      lastM.text = `The last match for ${teamData.name} was an away loss against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o înfrângere în deplasare împotriva lui ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata una sconfitta in trasferta contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue una derrota fuera de casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `O último jogo de ${teamData.name} foi uma derrota fora contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} a été une défaite à l'extérieur contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war eine Auswärtsniederlage gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} ausgetragen. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `Posledním zápasem týmu ${teamData.name} byla prohra venku proti ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se odehrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `${teamData.name} poprzedni mecz był przegrany na wyjeździe przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }

    if (wonLostDraw === 'draw') {
      lastM.text = `The last match for ${teamData.name} was an away draw against ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) was contested in the ${matchLeague} on ${matchDate}. Here are some statistics from the last match.`;

      lastM.text_RO = `Ultimul meci pentru ${teamData.name} a fost o remiză în deplasare cu ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) s-a disputat în ${matchLeague} pe data de ${matchDate}. Iată câteva statistici de la ultimul meci.`;

      lastM.text_IT = `L'ultima partita di ${teamData.name} è stata un pareggio in trasferta contro ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) è stata disputata nella ${matchLeague} il ${matchDate}. Ecco alcune statistiche dell'ultima partita.`;

      lastM.text_ES = `El último partido de ${teamData.name} fue un empate fuera de casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) se disputó en la ${matchLeague} el ${matchDate}. Estas son algunas estadísticas del último partido.`;

      lastM.text_PT = `O último jogo de ${teamData.name} foi um empate fora de casa contra ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) foi disputado na ${matchLeague} em ${matchDate}. Aqui estão algumas estatísticas do último jogo.`;

      lastM.text_FR = `Le dernier match de ${teamData.name} était un match nul à l'extérieur contre ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) a été disputé dans ${matchLeague} le ${matchDate}. Voici quelques statistiques du dernier match.`;

      lastM.text_DE = `Das letzte Spiel von ${teamData.name} war ein Unentschieden auswärts gegen ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) wurde in der ${matchLeague} am ${matchDate} ausgetragen. Hier sind einige Statistiken aus dem letzten Spiel.`;

      lastM.text_CZ = `Posledním zápasem týmu ${teamData.name} byla venkovní remíza proti ${nameOpp}. Zápas ${lastMatchData.name} (${homeScore}-${awayScore}) se hrál v ${matchLeague} dne ${matchDate}. Zde jsou statistiky z posledního zápasu.`;

      lastM.text_PL = `Ostatni mecz dla ${teamData.name} był wyjazdowy remis przeciwko ${nameOpp}. ${lastMatchData.name} (${homeScore}-${awayScore}) rozegrano w ${matchLeague} dnia ${matchDate}. Oto kilka statystyk z ostatniego meczu.`;
    }
  }

  // console.log(lastM);
};

// await GetLastMatch(20);

export { GetLastMatch };
