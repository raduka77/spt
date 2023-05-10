/// this function generates text for last match for any player

const TextForLastMatch = function (playerData, lastMatch) {
  let lst = {
    lastMatch: '',
    lastMatch_RO: '',
    lastMatch_IT: '',
    lastMatch_ES: '',
    lastMatch_PT: '',
    lastMatch_FR: '',
    lastMatch_DE: '',
    lastMatch_CZ: '',
    lastMatch_PL: '',
  };

  if (lastMatch.walkover) {
    lst.lastMatch = `There are no statistics available for ${playerData.lastName}'s last match since it was a walkover.`;
    lst.lastMatch_RO = `Nu există statistici disponibile pentru ultimul meci al lui ${playerData.lastName}, deoarece a fost un walkover.`;
    lst.lastMatch_IT = `Non ci sono statistiche disponibili per l'ultima partita di ${playerData.lastName} poiché si è trattato di un walkover.`;
    lst.lastMatch_ES = `No hay estadísticas disponibles para el último partido de ${playerData.lastName} ya que fue un walkover.`;
    lst.lastMatch_PT = `Não existem estatísticas disponíveis para o último jogo de ${playerData.lastName}, uma vez que se tratou de um walkover.`;
    lst.lastMatch_FR = `Il n'y a pas de statistiques disponibles pour le dernier match de ${playerData.lastName} car il s'agit d'une victoire walkover.`;
    lst.lastMatch_DE = `Für das letzte Spiel von ${playerData.lastName} sind keine Statistiken verfügbar, da es ein walkover.`;
    lst.lastMatch_CZ = `Pro poslední zápas hráče ${playerData.lastName} nejsou k dispozici žádné statistiky, protože se jednalo o walkover.`;
    lst.lastMatch_PL = `Nie ma dostępnych statystyk dla ostatniego meczu ${playerData.lastName}, ponieważ był to walkower.`;
  }

  if (!lastMatch.walkover) {
    if (lastMatch.won === 'true') {
      lst.lastMatch = `${playerData.properName} secured a victory in her last match on ${lastMatch.date}, defeating ${lastMatch.opponent} with a score of ${lastMatch.score}.`;

      lst.lastMatch_RO = `${playerData.properName} a obținut o victorie în ultimul ei meci, pe data de ${lastMatch.date}, învingând-o pe ${lastMatch.opponent} cu un scor de ${lastMatch.score}.`;

      lst.lastMatch_IT = `${playerData.properName} ha ottenuto una vittoria nella sua ultima partita in ${lastMatch.date}, sconfiggendo ${lastMatch.opponent} con un punteggio di ${lastMatch.score}.`;

      lst.lastMatch_ES = `${playerData.properName} consiguió una victoria en su último partido en ${lastMatch.date}, derrotando a ${lastMatch.opponent} con una puntuación de ${lastMatch.score}.`;

      lst.lastMatch_PT = `${playerData.properName} obteve uma vitória no seu último encontro em ${lastMatch.date}, derrotando ${lastMatch.opponent} com uma pontuação de ${lastMatch.score}.`;

      lst.lastMatch_FR = `${playerData.properName} a remporté une victoire lors de son dernier match le ${lastMatch.date}, en battant ${lastMatch.opponent} avec un score de ${lastMatch.score}.`;

      lst.lastMatch_DE = `${playerData.properName} hat in ihrem letzten Spiel am ${lastMatch.date} einen Sieg errungen, indem sie ${lastMatch.opponent} mit einer Punktzahl von ${lastMatch.score} besiegt hat.`;

      lst.lastMatch_CZ = `${playerData.properName} dosáhla vítězství ve svém posledním zápase dne ${lastMatch.date}, když porazila ${lastMatch.opponent} se skóre ${lastMatch.score}.`;

      lst.lastMatch_PL = `${playerData.properName} zapewniła sobie zwycięstwo w swoim ostatnim meczu w dniu ${lastMatch.date}, pokonując ${lastMatch.opponent} wynikiem ${lastMatch.score}.`;

      if (lastMatch.tournament !== 'n/a') {
        lst.lastMatch =
          lst.lastMatch +
          ` The match was played at the ${lastMatch.tournament} tournament.`;

        lst.lastMatch_RO =
          lst.lastMatch_RO +
          ` Meciul a fost jucat la turneul ${lastMatch.tournament}.`;
        lst.lastMatch_IT =
          lst.lastMatch_IT +
          ` La partita è stata giocata al torneo ${lastMatch.tournament}`;
        lst.lastMatch_ES =
          lst.lastMatch_ES +
          ` El partido se jugó en el torneo ${lastMatch.tournament}.`;
        lst.lastMatch_PT =
          lst.lastMatch_PT +
          ` O jogo foi disputado no torneio ${lastMatch.tournament}`;
        lst.lastMatch_FR =
          lst.lastMatch_FR +
          ` Le match a été joué au tournoi ${lastMatch.tournament}.`;
        lst.lastMatch_DE =
          lst.lastMatch_DE +
          ` Das Spiel wurde beim Turnier ${lastMatch.tournament} ausgetragen`;
        lst.lastMatch_CZ =
          lst.lastMatch_CZ +
          ` Zápas byl odehrán na turnaji ${lastMatch.tournament}`;
        lst.lastMatch_PL =
          lst.lastMatch_PL +
          ` Mecz został rozegrany na turnieju ${lastMatch.tournament}`;
      }
    }

    if (lastMatch.won === 'false') {
      lst.lastMatch = `${playerData.properName} suffered a defeat in her last match on ${lastMatch.date}, against ${lastMatch.opponent} with a score of ${lastMatch.score}.`;

      lst.lastMatch_RO = `${playerData.properName} a suferit o înfrângere în ultimul ei meci, pe data de ${lastMatch.date}, împotriva lui ${lastMatch.opponent} cu un scor de ${lastMatch.score}.`;
      lst.lastMatch_IT = `${playerData.properName} ha subito una sconfitta nella sua ultima partita in ${lastMatch.date}, contro ${lastMatch.opponent} con un punteggio di ${lastMatch.score}.`;
      lst.lastMatch_ES = `${playerData.properName} sufrió una derrota en su último partido el día ${lastMatch.date}, contra ${lastMatch.opponent} con una puntuación de ${lastMatch.score}.`;
      lst.lastMatch_PT = `${playerData.properName} sofreu uma derrota na sua última partida em ${lastMatch.date}, contra ${lastMatch.opponent} com uma pontuação de ${lastMatch.score}.`;
      lst.lastMatch_FR = `${playerData.properName} a subi une défaite lors de son dernier match le ${lastMatch.date}, contre ${lastMatch.opponent} avec un score de ${lastMatch.score}.`;
      lst.lastMatch_DE = `${playerData.properName} erlitt eine Niederlage in ihrem letzten Spiel am ${lastMatch.date}, gegen ${lastMatch.opponent} mit einem Ergebnis von ${lastMatch.score}.`;
      lst.lastMatch_CZ = `${playerData.properName} utrpěl porážku ve svém posledním zápase dne ${lastMatch.date} proti ${lastMatch.opponent} se skóre ${lastMatch.score}.`;
      lst.lastMatch_PL = `${playerData.properName} poniósł porażkę w swoim ostatnim meczu w dniu ${lastMatch.date}, przeciwko ${lastMatch.opponent} z wynikiem ${lastMatch.score}.`;

      if (lastMatch.tournament !== 'n/a') {
        lst.lastMatch =
          lst.lastMatch +
          ` The match was played at the ${lastMatch.tournament} tournament.`;

        lst.lastMatch_RO =
          lst.lastMatch_RO +
          ` Meciul a fost jucat la turneul ${lastMatch.tournament}.`;
        lst.lastMatch_IT =
          lst.lastMatch_IT +
          ` La partita è stata giocata al torneo ${lastMatch.tournament}`;
        lst.lastMatch_ES =
          lst.lastMatch_ES +
          ` El partido se jugó en el torneo ${lastMatch.tournament}.`;
        lst.lastMatch_PT =
          lst.lastMatch_PT +
          ` O jogo foi disputado no torneio ${lastMatch.tournament}`;
        lst.lastMatch_FR =
          lst.lastMatch_FR +
          ` Le match a été joué au tournoi ${lastMatch.tournament}.`;
        lst.lastMatch_DE =
          lst.lastMatch_DE +
          ` Das Spiel wurde beim Turnier ${lastMatch.tournament} ausgetragen`;
        lst.lastMatch_CZ =
          lst.lastMatch_CZ +
          ` Zápas byl odehrán na turnaji ${lastMatch.tournament}`;
        lst.lastMatch_PL =
          lst.lastMatch_PL +
          ` Mecz został rozegrany na turnieju ${lastMatch.tournament}`;
      }
    }
  }

  // console.log(lst);
  return lst;
};

export { TextForLastMatch };
