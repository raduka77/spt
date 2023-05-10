import fs from 'fs';
import { DateTime } from 'luxon';
import { default as converter } from 'number-to-words';

const formOfPlayersOnHI = function (match, homeData, awayData) {
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
    if (match.groundType === 'Hardcourt indoor') {
      const homeFormOnHI = homeData.hardcourtIndoorStats;
      const awayFormOnHI = awayData.hardcourtIndoorStats;

      //// begin HOME

      if (homeFormOnHI.totalMatches == 0) {
        of.homeForm = `${homeData.properName} hasn't played any matches on indoor hard courts yet, so we can't show any statistics at the moment.`;
        of.homeForm_RO = `${homeData.properName} nu a jucat încă niciun meci pe terenuri hard indoor, așa că nu putem afișa statistici pentru moment.`;
        of.homeForm_IT = `${homeData.properName} non ha ancora giocato nessuna partita su campi duri indoor, quindi non possiamo mostrare alcuna statistica al momento.`;
        of.homeForm_ES = `${homeData.properName} todavía no ha jugado ningún partido en pista dura cubierta, así que no podemos mostrarle estadísticas.`;
        of.homeForm_PT = `${homeData.properName} ainda não jogou nenhum jogo em campos duros cobertos, pelo que não podemos mostrar quaisquer estatísticas de momento.`;
        of.homeForm_FR = `${homeData.properName} n'a pas encore joué de matchs sur des courts intérieurs en dur, nous ne pouvons donc pas afficher de statistiques pour le moment.`;
        of.homeForm_DE = `${homeData.properName} hat noch keine Spiele auf Indoor-Hartplätzen gespielt, daher können wir im Moment keine Statistiken anzeigen.`;
        of.homeForm_CZ = `${homeData.properName} zatím neodehrál žádný zápas na tvrdém povrchu v hale, takže v tuto chvíli nemůžeme zobrazit žádné statistiky.`;
        of.homeForm_PL = `${homeData.properName} nie rozegrał jeszcze żadnego meczu na twardych kortach w hali, więc nie możemy pokazywać żadnych statystyk w tym momencie.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (homeFormOnHI.totalMatches >= 1 && homeFormOnHI.totalMatches < 5) {
        // console.log(`win perc ${homeFormOnHI.winPerc}%`);

        of.homeForm = `${
          homeData.properName
        } has only played ${converter.toWords(
          homeFormOnHI.totalMatches
        )} matches on indoor hard courts this season, which isn't a lot, but we can still extract some statistics from them.`;
        of.homeForm_RO = `${homeData.properName} a jucat doar ${homeFormOnHI.totalMatchs} meciuri pe terenuri hard indoor în acest sezon, ceea ce nu este foarte mult, dar putem totuși extrage câteva statistici din ele.`;
        of.homeForm_IT = `${homeData.properName} ha giocato solo ${homeFormOnHI.totalMatches} partite su campi duri indoor in questa stagione, il che non è molto, ma possiamo comunque estrarne alcune statistiche.`;
        of.homeForm_ES = `${homeData.properName} sólo ha jugado ${homeFormOnHI.totalMatches} partidos en pista dura cubierta esta temporada, lo que no es mucho, pero aún así podemos extraer algunas estadísticas de ellos.`;
        of.homeForm_PT = `${homeData.properName} só jogou ${homeFormOnHI.totalMatches} jogos em campos duros cobertos esta época, o que não é muito, mas ainda assim podemos extrair algumas estatísticas deles.`;
        of.homeForm_FR = `${homeData.properName} n'a joué que ${homeFormOnHI.totalMatches} sur des courts intérieurs en dur cette saison, ce qui n'est pas beaucoup, mais nous pouvons tout de même en extraire quelques statistiques.`;
        of.homeForm_DE = `${homeData.properName} hat in dieser Saison nur ${homeFormOnHI.totalMatches} Matches auf Hartplätzen in der Halle gespielt, was nicht viel ist, aber wir können trotzdem einige Statistiken daraus extrahieren.`;
        of.homeForm_CZ = `${homeData.properName} v této sezóně odehrál pouze ${homeFormOnHI.totalMatches} zápasů na tvrdém povrchu v hale, což není mnoho, ale i tak z nich můžeme získat nějaké statistiky.`;
        of.homeForm_PL = `${homeData.properName}rozegrał w tym sezonie tylko ${homeFormOnHI.totalMatches} meczów na krytych kortach twardych, co nie jest dużo, ale i tak możemy wyciągnąć z nich jakieś statystyki.`;

        if (homeFormOnHI.winPerc >= 75) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHI.winPerc}% on indoor hard courts indicates a strong start to the season on this surface. However, it remains to be seen if she can maintain this level of performance as the season progresses.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHI.winPerc}% pe terenuri hard indoor indică un început bun de sezon pe această suprafață. Rămâne însă de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName}% sui campi duri indoor indica un ottimo inizio di stagione su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% en pista dura cubierta indica un buen comienzo de temporada en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHI.winPerc}% em campos duros interiores indica um forte início de época nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHI.winPerc}% sur les courts intérieurs en dur indique un bon début de saison sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHI.winPerc}% auf Hallen-Hartplätzen deutet auf einen starken Saisonstart auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.lastName}% na tvrdém povrchu v hale naznačuje silný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName}% na kortach twardych w hali wskazuje na dobry początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnHI.winPerc < 75 && homeFormOnHI.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHI.winPerc}% on indoor hard courts indicates a promising start to the season on this surface. Nonetheless, the question remains whether she can sustain this level of performance throughout the remainder of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHI.winPerc}% pe terenuri hard indoor indică un început de sezon promițător pe această suprafață. Cu toate acestea, rămâne întrebarea dacă poate menține acest nivel de performanță pe tot restul sezonului.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName}% sui campi duri indoor indica un inizio di stagione promettente su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% en pista dura cubierta indica un prometedor comienzo de temporada en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHI.winPerc}% em campos duros interiores indica um início de época promissor nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHI.winPerc}% sur les courts intérieurs en dur indique un début de saison prometteur sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHI.winPerc}% auf Hallen-Hartplätzen deutet auf einen vielversprechenden Start in die Saison auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName}% na tvrdých kurtech v hale ${homeFormOnHI.winPerc}% naznačuje slibný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName}% na kortach twardych w hali wskazuje na obiecujący początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnHI.winPerc < 50 && homeFormOnHI.winPerc >= 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage of ${homeFormOnHI.winPerc}% on indoor hard courts suggests a challenging start to the season on this surface. However, the uncertainty still lingers over whether she can recover and showcase a better level of performance in the upcoming matches of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} de ${homeFormOnHI.winPerc}% pe terenuri hard indoor sugerează un început de sezon dificil pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} di ${homeFormOnHI.winPerc}% sui campi duri indoor suggerisce un inizio di stagione difficile su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.properName}% de ${homeFormOnHI.winPerc}% en pistas duras cubiertas sugiere un difícil comienzo de temporada en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} de ${homeFormOnHI.winPerc}% em campos duros interiores sugere um início de época difícil nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.properName} de ${homeFormOnHI.winPerc}% sur les courts intérieurs en dur suggère un début de saison difficile sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.properName}s aktueller Siegprozentsatz von ${homeFormOnHI.winPerc}% auf Hallen-Hartplätzen deutet auf einen schwierigen Saisonstart auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName}% na tvrdém povrchu v hale naznačuje náročný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent wygranych ${homeData.properName}% na kortach twardych w hali sugeruje trudny początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnHI.winPerc < 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHI.winPerc}% on indoor hard courts suggests a disappointing start to the season on this surface. In order to improve her results, she needs to step up her game and perform at a higher level.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHI.winPerc}% pe terenuri hard indoor sugerează un început de sezon dezamăgitor pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName}% sui campi duri indoor suggerisce un inizio di stagione deludente su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje de victorias actual de ${homeData.lastName}% de ${homeFormOnHI.winPerc}% en pistas duras cubiertas sugiere un inicio de temporada decepcionante en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHI.winPerc}% em campos duros interiores sugere um início de época decepcionante nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHI.winPerc}% sur les courts intérieurs en dur suggère un début de saison décevant sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHI.winPerc}% auf Hallen-Hartplätzen deutet auf einen enttäuschenden Saisonstart auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName}% na tvrdém povrchu v hale naznačuje, že začátek sezóny na tomto povrchu je pro hráče neuspokojivý.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent wygranych ${homeData.lastName}% na kortach twardych w hali sugeruje rozczarowujący początek sezonu na tej nawierzchni.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (homeFormOnHI.totalMatches >= 5) {
        // console.log(`win perc ${homeFormOnHI.winPerc}%`);
        of.homeForm = `In the current season, ${homeData.properName} has played a sufficient number of matches on indoor hard courts, allowing for a comprehensive analysis of her form on this surface.`;
        of.homeForm_RO = `În sezonul actual, ${homeData.properName} a jucat un număr suficient de meciuri pe terenuri hard indoor, ceea ce permite o analiză cuprinzătoare a formei sale pe această suprafață.`;
        of.homeForm_IT = `Nella stagione in corso, ${homeData.properName} ha giocato un numero sufficiente di partite su campi duri indoor, consentendo un'analisi completa della sua forma su questa superficie.`;
        of.homeForm_ES = `En la temporada actual, ${homeData.properName} ha jugado un número suficiente de partidos en pista dura cubierta, lo que permite un análisis exhaustivo de su forma en esta superficie.`;
        of.homeForm_PT = `Na época actual, ${homeData.properName} disputou um número suficiente de jogos em campos duros cobertos, o que permite uma análise abrangente da sua forma nesta superfície.`;
        of.homeForm_FR = `Au cours de la saison actuelle, ${homeData.properName} a joué un nombre suffisant de matches sur des courts intérieurs en dur, ce qui permet une analyse complète de sa forme sur cette surface.`;
        of.homeForm_DE = `In der laufenden Saison hat ${homeData.properName} eine ausreichende Anzahl von Spielen auf Hallen-Hartplätzen bestritten, so dass eine umfassende Analyse seiner Form auf diesem Belag möglich ist.`;
        of.homeForm_CZ = `V aktuální sezóně odehrál ${homeData.properName} dostatečný počet zápasů na tvrdém povrchu v hale, což umožňuje komplexní analýzu jeho formy na tomto povrchu.`;
        of.homeForm_PL = `W bieżącym sezonie ${homeData.properName}rozegrał wystarczającą liczbę spotkań na twardych kortach halowych, co pozwala na kompleksową analizę jego formy na tej nawierzchni.`;

        if (homeFormOnHI.winPerc >= 80) {
          of.homeForm =
            of.homeForm +
            ` Her win rate on indoor hard courts currently stands at an impressive ${homeFormOnHI.winPerc}%, having emerged victorious in ${homeFormOnHI.won} matches and suffered defeat in ${homeFormOnHI.lost}. This performance can certainly be regarded as excellent.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Rata sa de victorie pe terenurile hard indoor se situează în prezent la un impresionant ${homeFormOnHI.winPerc}%, după ce a ieșit victorios în meciurile ${homeFormOnHI.won} și a suferit înfrângeri în cele ${homeFormOnHI.lost}. Această performanță poate fi considerată cu siguranță excelentă.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua percentuale di vittorie sui campi duri indoor è attualmente pari a un impressionante ${homeFormOnHI.winPerc}%, avendo ottenuto la vittoria in ${homeFormOnHI.won} e la sconfitta in ${homeFormOnHI.lost}. Questa prestazione può essere considerata eccellente.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su porcentaje de victorias en pista dura cubierta asciende actualmente a un impresionante ${homeFormOnHI.winPerc}%, habiendo salido victorioso en partidos ${homeFormOnHI.won} y sufrido derrotas en ${homeFormOnHI.lost}. Este rendimiento puede considerarse excelente.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua taxa de vitórias em campos duros cobertos é actualmente de uns impressionantes ${homeFormOnHI.winPerc}%, tendo saído vitorioso em jogos de ${homeFormOnHI.won} e sofrido uma derrota em ${homeFormOnHI.lost}. Este desempenho pode certamente ser considerado excelente.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Son taux de victoire sur les courts intérieurs en dur est actuellement de ${homeFormOnHI.winPerc}%, ayant remporté ${homeFormOnHI.won} et perdu ${homeFormOnHI.lost}. Cette performance peut certainement être considérée comme excellente.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine Siegquote auf Hallen-Hartplätzen liegt derzeit bei beeindruckenden ${homeFormOnHI.winPerc}%, wobei er in ${homeFormOnHI.won} Matches siegreich war und in ${homeFormOnHI.lost} eine Niederlage hinnehmen musste. Diese Leistung kann man durchaus als hervorragend bezeichnen.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho úspěšnost vítězství na tvrdém povrchu v hale je v současné době impozantní ${homeFormOnHI.winPerc}%, když zvítězil v ${homeFormOnHI.won} zápasech a utrpěl porážku v ${homeFormOnHI.lost}. Tento výkon lze jistě považovat za vynikající.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego wskaźnik zwycięstw na kortach twardych wynosi obecnie imponujące ${homeFormOnHI.winPerc}%, zwyciężając w meczach o wartości ${homeFormOnHI.won} i ponosząc porażki w meczach o wartości ${homeFormOnHI.lost}. Ten wynik można z pewnością uznać za doskonały.`;

          /// check for titles
          if (homeFormOnHI.titles.length > 0) {
            if (homeFormOnHI.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on indoor hard courts this season (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard indoor în acest sezon (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri indoor in questa stagione (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura cubierta esta temporada (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros cobertos esta época (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en salle cette saison (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Darüber hinaus hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen errungen (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na tvrdém povrchu v hale (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na krytych kortach twardych (${homeFormOnHI.titles[0].titleName}).`;
            }

            if (homeFormOnHI.titles.length > 1) {
              let titles = [];

              homeFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHI.titles.length
                } títulos em campos duros cobertos esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHI.titles.length
                } tytułów na krytych kortach twardych (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHI.winPerc < 80 && homeFormOnHI.winPerc >= 65) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage on indoor hard courts stands at ${homeFormOnHI.winPerc}%, indicating a strong overall form on this surface.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} pe terenuri hard indoor este de ${homeFormOnHI.winPerc}%, ceea ce indică o formă generală puternică pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} sui campi duri indoor è pari a ${homeFormOnHI.winPerc}%, il che indica una buona forma generale su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje actual de victorias de ${homeData.properName} en pista dura cubierta es de ${homeFormOnHI.winPerc}%, lo que indica un buen estado de forma en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} em campos duros cobertos é de ${homeFormOnHI.winPerc}%, o que indica uma boa forma geral nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoires de ${homeData.properName} sur les courts intérieurs en dur est de ${homeFormOnHI.winPerc}%, ce qui indique une bonne forme générale sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die aktuelle Siegquote von ${homeData.properName} auf Hallen-Hartplätzen liegt bei ${homeFormOnHI.winPerc}%, was auf eine starke Gesamtform auf diesem Belag hinweist.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName} na tvrdém povrchu v hale je ${homeFormOnHI.winPerc}%, což naznačuje celkově dobrou formu na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.properName} na kortach twardych wynosi ${homeFormOnHI.winPerc}%, co wskazuje na jego wysoką formę na tej nawierzchni.`;

          /// check for titles
          if (homeFormOnHI.titles.length > 0) {
            if (homeFormOnHI.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on indoor hard courts this season (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard indoor în acest sezon (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri indoor in questa stagione (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura cubierta esta temporada (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros cobertos esta época (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en salle cette saison (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Darüber hinaus hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen errungen (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na tvrdém povrchu v hale (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na krytych kortach twardych (${homeFormOnHI.titles[0].titleName}).`;
            }

            if (homeFormOnHI.titles.length > 1) {
              let titles = [];

              homeFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHI.titles.length
                } títulos em campos duros cobertos esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHI.titles.length
                } tytułów na krytych kortach twardych (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHI.winPerc < 65 && homeFormOnHI.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current form on indoor hard courts can be deemed acceptable, though there is certainly room for improvement.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma actuală a lui ${homeData.properName} pe terenurile hard indoor poate fi considerată acceptabilă, deși există cu siguranță loc pentru îmbunătățiri.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La forma attuale di ${homeData.properName} sui campi duri indoor può essere considerata accettabile, anche se c'è sicuramente un margine di miglioramento.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` La forma actual de ${homeData.properName} en pista dura cubierta puede considerarse aceptable, aunque sin duda puede mejorar.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A forma actual de ${homeData.properName} em campos duros cobertos pode ser considerada aceitável, embora haja certamente espaço para melhorias.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` La forme actuelle de ${homeData.properName} sur les courts intérieurs en dur peut être considérée comme acceptable, bien qu'il y ait certainement une marge d'amélioration.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die derzeitige Form von ${homeData.properName} auf Hallen-Hartplätzen kann als akzeptabel bezeichnet werden, auch wenn es sicherlich noch Raum für Verbesserungen gibt.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Současnou formu ${homeData.properName} na tvrdém povrchu v hale lze považovat za přijatelnou, i když je jistě co zlepšovat.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Obecną formę ${homeData.properName} na krytych kortach twardych można uznać za akceptowalną, choć z pewnością jest miejsce na poprawę.`;

          /// check for titles
          if (homeFormOnHI.titles.length > 0) {
            if (homeFormOnHI.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on indoor hard courts this season (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard indoor în acest sezon (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri indoor in questa stagione (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura cubierta esta temporada (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros cobertos esta época (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en salle cette saison (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Darüber hinaus hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen errungen (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na tvrdém povrchu v hale (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na krytych kortach twardych (${homeFormOnHI.titles[0].titleName}).`;
            }

            if (homeFormOnHI.titles.length > 1) {
              let titles = [];

              homeFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHI.titles.length
                } títulos em campos duros cobertos esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHI.titles.length
                } tytułów na krytych kortach twardych (${titles.join(', ')}).`;
            }
          }
        }

        if (homeFormOnHI.winPerc < 50) {
          of.homeForm =
            of.homeForm +
            ` Her current form on indoor hard courts courts is pretty bad, with only a ${homeFormOnHI.winPerc}% win rate in her matches played.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma sa actuală pe terenurile hard indoor este destul de proastă, cu o rată de victorie de doar ${homeFormOnHI.winPerc}% în meciurile jucate.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua attuale stato di forma sui campi duri indoor è piuttosto scadente, con solo un ${homeFormOnHI.winPerc}% di vittorie nei suoi match giocati.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su estado de forma actual en pistas duras cubiertas es bastante malo, con sólo un ${homeFormOnHI.winPerc}% de victorias en sus partidos jugados.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua forma actual em campos duros cobertos é bastante má, com uma taxa de vitórias de apenas ${homeFormOnHI.winPerc}% nos jogos disputados.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Sa forme actuelle sur les courts intérieurs en dur est assez mauvaise, avec seulement ${homeFormOnHI.winPerc}% de victoires dans ses matches joués.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine derzeitige Form auf Hallen-Hartplätzen ist ziemlich schlecht, mit nur ${homeFormOnHI.winPerc}% Siegquote in seinen gespielten Matches.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho současná forma na halových kurtech s tvrdým povrchem je velmi špatná, neboť v odehraných zápasech má pouze ${homeFormOnHI.winPerc}% úspěšnost.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego obecna forma na krytych kortach twardych jest dość zła, z zaledwie ${homeFormOnHI.winPerc}% wskaźnikiem zwycięstw w rozegranych przez niego meczach.`;

          /// check for titles
          if (homeFormOnHI.titles.length > 0) {
            if (homeFormOnHI.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on indoor hard courts this season (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard indoor în acest sezon (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri indoor in questa stagione (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura cubierta esta temporada (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros cobertos esta época (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en salle cette saison (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Darüber hinaus hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen errungen (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na tvrdém povrchu v hale (${homeFormOnHI.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na krytych kortach twardych (${homeFormOnHI.titles[0].titleName}).`;
            }

            if (homeFormOnHI.titles.length > 1) {
              let titles = [];

              homeFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${converter.toWords(
                  homeFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHI.titles.length
                } títulos em campos duros cobertos esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHI.titles.length
                } tytułów na krytych kortach twardych (${titles.join(', ')}).`;
            }
          }
        }
      }

      //// begin AWAY

      if (awayFormOnHI.totalMatches == 0) {
        of.awayForm = `At present, we are unable to display any statistics for ${awayData.properName} as there have been no matches played by him on indoor hard courts thus far.`;
        of.awayForm_RO = `În acest moment nu putem afișa nicio statistică pentru ${awayData.properName} deoarece nu există niciun meci jucat de el pe terenuri hard indoor până acum.`;
        of.awayForm_IT = `Al momento non siamo in grado di visualizzare alcuna statistica per ${awayData.properName} in quanto non sono state giocate finora partite su campi duri indoor.`;
        of.awayForm_ES = `Actualmente no podemos mostrar estadísticas para ${awayData.properName} ya que no ha jugado ningún partido en pista dura cubierta.`;
        of.awayForm_PT = `De momento, não podemos apresentar quaisquer estatísticas relativas a ${awayData.properName}, uma vez que ainda não foram disputados quaisquer jogos por ele em campos duros cobertos.`;
        of.awayForm_FR = `Pour l'instant, nous ne pouvons pas afficher de statistiques pour ${awayData.properName} car il n'a pas encore joué de matches sur des courts intérieurs en dur.`;
        of.awayForm_DE = `Zur Zeit können wir keine Statistik für ${awayData.properName} anzeigen, da er noch keine Matches auf Hallen-Hartplätzen gespielt hat.`;
        of.awayForm_CZ = `V současné době nemůžeme zobrazit žádné statistiky pro hráče ${awayData.properName}, protože dosud neodehrál žádný zápas na tvrdém povrchu v hale.`;
        of.awayForm_PL = `Obecnie nie możemy wyświetlić żadnych statystyk ${awayData.properName}, ponieważ do tej pory nie rozegrał żadnego meczu na twardych kortach w hali.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (awayFormOnHI.totalMatches >= 1 && awayFormOnHI.totalMatches < 5) {
        // console.log(`win perc ${awayFormOnHI.winPerc}%`);

        of.awayForm = `Although there haven't been many matches played by ${
          awayData.properName
        } on indoor hard courts this season - only ${converter.toWords(
          awayFormOnHI.totalMatches
        )} to be exact - we can still extract some statistics from these matches.`;
        of.awayForm_RO = `Deși nu au fost multe meciuri jucate de ${awayData.properName} pe terenuri hard indoor în acest sezon - mai exact doar ${awayFormOnHI.totalMatches} - putem totuși extrage câteva statistici din aceste meciuri.`;
        of.awayForm_IT = `Anche se non ci sono state molte partite giocate da ${awayData.properName} su campi duri indoor in questa stagione - solo ${awayFormOnHI.totalMatches} per essere precisi - possiamo comunque estrarre alcune statistiche da queste partite.`;
        of.awayForm_ES = `Aunque no ha habido muchos partidos jugados por ${awayData.properName} en pistas duras cubiertas esta temporada - sólo ${awayFormOnHI.totalMatches} para ser exactos - todavía podemos extraer algunas estadísticas de estos partidos.`;
        of.awayForm_PT = `Embora não tenha havido muitos jogos disputados por ${awayData.properName} em campos duros cobertos esta época - apenas ${awayFormOnHI.totalMatches} para ser exacto - ainda podemos extrair algumas estatísticas desses jogos.`;
        of.awayForm_FR = `Bien que ${awayData.properName} n'ait pas disputé beaucoup de matches sur des courts intérieurs en dur cette saison - seulement ${awayFormOnHI.totalMatches} pour être exact - nous pouvons tout de même extraire quelques statistiques de ces matches.`;
        of.awayForm_DE = `Obwohl ${awayData.properName} in dieser Saison noch nicht viele Spiele auf Hartplätzen in der Halle bestritten hat - nur ${awayFormOnHI.totalMatches}, um genau zu sein - können wir dennoch einige Statistiken aus diesen Spielen extrahieren.`;
        of.awayForm_CZ = `Přestože v této sezóně neodehrála ${awayData.properName} na tvrdém povrchu v hale mnoho zápasů - přesněji pouze ${awayFormOnHI.totalMatches} - můžeme z těchto zápasů získat některé statistiky.`;
        of.awayForm_PL = `Chociaż w tym sezonie nie było zbyt wielu meczów rozegranych przez ${awayData.properName} na krytych kortach twardych - a dokładnie tylko ${awayFormOnHI.totalMatches} - to i tak możemy wyciągnąć z nich pewne statystyki.`;

        if (awayFormOnHI.winPerc >= 75) {
          of.awayForm =
            of.awayForm +
            ` It appears that ${awayData.lastName} has had a strong start to the season on indoor hard courts, as indicated by her current win percentage of ${awayFormOnHI.winPerc}%. Nevertheless, it remains to be seen whether she can sustain this level of performance as the season moves forward.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon în forță pe terenurile hard indoor, după cum indică procentajul său actual de victorii de ${awayFormOnHI.winPerc}%. Cu toate acestea, rămâne de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia avuto un ottimo inizio di stagione sui campi duri indoor, come indica la sua attuale percentuale di vittorie di ${awayFormOnHI.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un buen comienzo de temporada en pista dura cubierta, como indica su actual porcentaje de victorias de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um forte início de época em campos duros cobertos, como indicado pela sua actual percentagem de vitórias de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un bon début de saison sur les courts intérieurs en dur, comme l'indique son pourcentage de victoire actuel de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen starken Start in die Saison auf Hallen-Hartplätzen hatte, wie seine aktuelle Siegquote von ${awayFormOnHI.winPerc}% zeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou silný začátek sezóny na tvrdém povrchu v hale, jak ukazuje jeho aktuální procento výher ${awayFormOnHI.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wydaje się, że ${awayData.lastName}ma dobry początek sezonu na twardych kortach w hali, na co wskazuje jego aktualny procent wygranych ${awayFormOnHI.winPerc}%.`;
        }

        if (awayFormOnHI.winPerc < 75 && awayFormOnHI.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` The present win percentage of ${awayFormOnHI.winPerc}% on indoor hard courts by ${awayData.lastName} presents a promising start to the season on this surface. Nevertheless, it raises the question of whether she can maintain this level of performance for the rest of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul actual de victorii de ${awayFormOnHI.winPerc}% pe terenuri hard indoor al lui ${awayData.lastName} reprezintă un început de sezon promițător pe această suprafață. Cu toate acestea, se pune întrebarea dacă poate menține acest nivel de performanță pentru restul sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` L'attuale percentuale di vittorie di ${awayFormOnHI.winPerc}% sui campi duri indoor di ${awayData.lastName} rappresenta un inizio di stagione promettente su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El actual porcentaje de victorias de ${awayFormOnHI.winPerc}% en pista dura cubierta de ${awayData.lastName} presenta un prometedor comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A actual percentagem de vitórias de ${awayFormOnHI.winPerc}% em campos duros cobertos de ${awayData.lastName} apresenta um início de época promissor nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire actuel de ${awayFormOnHI.winPerc}% sur dur en salle de ${awayData.lastName} représente un début de saison prometteur sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die aktuelle Siegquote von ${awayFormOnHI.winPerc}% auf Hallen-Hartplätzen von ${awayData.lastName} stellt einen vielversprechenden Saisonstart auf diesem Belag dar.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Současné procento výher ${awayFormOnHI.winPerc}% na tvrdých kurtech v hale od ${awayData.lastName} představuje slibný začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Aktualny procent zwycięstw ${awayFormOnHI.winPerc}% na twardych kortach w hali przez ${awayData.lastName} prezentuje obiecujący początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnHI.winPerc < 50 && awayFormOnHI.winPerc >= 40) {
          of.awayForm =
            of.awayForm +
            ` The win percentage of ${awayFormOnHI.winPerc}% on indoor hard courts by ${awayData.properName} portrays a tough start to the season on this surface. Nonetheless, there is still uncertainty as to whether she can bounce back and deliver a better performance in the upcoming matches of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul de victorii de ${awayFormOnHI.winPerc}% pe hard indoor al lui ${awayData.properName} arată un început de sezon dificil pe această suprafață.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` La percentuale di vittorie di ${awayFormOnHI.winPerc}% sui campi duri indoor da parte di ${awayData.properName} evidenzia un inizio di stagione difficile su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El porcentaje de victorias de ${awayFormOnHI.winPerc}% en pista dura cubierta de ${awayData.properName} retrata un duro comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A percentagem de vitórias de ${awayFormOnHI.winPerc}% em campos duros cobertos de ${awayData.properName} mostra um início de época difícil nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire de ${awayFormOnHI.winPerc}% sur dur en salle de ${awayData.properName} témoigne d'un début de saison difficile sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die Gewinnquote von ${awayFormOnHI.winPerc}% auf Hallen-Hartplätzen von ${awayData.properName} zeigt einen schwierigen Start in die Saison auf diesem Belag.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Procento výher ${awayFormOnHI.winPerc}% na tvrdém povrchu v hale podle ${awayData.properName} ukazuje těžký začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Procent zwycięstw ${awayFormOnHI.winPerc}% na kortach twardych w hali przez ${awayData.properName} obrazuje trudny początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnHI.winPerc < 40) {
          of.awayForm =
            of.awayForm +
            ` It seems that ${awayData.lastName} has had a discouraging start to the season on indoor hard courts, with a current win percentage of ${awayFormOnHI.winPerc}%. To enhance her results, the player will need to elevate her game.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon descurajator pe terenurile hard indoor, cu un procentaj actual de victorii de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia avuto un inizio di stagione scoraggiante sui campi duri indoor, con una percentuale di vittorie attuale di ${awayFormOnHI.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un comienzo de temporada desalentador en pistas duras cubiertas, con un porcentaje de victorias actual de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um início de época desanimador em campos duros cobertos, com uma percentagem de vitórias actual de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un début de saison décourageant sur les courts intérieurs en dur, avec un pourcentage de victoire actuel de ${awayFormOnHI.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen entmutigenden Start in die Hallensaison auf Hartplätzen hatte, mit einer aktuellen Gewinnquote von ${awayFormOnHI.winPerc}%.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou neutěšený začátek sezóny na tvrdém povrchu v hale s aktuálním procentem výher ${awayFormOnHI.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma zniechęcający początek sezonu na twardych kortach w hali, z aktualnym procentem wygranych ${awayFormOnHI.winPerc}%.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (awayFormOnHI.totalMatches >= 5) {
        // console.log(`win perc ${awayFormOnHI.winPerc}%`);
        of.awayForm = `During this season, ${awayData.properName} has played enough matches on indoor hard courts, thus enabling a thorough evaluation of her form on this surface.`;
        of.awayForm_RO = `În acest sezon, ${awayData.properName} a jucat suficiente meciuri pe terenuri hard indoor, permițând astfel o evaluare completă a formei sale pe această suprafață.`;
        of.awayForm_IT = `In questa stagione, ${awayData.properName} ha giocato un numero sufficiente di partite su campi duri indoor, consentendo così una valutazione approfondita della sua forma su questa superficie.`;
        of.awayForm_ES = `Durante esta temporada, ${awayData.properName} ha jugado suficientes partidos en pista dura cubierta, lo que permite una evaluación exhaustiva de su forma en esta superficie.`;
        of.awayForm_PT = `Durante esta época, ${awayData.properName} disputou um número suficiente de jogos em campos duros cobertos, o que permite uma avaliação exaustiva da sua forma nesta superfície.`;
        of.awayForm_FR = `Au cours de cette saison, ${awayData.properName} a joué suffisamment de matches sur des courts intérieurs en dur, ce qui permet une évaluation complète de sa forme sur cette surface.`;
        of.awayForm_DE = `In dieser Saison hat ${awayData.properName} genügend Matches auf Hallen-Hartplätzen gespielt, so dass eine gründliche Bewertung seiner Form auf diesem Belag möglich ist.`;
        of.awayForm_CZ = `Během této sezóny odehrál ${awayData.properName} dostatek zápasů na tvrdém povrchu v hale, což umožňuje důkladné zhodnocení jeho formy na tomto povrchu.`;
        of.awayForm_PL = `W tym sezonie ${awayData.properName} rozegrał wystarczająco dużo spotkań na krytych kortach twardych, co pozwala na dokładną ocenę jego formy na tej nawierzchni.`;

        if (awayFormOnHI.winPerc >= 80) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName} has an impressive win rate of ${awayFormOnHI.winPerc}% on indoor hard courts, having won ${awayFormOnHI.won} matches and lost ${awayFormOnHI.lost}. Such a performance can undoubtedly be viewed as excellent.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` ${awayData.properName} are o rată de victorie impresionantă de ${awayFormOnHI.winPerc}% pe terenuri hard indoor, câștigând ${awayFormOnHI.won} meciuri și pierzând ${awayFormOnHI.lost}. O astfel de performanță poate fi considerată, fără îndoială, excelentă.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` ${awayData.properName} ha un'impressionante percentuale di vittorie del ${awayFormOnHI.winPerc}% sui campi duri indoor, avendo vinto ${awayFormOnHI.won} e perso ${awayFormOnHI.lost}. Una tale prestazione può essere considerata senza dubbio eccellente.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` ${awayData.properName} tiene un impresionante porcentaje de victorias de ${awayFormOnHI.winPerc}% en pistas duras cubiertas, habiendo ganado ${awayFormOnHI.won} partidos y perdido ${awayFormOnHI.lost}. Tal rendimiento puede considerarse sin duda excelente.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` ${awayData.properName} tem uma impressionante taxa de vitórias de ${awayFormOnHI.winPerc}% em campos duros cobertos, tendo ganho ${awayFormOnHI.won} partidas e perdido ${awayFormOnHI.lost}. Este desempenho pode, sem dúvida, ser considerado excelente.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` ${awayData.properName} a un taux de victoire impressionnant de ${awayFormOnHI.winPerc}% sur les courts intérieurs en dur, ayant gagné ${awayFormOnHI.won} matches et perdu ${awayFormOnHI.lost}. Une telle performance peut sans aucun doute être considérée comme excellente.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName} hat eine beeindruckende Siegquote von ${awayFormOnHI.winPerc}% auf Hallen-Hartplätzen, wobei er ${awayFormOnHI.won} Spiele gewonnen und ${awayFormOnHI.lost} verloren hat. Eine solche Leistung kann zweifelsohne als hervorragend angesehen werden.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} má na tvrdých kurtech v hale působivou úspěšnost ${awayFormOnHI.winPerc}%, když vyhrál ${awayFormOnHI.won} zápasů a prohrál ${awayFormOnHI.lost}. Takový výkon lze bezpochyby považovat za vynikající.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` ${awayData.properName}ma imponujący współczynnik wygranych ${awayFormOnHI.winPerc}% na krytych kortach twardych, wygrywając ${awayFormOnHI.won} mecze i przegrywając ${awayFormOnHI.lost}. Taki wynik można bez wątpienia uznać za doskonały.`;

          /// check for titles
          if (awayFormOnHI.titles.length > 0) {
            if (awayFormOnHI.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on indoor hard courts this season (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard indoor în acest sezon (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri indoor in questa stagione (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura cubierta esta temporada (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros cobertos esta época (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en salle cette saison (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen gewonnen hat (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} v této sezóně získal jeden titul na tvrdém povrchu v hale (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na krytych kortach twardych (${awayFormOnHI.titles[0].titleName}).`;
            }

            if (awayFormOnHI.titles.length > 1) {
              let titles = [];

              awayFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHI.titles.length
                } em campos duros cobertos esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHI.titles.length
                } tytułów na krytych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHI.winPerc < 80 && awayFormOnHI.winPerc >= 65) {
          of.awayForm =
            of.awayForm +
            ` With a current win percentage of ${awayFormOnHI.winPerc}% on indoor hard courts, ${awayData.properName} has displayed a robust form on this surface overall.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Cu un procentaj actual de victorii de ${awayFormOnHI.winPerc}% pe terenuri hard indoor, ${awayData.properName} a afișat o formă robustă pe această suprafață în general.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Con una percentuale di vittorie di ${awayFormOnHI.winPerc}% sui campi duri indoor, ${awayData.properName} ha mostrato una buona forma su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Con un porcentaje de victorias actual de ${awayFormOnHI.winPerc}% en pistas duras cubiertas, ${awayData.properName} ha mostrado una forma robusta en esta superficie en general.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Com uma percentagem de vitórias actual de ${awayFormOnHI.winPerc}% em campos duros cobertos, ${awayData.properName} tem demonstrado uma forma robusta nesta superfície em geral.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Avec un pourcentage de victoire de ${awayFormOnHI.winPerc}% sur les courts intérieurs en dur, ${awayData.properName} affiche une forme robuste sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Mit einer aktuellen Siegquote von ${awayFormOnHI.winPerc}% auf Hallen-Hartplätzen hat ${awayData.properName} auf diesem Belag insgesamt eine robuste Form gezeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` S aktuálním procentem výher ${awayFormOnHI.winPerc}% na tvrdých kurtech v hale vykazuje ${awayData.properName} na tomto povrchu celkově solidní formu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Z procentem zwycięstw ${awayFormOnHI.winPerc}% na twardych kortach, ${awayData.properName} prezentuje solidną formę na tej nawierzchni.`;

          /// check for titles
          if (awayFormOnHI.titles.length > 0) {
            if (awayFormOnHI.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on indoor hard courts this season (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard indoor în acest sezon (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri indoor in questa stagione (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura cubierta esta temporada (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros cobertos esta época (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en salle cette saison (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen gewonnen hat (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} v této sezóně získal jeden titul na tvrdém povrchu v hale (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na krytych kortach twardych (${awayFormOnHI.titles[0].titleName}).`;
            }

            if (awayFormOnHI.titles.length > 1) {
              let titles = [];

              awayFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHI.titles.length
                } em campos duros cobertos esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHI.titles.length
                } tytułów na krytych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHI.winPerc < 65 && awayFormOnHI.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` While ${awayData.lastName}'s current form on indoor hard courts can be considered satisfactory, there is certainly potential for improvement.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` În timp ce forma actuală a lui ${awayData.lastName} pe terenurile hard indoor poate fi considerată satisfăcătoare, există cu siguranță un potențial de îmbunătățire.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sebbene la forma attuale di ${awayData.lastName} sui campi duri indoor possa essere considerata soddisfacente, c'è sicuramente un potenziale di miglioramento.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Aunque el estado de forma actual de ${awayData.lastName} en pista dura cubierta puede considerarse satisfactorio, no cabe duda de que puede mejorar.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Embora a forma actual de ${awayData.lastName} em campos duros cobertos possa ser considerada satisfatória, há certamente potencial para melhorar.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Si la forme actuelle de ${awayData.lastName} sur les courts intérieurs en dur peut être considérée comme satisfaisante, il y a certainement un potentiel d'amélioration.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die aktuelle Form von ${awayData.lastName} auf Hallen-Hartplätzen kann zwar als zufriedenstellend bezeichnet werden, aber es gibt sicherlich noch Verbesserungspotenzial.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Ačkoli lze současnou formu ${awayData.lastName} na tvrdém povrchu v hale považovat za uspokojivou, určitě je zde potenciál ke zlepšení.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Choć obecną formę ${awayData.lastName} na krytych kortach twardych można uznać za zadowalającą, to z pewnością jest potencjał do poprawy.`;

          /// check for titles
          if (awayFormOnHI.titles.length > 0) {
            if (awayFormOnHI.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on indoor hard courts this season (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard indoor în acest sezon (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri indoor in questa stagione (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura cubierta esta temporada (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros cobertos esta época (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en salle cette saison (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen gewonnen hat (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} v této sezóně získal jeden titul na tvrdém povrchu v hale (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na krytych kortach twardych (${awayFormOnHI.titles[0].titleName}).`;
            }

            if (awayFormOnHI.titles.length > 1) {
              let titles = [];

              awayFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHI.titles.length
                } em campos duros cobertos esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHI.titles.length
                } tytułów na krytych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHI.winPerc < 50) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName}'s performance on indoor hard courts is not good, with a win rate of only ${awayFormOnHI.winPerc}%.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Performanța lui ${awayData.properName} pe terenurile hard indoor nu este bună, cu o rată de victorie de numai ${awayFormOnHI.winPerc}% în meciurile jucate.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Le prestazioni di ${awayData.properName} sui campi duri indoor non sono buone, con una percentuale di vittorie di solo ${awayFormOnHI.winPerc}% nelle sue partite giocate.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El rendimiento de ${awayData.properName} en pistas duras cubiertas no es bueno, con un porcentaje de victorias de sólo ${awayFormOnHI.winPerc}% en sus partidos jugados.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` O desempenho de ${awayData.properName} em campos duros cobertos não é bom, com uma taxa de vitórias de apenas ${awayFormOnHI.winPerc}% nos jogos disputados.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Les performances de ${awayData.properName} sur les courts intérieurs en dur ne sont pas bonnes, avec un taux de victoire de seulement ${awayFormOnHI.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName}s Leistung auf Hallen-Hartplätzen ist nicht gut, mit einer Siegquote von nur ${awayFormOnHI.winPerc}% in seinen gespielten Matches.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} jeho výkonnost na tvrdých kurtech v hale není dobrá, v jeho odehraných zápasech je pouze ${awayFormOnHI.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Występy ${awayData.properName} na kortach twardych krytych nie są dobre, a wskaźnik wygranych w jego rozegranych meczach wynosi zaledwie ${awayFormOnHI.winPerc}%.`;

          /// check for titles
          if (awayFormOnHI.titles.length > 0) {
            if (awayFormOnHI.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on indoor hard courts this season (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard indoor în acest sezon (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri indoor in questa stagione (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura cubierta esta temporada (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros cobertos esta época (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en salle cette saison (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen gewonnen hat (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} v této sezóně získal jeden titul na tvrdém povrchu v hale (${awayFormOnHI.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na krytych kortach twardych (${awayFormOnHI.titles[0].titleName}).`;
            }

            if (awayFormOnHI.titles.length > 1) {
              let titles = [];

              awayFormOnHI.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${converter.toWords(
                  awayFormOnHI.titles.length
                )} titles on indoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHI.titles.length
                } titluri pe terenuri hard indoor în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHI.titles.length
                } titoli su campi duri indoor in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHI.titles.length
                } títulos en pista dura cubierta esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHI.titles.length
                } em campos duros cobertos esta época (${titles.join(', ')}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHI.titles.length
                } sur des courts intérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHI.titles.length
                } Titel auf Hallen-Hartplätzen zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnHI.titles.length
                } titulů na tvrdém povrchu v hale (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHI.titles.length
                } tytułów na krytych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }
      }
    }
  }
  return of;
  // console.log(of);
};

export { formOfPlayersOnHI };
