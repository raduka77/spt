import fs from 'fs';
import { DateTime } from 'luxon';
import { default as converter } from 'number-to-words';

const formOfPlayersOnGrass = function (match, homeData, awayData) {
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
    if (match.groundType === 'Grass') {
      const homeFormOnGrass = homeData.grassStats;
      const awayFormOnGrass = awayData.grassStats;

      //// begin HOME

      if (homeFormOnGrass.totalMatches == 0) {
        of.homeForm = `${homeData.properName} hasn't played any matches on grass courts yet, so we can't show any statistics at the moment.`;
        of.homeForm_RO = `${homeData.properName} nu a jucat încă niciun meci pe terenuri cu iarbă, așa că nu putem afișa nicio statistică în acest moment.`;
        of.homeForm_IT = `${homeData.properName} non ha ancora giocato nessuna partita su campi in erba, quindi non possiamo mostrare alcuna statistica al momento.`;
        of.homeForm_ES = `${homeData.properName} aún no ha jugado ningún partido en pistas de hierba, así que no podemos mostrarte ninguna estadística por el momento.`;
        of.homeForm_PT = `${homeData.properName} ainda não jogou nenhum jogo em campos de relva, pelo que não podemos mostrar quaisquer estatísticas de momento.`;
        of.homeForm_FR = `${homeData.properName} n'a pas encore joué de match sur gazon, nous ne pouvons donc pas afficher de statistiques pour le moment.`;
        of.homeForm_DE = `${homeData.properName} hat noch keine Spiele auf Rasenplätzen bestritten, daher können wir im Moment keine Statistiken anzeigen.`;
        of.homeForm_CZ = `${homeData.properName} zatím neodehrál žádný zápas na travnatých kurtech, takže v tuto chvíli nemůžeme zobrazit žádné statistiky.`;
        of.homeForm_PL = `${homeData.properName} nie rozegrał jeszcze żadnego meczu na kortach trawiastych, więc nie możemy w tej chwili pokazywać żadnych statystyk.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (
        homeFormOnGrass.totalMatches >= 1 &&
        homeFormOnGrass.totalMatches < 5
      ) {
        // console.log(`win perc ${homeFormOnGrass.winPerc}%`);

        of.homeForm = `${
          homeData.properName
        } has only played ${converter.toWords(
          homeFormOnGrass.totalMatches
        )} matches on grass courts this season, which isn't a lot, but we can still extract some statistics from them.`;
        of.homeForm_RO = `${homeData.properName} a jucat doar ${homeFormOnGrass.totalMatches} meciuri pe iarbă în acest sezon, ceea ce nu este foarte mult, dar putem totuși extrage câteva statistici din ele.`;
        of.homeForm_IT = `${homeData.properName} ha giocato solo ${homeFormOnGrass.totalMatches} sui campi in erba in questa stagione, il che non è molto, ma possiamo comunque estrarne alcune statistiche.`;
        of.homeForm_ES = `${homeData.properName} sólo ha jugado ${homeFormOnGrass.totalMatches} partidos en pistas de hierba esta temporada, lo que no es mucho, pero aún así podemos extraer algunas estadísticas de ellos.`;
        of.homeForm_PT = `${homeData.properName} só jogou ${homeFormOnGrass.totalMatches} jogos em campos de relva esta época, o que não é muito, mas ainda assim podemos extrair algumas estatísticas deles.`;
        of.homeForm_FR = `${homeData.properName} n'a joué que ${homeFormOnGrass.totalMatches} sur gazon cette saison, ce qui n'est pas beaucoup, mais nous pouvons tout de même en tirer quelques statistiques.`;
        of.homeForm_DE = `${homeData.properName} hat in dieser Saison nur ${homeFormOnGrass.totalMatches} Matches auf Rasenplätzen gespielt, was nicht viel ist, aber wir können trotzdem einige Statistiken daraus extrahieren.`;
        of.homeForm_CZ = `${homeData.properName} v této sezóně odehrál pouze ${homeFormOnGrass.totalMatches} zápasů na travnatých kurtech, což není mnoho, ale přesto z nich můžeme získat nějaké statistiky.`;
        of.homeForm_PL = `${homeData.properName}rozegrał w tym sezonie tylko ${homeFormOnGrass.totalMatches} meczów na kortach trawiastych, co nie jest dużo, ale i tak możemy wyciągnąć z nich jakieś statystyki.`;

        if (homeFormOnGrass.winPerc >= 75) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnGrass.winPerc}% on grass courts indicates a strong start to the season on this surface. However, it remains to be seen if she can maintain this level of performance as the season progresses.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnGrass.winPerc}% pe iarbă indică un început bun de sezon pe această suprafață. Rămâne însă de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnGrass.winPerc}% sui campi in erba indica un forte inizio di stagione su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% en hierba de ${homeFormOnGrass.winPerc}% indica un buen comienzo de temporada en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnGrass.winPerc}% em campos de relva indica um forte início de época nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnGrass.winPerc}% sur gazon indique un bon début de saison sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnGrass.winPerc}% auf Rasenplätzen deutet auf einen starken Start in die Saison auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.lastName}% na travnatých kurtech ${homeFormOnGrass.winPerc}% naznačuje silný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName} na kortach trawiastych wynoszący ${homeFormOnGrass.winPerc}% wskazuje na dobry początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnGrass.winPerc < 75 && homeFormOnGrass.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnGrass.winPerc}% on grass courts indicates a promising start to the season on this surface. Nonetheless, the question remains whether she can sustain this level of performance throughout the remainder of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnGrass.winPerc}% pe terenuri cu iarbă indică un început de sezon promițător pe această suprafață. Cu toate acestea, rămâne întrebarea dacă poate menține acest nivel de performanță pe tot restul sezonului.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnGrass.winPerc}% sui campi in erba indica un inizio di stagione promettente su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% en hierba de ${homeFormOnGrass.winPerc}% indica un prometedor comienzo de temporada en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnGrass.winPerc}% em campos de relva indica um início de época promissor nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnGrass.winPerc}% sur gazon indique un début de saison prometteur sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnGrass.winPerc}% auf Rasenplätzen deutet auf einen vielversprechenden Start in die Saison auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.lastName}% na travnatých kurtech ${homeFormOnGrass.winPerc}% naznačuje slibný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName} na trawie wynoszący ${homeFormOnGrass.winPerc}% wskazuje na obiecujący początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnGrass.winPerc < 50 && homeFormOnGrass.winPerc >= 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage of ${homeFormOnGrass.winPerc}% on grass courts suggests a challenging start to the season on this surface. However, the uncertainty still lingers over whether she can recover and showcase a better level of performance in the upcoming matches of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} de ${homeFormOnGrass.winPerc}% pe iarbă sugerează un început de sezon dificil pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} di ${homeFormOnGrass.winPerc}% sui campi in erba suggerisce un inizio di stagione difficile su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.properName}% de ${homeFormOnGrass.winPerc}% en pistas de hierba sugiere un inicio de temporada complicado en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} de ${homeFormOnGrass.winPerc}% em campos de relva sugere um início de época difícil nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.properName} de ${homeFormOnGrass.winPerc}% sur gazon suggère un début de saison difficile sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.properName}s aktuelle Siegquote von ${homeFormOnGrass.winPerc}% auf Rasenplätzen deutet auf einen schwierigen Saisonstart auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName}% na travnatých kurtech naznačuje náročný začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent wygranych ${homeData.properName}% na kortach trawiastych sugeruje trudny początek sezonu na tej nawierzchni.`;
        }

        if (homeFormOnGrass.winPerc < 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnGrass.winPerc}% on grass courts suggests a disappointing start to the season on this surface. In order to improve her results, she needs to step up her game and perform at a higher level.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnGrass.winPerc}% pe iarbă sugerează un început de sezon dezamăgitor pe această suprafață. Pentru a-și îmbunătăți rezultatele, trebuie să își intensifice jocul și să performeze la un nivel mai ridicat.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnGrass.winPerc}% sui campi in erba suggerisce un inizio di stagione deludente su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% en hierba de ${homeFormOnGrass.winPerc}% sugiere un inicio de temporada decepcionante en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnGrass.winPerc}% em campos de relva sugere um início de época decepcionante nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoires de ${homeData.lastName} sur gazon de ${homeFormOnGrass.winPerc}% suggère un début de saison décevant sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnGrass.winPerc}% auf Rasenplätzen deutet auf einen enttäuschenden Start in die Saison auf diesem Belag hin.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento vítězství ${homeData.lastName}% na travnatých kurtech naznačuje neuspokojivý začátek sezóny na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName} na kortach trawiastych wynoszący ${homeFormOnGrass.winPerc}% sugeruje rozczarowujący początek sezonu na tej nawierzchni.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (homeFormOnGrass.totalMatches >= 5) {
        // console.log(`win perc ${homeFormOnGrass.winPerc}%`);
        of.homeForm = `In the current season, ${homeData.properName} has played a sufficient number of matches on grass courts, allowing for a comprehensive analysis of her form on this surface.`;
        of.homeForm_RO = `În sezonul actual, ${homeData.properName} a jucat un număr suficient de meciuri pe iarbă, ceea ce permite o analiză cuprinzătoare a formei sale pe această suprafață.`;
        of.homeForm_IT = `Nella stagione in corso, ${homeData.properName} ha giocato un numero sufficiente di partite su campi in erba, consentendo un'analisi completa della sua forma su questa superficie.`;
        of.homeForm_ES = `En la temporada actual, ${homeData.properName} ha jugado un número suficiente de partidos en pistas de hierba, lo que permite un análisis exhaustivo de su estado de forma en esta superficie.`;
        of.homeForm_PT = `Na época actual, ${homeData.properName} disputou um número suficiente de jogos em campos de relva, o que permite uma análise abrangente da sua forma nesta superfície.`;
        of.homeForm_FR = `Au cours de la saison actuelle, ${homeData.properName} a joué un nombre suffisant de matches sur gazon, ce qui permet une analyse complète de sa forme sur cette surface.`;
        of.homeForm_DE = `In der laufenden Saison hat ${homeData.properName} eine ausreichende Anzahl von Spielen auf Rasenplätzen bestritten, so dass eine umfassende Analyse seiner Form auf diesem Belag möglich ist.`;
        of.homeForm_CZ = `V aktuální sezóně odehrál ${homeData.properName} dostatečný počet zápasů na travnatých kurtech, což umožňuje komplexní analýzu jeho formy na tomto povrchu.`;
        of.homeForm_PL = `W bieżącym sezonie ${homeData.properName} rozegrał wystarczającą liczbę spotkań na kortach trawiastych, co pozwala na kompleksową analizę jego formy na tej nawierzchni.`;

        if (homeFormOnGrass.winPerc >= 80) {
          of.homeForm =
            of.homeForm +
            ` Her win rate on grass courts currently stands at an impressive ${homeFormOnGrass.winPerc}%, having emerged victorious in ${homeFormOnGrass.won} matches and suffered defeat in ${homeFormOnGrass.lost}. This performance can certainly be regarded as excellent.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Rata sa de victorii pe iarbă se situează în prezent la un impresionant ${homeFormOnGrass.winPerc}%, după ce a ieșit victorios în ${homeFormOnGrass.won} meciuri și pierdut ${homeFormOnGrass.lost}. Această performanță poate fi considerată excelentă.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua percentuale di vittorie sui campi in erba è attualmente pari a un impressionante ${homeFormOnGrass.winPerc}%, avendo ottenuto la vittoria in ${homeFormOnGrass.won} e la sconfitta in ${homeFormOnGrass.lost}. Questa prestazione può essere considerata eccellente.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su porcentaje de victorias en pistas de hierba se sitúa actualmente en un impresionante ${homeFormOnGrass.winPerc}%, habiendo salido victorioso en ${homeFormOnGrass.won} partidos y sufrido derrotas en ${homeFormOnGrass.lost}. Sin duda, este rendimiento puede considerarse excelente.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua taxa de vitórias em campos de relva é actualmente de uns impressionantes ${homeFormOnGrass.winPerc}%, tendo saído vitorioso em jogos de ${homeFormOnGrass.won} e sofrido derrotas em ${homeFormOnGrass.lost}. Este desempenho pode certamente ser considerado excelente.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Son taux de victoire sur gazon est actuellement de ${homeFormOnGrass.winPerc}%, ayant remporté ${homeFormOnGrass.won} et perdu ${homeFormOnGrass.lost}. Cette performance peut certainement être considérée comme excellente.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine Siegquote auf Rasenplätzen liegt derzeit bei beeindruckenden ${homeFormOnGrass.winPerc}%, wobei er in ${homeFormOnGrass.won} Matches siegreich war und in ${homeFormOnGrass.lost} eine Niederlage hinnehmen musste. Diese Leistung kann man durchaus als hervorragend bezeichnen.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho úspěšnost na travnatých kurtech je v současné době úctyhodných ${homeFormOnGrass.winPerc}%, když zvítězil v ${homeFormOnGrass.won} zápasech a utrpěl porážku v ${homeFormOnGrass.lost}. Tento výkon lze jistě považovat za vynikající.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego wskaźnik zwycięstw na kortach trawiastych wynosi obecnie imponujące ${homeFormOnGrass.winPerc}%, zwyciężając w meczach o wartości ${homeFormOnGrass.won} i ponosząc porażki w meczach o wartości ${homeFormOnGrass.lost}. Ten wynik z pewnością można uznać za doskonały.`;

          /// check for titles
          if (homeFormOnGrass.titles.length > 0) {
            if (homeFormOnGrass.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on grass courts this season (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe iarbă în acest sezon (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi in erba in questa stagione (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título sobre hierba esta temporada (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em campos de relva esta época (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur gazon cette saison (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Rasenplätzen errungen (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na travnatých kurtech (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na kortach trawiastych (${homeFormOnGrass.titles[0].titleName}).`;
            }

            if (homeFormOnGrass.titles.length > 1) {
              let titles = [];

              homeFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${
                  homeFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu gewinnen (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${
                  homeData.properName
                } podařilo v této sezóně získat ${
                  homeFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał wyczynu polegającego na zdobyciu ${
                  homeFormOnGrass.titles.length
                } tytułów na kortach trawiastych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnGrass.winPerc < 80 && homeFormOnGrass.winPerc >= 65) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage on grass courts stands at ${homeFormOnGrass.winPerc}%, indicating a strong overall form on this surface.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} pe iarbă este de ${homeFormOnGrass.winPerc}%, ceea ce indică o formă generală puternică pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} sui campi in erba è pari a ${homeFormOnGrass.winPerc}%, il che indica una buona forma generale su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje actual de victorias de ${homeData.properName} en hierba es de ${homeFormOnGrass.winPerc}%, lo que indica una buena forma general en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} em campos de relva é de ${homeFormOnGrass.winPerc}%, o que indica uma boa forma geral nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoires de ${homeData.properName} sur gazon est de ${homeFormOnGrass.winPerc}%, ce qui indique une bonne forme générale sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die aktuelle Gewinnquote von ${homeData.properName} auf Rasenplätzen liegt bei ${homeFormOnGrass.winPerc}%, was auf eine starke Gesamtform auf diesem Belag hinweist.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName} na travnatých kurtech je ${homeFormOnGrass.winPerc}%, což naznačuje celkově dobrou formu na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.properName} na kortach trawiastych wynosi ${homeFormOnGrass.winPerc}%, co wskazuje na jego wysoką formę na tej nawierzchni.`;

          /// check for titles
          if (homeFormOnGrass.titles.length > 0) {
            if (homeFormOnGrass.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on grass courts this season (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe iarbă în acest sezon (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi in erba in questa stagione (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título sobre hierba esta temporada (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em campos de relva esta época (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur gazon cette saison (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Rasenplätzen errungen (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na travnatých kurtech (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na kortach trawiastych (${homeFormOnGrass.titles[0].titleName}).`;
            }

            if (homeFormOnGrass.titles.length > 1) {
              let titles = [];

              homeFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${
                  homeFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu gewinnen (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${
                  homeData.properName
                } podařilo v této sezóně získat ${
                  homeFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał wyczynu polegającego na zdobyciu ${
                  homeFormOnGrass.titles.length
                } tytułów na kortach trawiastych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnGrass.winPerc < 65 && homeFormOnGrass.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current form on grass courts can be deemed acceptable, though there is certainly room for improvement.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma actuală a lui ${homeData.properName} pe terenurile cu iarbă poate fi considerată acceptabilă, deși există cu siguranță loc pentru îmbunătățiri.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La forma attuale di ${homeData.properName} sui campi in erba può essere considerata accettabile, anche se c'è sicuramente un margine di miglioramento.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` La forma actual de ${homeData.properName} en pistas de hierba puede considerarse aceptable, aunque sin duda puede mejorar.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A forma actual de ${homeData.properName} em campos de relva pode ser considerada aceitável, embora haja certamente espaço para melhorias.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` La forme actuelle de ${homeData.properName} sur les courts en herbe peut être considérée comme acceptable, bien qu'il y ait certainement une marge d'amélioration.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die derzeitige Form von ${homeData.properName} auf Rasenplätzen kann als akzeptabel bezeichnet werden, obwohl es sicherlich noch Raum für Verbesserungen gibt.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Současnou formu ${homeData.properName} na travnatých kurtech lze považovat za přijatelnou, i když je jistě co zlepšovat.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Obecną formę ${homeData.properName} na kortach trawiastych można uznać za akceptowalną, choć z pewnością jest miejsce na poprawę.`;

          /// check for titles
          if (homeFormOnGrass.titles.length > 0) {
            if (homeFormOnGrass.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on grass courts this season (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe iarbă în acest sezon (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi in erba in questa stagione (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título sobre hierba esta temporada (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em campos de relva esta época (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur gazon cette saison (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Rasenplätzen errungen (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na travnatých kurtech (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na kortach trawiastych (${homeFormOnGrass.titles[0].titleName}).`;
            }

            if (homeFormOnGrass.titles.length > 1) {
              let titles = [];

              homeFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${
                  homeFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu gewinnen (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${
                  homeData.properName
                } podařilo v této sezóně získat ${
                  homeFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał wyczynu polegającego na zdobyciu ${
                  homeFormOnGrass.titles.length
                } tytułów na kortach trawiastych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnGrass.winPerc < 50) {
          of.homeForm =
            of.homeForm +
            ` Her current form on grass courts is not that good, with only a ${homeFormOnGrass.winPerc}% win rate.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma sa actuală pe iarbă nu este prea bună, cu o rată de victorie de doar ${homeFormOnGrass.winPerc}% în meciurile jucate.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua forma attuale sui campi in erba non è molto buona, con solo un ${homeFormOnGrass.winPerc}% di vittorie nelle sue partite giocate.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su forma actual en pistas de hierba no es tan buena, con sólo un ${homeFormOnGrass.winPerc}% de victorias en sus partidos jugados.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua forma actual em campos de relva não é assim tão boa, com uma taxa de vitórias de apenas ${homeFormOnGrass.winPerc}% nos jogos disputados.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Sa forme actuelle sur gazon n'est pas très bonne, avec seulement ${homeFormOnGrass.winPerc}% de victoires dans les matches qu'il a joués.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine derzeitige Form auf Rasenplätzen ist nicht so gut, mit nur ${homeFormOnGrass.winPerc}% Siegquote in seinen gespielten Matches.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho současná forma na travnatých kurtech není tak dobrá, v odehraných zápasech má pouze ${homeFormOnGrass.winPerc}% úspěšnost.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego obecna forma na kortach trawiastych nie jest aż tak dobra, z zaledwie ${homeFormOnGrass.winPerc}% wskaźnikiem wygranych w swoich rozegranych meczach.`;

          /// check for titles
          if (homeFormOnGrass.titles.length > 0) {
            if (homeFormOnGrass.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on grass courts this season (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe iarbă în acest sezon (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi in erba in questa stagione (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título sobre hierba esta temporada (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${homeData.lastName} conseguiu garantir um título em campos de relva esta época (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur gazon cette saison (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Rasenplätzen errungen (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na travnatých kurtech (${homeFormOnGrass.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na kortach trawiastych (${homeFormOnGrass.titles[0].titleName}).`;
            }

            if (homeFormOnGrass.titles.length > 1) {
              let titles = [];

              homeFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.homeForm =
                of.homeForm +
                ` Moreover, ${
                  homeData.properName
                } has achieved the feat of clinching ${
                  homeFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu gewinnen (${titles.join(', ')}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${
                  homeData.properName
                } podařilo v této sezóně získat ${
                  homeFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${
                  homeData.properName
                } dokonał wyczynu polegającego na zdobyciu ${
                  homeFormOnGrass.titles.length
                } tytułów na kortach trawiastych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }
      }

      //// begin AWAY

      if (awayFormOnGrass.totalMatches == 0) {
        of.awayForm = `At present, we are unable to display any statistics for ${awayData.properName} as there have been no matches played by him on grass courts thus far.`;
        of.awayForm_RO = `În acest moment nu putem afișa nicio statistică pentru ${awayData.properName} deoarece nu există niciun meci jucat de el pe iarbă până acum.`;
        of.awayForm_IT = `Al momento non siamo in grado di visualizzare alcuna statistica per ${awayData.properName} in quanto non sono state giocate finora partite su campi in erba.`;
        of.awayForm_ES = `En este momento, no podemos mostrar ninguna estadística para ${awayData.properName} ya que no ha habido partidos jugados por él en canchas de hierba hasta el momento.`;
        of.awayForm_PT = `De momento, não podemos apresentar quaisquer estatísticas relativas a ${awayData.properName}, uma vez que não foram disputados quaisquer jogos por ele em campos de relva até ao momento.`;
        of.awayForm_FR = `Pour l'instant, nous ne pouvons pas afficher de statistiques pour ${awayData.properName} car il n'a joué aucun match sur gazon jusqu'à présent.`;
        of.awayForm_DE = `Zur Zeit können wir keine Statistik für ${awayData.properName} anzeigen, da er noch keine Spiele auf Rasenplätzen gespielt hat.`;
        of.awayForm_CZ = `V současné době nemůžeme zobrazit žádné statistiky pro hráče ${awayData.properName}, protože na travnatých kurtech dosud neodehrál žádný zápas.`;
        of.awayForm_PL = `Obecnie nie jesteśmy w stanie wyświetlić żadnych statystyk dla ${awayData.properName}, ponieważ do tej pory nie rozegrał żadnego meczu na kortach trawiastych.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (
        awayFormOnGrass.totalMatches >= 1 &&
        awayFormOnGrass.totalMatches < 5
      ) {
        // console.log(`win perc ${awayFormOnGrass.winPerc}%`);

        of.awayForm = `Although there haven't been many matches played by ${
          awayData.properName
        } on grass courts this season - only ${converter.toWords(
          awayFormOnGrass.totalMatches
        )} to be exact - we can still extract some statistics from these matches.`;
        of.awayForm_RO = `Deși nu au fost multe meciuri jucate de ${awayData.properName} pe terenuri de iarbă în acest sezon - mai exact doar ${awayFormOnGrass.totalMatches} - putem totuși extrage câteva statistici din aceste meciuri.`;
        of.awayForm_IT = `Anche se non ci sono state molte partite giocate da ${awayData.properName} sui campi in erba in questa stagione - solo ${awayFormOnGrass.totalMatches} per essere precisi - possiamo comunque estrarre alcune statistiche da queste partite.`;
        of.awayForm_ES = `Aunque no ha habido muchos partidos jugados por ${awayData.properName} en pistas de hierba esta temporada - sólo ${awayFormOnGrass.totalMatches} para ser exactos - todavía podemos extraer algunas estadísticas de estos partidos.`;
        of.awayForm_PT = `Embora não tenha havido muitos jogos disputados por ${awayData.properName} em campos de relva esta época - apenas ${awayFormOnGrass.totalMatches} para ser exacto - ainda podemos extrair algumas estatísticas desses jogos.`;
        of.awayForm_FR = `Bien que ${awayData.properName} n'ait pas disputé beaucoup de matches sur gazon cette saison - seulement ${awayFormOnGrass.totalMatches} pour être exact - nous pouvons tout de même extraire quelques statistiques de ces matches.`;
        of.awayForm_DE = `Obwohl ${awayData.properName} in dieser Saison nicht viele Matches auf Rasenplätzen gespielt hat - nur ${awayFormOnGrass.totalMatches} um genau zu sein - können wir dennoch einige Statistiken aus diesen Matches extrahieren.`;
        of.awayForm_CZ = `Přestože v této sezóně neodehrála ${awayData.properName} na travnatých kurtech mnoho zápasů - přesněji pouze ${awayFormOnGrass.totalMatches} - můžeme z těchto zápasů získat některé statistiky.`;
        of.awayForm_PL = `Mimo, że w tym sezonie nie było zbyt wielu meczów rozegranych przez ${awayData.properName} na kortach trawiastych - dokładnie tylko ${awayFormOnGrass.totalMatches} - to i tak możemy wyciągnąć z nich pewne statystyki.`;

        if (awayFormOnGrass.winPerc >= 75) {
          of.awayForm =
            of.awayForm +
            ` It appears that ${awayData.lastName} has had a strong start to the season on grass courts, as indicated by her current win percentage of ${awayFormOnGrass.winPerc}%. Nevertheless, it remains to be seen whether she can sustain this level of performance as the season moves forward.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon bun pe iarbă, după cum indică procentajul său actual de victorii de ${awayFormOnGrass.winPerc}%. Cu toate acestea, rămâne de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia iniziato bene la stagione sui campi in erba, come indica la sua attuale percentuale di vittorie di ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un buen comienzo de temporada en hierba, como indica su actual porcentaje de victorias de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que o ${awayData.lastName} teve um forte início de época em campos de relva, como indicado pela sua actual percentagem de vitórias de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un bon début de saison sur gazon, comme l'indique son pourcentage de victoire actuel de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen starken Start in die Saison auf Rasenplätzen hatte, wie seine aktuelle Siegquote von ${awayFormOnGrass.winPerc}% zeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou silný začátek sezóny na travnatých kurtech, jak ukazuje jeho aktuální procento výher ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma dobry początek sezonu na kortach trawiastych, na co wskazuje jego aktualny procent wygranych ${awayFormOnGrass.winPerc}%.`;
        }

        if (awayFormOnGrass.winPerc < 75 && awayFormOnGrass.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` The present win percentage of ${awayFormOnGrass.winPerc}% on grass courts by ${awayData.lastName} presents a promising start to the season on this surface. Nevertheless, it raises the question of whether she can maintain this level of performance for the rest of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul actual de victorii de ${awayFormOnGrass.winPerc}% pe terenuri cu iarbă al lui ${awayData.lastName} reprezintă un început de sezon promițător pe această suprafață. Cu toate acestea, se pune întrebarea dacă poate menține acest nivel de performanță pentru restul sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` L'attuale percentuale di vittorie di ${awayFormOnGrass.winPerc}% sui campi in erba di ${awayData.lastName} rappresenta un inizio di stagione promettente su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El actual porcentaje de victorias de ${awayFormOnGrass.winPerc}% en pistas de hierba de ${awayData.lastName} presenta un prometedor comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A actual percentagem de vitórias de ${awayFormOnGrass.winPerc}% em campos de relva por ${awayData.lastName} apresenta um início de época promissor nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire actuel de ${awayFormOnGrass.winPerc}% sur gazon de ${awayData.lastName} représente un début de saison prometteur sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die aktuelle Gewinnquote von ${awayFormOnGrass.winPerc}% auf Rasenplätzen von ${awayData.lastName} stellt einen vielversprechenden Saisonstart auf diesem Belag dar.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Současné procento vítězství ${awayFormOnGrass.winPerc}% na travnatých kurtech od ${awayData.lastName} představuje slibný začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Aktualny procent wygranych ${awayFormOnGrass.winPerc}% na kortach trawiastych przez ${awayData.lastName} prezentuje obiecujący początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnGrass.winPerc < 50 && awayFormOnGrass.winPerc >= 40) {
          of.awayForm =
            of.awayForm +
            ` The win percentage of ${awayFormOnGrass.winPerc}% on grass courts by ${awayData.properName} portrays a tough start to the season on this surface. Nonetheless, there is still uncertainty as to whether she can bounce back and deliver a better performance in the upcoming matches of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul de victorii de ${awayFormOnGrass.winPerc}% pe terenuri cu iarbă al lui ${awayData.properName} arată un început de sezon dificil pe această suprafață. Cu toate acestea, există încă incertitudini cu privire la faptul dacă își poate reveni și poate oferi o performanță mai bună în următoarele meciuri ale sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` La percentuale di vittorie di ${awayFormOnGrass.winPerc}% sui campi in erba da parte di ${awayData.properName} evidenzia un inizio di stagione difficile su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El porcentaje de victorias de ${awayFormOnGrass.winPerc}% en pistas de hierba de ${awayData.properName} retrata un duro comienzo de temporada en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A percentagem de vitórias de ${awayFormOnGrass.winPerc}% em campos de relva por ${awayData.properName} retrata um início de época difícil nesta superfície.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire de ${awayFormOnGrass.winPerc}% sur gazon de ${awayData.properName} témoigne d'un début de saison difficile sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die Gewinnquote von ${awayFormOnGrass.winPerc}% auf Rasenplätzen von ${awayData.properName} zeigt einen schwierigen Saisonstart auf diesem Belag.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Procento výher ${awayFormOnGrass.winPerc}% na travnatých kurtech podle ${awayData.properName} ukazuje těžký začátek sezóny na tomto povrchu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Procent wygranych ${awayFormOnGrass.winPerc}% na kortach trawiastych przez ${awayData.properName} obrazuje trudny początek sezonu na tej nawierzchni.`;
        }

        if (awayFormOnGrass.winPerc < 40) {
          of.awayForm =
            of.awayForm +
            ` It seems that ${awayData.lastName} has had a discouraging start to the season on grass courts, with a current win percentage of ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon descurajator pe iarbă, cu un procentaj actual de victorii de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia avuto un inizio di stagione scoraggiante sui campi in erba, con una percentuale di vittorie attuale di ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un comienzo de temporada desalentador en pistas de hierba, con un porcentaje de victorias actual de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um início de época desanimador em campos de relva, com uma percentagem de vitórias actual de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un début de saison décourageant sur gazon, avec un pourcentage de victoire actuel de ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen entmutigenden Start in die Saison auf Rasenplätzen hatte, mit einer aktuellen Gewinnquote von ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou neutěšený začátek sezóny na travnatých kurtech s aktuálním procentem výher ${awayFormOnGrass.winPerc}%.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma zniechęcający początek sezonu na kortach trawiastych, z aktualnym procentem zwycięstw ${awayFormOnGrass.winPerc}%.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (awayFormOnGrass.totalMatches >= 5) {
        // console.log(`win perc ${awayFormOnGrass.winPerc}%`);
        of.awayForm = `During this season, ${awayData.properName} has played enough matches on grass courts, thus enabling a thorough evaluation of her form on this surface.`;
        of.awayForm_RO = `În acest sezon, ${awayData.properName} a jucat suficiente meciuri pe iarbă, ceea ce permite o evaluare completă a formei sale pe această suprafață.`;
        of.awayForm_IT = `In questa stagione, ${awayData.properName} ha giocato un numero sufficiente di partite su campi in erba, consentendo così una valutazione approfondita della sua forma su questa superficie.`;
        of.awayForm_ES = `Durante esta temporada, ${awayData.properName} ha jugado suficientes partidos en pistas de hierba, lo que permite una evaluación exhaustiva de su forma en esta superficie.`;
        of.awayForm_PT = `Durante esta época, ${awayData.properName} disputou um número suficiente de jogos em campos de relva, o que permite uma avaliação exaustiva da sua forma nesta superfície.`;
        of.awayForm_FR = `Au cours de cette saison, ${awayData.properName} a joué suffisamment de matches sur gazon, ce qui permet d'évaluer sa forme sur cette surface.`;
        of.awayForm_DE = `In dieser Saison hat ${awayData.properName} genügend Matches auf Rasenplätzen gespielt, so dass eine gründliche Bewertung seiner Form auf diesem Belag möglich ist.`;
        of.awayForm_CZ = `Během této sezóny odehrál ${awayData.properName} dostatek zápasů na travnatých kurtech, což umožňuje důkladné zhodnocení jeho formy na tomto povrchu.`;
        of.awayForm_PL = `W tym sezonie ${awayData.properName} rozegrał wystarczająco dużo spotkań na kortach trawiastych, co pozwala na dokładną ocenę jego formy na tej nawierzchni.`;

        if (awayFormOnGrass.winPerc >= 80) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName} has an impressive win rate of ${awayFormOnGrass.winPerc}% on grass courts, having won ${awayFormOnGrass.won} matches and lost ${awayFormOnGrass.lost}. Such a performance can be viewed as excellent.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` ${awayData.properName} are o rată de victorie impresionantă de ${awayFormOnGrass.winPerc}% pe terenurile cu iarbă, câștigând ${awayFormOnGrass.won} meciuri și pierzând ${awayFormOnGrass.lost}. O astfel de performanță poate fi considerată excelentă.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` ${awayData.properName} ha un'impressionante percentuale di vittorie di ${awayFormOnGrass.winPerc}% sui campi in erba, avendo vinto ${awayFormOnGrass.won} e perso ${awayFormOnGrass.lost}. Una tale prestazione può essere considerata eccellente.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` ${awayData.properName} tiene un impresionante porcentaje de victorias de ${awayFormOnGrass.winPerc}% en canchas de hierba, habiendo ganado ${awayFormOnGrass.won} partidos y perdido ${awayFormOnGrass.lost}. Este rendimiento puede considerarse excelente.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` ${awayData.properName} tem uma impressionante taxa de vitórias de ${awayFormOnGrass.winPerc}% em campos de relva, tendo ganho ${awayFormOnGrass.won} partidas e perdido ${awayFormOnGrass.lost}. Este desempenho pode ser considerado excelente.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` ${awayData.properName} a un taux de victoire impressionnant de ${awayFormOnGrass.winPerc}% sur gazon, ayant gagné ${awayFormOnGrass.won} matches et perdu ${awayFormOnGrass.lost}. Une telle performance peut être considérée comme excellente.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName} hat eine beeindruckende Siegquote von ${awayFormOnGrass.winPerc}% auf Rasenplätzen. Er hat ${awayFormOnGrass.won} Matches gewonnen und ${awayFormOnGrass.lost} verloren. Eine solche Leistung kann als hervorragend angesehen werden.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} má na travnatých kurtech působivou úspěšnost ${awayFormOnGrass.winPerc}%, když vyhrál ${awayFormOnGrass.won} zápasů a prohrál ${awayFormOnGrass.lost}. Takový výkon lze považovat za vynikající.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` ${awayData.properName}ma imponujący wskaźnik wygranych ${awayFormOnGrass.winPerc}% na kortach trawiastych, wygrywając ${awayFormOnGrass.won} mecze i przegrywając ${awayFormOnGrass.lost}. Taki wynik można uznać za znakomity.`;

          /// check for titles
          if (awayFormOnGrass.titles.length > 0) {
            if (awayFormOnGrass.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on grass courts this season (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe iarbă în acest sezon (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi in erba in questa stagione (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en hierba esta temporada (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos de relva esta época (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur gazon cette saison (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Rasenplätzen gewonnen hat (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na travnatých kurtech (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} w tym sezonie zdobył jeden tytuł na kortach trawiastych (${awayFormOnGrass.titles[0].titleName}).`;
            }

            if (awayFormOnGrass.titles.length > 1) {
              let titles = [];

              awayFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${
                  awayFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie w tym sezonie tytułów ${
                  awayFormOnGrass.titles.length
                } na kortach trawiastych (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnGrass.winPerc < 80 && awayFormOnGrass.winPerc >= 65) {
          of.awayForm =
            of.awayForm +
            ` With a current win percentage of ${awayFormOnGrass.winPerc}% on grass courts, ${awayData.properName} has displayed a robust form on this surface overall.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Cu un procentaj actual de victorii de ${awayFormOnGrass.winPerc}% pe terenurile cu iarbă, ${awayData.properName} a afișat o formă robustă pe această suprafață în general.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Con una percentuale di vittorie sui campi in erba del ${awayFormOnGrass.winPerc}%, ${awayData.properName} ha dimostrato di essere in forma su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Con un porcentaje de victorias actual de ${awayFormOnGrass.winPerc}% en hierba, ${awayData.properName} ha mostrado un gran estado de forma en esta superficie.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Com uma percentagem de vitórias actual de ${awayFormOnGrass.winPerc}% em campos de relva, ${awayData.properName} tem mostrado uma forma robusta nesta superfície em geral.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Avec un pourcentage de victoire de ${awayFormOnGrass.winPerc}% sur gazon, ${awayData.properName} affiche une forme robuste sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Mit einer aktuellen Siegquote von ${awayFormOnGrass.winPerc}% auf Rasenplätzen hat ${awayData.properName} auf diesem Belag insgesamt eine robuste Form gezeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` S aktuálním procentem výher ${awayFormOnGrass.winPerc}% na travnatých kurtech vykazuje ${awayData.properName} na tomto povrchu celkově solidní formu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Z aktualnym odsetkiem zwycięstw ${awayFormOnGrass.winPerc}% na kortach trawiastych, ${awayData.properName} prezentuje ogólnie solidną formę na tej nawierzchni.`;

          /// check for titles
          if (awayFormOnGrass.titles.length > 0) {
            if (awayFormOnGrass.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on grass courts this season (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe iarbă în acest sezon (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi in erba in questa stagione (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en hierba esta temporada (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos de relva esta época (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur gazon cette saison (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Rasenplätzen gewonnen hat (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na travnatých kurtech (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} w tym sezonie zdobył jeden tytuł na kortach trawiastych (${awayFormOnGrass.titles[0].titleName}).`;
            }

            if (awayFormOnGrass.titles.length > 1) {
              let titles = [];

              awayFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${
                  awayFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie w tym sezonie tytułów ${
                  awayFormOnGrass.titles.length
                } na kortach trawiastych (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnGrass.winPerc < 65 && awayFormOnGrass.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` While ${awayData.lastName}'s current form on grass courts can be considered satisfactory, there is certainly potential for improvement.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` În timp ce forma actuală a lui ${awayData.lastName} pe terenurile cu iarbă poate fi considerată satisfăcătoare, există cu siguranță un potențial de îmbunătățire.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sebbene la forma attuale di ${awayData.lastName} sui campi in erba possa essere considerata soddisfacente, c'è sicuramente un potenziale di miglioramento.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Aunque el estado de forma actual de ${awayData.lastName} en las pistas de hierba puede considerarse satisfactorio, no cabe duda de que puede mejorar.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Embora a forma actual de ${awayData.lastName} em campos de relva possa ser considerada satisfatória, existe certamente potencial para melhorar.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Si la forme actuelle de ${awayData.lastName} sur gazon peut être considérée comme satisfaisante, il y a certainement un potentiel d'amélioration.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Während ${awayData.lastName}'s aktuelle Form auf Rasenplätzen als zufriedenstellend angesehen werden kann, gibt es sicherlich Verbesserungspotenzial.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Ačkoli lze současnou formu ${awayData.lastName} na travnatých kurtech považovat za uspokojivou, určitě je zde potenciál ke zlepšení.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` O ile obecną formę ${awayData.lastName} na kortach trawiastych można uznać za zadowalającą, to z pewnością jest potencjał do poprawy.`;

          /// check for titles
          if (awayFormOnGrass.titles.length > 0) {
            if (awayFormOnGrass.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on grass courts this season (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe iarbă în acest sezon (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi in erba in questa stagione (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en hierba esta temporada (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos de relva esta época (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur gazon cette saison (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Rasenplätzen gewonnen hat (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na travnatých kurtech (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} w tym sezonie zdobył jeden tytuł na kortach trawiastych (${awayFormOnGrass.titles[0].titleName}).`;
            }

            if (awayFormOnGrass.titles.length > 1) {
              let titles = [];

              awayFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${
                  awayFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie w tym sezonie tytułów ${
                  awayFormOnGrass.titles.length
                } na kortach trawiastych (${titles.join(', ')}).`;
            }
          }
        }

        if (awayFormOnGrass.winPerc < 50) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName}'s performance on grass courts is not good, with a win rate of only ${awayFormOnGrass.winPerc}%.`;

          of.awayForm_RO =
            of.awayForm_RO +
            ` Performanța lui ${awayData.properName} pe terenurile de iarbă nu este bună, cu o rată de victorie de numai ${awayFormOnGrass.winPerc}% în meciurile jucate.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Le prestazioni di ${awayData.properName} sui campi in erba non sono buone, con una percentuale di vittorie di solo ${awayFormOnGrass.winPerc}% nelle sue partite giocate.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El rendimiento de ${awayData.properName} en pistas de hierba no es bueno, con un porcentaje de victorias de sólo ${awayFormOnGrass.winPerc}% en sus partidos jugados.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` O desempenho de ${awayData.properName} em campos de relva não é bom, com uma taxa de vitórias de apenas ${awayFormOnGrass.winPerc}% nos jogos disputados.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Les performances de ${awayData.properName} sur gazon ne sont pas bonnes, avec un taux de victoire de seulement ${awayFormOnGrass.winPerc}% dans ses matchs joués.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName}s Leistung auf Rasenplätzen ist nicht gut, mit einer Siegquote von nur ${awayFormOnGrass.winPerc}% in seinen gespielten Matches.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} jeho výkonnost na travnatých kurtech není dobrá, v jeho odehraných zápasech je pouze ${awayFormOnGrass.winPerc}% výher.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Występy ${awayData.properName} na kortach trawiastych nie są dobre, a jego wskaźnik wygranych w rozegranych meczach wynosi zaledwie ${awayFormOnGrass.winPerc}%.`;

          /// check for titles
          if (awayFormOnGrass.titles.length > 0) {
            if (awayFormOnGrass.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on grass courts this season (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe iarbă în acest sezon (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi in erba in questa stagione (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en hierba esta temporada (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos de relva esta época (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur gazon cette saison (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Rasenplätzen gewonnen hat (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na travnatých kurtech (${awayFormOnGrass.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} w tym sezonie zdobył jeden tytuł na kortach trawiastych (${awayFormOnGrass.titles[0].titleName}).`;
            }

            if (awayFormOnGrass.titles.length > 1) {
              let titles = [];

              awayFormOnGrass.titles.forEach(el => {
                titles.push(el.titleName);
              });
              of.awayForm =
                of.awayForm +
                ` Additionally, ${
                  awayData.lastName
                } has accomplished the remarkable feat of securing ${
                  awayFormOnGrass.titles.length
                } titles on grass courts this season (${titles.join(', ')}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnGrass.titles.length
                } titluri pe iarbă în acest sezon (${titles.join(', ')}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnGrass.titles.length
                } titoli sui campi in erba in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnGrass.titles.length
                } títulos en pistas de hierba esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu o feito notável de garantir ${
                  awayFormOnGrass.titles.length
                } títulos em campos de relva esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnGrass.titles.length
                } sur gazon cette saison (${titles.join(', ')}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnGrass.titles.length
                } Titel auf Rasenplätzen zu sichern (${titles.join(', ')}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } podařil pozoruhodný kousek, když v této sezóně získal ${
                  awayFormOnGrass.titles.length
                } titulů na travnatých kurtech (${titles.join(', ')}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zapewnienie sobie w tym sezonie tytułów ${
                  awayFormOnGrass.titles.length
                } na kortach trawiastych (${titles.join(', ')}).`;
            }
          }
        }
      }
    }
  }
  return of;
  // console.log(of);
};

export { formOfPlayersOnGrass };
