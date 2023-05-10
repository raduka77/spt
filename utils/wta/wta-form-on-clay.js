import fs from 'fs';
import { DateTime } from 'luxon';
import { default as converter } from 'number-to-words';

const formOfPlayersOnClay = function (match, homeData, awayData) {
  console.log('starting formOfPlayersOnClay');
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
    if (
      match.groundType === 'Clay' ||
      match.groundType === 'Red clay' ||
      match.groundType === 'Red clay indoor' ||
      match.groundType === 'Green clay'
    ) {
      const homeFormOnClay = homeData.redClayStats;
      const awayFormOnClay = awayData.redClayStats;

      //// begin HOME

      if (homeFormOnClay.totalMatches == 0) {
        of.homeForm = `${homeData.properName} hasn't played any matches on clay courts yet, so we can't show any statistics at the moment.`;

        of.homeForm_RO = `${homeData.properName} nu a jucat încă niciun meci pe terenuri de zgură, așa că nu putem afișa nicio statistică în acest moment.`;
        of.homeForm_IT = `${homeData.properName} non ha ancora giocato nessuna partita su campi in terra battuta, quindi non possiamo mostrare alcuna statistica al momento.`;
        of.homeForm_ES = `${homeData.properName} todavía no ha jugado ningún partido en tierra batida, así que no podemos mostrarte ninguna estadística por el momento.`;
        of.homeForm_PT = `${homeData.properName} ainda não jogou nenhum jogo em campos de terra batida, pelo que não podemos mostrar quaisquer estatísticas de momento.`;
        of.homeForm_FR = `${homeData.properName} n'a pas encore joué de matchs sur terre battue, nous ne pouvons donc pas afficher de statistiques pour le moment.`;
        of.homeForm_DE = `${homeData.properName} hat noch keine Spiele auf Sandplätzen gespielt, daher können wir im Moment keine Statistiken anzeigen.`;
        of.homeForm_CZ = `${homeData.properName} zatím neodehrál žádný zápas na antukových kurtech, takže v tuto chvíli nemůžeme zobrazit žádné statistiky.`;
        of.homeForm_PL = `${homeData.properName} nie rozegrał jeszcze żadnego meczu na kortach ziemnych, więc nie możemy w tej chwili pokazywać żadnych statystyk.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (homeFormOnClay.totalMatches >= 1 && homeFormOnClay.totalMatches < 5) {
        // console.log(`win perc ${homeFormOnClay.winPerc}%`);

        of.homeForm = `${
          homeData.properName
        } has only played ${converter.toWords(
          homeFormOnClay.totalMatches
        )} matches on clay this season, which isn't a lot, but we can still extract some statistics from them.`;
        of.homeForm_RO = `${
          homeData.properName
        } a jucat doar ${converter.toWords(
          homeFormOnClay.totalMatches
        )} meciuri pe zgură în acest sezon, ceea ce nu este mult, dar putem totuși extrage câteva statistici din ele.`;
        of.homeForm_IT = `${
          homeData.properName
        } ha giocato solo ${converter.toWords(
          homeFormOnClay.totalMatches
        )} partite sulla terra battuta in questa stagione, il che non è molto, ma possiamo comunque ricavarne alcune statistiche.`;
        of.homeForm_ES = `${
          homeData.properName
        } sólo ha jugado ${converter.toWords(
          homeFormOnClay.totalMatches
        )} partidos en tierra batida esta temporada, lo que no es mucho, pero aún así podemos extraer algunas estadísticas de ellos.`;
        of.homeForm_PT = `${homeData.properName} só jogou ${converter.toWords(
          homeFormOnClay.totalMatches
        )} jogos em terra batida esta época, o que não é muito, mas ainda assim podemos extrair algumas estatísticas deles.`;
        of.homeForm_FR = `${
          homeData.properName
        } n'a joué que ${converter.toWords(
          homeFormOnClay.totalMatches
        )} sur terre battue cette saison, ce qui n'est pas beaucoup, mais nous pouvons tout de même en tirer quelques statistiques.`;
        of.homeForm_DE = `${homeData.properName} spielt nur ${converter.toWords(
          homeFormOnClay.totalMatches
        )} Spiele auf Sand in dieser Saison bestritten, was nicht sehr viel ist, aber wir können dennoch einige Statistiken aus ihnen extrahieren.`;
        of.homeForm_CZ = `${
          homeData.properName
        } přehrál pouze ${converter.toWords(
          homeFormOnClay.totalMatches
        )} zápasů na antuce v této sezóně, což není mnoho, ale přesto z nich můžeme získat nějaké statistiky.`;
        of.homeForm_PL = `${homeData.properName} grał tylko ${converter.toWords(
          homeFormOnClay.totalMatches
        )} mecze na glinie w tym sezonie, co nie jest dużo, ale wciąż możemy wyciągnąć z nich kilka statystyk.`;

        if (homeFormOnClay.winPerc >= 75) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnClay.winPerc}% on clay indicates a strong start to the season on this surface. However, it remains to be seen if he can maintain this level of performance as the season progresses.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnClay.winPerc}% pe zgură indică un început bun de sezon pe această suprafață. Rămâne însă de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} sulla terra battuta (${homeFormOnClay.winPerc}%) indica un forte inizio di stagione su questa superficie. Tuttavia, resta da vedere se riuscirà a mantenere questo livello di prestazioni nel corso della stagione.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName} en tierra batida (${homeFormOnClay.winPerc}%) indica un buen comienzo de temporada en esta superficie. Sin embargo, queda por ver si puede mantener este nivel de rendimiento a medida que avance la temporada.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnClay.winPerc}% no saibro indica um forte início de época nesta superfície. No entanto, resta saber se ele consegue manter este nível de desempenho à medida que a época avança.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire de ${homeData.lastName} sur terre battue, qui est actuellement de ${homeFormOnClay.winPerc}%, indique un bon début de saison sur cette surface. Cependant, il reste à voir s'il peut maintenir ce niveau de performance au fur et à mesure que la saison avance.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}'s aktueller Gewinnprozentsatz von ${homeFormOnClay.winPerc}% auf Sand deutet auf einen starken Start in die Saison auf diesem Belag hin. Es bleibt jedoch abzuwarten, ob er dieses Leistungsniveau im weiteren Verlauf der Saison halten kann.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName} na antuce ${homeFormOnClay.winPerc}% naznačuje silný začátek sezóny na tomto povrchu. Uvidíme však, zda si tuto úroveň výkonnosti dokáže udržet i v průběhu sezony.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent wygranych ${homeData.lastName} na clayu wskazuje na dobry początek sezonu na tej nawierzchni. Jednak dopiero okaże się, czy uda mu się utrzymać ten poziom wyników w trakcie sezonu.`;
        }

        if (homeFormOnClay.winPerc < 75 && homeFormOnClay.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnClay.winPerc}% on clay indicates a promising start to the season on this surface. Nonetheless, the question remains whether she can sustain this level of performance throughout the remainder of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnClay.winPerc}% pe zgură indică un început de sezon promițător pe această suprafață. Cu toate acestea, rămâne întrebarea dacă poate menține acest nivel de performanță pe tot restul sezonului.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnClay.winPerc}% sulla terra battuta indica un inizio di stagione promettente su questa superficie. Tuttavia, resta da chiedersi se riuscirà a mantenere questo livello di prestazioni per tutto il resto della stagione.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName} en tierra batida indica un prometedor comienzo de temporada en esta superficie. No obstante, la pregunta sigue siendo si podrá mantener este nivel de rendimiento durante el resto de la temporada.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnClay.winPerc}% no saibro indica um início de época promissor nesta superfície. No entanto, resta saber se ele consegue manter este nível de desempenho durante o resto da época.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire de ${homeData.lastName} sur terre battue, qui est actuellement de ${homeFormOnClay.winPerc}%, indique un début de saison prometteur sur cette surface. Néanmoins, la question reste de savoir s'elle peut maintenir ce niveau de performance jusqu'à la fin de la saison.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}'s aktueller Gewinnprozentsatz von ${homeFormOnClay.winPerc}% auf Sand deutet auf einen vielversprechenden Start in die Saison auf diesem Belag hin. Dennoch bleibt die Frage, ob er dieses Leistungsniveau über den Rest der Saison halten kann.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName} na antuce ${homeFormOnClay.winPerc}% naznačuje slibný začátek sezóny na tomto povrchu. Otázkou nicméně zůstává, zda si tuto úroveň výkonnosti dokáže udržet po zbytek sezony.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Obecny procent zwycięstw ${homeData.lastName} na clayu wskazuje na obiecujący początek sezonu na tej nawierzchni. Niemniej jednak, pozostaje pytanie, czy będzie on w stanie utrzymać ten poziom wyników przez resztę sezonu.`;
        }

        if (homeFormOnClay.winPerc < 50 && homeFormOnClay.winPerc >= 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage of ${homeFormOnClay.winPerc}% on clay suggests a challenging start to the season on this surface. However, the uncertainty still lingers over whether she can recover and showcase a better level of performance in the upcoming matches of the season.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} de ${homeFormOnClay.winPerc}% pe zgură sugerează un început de sezon dificil pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} di ${homeFormOnClay.winPerc}% sulla terra battuta suggerisce un inizio di stagione difficile su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.properName} sobre tierra batida de ${homeFormOnClay.winPerc}% sugiere un inicio de temporada complicado en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} de ${homeFormOnClay.winPerc}% no saibro sugere um início de época difícil nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.properName} de ${homeFormOnClay.winPerc}% sur terre battue suggère un début de saison difficile sur cette surface. Cependant, l'incertitude persiste quant à sa capacité à se rétablir et à afficher un meilleur niveau de performance lors des prochains matches de la saison.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.properName}s aktuelle Siegquote von ${homeFormOnClay.winPerc}% auf Sand deutet auf einen schwierigen Saisonstart auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.properName} na antuce naznačuje náročný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.properName} na glinie wynoszący ${homeFormOnClay.winPerc}% sugeruje trudny początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnClay.winPerc < 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnClay.winPerc}% on clay suggests a disappointing start to the season on this surface. In order to improve her results, she needs to step up her game and perform at a higher level.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnClay.winPerc}% pe zgură sugerează un început dezamăgitor de sezon pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnClay.winPerc}% sulla terra battuta suggerisce un inizio di stagione deludente su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName} en tierra batida de ${homeFormOnClay.winPerc}% sugiere un inicio de temporada decepcionante en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnClay.winPerc}% no saibro sugere um início de época decepcionante nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnClay.winPerc}% sur terre battue suggère un début de saison décevant sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}'s aktueller Gewinnprozentsatz von ${homeFormOnClay.winPerc}% auf Sand deutet auf einen enttäuschenden Start in die Saison auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.lastName} na antuce naznačuje neuspokojivý začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName} na glinie wynoszący ${homeFormOnClay.winPerc}% sugeruje rozczarowujący początek sezonu na tej nawierzchni.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (homeFormOnClay.totalMatches >= 5) {
        // console.log(`win perc ${homeFormOnClay.winPerc}%`);
        of.homeForm = `In the current season, ${homeData.properName} has played a sufficient number of matches on clay, allowing for a comprehensive analysis of her form on this surface.`;
        of.homeForm_RO = `În sezonul actual, ${homeData.properName} a jucat un număr suficient de meciuri pe zgură, ceea ce permite o analiză cuprinzătoare a formei sale pe această suprafață.`;
        of.homeForm_IT = `Nella stagione in corso, ${homeData.properName} ha giocato un numero sufficiente di partite sulla terra battuta, consentendo un'analisi completa della sua forma su questa superficie.`;
        of.homeForm_ES = `En la temporada actual, ${homeData.properName} ha jugado un número suficiente de partidos en tierra batida, lo que permite un análisis exhaustivo de su forma en esta superficie.`;
        of.homeForm_PT = `Na época actual, ${homeData.properName} disputou um número suficiente de jogos em terra batida, o que permite uma análise abrangente da sua forma nesta superfície.`;
        of.homeForm_FR = `Au cours de la saison actuelle, ${homeData.properName} a joué un nombre suffisant de matches sur terre battue, ce qui permet une analyse complète de sa forme sur cette surface.`;
        of.homeForm_DE = `In der laufenden Saison hat ${homeData.properName} eine ausreichende Anzahl von Spielen auf Sand gespielt, so dass eine umfassende Analyse seiner Form auf diesem Belag möglich ist.`;
        of.homeForm_CZ = `V aktuální sezóně odehrál ${homeData.properName} dostatečný počet zápasů na antuce, což umožňuje komplexní analýzu jeho formy na tomto povrchu.`;
        of.homeForm_PL = `W bieżącym sezonie ${homeData.properName} rozegrał wystarczającą liczbę spotkań na clayu, co pozwala na kompleksową analizę jego formy na tej nawierzchni.`;

        if (homeFormOnClay.winPerc >= 80) {
          of.homeForm =
            of.homeForm +
            ` Her win rate on clay currently stands at an impressive ${homeFormOnClay.winPerc}%, having emerged victorious in ${homeFormOnClay.won} matches and suffered defeat in ${homeFormOnClay.lost}. This performance can be regarded as excellent.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Rata sa de victorie pe zgură se situează în prezent la un impresionant ${homeFormOnClay.winPerc}%, după ce a ieșit victorios în ${homeFormOnClay.won} meciuri și a suferit înfrângeri în ${homeFormOnClay.lost}. Această performanță poate fi considerată cu siguranță excelentă.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua percentuale di vittorie sulla terra battuta è attualmente pari a ben ${homeFormOnClay.winPerc}%, essendo uscito vittorioso in ${homeFormOnClay.won} e ha subito una sconfitta in ${homeFormOnClay.lost}. Questa prestazione può essere considerata eccellente.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su porcentaje de victorias en tierra batida es actualmente de un impresionante ${homeFormOnClay.winPerc}%, habiendo salido victorioso en ${homeFormOnClay.won} partidos y sufrido derrotas en ${homeFormOnClay.lost}. Sin duda, este rendimiento puede considerarse excelente.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua taxa de vitórias no saibro é actualmente de uns impressionantes ${homeFormOnClay.winPerc}%, tendo saído vitorioso em ${homeFormOnClay.won} e sofrido derrotas em jogos de ${homeFormOnClay.lost}. Este desempenho pode certamente ser considerado excelente.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Son taux de victoire sur terre battue s'élève actuellement à un impressionnant ${homeFormOnClay.winPerc}%, après avoir remporté ${homeFormOnClay.won} et subi des défaites dans ${homeFormOnClay.lost}. Cette performance peut certainement être considérée comme excellente.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine Siegquote auf Sand liegt derzeit bei beeindruckenden ${homeFormOnClay.winPerc}%, nachdem er in ${homeFormOnClay.won} Matches gewonnen und in ${homeFormOnClay.lost}. Diese Leistung kann durchaus als hervorragend bezeichnet werden.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` V současné době dosahuje na antuce úctyhodného poměru výher ${homeFormOnClay.winPerc}%, když zvítězil v ${homeFormOnClay.won} zápasů a utrpěl porážku v ${homeFormOnClay.lost}. Tento výkon lze jistě považovat za vynikající.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego współczynnik zwycięstw na glinie wynosi obecnie imponujący ${homeFormOnClay.winPerc}%, zwyciężając w ${homeFormOnClay.won} meczach i poniósł porażkę w ${homeFormOnClay.lost}. Ten wynik z pewnością można uznać za doskonały.`;

          /// check for titles
          if (homeFormOnClay.titles.length > 0) {
            if (homeFormOnClay.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnClay.titles[0].titleName}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe zgură în acest sezon (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sulla terra battuta in questa stagione (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en tierra batida esta temporada (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em terra batida esta época (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur terre battue cette saison (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison bereits einen Titel auf Sand gewonnen (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezoně získat jeden titul na antuce (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na clayu (${homeFormOnClay.titles[0].titleName}).`;
            }

            if (homeFormOnClay.titles.length > 1) {
              let titles = [];

              homeFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` În plus, ${
                  homeData.properName
                } a reușit performanța de a obține ${
                  homeFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha raggiunto l'obiettivo di ottenere ${
                  homeFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de obter ${
                  homeFormOnClay.titles.length
                } títulos no terra batida esta época (${titles.join(', ')}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit d'atteindre ${
                  homeFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem wird ${
                  homeData.properName
                } das Kunststück vollbracht, ${
                  homeFormOnClay.titles.length
                } Titel auf Sand in dieser Saison (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho je ${
                  homeData.properName
                } dosáhl úspěchu a připojil ${
                  homeFormOnClay.titles.length
                } titulů na antuce v této sezoně (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto, ${
                  homeData.properName
                } dokonał wyczynu polegającego na tym, że ${
                  homeFormOnClay.titles.length
                } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnClay.winPerc < 80 && homeFormOnClay.winPerc >= 65) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage on clay stands at ${homeFormOnClay.winPerc}%, indicating a strong overall form on this surface.`;
          of.homeForm_RO =
            of.homeForm_RO +
            `Procentul actual de victorii pe zgură al lui ${homeData.properName} este de ${homeFormOnClay.winPerc}%, ceea ce indică o formă generală foarte bună pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            `L'attuale percentuale di vittorie di ${homeData.properName} sulla terra battuta è pari a ${homeFormOnClay.winPerc}%, il che indica un'ottima forma generale su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            `El porcentaje actual de victorias de ${homeData.properName} en tierra batida es de ${homeFormOnClay.winPerc}%, lo que indica una forma general muy buena en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            `A actual percentagem de vitórias de ${homeData.properName} em terra batida é de ${homeFormOnClay.winPerc}%, o que indica uma boa forma geral nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            `Le pourcentage de victoire de ${homeData.properName} sur terre battue est de ${homeFormOnClay.winPerc}%, ce qui indique une très bonne forme générale sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            `Die aktuelle Siegquote von ${homeData.properName} auf Sand liegt bei ${homeFormOnClay.winPerc}%, was auf eine sehr gute Gesamtform auf diesem Untergrund hindeutet.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            `Aktuální procento výher ${homeData.properName} na antuce je ${homeFormOnClay.winPerc}%, což ukazuje na velmi dobrou celkovou formu na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            `Aktualny procent zwycięstw ${homeData.properName} na glinie wynosi ${homeFormOnClay.winPerc}%, co wskazuje na bardzo dobrą ogólną formę na tej nawierzchni.`;

          /// check for titles
          if (homeFormOnClay.titles.length > 0) {
            if (homeFormOnClay.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnClay.titles[0].titleName}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe zgură în acest sezon (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sulla terra battuta in questa stagione (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en tierra batida esta temporada (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em terra batida esta época (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur terre battue cette saison (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison bereits einen Titel auf Sand gewonnen (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezoně získat jeden titul na antuce (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na clayu (${homeFormOnClay.titles[0].titleName}).`;
            }

            if (homeFormOnClay.titles.length > 1) {
              let titles = [];

              homeFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` În plus, ${
                  homeData.properName
                } a reușit performanța de a obține ${
                  homeFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha raggiunto l'obiettivo di ottenere ${
                  homeFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de obter ${
                  homeFormOnClay.titles.length
                } títulos no terra batida esta época (${titles.join(', ')}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit d'atteindre ${
                  homeFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem wird ${
                  homeData.properName
                } das Kunststück vollbracht, ${
                  homeFormOnClay.titles.length
                } Titel auf Sand in dieser Saison (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho je ${
                  homeData.properName
                } dosáhl úspěchu a připojil ${
                  homeFormOnClay.titles.length
                } titulů na antuce v této sezoně (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto, ${
                  homeData.properName
                } dokonał wyczynu polegającego na tym, że ${
                  homeFormOnClay.titles.length
                }
                homeFormOnClay.titles.length
              } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnClay.winPerc < 65 && homeFormOnClay.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current form on clay can be deemed acceptable, though there is certainly room for improvement.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma actuală a lui ${homeData.properName} pe zgură poate fi considerată acceptabilă, deși există cu siguranță loc pentru îmbunătățiri.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La forma attuale di ${homeData.properName} sulla terra battuta può essere considerata accettabile, anche se c'è sicuramente un margine di miglioramento.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` La forma actual de ${homeData.properName} en tierra batida puede considerarse aceptable, aunque sin duda puede mejorar.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A forma actual de ${homeData.properName} no saibro pode ser considerada aceitável, embora haja certamente espaço para melhorias.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` La forme actuelle de ${homeData.properName} sur terre battue peut être considérée comme acceptable, bien qu'il y ait certainement une marge de progression.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die derzeitige Form von ${homeData.properName} auf Sand kann als akzeptabel bezeichnet werden, obwohl es sicherlich noch Raum für Verbesserungen gibt.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Současnou formu ${homeData.properName} na antuce lze považovat za přijatelnou, i když je jistě co zlepšovat.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Obecną formę ${homeData.properName} na glinie można uznać za akceptowalną, choć z pewnością jest miejsce na poprawę.`;

          /// check for titles
          if (homeFormOnClay.titles.length > 0) {
            if (homeFormOnClay.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnClay.titles[0].titleName}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe zgură în acest sezon (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sulla terra battuta in questa stagione (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en tierra batida esta temporada (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em terra batida esta época (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur terre battue cette saison (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison bereits einen Titel auf Sand gewonnen (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezoně získat jeden titul na antuce (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na clayu (${homeFormOnClay.titles[0].titleName}).`;
            }

            if (homeFormOnClay.titles.length > 1) {
              let titles = [];

              homeFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` În plus, ${
                  homeData.properName
                } a reușit performanța de a obține ${
                  homeFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha raggiunto l'obiettivo di ottenere ${
                  homeFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de obter ${
                  homeFormOnClay.titles.length
                } títulos no terra batida esta época (${titles.join(', ')}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit d'atteindre ${
                  homeFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem wird ${
                  homeData.properName
                } das Kunststück vollbracht, ${
                  homeFormOnClay.titles.length
                } Titel auf Sand in dieser Saison (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho je ${
                  homeData.properName
                } dosáhl úspěchu a připojil ${
                  homeFormOnClay.titles.length
                } titulů na antuce v této sezoně (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto, ${
                  homeData.properName
                } dokonał wyczynu polegającego na tym, że ${
                  homeFormOnClay.titles.length
                }
                homeFormOnClay.titles.length
              } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnClay.winPerc < 50) {
          of.homeForm =
            of.homeForm +
            ` Her current form on clay courts is not that good, with only a ${homeFormOnClay.winPerc}% win ratio.`;

          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma sa actuală pe terenuri de zgură nu este atât de bună, având un procent de doar ${homeFormOnClay.winPerc}% victorii.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` Il suo attuale stato di forma sui campi in terra rossa non è eccellente, con solo una percentuale di vittoria del ${homeFormOnClay.winPerc}%.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su forma actual en las canchas de arcilla no es muy buena, con solo un porcentaje de victorias del ${homeFormOnClay.winPerc}%.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua forma atual em quadras de saibro não está tão boa, com apenas uma taxa de vitórias de ${homeFormOnClay.winPerc}%.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Sa forme actuelle sur les courts en terre battue n'est pas très bonne, avec seulement un ratio de victoire de ${homeFormOnClay.winPerc}%.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Ihre aktuelle Form auf Sandplätzen ist nicht besonders gut, mit einer Siegquote von nur ${homeFormOnClay.winPerc}%.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Její současná forma na antukových kurtech není dobrou, s vítěznou poměrem pouze ${homeFormOnClay.winPerc}%.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jej obecna forma na kortach ziemnych nie jest zbyt dobra, z tylko ${homeFormOnClay.winPerc}% stosunkiem wygranych.`;

          /// check for titles
          if (homeFormOnClay.titles.length > 0) {
            if (homeFormOnClay.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on clay this season (${homeFormOnClay.titles[0].titleName}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe zgură în acest sezon (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sulla terra battuta in questa stagione (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en tierra batida esta temporada (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em terra batida esta época (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur terre battue cette saison (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison bereits einen Titel auf Sand gewonnen (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezoně získat jeden titul na antuce (${homeFormOnClay.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na clayu (${homeFormOnClay.titles[0].titleName}).`;
            }

            if (homeFormOnClay.titles.length > 1) {
              let titles = [];

              homeFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.homeForm_RO =
                of.homeForm_RO +
                ` În plus, ${
                  homeData.properName
                } a reușit performanța de a obține ${
                  homeFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha raggiunto l'obiettivo di ottenere ${
                  homeFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de obter ${
                  homeFormOnClay.titles.length
                } títulos no terra batida esta época (${titles.join(', ')}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit d'atteindre ${
                  homeFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem wird ${
                  homeData.properName
                } das Kunststück vollbracht, ${
                  homeFormOnClay.titles.length
                } Titel auf Sand in dieser Saison (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho je ${
                  homeData.properName
                } dosáhl úspěchu a připojil ${
                  homeFormOnClay.titles.length
                } titulů na antuce v této sezoně (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto, ${
                  homeData.properName
                } dokonał wyczynu polegającego na tym, że ${
                  homeFormOnClay.titles.length
                }
                homeFormOnClay.titles.length
              } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }
      }

      //// begin AWAY

      if (awayFormOnClay.totalMatches == 0) {
        of.awayForm = `At present, we are unable to display any statistics for ${awayData.properName} as there have been no matches played by him on clay courts thus far.`;
        of.awayForm_RO = `În acest moment nu putem afișa nicio statistică pentru ${awayData.properName} deoarece nu există niciun meci jucat de el pe terenuri de zgură până în prezent.`;
        of.awayForm_IT = `Al momento non siamo in grado di visualizzare alcuna statistica per ${awayData.properName} in quanto non sono state giocate finora partite su campi in terra battuta.`;
        of.awayForm_ES = `En este momento, no podemos mostrar ninguna estadística para ${awayData.properName} ya que no ha habido partidos jugados por él en canchas de arcilla hasta el momento.`;
        of.awayForm_PT = `De momento, não podemos apresentar quaisquer estatísticas relativas a ${awayData.properName}, uma vez que não foram disputados quaisquer jogos por ele em courts de terra batida até ao momento.`;
        of.awayForm_FR = `Pour l'instant, nous ne pouvons pas afficher de statistiques pour ${awayData.properName} car il n'a joué aucun match sur terre battue jusqu'à présent.`;
        of.awayForm_DE = `Zur Zeit können wir keine Statistik für ${awayData.properName} anzeigen, da er noch keine Spiele auf Sandplätzen gespielt hat.`;
        of.awayForm_CZ = `V současné době nemůžeme zobrazit žádné statistiky pro hráče ${awayData.properName}, protože dosud neodehrál žádný zápas na antuce.`;
        of.awayForm_PL = `Obecnie nie możemy wyświetlić żadnych statystyk dla ${awayData.properName}, ponieważ do tej pory nie rozegrał żadnego meczu na kortach ziemnych.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (awayFormOnClay.totalMatches >= 1 && awayFormOnClay.totalMatches < 5) {
        // console.log(`win perc ${awayFormOnClay.winPerc}%`);

        of.awayForm = `Although there haven't been many matches played by ${
          awayData.properName
        } on clay this season - only ${converter.toWords(
          awayFormOnClay.totalMatches
        )} to be exact - we can still extract some statistics from these matches.`;

        of.awayForm_RO = `Deși nu au fost multe meciuri jucate de ${awayData.properName} pe zgură în acest sezon - doar ${awayFormOnClay.totalMatches} mai exact - putem totuși extrage câteva statistici din aceste meciuri.`;
        of.awayForm_IT = `Anche se non ci sono state molte partite giocate da ${awayData.properName} sulla terra battuta in questa stagione - solo ${awayFormOnClay.totalMatches} per l'esattezza, possiamo comunque estrarre alcune statistiche da queste partite.`;
        of.awayForm_ES = `Aunque no ha habido muchos partidos jugados por ${awayData.properName} en tierra batida esta temporada - sólo ${awayFormOnClay.totalMatches} para ser exactos, aún podemos extraer algunas estadísticas de estos partidos.`;
        of.awayForm_PT = `Embora não tenha havido muitos jogos disputados por ${awayData.properName} em terra batida esta época - apenas ${awayFormOnClay.totalMatches} para ser exacto - ainda podemos extrair algumas estatísticas desses jogos.`;
        of.awayForm_FR = `Bien qu'il n'y ait pas eu beaucoup de matches joués par ${awayData.properName} sur terre battue cette saison - seulement ${awayFormOnClay.totalMatches} pour être exact, nous pouvons tout de même extraire quelques statistiques de ces matchs.`;
        of.awayForm_DE = `Obwohl es nicht viele Spiele von ${awayData.properName} in dieser Saison auf Sand gespielt - nur ${awayFormOnClay.totalMatches} um genau zu sein - können wir dennoch einige Statistiken aus diesen Spielen extrahieren.`;
        of.awayForm_CZ = `Ačkoli se neodehrálo mnoho zápasů, které by ${awayData.properName} na antuce v této sezóně - pouze ${awayFormOnClay.totalMatches}, přesto můžeme z těchto zápasů získat některé statistiky.`;
        of.awayForm_PL = `Chociaż nie było wielu meczów rozgrywanych przez ${awayData.properName} na glinie w tym sezonie - tylko ${awayFormOnClay.totalMatches}, to wciąż możemy wyciągnąć z tych meczów jakieś statystyki.`;

        if (awayFormOnClay.winPerc >= 75) {
          of.awayForm =
            of.awayForm +
            ` It appears that ${awayData.lastName} has had a strong start to the season on clay, as indicated by her current win percentage of ${awayFormOnClay.winPerc}%. Nevertheless, it remains to be seen whether she can sustain this level of performance as the season moves forward.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon foarte bun pe zgură, după cum indică procentajul său actual de victorii de ${awayFormOnClay.winPerc}%. Cu toate acestea, rămâne de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia iniziato bene la stagione sulla terra battuta, come indica la sua attuale percentuale di vittorie di ${awayFormOnClay.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un buen comienzo de temporada en tierra batida, como indica su actual porcentaje de victorias de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um forte início de época no saibro, como indicado pela sua actual percentagem de vitórias de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un bon début de saison sur terre battue, comme l'indique son pourcentage de victoire actuel de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen starken Start in die Saison auf Sand hatte, wie seine aktuelle Siegquote von ${awayFormOnClay.winPerc}% zeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou silný začátek sezóny na antuce, jak ukazuje jeho aktuální procento výher ${awayFormOnClay.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma dobry początek sezonu na clayu, na co wskazuje jego obecny procent wygranych ${awayFormOnClay.winPerc}%.`;
        }

        if (awayFormOnClay.winPerc < 75 && awayFormOnClay.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` The present win percentage of ${awayFormOnClay.winPerc}% on clay by ${awayData.lastName} presents a promising start to the season on this surface. Nevertheless, it raises the question of whether she can maintain this level of performance for the rest of the season.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul actual de victorii de ${awayFormOnClay.winPerc}% pe zgură al lui ${awayData.lastName} reprezintă un început de sezon promițător pe această suprafață. Cu toate acestea, se pune întrebarea dacă poate menține acest nivel de performanță pentru restul sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` L'attuale percentuale di vittorie di ${awayFormOnClay.winPerc}% sulla terra battuta di ${awayData.lastName} rappresenta un inizio di stagione promettente su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El actual porcentaje de victorias de ${awayFormOnClay.winPerc}% en tierra batida de ${awayData.lastName} presenta un prometedor comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A actual percentagem de vitórias de ${awayFormOnClay.winPerc}% no saibro por ${awayData.lastName} apresenta um início de época promissor nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire actuel de ${awayFormOnClay.winPerc}% sur terre battue de ${awayData.lastName} représente un début de saison prometteur sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die aktuelle Siegquote von ${awayFormOnClay.winPerc}% auf Sand von ${awayData.lastName} stellt einen vielversprechenden Saisonstart auf diesem Belag dar.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Současné procento výher ${awayFormOnClay.winPerc}% na antuce od ${awayData.lastName} představuje slibný začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Aktualny procent wygranych ${awayFormOnClay.winPerc}% na glinie przez ${awayData.lastName} prezentuje obiecujący początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnClay.winPerc < 50 && awayFormOnClay.winPerc >= 40) {
          of.awayForm =
            of.awayForm +
            ` The win percentage of ${awayFormOnClay.winPerc}% on clay by ${awayData.properName} portrays a tough start to the season on this surface. Nonetheless, there is still uncertainty as to whether she can bounce back and deliver a better performance in the upcoming matches of the season.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul de victorii de ${awayFormOnClay.winPerc}% pe zgură al lui ${awayData.properName} arată un început de sezon dificil pe această suprafață. Cu toate acestea, există încă incertitudini cu privire la posibilitatea ca ea să își revină și să ofere o performanță mai bună în următoarele meciuri ale sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` La percentuale di vittorie di ${awayFormOnClay.winPerc}% sulla terra battuta da parte di ${awayData.properName} evidenzia un inizio di stagione difficile su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El porcentaje de victorias de ${awayFormOnClay.winPerc}% en tierra batida de ${awayData.properName} retrata un duro comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A percentagem de vitórias de ${awayFormOnClay.winPerc}% em terra batida por ${awayData.properName} retrata um início de época difícil nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire de ${awayFormOnClay.winPerc}% sur terre battue de ${awayData.properName} témoigne d'un début de saison difficile sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die Gewinnquote von ${awayFormOnClay.winPerc}% auf Sand von ${awayData.properName} zeigt einen schwierigen Saisonstart auf diesem Belag.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Procento výher ${awayFormOnClay.winPerc}% na antuce podle ${awayData.properName} ukazuje těžký začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Procent wygranych ${awayFormOnClay.winPerc}% na glinie przez ${awayData.properName} obrazuje trudny początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnClay.winPerc < 40) {
          of.awayForm =
            of.awayForm +
            ` It seems that ${awayData.lastName} has had a discouraging start to the season on clay, with a current win percentage of ${awayFormOnClay.winPerc}%. To enhance her results, the player will need to elevate her game.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon descurajator pe zgură, cu un procentaj actual de victorii de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia avuto un inizio di stagione scoraggiante sulla terra battuta, con una percentuale di vittorie attuale di ${awayFormOnClay.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un comienzo de temporada desalentador en tierra batida, con un porcentaje de victorias actual de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um início de época desanimador no saibro, com uma percentagem de vitórias actual de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un début de saison décourageant sur terre battue, avec un pourcentage de victoire actuel de ${awayFormOnClay.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen entmutigenden Start in die Saison auf Sand hatte, mit einer aktuellen Siegquote von ${awayFormOnClay.winPerc}%.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou neutěšený začátek sezóny na antuce, s aktuálním procentem výher ${awayFormOnClay.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma zniechęcający początek sezonu na clayu, z aktualnym procentem wygranych ${awayFormOnClay.winPerc}%.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (awayFormOnClay.totalMatches >= 5) {
        // console.log(`win perc ${awayFormOnClay.winPerc}%`);
        of.awayForm = `During this season, ${awayData.properName} has played an adequate amount of matches on clay, thus enabling a thorough evaluation of his form on this surface.`;
        of.awayForm_RO = `În acest sezon, ${awayData.properName} a jucat destule meciuri pe zgură, ceea ce permite o evaluare amănunțită a formei sale pe această suprafață.`;
        of.awayForm_IT = `In questa stagione, ${awayData.properName} ha giocato un numero sufficiente di partite sulla terra battuta, consentendo così una valutazione approfondita della sua forma su questa superficie.`;
        of.awayForm_ES = `Durante esta temporada, ${awayData.properName} ha jugado suficientes partidos en tierra batida, lo que permite una evaluación exhaustiva de su forma en esta superficie.`;
        of.awayForm_PT = `Durante esta época, ${awayData.properName} disputou um número suficiente de jogos em terra batida, o que permite uma avaliação exaustiva da sua forma nesta superfície.`;
        of.awayForm_FR = `Au cours de cette saison, ${awayData.properName} a joué suffisamment de matches sur terre battue, ce qui permet d'évaluer sa forme sur cette surface.`;
        of.awayForm_DE = `In dieser Saison hat ${awayData.properName} genügend Matches auf Sand gespielt, so dass eine gründliche Bewertung seiner Form auf diesem Belag möglich ist.`;
        of.awayForm_CZ = `V této sezóně odehrál ${awayData.properName} dostatek zápasů na antuce, což umožňuje důkladné zhodnocení jeho formy na tomto povrchu.`;
        of.awayForm_PL = `W tym sezonie ${awayData.properName} rozegrał wystarczająco dużo spotkań na glinie, co pozwala na dokładną ocenę jego formy na tej nawierzchni.`;

        if (awayFormOnClay.winPerc >= 80) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName} has an impressive win rate of ${
              awayFormOnClay.winPerc
            }% on clay, having won ${converter.toWords(
              awayFormOnClay.won
            )} matches and lost ${converter.toWords(
              awayFormOnClay.lost
            )}. Such a remarkable performance can be viewed as excellent.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` ${awayData.properName} are o rată de victorie impresionantă de ${awayFormOnClay.winPerc}% pe zgură, având meciuri câștigate ${awayFormOnClay.won} și pierdute ${awayFormOnClay.lost}. O astfel de performanță remarcabilă poate fi considerată, fără îndoială, excelentă.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` ${awayData.properName} ha un'impressionante percentuale di vittorie del ${awayFormOnClay.winPerc}% sulla terra battuta, avendo vinto ${awayFormOnClay.won} e perso ${awayFormOnClay.lost}. Una prestazione così notevole può essere considerata senza dubbio eccellente.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` ${awayData.properName} tiene un impresionante porcentaje de victorias de ${awayFormOnClay.winPerc}% en tierra batida, habiendo ganado ${awayFormOnClay.won} partidos y perdido ${awayFormOnClay.lost}. Un rendimiento tan notable puede considerarse sin duda excelente.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` ${awayData.properName} tem uma impressionante taxa de vitórias de ${awayFormOnClay.winPerc}% no saibro, tendo ganho ${awayFormOnClay.won} partidas e perdido ${awayFormOnClay.lost}. Um desempenho tão notável pode, sem dúvida, ser considerado excelente.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` ${awayData.properName} a un taux de victoire impressionnant de ${awayFormOnClay.winPerc}% sur terre battue, ayant gagné ${awayFormOnClay.won} matches et perdu ${awayFormOnClay.lost}. Une performance aussi remarquable peut sans aucun doute être considérée comme excellente.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName} hat eine beeindruckende Siegquote von ${awayFormOnClay.winPerc}% auf Sand, wobei er ${awayFormOnClay.won} Spiele gewonnen und ${awayFormOnClay.lost} verloren hat. Eine solch bemerkenswerte Leistung kann zweifellos als hervorragend angesehen werden.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} má na antuce působivou úspěšnost ${awayFormOnClay.winPerc}%, když vyhrál ${awayFormOnClay.won} zápasů a prohrál ${awayFormOnClay.lost}. Takovou pozoruhodnou výkonnost lze bezpochyby považovat za vynikající.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` ${awayData.properName} posiada imponujący wskaźnik zwycięstw ${awayFormOnClay.winPerc}% na clayu, wygrywając ${awayFormOnClay.won} mecze i przegrywając ${awayFormOnClay.lost}. Tak znakomity wynik może być bez wątpienia postrzegany jako doskonały.`;

          /// check for titles
          if (awayFormOnClay.titles.length > 0) {
            if (awayFormOnClay.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a single title on clay this season (${awayFormOnClay.titles[0].titleName}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a cucerit un titlu pe zgură în acest sezon (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un solo titolo sulla terra battuta in questa stagione (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha conseguido un único título en tierra batida esta temporada (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um único título em terra batida esta época (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un seul titre sur terre battue cette saison (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen einzigen Titel auf Sand gewonnen hat (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezoně jediný titul na antuce (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na clayu (${awayFormOnClay.titles[0].titleName}).`;
            }

            if (awayFormOnClay.titles.length > 1) {
              let titles = [];

              awayFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di assicurarsi ${
                  awayFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnClay.titles.length
                } títulos no saibro esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` En outre, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnClay.titles.length
                } Titel auf Sand zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnClay.titles.length
                } titulů na antuce (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie ${
                  awayFormOnClay.titles.length
                } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnClay.winPerc < 80 && awayFormOnClay.winPerc >= 65) {
          of.awayForm =
            of.awayForm +
            ` With a current win percentage of ${awayFormOnClay.winPerc}% on clay, ${awayData.properName} has displayed a robust form on this surface overall.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Cu un procentaj actual de ${awayFormOnClay.winPerc}% de victorii pe zgură, ${awayData.properName} a afișat o formă robustă pe această suprafață în general.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Con una percentuale di vittorie sulla terra battuta del ${awayFormOnClay.winPerc}%, ${awayData.properName} ha mostrato una forma robusta su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Con un porcentaje de victorias actual de ${awayFormOnClay.winPerc}% en tierra batida, ${awayData.properName} ha mostrado una forma sólida en esta superficie en general.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Com uma percentagem de vitórias actual de ${awayFormOnClay.winPerc}% em terra batida, ${awayData.properName} tem demonstrado uma forma robusta nesta superfície em geral.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Avec un pourcentage de victoire de ${awayFormOnClay.winPerc}% sur terre battue, ${awayData.properName} affiche une forme robuste sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Mit einer aktuellen Siegquote von ${awayFormOnClay.winPerc}% auf Sand hat ${awayData.properName} auf diesem Belag insgesamt eine robuste Form gezeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` S aktuálním procentem výher ${awayFormOnClay.winPerc}% na antuce vykazuje ${awayData.properName} na tomto povrchu celkově solidní formu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Z aktualnym procentem zwycięstw ${awayFormOnClay.winPerc}% na glinie, ${awayData.properName} prezentuje ogólnie solidną formę na tej nawierzchni.`;

          /// check for titles
          if (awayFormOnClay.titles.length > 0) {
            if (awayFormOnClay.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a title on clay this season (${awayFormOnClay.titles[0].titleName}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a cucerit un titlu pe zgură în acest sezon (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un solo titolo sulla terra battuta in questa stagione (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha conseguido un único título en tierra batida esta temporada (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um único título em terra batida esta época (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un seul titre sur terre battue cette saison (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen einzigen Titel auf Sand gewonnen hat (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezoně jediný titul na antuce (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na clayu (${awayFormOnClay.titles[0].titleName}).`;
            }

            if (awayFormOnClay.titles.length > 1) {
              let titles = [];

              awayFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di assicurarsi ${
                  awayFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnClay.titles.length
                } títulos no saibro esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` En outre, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnClay.titles.length
                } Titel auf Sand zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnClay.titles.length
                } titulů na antuce (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie ${
                  awayFormOnClay.titles.length
                } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnClay.winPerc < 65 && awayFormOnClay.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` While ${awayData.lastName}'s current form on clay can be considered satisfactory, there is certainly potential for improvement.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` În timp ce forma actuală a lui ${awayData.lastName} pe zgură poate fi considerată satisfăcătoare, există cu siguranță potențial de îmbunătățire.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sebbene la forma attuale di ${awayData.lastName} sulla terra battuta possa essere considerata soddisfacente, c'è sicuramente un potenziale di miglioramento.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Aunque el estado de forma actual de ${awayData.lastName} en tierra batida puede considerarse satisfactorio, no cabe duda de que puede mejorar.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Embora a forma actual de ${awayData.lastName} no saibro possa ser considerada satisfatória, há certamente potencial para melhorar.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Si la forme actuelle de ${awayData.lastName} sur terre battue peut être considérée comme satisfaisante, il y a certainement un potentiel d'amélioration.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Während ${awayData.lastName}'s aktuelle Form auf Sand als zufriedenstellend angesehen werden kann, gibt es sicherlich Verbesserungspotenzial.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Ačkoli lze současnou formu ${awayData.lastName} na antuce považovat za uspokojivou, určitě je co zlepšovat.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` O ile obecną formę ${awayData.lastName} na glinie można uznać za zadowalającą, to z pewnością jest potencjał do poprawy.`;

          /// check for titles
          if (awayFormOnClay.titles.length > 0) {
            if (awayFormOnClay.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a title on clay this season (${awayFormOnClay.titles[0].titleName}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a cucerit un titlu pe zgură în acest sezon (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un solo titolo sulla terra battuta in questa stagione (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha conseguido un único título en tierra batida esta temporada (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um único título em terra batida esta época (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un seul titre sur terre battue cette saison (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen einzigen Titel auf Sand gewonnen hat (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezoně jediný titul na antuce (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na clayu (${awayFormOnClay.titles[0].titleName}).`;
            }

            if (awayFormOnClay.titles.length > 1) {
              let titles = [];

              awayFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di assicurarsi ${
                  awayFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnClay.titles.length
                } títulos no saibro esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` En outre, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnClay.titles.length
                } Titel auf Sand zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnClay.titles.length
                } titulů na antuce (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie ${
                  awayFormOnClay.titles.length
                } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnClay.winPerc < 50) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName}'s performance on clay courts is suboptimal, with a win rate of only ${awayFormOnClay.winPerc}%.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Performanța lui ${awayData.properName} pe terenurile de zgură nu este bună, cu o rată de victorie de doar ${awayFormOnClay.winPerc}% în meciurile jucate.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Le prestazioni di ${awayData.properName} sui campi in terra battuta non sono buone, con una percentuale di vittorie di solo ${awayFormOnClay.winPerc}% nelle sue partite giocate.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El rendimiento de ${awayData.properName} en pistas de tierra batida no es bueno, con un porcentaje de victorias de sólo ${awayFormOnClay.winPerc}% en sus partidos jugados.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` O desempenho de ${awayData.properName} em campos de terra batida não é bom, com uma taxa de vitórias de apenas ${awayFormOnClay.winPerc}% nos jogos disputados.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Les performances de ${awayData.properName} sur terre battue ne sont pas bonnes, avec un taux de victoire de seulement ${awayFormOnClay.winPerc}% dans ses matchs joués.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName}s Leistung auf Sandplätzen ist nicht gut, mit einer Siegquote von nur ${awayFormOnClay.winPerc}% in seinen gespielten Matches.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} jeho výkonnost na antukových kurtech není dobrá, v odehraných zápasech má pouze ${awayFormOnClay.winPerc}% vítězství.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` ${awayData.properName}nie radzi sobie na kortach ziemnych, a jego wskaźnik wygranych w rozegranych meczach wynosi zaledwie ${awayFormOnClay.winPerc}%.`;
          /// check for titles
          /// check for titles
          if (awayFormOnClay.titles.length > 0) {
            if (awayFormOnClay.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched a title on clay this season (${awayFormOnClay.titles[0].titleName}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a cucerit un titlu pe zgură în acest sezon (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un solo titolo sulla terra battuta in questa stagione (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha conseguido un único título en tierra batida esta temporada (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um único título em terra batida esta época (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un seul titre sur terre battue cette saison (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen einzigen Titel auf Sand gewonnen hat (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezoně jediný titul na antuce (${awayFormOnClay.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na clayu (${awayFormOnClay.titles[0].titleName}).`;
            }

            if (awayFormOnClay.titles.length > 1) {
              let titles = [];

              awayFormOnClay.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnClay.titles.length
                )} titles on clay this season (${titles.join(', ')}).`;

              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnClay.titles.length
                } titluri pe zgură în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di assicurarsi ${
                  awayFormOnClay.titles.length
                } titoli sulla terra battuta in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnClay.titles.length
                } títulos en tierra batida esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnClay.titles.length
                } títulos no saibro esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` En outre, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnClay.titles.length
                } sur terre battue cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnClay.titles.length
                } Titel auf Sand zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnClay.titles.length
                } titulů na antuce (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie ${
                  awayFormOnClay.titles.length
                } tytułów na glinie w tym sezonie (${titles.join(', ')}).`;
            }
          }
        }
      }
    }
  }
  return of;
  // console.log(of);
};

export { formOfPlayersOnClay };
