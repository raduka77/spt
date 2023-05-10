'use strict';

const predictionByOdds = function (match, homeData, awayData) {
  let pbo = {
    homePerc: 0,
    awayPerc: 0,
    homeOddsWin: 0,
    awayOddsWin: 0,
    byOdds: '',
    byOdds_RO: '',
    byOdds_IT: '',
    byOdds_ES: '',
    byOdds_PT: '',
    byOdds_FR: '',
    byOdds_DE: '',
    byOdds_CZ: '',
    byOdds_PL: '',
  };

  //// internal
  let w = {
    oddsDiffW: 0,
    oddsDiffSet1: 0,
    wHomeOdds: 0,
    wAwayOdds: 0,
    set1HomeOdds: 0,
    set2AwayOdds: 0,
  };

  if (
    typeof match.matchOdds !== 'undefined' &&
    match.matchOdds !== null &&
    match.matchOdds.length > 0
  ) {
    match.matchOdds.forEach(el => {
      if (el.marketName === 'Full time' && el.choices.length > 0) {
        el.choices.forEach(value => {
          if (value.name === '1') {
            w.wHomeOdds = value.fractionalValue;
          }
          if (value.name === '2') {
            w.wAwayOdds = value.fractionalValue;
          }
        });
        /// exit the loop and calculate

        w.oddsDiffW = Math.abs(w.wHomeOdds - w.wAwayOdds);
      }

      if (el.marketName === 'First set winner' && el.choices.length > 0) {
        el.choices.forEach(value => {
          if (value.name === '1') {
            w.set1HomeOdds = value.fractionalValue;
          }
          if (value.name === '2') {
            w.set2AwayOdds = value.fractionalValue;
          }
        });
        /// exit the loop and calculate

        w.oddsDiffSet1 = Math.abs(w.set1HomeOdds - w.set2AwayOdds);
      }
    });

    /// if we have values for first market
    if (w.wHomeOdds > 0 && w.wAwayOdds > 0) {
      pbo.homeOddsWin = w.wHomeOdds;
      pbo.awayOddsWin = w.wAwayOdds;

      pbo.homePerc = Math.round((1 / w.wHomeOdds) * 100);
      // console.log('home perc: ' + pbo.homePerc + '%');

      pbo.awayPerc = Math.round((1 / w.wAwayOdds) * 100);
      // console.log('away perc: ' + pbo.awayPerc + '%');

      if (w.wHomeOdds === w.wAwayOdds) {
        pbo.byOdds = `This is a tough one to predict - both opponents are in a weird spot where they've got an equal shot at taking the win.`;
        pbo.byOdds_RO = `Acesta este un meci greu de pronosticat - ambii adversari se află într-o situație ciudată în care au șanse egale de a obține victoria.`;
        pbo.byOdds_IT = `Si tratta di una partita difficile da pronosticare: entrambi gli avversari si trovano in una situazione strana, in cui hanno le stesse possibilità di vincere.`;
        pbo.byOdds_ES = `Se trata de un partido difícil de predecir, ya que ambos contrincantes se encuentran en una extraña situación en la que tienen las mismas posibilidades de hacerse con la victoria.`;
        pbo.byOdds_PT = `Este é um jogo difícil de prever - ambos os adversários estão numa situação estranha em que têm as mesmas hipóteses de vencer.`;
        pbo.byOdds_FR = `Il est difficile de faire un pronostic : les deux adversaires sont dans une situation étrange où ils ont des chances égales de remporter la victoire.`;
        pbo.byOdds_DE = `Das ist schwer vorherzusagen - beide Gegner befinden sich in einer merkwürdigen Situation, in der sie die gleiche Chance auf den Sieg haben.`;
        pbo.byOdds_CZ = `Tento zápas je těžké předpovědět - oba soupeři jsou ve zvláštní situaci, kdy mají stejnou šanci na vítězství.`;
        pbo.byOdds_PL = `Ciężko przewidzieć ten mecz - obaj przeciwnicy są w dziwnym miejscu, gdzie mają równe szanse na zwycięstwo.`;
      }

      //// home is favourite
      if (w.wHomeOdds < w.wAwayOdds && w.oddsDiffW <= 0.3) {
        pbo.byOdds = `This match is a tough one to call. The odds are slightly in favor of ${homeData.properName}, but it's important to look at more statistics before making a prediction.`;
        pbo.byOdds_RO = `Acest meci este unul greu de pronosticat. Șansele sunt ușor în favoarea lui ${homeData.properName}, dar este important să analizăm mai multe statistici înainte de a face un pronostic.`;
        pbo.byOdds_IT = `Questa partita è difficile da definire. Le quote sono leggermente a favore di ${homeData.properName}, ma è importante esaminare altre statistiche prima di fare un pronostico.`;
        pbo.byOdds_ES = `Este partido es difícil de pronosticar. Las probabilidades están ligeramente a favor de ${homeData.properName}, pero es importante mirar más estadísticas antes de hacer una predicción.`;
        pbo.byOdds_PT = `Este jogo é difícil de prever. As probabilidades estão ligeiramente a favor de ${homeData.properName}, mas é importante analisar mais estatísticas antes de fazer uma previsão.`;
        pbo.byOdds_FR = `Ce match est difficile à pronostiquer. Les chances sont légèrement en faveur de ${homeData.properName}, mais il est important d'examiner d'autres statistiques avant de faire un pronostic.`;
        pbo.byOdds_DE = `Dieses Spiel ist schwer zu tippen. Die Quoten sind leicht zugunsten von ${homeData.properName}, aber es ist wichtig, sich mehr Statistiken anzusehen, bevor man eine Vorhersage trifft.`;
        pbo.byOdds_CZ = `Tento zápas je těžké rozhodnout. Kurz je mírně ve prospěch ${homeData.properName}, ale před stanovením předpovědi je důležité podívat se na další statistiky.`;
        pbo.byOdds_PL = `Ten mecz jest trudny do nazwania. Kursy są lekko na korzyść ${homeData.properName}, ale ważne jest, aby spojrzeć na więcej statystyk przed dokonaniem prognozy.`;
      }

      if (
        w.wHomeOdds < w.wAwayOdds &&
        w.oddsDiffW > 0.3 &&
        w.oddsDiffW <= 0.75
      ) {
        pbo.byOdds = `It looks like ${homeData.properName} is the favorite to win, but it's not by a large margin. His chances are still very slim, and anything can happen during the match.`;
        pbo.byOdds_RO = `Se pare că ${homeData.properName} este favorit să câștige, dar nu cu o marjă mare. Șansele sale sunt încă foarte mici, iar în timpul meciului se poate întâmpla orice.`;
        pbo.byOdds_IT = `Sembra che ${homeData.properName} sia il favorito per la vittoria, ma non con un ampio margine. Le sue possibilità sono ancora molto scarse e durante la partita può succedere di tutto.`;
        pbo.byOdds_ES = `Parece que ${homeData.properName} es el favorito para ganar, pero no por un gran margen. Sus posibilidades siguen siendo muy escasas, y puede pasar cualquier cosa durante el partido.`;
        pbo.byOdds_PT = `Parece que ${homeData.properName} é o favorito para ganhar, mas não é por uma grande margem. As hipóteses dele ainda são muito reduzidas e tudo pode acontecer durante o jogo.`;
        pbo.byOdds_FR = `Il semble que ${homeData.properName} soit le favori, mais pas avec une grande marge. Ses chances sont encore très minces et tout peut arriver pendant le match.`;
        pbo.byOdds_DE = `Es sieht so aus, als ob ${homeData.properName} der Favorit auf den Sieg ist, aber nicht mit großem Vorsprung. Seine Chancen sind immer noch sehr gering, und während des Spiels kann alles passieren.`;
        pbo.byOdds_CZ = `Vypadá to, že ${homeData.properName} je favoritem na vítězství, ale není to s velkým náskokem. Jeho šance jsou stále velmi malé a během zápasu se může stát cokoli.`;
        pbo.byOdds_PL = `Wygląda na to, że ${homeData.properName} jest faworytem do zwycięstwa, ale nie jest nim z dużym marginesem. Jego szanse są wciąż bardzo nikłe, a w trakcie meczu wszystko może się zdarzyć.`;
      }

      if (w.wHomeOdds < w.wAwayOdds && w.oddsDiffW > 0.75 && w.oddsDiffW <= 1) {
        pbo.byOdds = `Based on the statistics, it looks like ${homeData.properName} is the one who has a better chance of winning this match. However, it's still a close call and anything could happen.`;
        pbo.byOdds_RO = `Pe baza statisticilor, se pare că ${homeData.properName} este cel care are mai multe șanse de a câștiga acest meci. Cu toate acestea, este încă la limită și se poate întâmpla orice.`;
        pbo.byOdds_IT = `In base alle statistiche, sembra che ${homeData.properName} sia quello che ha più possibilità di vincere questa partita. Tuttavia, si tratta ancora di una partita combattuta e tutto potrebbe accadere.`;
        pbo.byOdds_ES = `Según las estadísticas, parece que ${homeData.properName} es quien tiene más posibilidades de ganar este partido. Sin embargo, aún está muy reñido y podría pasar cualquier cosa.`;
        pbo.byOdds_PT = `Com base nas estatísticas, parece que ${homeData.properName} é quem tem mais hipóteses de ganhar este jogo. No entanto, continua a ser um jogo renhido e tudo pode acontecer.`;
        pbo.byOdds_FR = `D'après les statistiques, il semble que ${homeData.properName} soit celui qui a le plus de chances de remporter ce match. Cependant, il s'agit encore d'un match serré et tout peut arriver.`;
        pbo.byOdds_DE = `Anhand der Statistiken sieht es so aus, als ob ${homeData.properName} derjenige ist, der die besseren Chancen hat, dieses Spiel zu gewinnen. Allerdings ist es immer noch eine knappe Angelegenheit, bei der alles passieren kann.`;
        pbo.byOdds_CZ = `Na základě statistik to vypadá, že ${homeData.properName} je ten, kdo má větší šanci na výhru v tomto zápase. Stále je to však těsné a může se stát cokoli.`;
        pbo.byOdds_PL = `Na podstawie statystyk wygląda na to, że ${homeData.properName} jest tym, który ma większe szanse na wygranie tego meczu. Jednak nadal jest to wyrównana walka i wszystko może się zdarzyć.`;
      }

      if (w.wHomeOdds < w.wAwayOdds && w.oddsDiffW > 1 && w.oddsDiffW <= 1.5) {
        pbo.byOdds = `It looks like ${homeData.lastName} has a higher chance of winning this match. However, to make an accurate prediction, other factors such as previous head-to-head matches, the player's ranking position, and their form this season should also be taken into account.`;

        pbo.byOdds_RO = `Se pare că ${homeData.lastName} are o șansă mai mare de a câștiga acest meci. Cu toate acestea, pentru a face o predicție precisă, trebuie luați în considerare și alți factori, cum ar fi meciurile directe anterioare, poziția jucătorului în clasament și forma sa din acest sezon.`;
        pbo.byOdds_IT = `Sembra che ${homeData.lastName} abbia maggiori possibilità di vincere questa partita. Tuttavia, per fare un pronostico accurato, è necessario prendere in considerazione anche altri fattori come i precedenti testa a testa, la posizione in classifica del giocatore e la sua forma in questa stagione.`;
        pbo.byOdds_ES = `Parece que ${homeData.lastName} tiene más posibilidades de ganar este partido. Sin embargo, para realizar una predicción precisa, también deben tenerse en cuenta otros factores, como los enfrentamientos directos anteriores, la posición en el ranking del jugador y su estado de forma esta temporada.`;
        pbo.byOdds_PT = `Parece que ${homeData.lastName} tem mais hipóteses de ganhar este jogo. No entanto, para fazer uma previsão exacta, também devem ser tidos em conta outros factores, como os confrontos directos anteriores, a posição do jogador no ranking e a sua forma nesta época.`;
        pbo.byOdds_FR = `Il semble que ${homeData.lastName} ait plus de chances de gagner ce match. Cependant, pour faire un pronostic précis, d'autres facteurs tels que les précédents face-à-face, la position du joueur au classement et sa forme cette saison doivent également être pris en compte.`;
        pbo.byOdds_DE = `Es sieht so aus, als hätte ${homeData.lastName} eine höhere Chance, dieses Spiel zu gewinnen. Um eine genaue Vorhersage zu treffen, sollten jedoch auch andere Faktoren wie frühere Kopf-an-Kopf-Matches, die Position des Spielers in der Rangliste und seine Form in dieser Saison in Betracht gezogen werden.`;
        pbo.byOdds_CZ = `Vypadá to, že ${homeData.lastName} má vyšší šanci na výhru v tomto zápase. Pro přesnou předpověď je však třeba vzít v úvahu i další faktory, jako jsou předchozí vzájemné zápasy, postavení hráče na žebříčku a jeho forma v této sezóně.`;
        pbo.byOdds_PL = `Wygląda na to, że ${homeData.lastName} ma większe szanse na wygranie tego meczu. Jednak, aby dokonać dokładnej prognozy, należy wziąć pod uwagę również inne czynniki, takie jak poprzednie mecze head-to-head, pozycję gracza w rankingu oraz jego formę w tym sezonie.`;
      }

      if (w.wHomeOdds < w.wAwayOdds && w.oddsDiffW > 1.5) {
        pbo.byOdds = `This match seems to have a clear favorite - ${homeData.properName}. The odds of ${awayData.lastName} coming out on top are pretty low.`;
        pbo.byOdds_RO = `Acest meci pare să aibă un favorit clar - ${homeData.properName}. Șansele ca ${awayData.lastName} să iasă învingător sunt destul de mici.`;
        pbo.byOdds_IT = `Questa partita sembra avere un chiaro favorito: ${homeData.properName}. Le probabilità che ${awayData.lastName} esca vincitore sono piuttosto basse.`;
        pbo.byOdds_ES = `Este partido parece tener un claro favorito: ${homeData.properName}. Las probabilidades de que ${awayData.lastName} salga vencedor son bastante bajas.`;
        pbo.byOdds_PT = `Esta partida parece ter um claro favorito - ${homeData.properName}. As probabilidades de ${awayData.lastName} sair vencedor são bastante baixas.`;
        pbo.byOdds_FR = `Ce match semble avoir un grand favori - ${homeData.properName}. Les chances que ${awayData.lastName} l'emporte sont assez faibles.`;
        pbo.byOdds_DE = `Dieses Spiel scheint einen klaren Favoriten zu haben - ${homeData.properName}. Die Wahrscheinlichkeit, dass ${awayData.lastName} als Sieger hervorgeht, ist ziemlich gering.`;
        pbo.byOdds_CZ = `Tato shoda má zřejmě jasného favorita - ${homeData.properName}. Šance, že se ${awayData.lastName} dostane na vrchol, je poměrně nízká.`;
        pbo.byOdds_PL = `Ten mecz wydaje się mieć wyraźnego faworyta - ${homeData.properName}. Szanse na to, że ${awayData.lastName} wyjdzie na wierzch są dość niskie.`;
      }

      /// if away is favourite

      if (w.wHomeOdds > w.wAwayOdds && w.oddsDiffW <= 0.3) {
        pbo.byOdds = `This game is quite difficult to predict. The chances seem to lean a little towards ${awayData.properName}, but it's crucial to analyze additional data before placing a bet.`;
        pbo.byOdds_RO = `Acest meci este destul de greu de prezis. Șansele par să încline puțin spre ${awayData.properName}, dar este esențial să analizăm datele suplimentare înainte de a plasa un pariu.`;
        pbo.byOdds_IT = `Questa partita è piuttosto difficile da prevedere. Le probabilità sembrano propendere per ${awayData.properName}, ma è fondamentale analizzare altri dati prima di piazzare una scommessa.`;
        pbo.byOdds_ES = `Este partido es bastante difícil de predecir. Las probabilidades parecen inclinarse un poco hacia ${awayData.properName}, pero es crucial analizar datos adicionales antes de realizar una apuesta.`;
        pbo.byOdds_PT = `Este jogo é bastante difícil de prever. As hipóteses parecem inclinar-se um pouco para ${awayData.properName}, mas é crucial analisar os dados adicionais antes de fazer uma aposta.`;
        pbo.byOdds_FR = `Ce match est assez difficile à pronostiquer. Les chances semblent pencher en faveur de ${awayData.properName}, mais il est crucial d'analyser des données supplémentaires avant de placer un pari.`;
        pbo.byOdds_DE = `Dieses Spiel ist ziemlich schwer vorherzusagen. Die Chancen scheinen ein wenig in Richtung ${awayData.properName} zu tendieren, aber es ist wichtig, zusätzliche Daten zu analysieren, bevor man eine Wette platziert.`;
        pbo.byOdds_CZ = `Tento zápas je poměrně obtížné předvídat. Zdá se, že šance se trochu přiklánějí na stranu ${awayData.properName}, ale před uzavřením sázky je nezbytné analyzovat další údaje.`;
        pbo.byOdds_PL = `Ten mecz jest dość trudny do przewidzenia. Szanse wydają się przechylać nieco w stronę ${awayData.properName}, ale kluczowa jest analiza dodatkowych danych przed postawieniem zakładu.`;
      }

      if (
        w.wHomeOdds > w.wAwayOdds &&
        w.oddsDiffW > 0.3 &&
        w.oddsDiffW <= 0.75
      ) {
        pbo.byOdds = `Based on current indicators, ${awayData.properName} is being regarded as the winner for this match, although the lead isn't by a significant amount. Nonetheless, it's important to note that his chances of winning are quite narrow, and the outcome of the match is still very uncertain.`;
        pbo.byOdds_RO = `Pe baza indicatorilor actuali, ${awayData.properName} este considerat câștigător în acest meci, deși avansul nu este semnificativ. Cu toate acestea, este important de reținut că șansele sale de câștig sunt destul de mici, iar rezultatul meciului este încă incert.`;
        pbo.byOdds_IT = `In base agli indicatori attuali, ${awayData.properName} viene considerato il vincitore di questa partita, anche se il vantaggio non è significativo. Tuttavia, è importante notare che le sue possibilità di vittoria sono piuttosto ridotte e l'esito della partita è ancora molto incerto.`;
        pbo.byOdds_ES = `Según los indicadores actuales, ${awayData.properName} se considera ganador de este partido, aunque la ventaja no es significativa. No obstante, es importante tener en cuenta que sus posibilidades de ganar son bastante reducidas, y el resultado del partido es aún muy incierto.`;
        pbo.byOdds_PT = `Com base nos indicadores actuais, ${awayData.properName} está a ser considerado como o vencedor desta partida, embora a vantagem não seja significativa. No entanto, é importante notar que as suas hipóteses de ganhar são bastante reduzidas e o resultado da partida ainda é muito incerto.`;
        pbo.byOdds_FR = `Sur la base des indicateurs actuels, ${awayData.properName} est considéré comme le vainqueur de ce match, bien que son avance ne soit pas significative. Néanmoins, il est important de noter que ses chances de gagner sont assez faibles, et que l'issue du match est encore très incertaine.`;
        pbo.byOdds_DE = `Nach den aktuellen Indikatoren wird ${awayData.properName} als Gewinner dieses Spiels angesehen, obwohl der Vorsprung nicht sehr groß ist. Nichtsdestotrotz ist es wichtig zu beachten, dass seine Gewinnchancen recht gering sind und der Ausgang des Spiels noch sehr unsicher ist.`;
        pbo.byOdds_CZ = `Podle aktuálních ukazatelů je ${awayData.properName} považován za vítěze tohoto zápasu, i když jeho náskok není nijak výrazný. Přesto je důležité poznamenat, že jeho šance na výhru jsou poměrně malé a výsledek zápasu je stále velmi nejistý.`;
        pbo.byOdds_PL = `Na podstawie obecnych wskaźników, ${awayData.properName}jest uważany za zwycięzcę tego meczu, chociaż przewaga nie jest znacząca. Niemniej jednak, należy zauważyć, że jego szanse na wygraną są dość wąskie, a wynik meczu jest wciąż bardzo niepewny.`;
      }

      if (w.wHomeOdds > w.wAwayOdds && w.oddsDiffW > 0.75 && w.oddsDiffW <= 1) {
        pbo.byOdds = `According to the stats, ${awayData.properName} has a slight edge in this match. However, it's still too close to call, and anything could happen.`;
        pbo.byOdds_RO = `Conform statisticilor, ${awayData.properName} are un ușor avantaj în acest meci. Cu toate acestea, este încă prea strâns pentru a fi stabilit clar, iar orice se poate întâmpla.`;
        pbo.byOdds_IT = `Secondo le statistiche, ${awayData.properName} ha un leggero vantaggio in questa partita. Tuttavia, è ancora troppo vicino per essere definito e tutto potrebbe accadere.`;
        pbo.byOdds_ES = `Según las estadísticas, ${awayData.properName} tiene una ligera ventaja en este partido. Sin embargo, aún está muy reñido y podría pasar cualquier cosa.`;
        pbo.byOdds_PT = `De acordo com as estatísticas, ${awayData.properName} tem uma ligeira vantagem neste jogo. No entanto, ainda está muito perto de ser decidido e tudo pode acontecer.`;
        pbo.byOdds_FR = `D'après les statistiques, ${awayData.properName} a un léger avantage dans ce match. Cependant, il est encore trop tôt pour se prononcer, et tout peut arriver.`;
        pbo.byOdds_DE = `Den Statistiken zufolge hat ${awayData.properName} einen leichten Vorteil in diesem Spiel. Allerdings ist es noch zu knapp, um es zu entscheiden, und alles könnte passieren.`;
        pbo.byOdds_CZ = `Podle statistik má ${awayData.properName} v tomto zápase mírnou výhodu. Stále je to však příliš těsné a může se stát cokoli.`;
        pbo.byOdds_PL = `Według statystyk, ${awayData.properName} ma w tym meczu lekką przewagę. Jednak wciąż jest zbyt blisko, aby zadzwonić i wszystko może się zdarzyć.`;
      }

      if (w.wHomeOdds > w.wAwayOdds && w.oddsDiffW > 1 && w.oddsDiffW <= 1.5) {
        pbo.byOdds = `Seems like ${awayData.lastName} is in a good spot to win this match, but there are more things to consider before making a prediction. Checking their past encounters, their position in the ranking, and their performance this season would give a more accurate forecast.`;

        pbo.byOdds_RO = `Se pare că ${awayData.lastName} este într-o poziție bună pentru a câștiga acest meci, dar sunt mai multe lucruri de luat în considerare înainte de a face o predicție. Verificarea întâlnirilor anterioare, a poziției lor în clasament și a performanțelor lor din acest sezon ar oferi o prognoză mai precisă.`;
        pbo.byOdds_IT = `Sembra che ${awayData.lastName} sia in una buona posizione per vincere questa partita, ma ci sono più cose da considerare prima di fare un pronostico. Controllando i loro incontri passati, la loro posizione in classifica e le loro prestazioni in questa stagione si potrebbe avere un pronostico più preciso.`;
        pbo.byOdds_ES = `Parece que ${awayData.lastName} está en una buena posición para ganar este partido, pero hay más cosas a tener en cuenta antes de hacer un pronóstico. Comprobar sus enfrentamientos anteriores, su posición en la clasificación y su rendimiento esta temporada daría un pronóstico más preciso.`;
        pbo.byOdds_PT = `Parece que o ${awayData.lastName} está numa boa posição para ganhar este jogo, mas há mais coisas a considerar antes de fazer uma previsão. Verificar os seus encontros anteriores, a sua posição na classificação e o seu desempenho esta época daria uma previsão mais exacta.`;
        pbo.byOdds_FR = `Il semble que ${awayData.lastName} soit en bonne position pour remporter ce match, mais il y a d'autres éléments à prendre en compte avant de faire un pronostic. La vérification des rencontres précédentes, de leur position au classement et de leurs performances cette saison permettrait d'établir un pronostic plus précis.`;
        pbo.byOdds_DE = `Es sieht so aus, als ob ${awayData.lastName} in einer guten Position ist, um dieses Spiel zu gewinnen, aber es gibt noch mehr Dinge zu beachten, bevor man eine Vorhersage macht. Ein Blick auf die vergangenen Begegnungen, die Position in der Rangliste und die Leistung in dieser Saison würde eine genauere Prognose ermöglichen.`;
        pbo.byOdds_CZ = `Zdá se, že ${awayData.lastName} má dobré předpoklady k tomu, aby tento zápas vyhrál, ale před stanovením předpovědi je třeba zvážit více věcí. Přesnější předpověď by poskytla kontrola jejich předchozích střetnutí, jejich postavení v žebříčku a jejich výkonů v této sezóně.`;
        pbo.byOdds_PL = `Wydaje się, że ${awayData.lastName} jest w dobrej sytuacji, aby wygrać ten mecz, ale jest więcej rzeczy do rozważenia przed dokonaniem prognozy. Sprawdzenie ich poprzednich spotkań, pozycji w rankingu oraz wyników w tym sezonie dałoby dokładniejszą prognozę.`;
      }

      if (w.wHomeOdds > w.wAwayOdds && w.oddsDiffW > 1.5) {
        pbo.byOdds = `It looks like ${awayData.properName} is the clear favorite in this match, with ${homeData.lastName} having slim chances of winning.`;

        pbo.byOdds_RO = `Se pare că ${awayData.properName} este favorit clar în acest meci, ${homeData.lastName} având șanse mici de câștig.`;
        pbo.byOdds_IT = `Sembra che ${awayData.properName} sia il chiaro favorito in questa partita, mentre ${homeData.lastName} ha poche possibilità di vincere.`;
        pbo.byOdds_ES = `Parece que ${awayData.properName} es el claro favorito en este partido, y que ${homeData.lastName} tiene pocas posibilidades de ganar.`;
        pbo.byOdds_PT = `Parece que ${awayData.properName} é o claro favorito neste jogo, com ${homeData.lastName} a ter poucas hipóteses de ganhar.`;
        pbo.byOdds_FR = `Il semble que ${awayData.properName} soit le grand favori de ce match et que ${homeData.lastName} ait peu de chances de l'emporter.`;
        pbo.byOdds_DE = `Es sieht so aus, als ob ${awayData.properName} der klare Favorit in diesem Spiel ist, während ${homeData.lastName} nur geringe Gewinnchancen hat.`;
        pbo.byOdds_CZ = `Vypadá to, že ${awayData.properName} je v tomto zápase jasným favoritem a ${homeData.lastName} má jen malé šance na výhru.`;
        pbo.byOdds_PL = `Wygląda na to, że ${awayData.properName} jest zdecydowanym faworytem w tym meczu, a ${homeData.lastName} ma nikłe szanse na zwycięstwo.`;
      }

      /// first set winner

      if (w.set1HomeOdds > 0 && w.set2AwayOdds > 0) {
        if (w.set1HomeOdds === w.set2AwayOdds) {
          pbo.byOdds =
            pbo.byOdds +
            ` Making a prediction about who will win the first set is a tough call since both players have an equal shot at it.`;
          pbo.byOdds_RO =
            pbo.byOdds_RO +
            ` Este greu de făcut un pronostic cu privire la cine va câștiga primul set, deoarece ambii jucători au șanse egale.`;
          pbo.byOdds_IT =
            pbo.byOdds_IT +
            ` Fare un pronostico su chi vincerà il primo set è un'impresa ardua, poiché entrambi i giocatori hanno le stesse possibilità.`;
          pbo.byOdds_ES =
            pbo.byOdds_ES +
            ` Es difícil pronosticar quién ganará el primer set, ya que ambos jugadores tienen las mismas posibilidades.`;
          pbo.byOdds_PT =
            pbo.byOdds_PT +
            ` Fazer uma previsão sobre quem vai ganhar o primeiro set é uma decisão difícil, uma vez que ambos os jogadores têm as mesmas hipóteses de ganhar.`;
          pbo.byOdds_FR =
            pbo.byOdds_FR +
            ` Il est difficile de prédire qui gagnera le premier set, car les deux joueurs ont les mêmes chances de l'emporter.`;
          pbo.byOdds_DE =
            pbo.byOdds_DE +
            ` Eine Vorhersage, wer den ersten Satz gewinnen wird, ist schwierig, da beide Spielerinnen die gleichen Chancen haben.`;
          pbo.byOdds_CZ =
            pbo.byOdds_CZ +
            ` Předpovědět, kdo vyhraje první set, je těžké, protože oba hráči mají stejnou šanci.`;
          pbo.byOdds_PL =
            pbo.byOdds_PL +
            ` Przewidywanie, kto wygra pierwszego seta jest trudne, ponieważ obaj zawodnicy mają równe szanse.`;
        }
        if (w.set1HomeOdds < w.set2AwayOdds) {
          pbo.byOdds =
            pbo.byOdds +
            ` There is also a possibility that ${homeData.lastName} will win the first set.`;
          pbo.byOdds_RO =
            pbo.byOdds_RO +
            ` Există, de asemenea, posibilitatea ca ${homeData.lastName} să câștige primul set.`;
          pbo.byOdds_IT =
            pbo.byOdds_IT +
            ` C'è anche la possibilità che ${homeData.lastName} vinca il primo set.`;
          pbo.byOdds_ES =
            pbo.byOdds_ES +
            ` También existe la posibilidad de que ${homeData.lastName} gane el primer set.`;
          pbo.byOdds_PT =
            pbo.byOdds_PT +
            ` Também existe a possibilidade de ${homeData.lastName} ganhar o primeiro set.`;
          pbo.byOdds_FR =
            pbo.byOdds_FR +
            ` Il est également possible que ${homeData.lastName} remporte la première manche.`;
          pbo.byOdds_DE =
            pbo.byOdds_DE +
            ` Es besteht auch die Möglichkeit, dass ${homeData.lastName} den ersten Satz gewinnen wird.`;
          pbo.byOdds_CZ =
            pbo.byOdds_CZ +
            ` Existuje také možnost, že ${homeData.lastName} vyhraje první sadu.`;
          pbo.byOdds_PL =
            pbo.byOdds_PL +
            ` Istnieje również możliwość, że ${homeData.lastName} wygra pierwszego seta.`;
        }

        if (w.set1HomeOdds > w.set2AwayOdds) {
          pbo.byOdds =
            pbo.byOdds +
            ` There is also a possibility that ${awayData.lastName} will win the first set.`;
          pbo.byOdds_RO =
            pbo.byOdds_RO +
            ` Există, de asemenea, posibilitatea ca ${awayData.lastName} să câștige primul set.`;
          pbo.byOdds_IT =
            pbo.byOdds_IT +
            ` C'è anche la possibilità che ${awayData.lastName} vinca il primo set.`;
          pbo.byOdds_ES =
            pbo.byOdds_ES +
            ` También existe la posibilidad de que ${awayData.lastName} gane el primer set.`;
          pbo.byOdds_PT =
            pbo.byOdds_PT +
            ` Também existe a possibilidade de ${awayData.lastName} ganhar o primeiro set.`;
          pbo.byOdds_FR =
            pbo.byOdds_FR +
            ` Il est également possible que ${awayData.lastName} remporte la première manche.`;
          pbo.byOdds_DE =
            pbo.byOdds_DE +
            ` Es besteht auch die Möglichkeit, dass ${awayData.lastName} den ersten Satz gewinnen wird.`;
          pbo.byOdds_CZ =
            pbo.byOdds_CZ +
            ` Existuje také možnost, že ${awayData.lastName} vyhraje první set.`;
          pbo.byOdds_PL =
            pbo.byOdds_PL +
            ` Istnieje również możliwość, że ${awayData.lastName} wygra pierwszego seta.`;
        }
      }
    }

    // console.log(pbo);

    return pbo;
  }
};

export { predictionByOdds };
