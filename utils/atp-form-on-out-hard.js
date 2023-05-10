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
        of.homeForm_RO = `${homeData.properName} nu a jucat încă niciun meci pe terenuri dure în aer liber, așa că nu putem afișa nicio statistică în acest moment.`;
        of.homeForm_IT = `${homeData.properName} non ha ancora giocato nessuna partita su campi duri all'aperto, quindi non possiamo mostrare alcuna statistica al momento.`;
        of.homeForm_ES = `${homeData.properName} todavía no ha jugado ningún partido en pista dura exterior, así que no podemos mostrarte ninguna estadística por el momento.`;
        of.homeForm_PT = `${homeData.properName} ainda não jogou nenhum jogo em campos duros exteriores, pelo que não podemos mostrar quaisquer estatísticas de momento.`;
        of.homeForm_FR = `${homeData.properName} n'a pas encore joué de matchs sur des courts extérieurs en dur, nous ne pouvons donc pas afficher de statistiques pour le moment.`;
        of.homeForm_DE = `${homeData.properName} hat noch keine Spiele auf Hartplätzen im Freien bestritten, daher können wir im Moment keine Statistiken anzeigen.`;
        of.homeForm_CZ = `${homeData.properName} zatím neodehrál žádný zápas na venkovních tvrdých kurtech, takže v tuto chvíli nemůžeme zobrazit žádné statistiky.`;
        of.homeForm_PL = `${homeData.properName} nie rozegrał jeszcze żadnego meczu na twardych kortach zewnętrznych, więc nie możemy w tej chwili pokazywać żadnych statystyk.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (homeFormOnHO.totalMatches >= 1 && homeFormOnHO.totalMatches < 5) {
        of.homeForm = `${
          homeData.properName
        } has only played ${converter.toWords(
          homeFormOnHO.totalMatches
        )} matches on outdoor hard courts this season, which isn't a lot, but we can still extract some statistics from them.`;
        of.homeForm_RO = `${homeData.properName} a jucat doar ${homeFormOnHO.totalMatches} meciuri pe terenuri dure în aer liber în acest sezon, ceea ce nu este foarte mult, dar putem totuși extrage câteva statistici din ele.`;
        of.homeForm_IT = `${homeData.properName} ha giocato solo ${homeFormOnHO.totalMatches} partite su campi duri all'aperto in questa stagione, il che non è molto, ma possiamo comunque estrarne alcune statistiche.`;
        of.homeForm_ES = `${homeData.properName} sólo ha jugado ${homeFormOnHO.totalMatches} partidos en pista dura al aire libre esta temporada, lo que no es mucho, pero aún así podemos extraer algunas estadísticas de ellos.`;
        of.homeForm_PT = `${homeData.properName} apenas disputou ${homeFormOnHO.totalMatches} jogos em campos duros exteriores esta época, o que não é muito, mas podemos extrair algumas estatísticas.`;
        of.homeForm_FR = `${homeData.properName} n'a joué que ${homeFormOnHO.totalMatches} sur des courts extérieurs en dur cette saison, ce qui n'est pas beaucoup, mais nous pouvons tout de même en extraire quelques statistiques.`;
        of.homeForm_DE = `${homeData.properName} hat in dieser Saison nur ${homeFormOnHO.totalMatches} Matches auf Hartplätzen im Freien gespielt, was nicht viel ist, aber wir können trotzdem einige Statistiken daraus extrahieren.`;
        of.homeForm_CZ = `${homeData.properName} v této sezóně odehrál pouze ${homeFormOnHO.totalMatches} zápasů na venkovních tvrdých kurtech, což není mnoho, ale i tak z nich můžeme získat nějaké statistiky.`;
        of.homeForm_PL = `${homeData.properName} rozegrał w tym sezonie tylko ${homeFormOnHO.totalMatches} meczów na zewnętrznych kortach twardych, co nie jest dużo, ale i tak możemy wyciągnąć z nich jakieś statystyki.`;

        if (homeFormOnHO.winPerc >= 75) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on outdoor hard courts indicates a strong start to the season on this surface. However, it remains to be seen if he can maintain this level of performance as the season progresses.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHO.winPerc}% pe terenuri dure în aer liber indică un început de sezon bun pe această suprafață. Rămâne însă de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnHO.winPerc}% sui campi duri all'aperto indica un forte inizio di stagione su questa superficie. Tuttavia, resta da vedere se riuscirà a mantenere questo livello di prestazioni nel corso della stagione.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.lastName}% de ${homeFormOnHO.winPerc}% en pista dura al aire libre indica un buen comienzo de temporada en esta superficie. Sin embargo, está por ver si puede mantener este nivel de rendimiento a medida que avance la temporada.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHO.winPerc}% em campos duros exteriores indica um forte início de época nesta superfície. No entanto, resta saber se ele consegue manter este nível de desempenho à medida que a época avança.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHO.winPerc}% sur les courts extérieurs en dur indique un bon début de saison sur cette surface. Cependant, il reste à voir s'il peut maintenir ce niveau de performance au fur et à mesure que la saison avance.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHO.winPerc}% auf Hartplätzen im Freien deutet auf einen starken Start in die Saison auf diesem Belag hin. Es bleibt jedoch abzuwarten, ob er dieses Leistungsniveau im weiteren Verlauf der Saison halten kann.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName}% na venkovních tvrdých kurtech ${homeFormOnHO.winPerc}% naznačuje silný začátek sezóny na tomto povrchu. Uvidíme však, zda si tuto úroveň výkonnosti dokáže udržet i v průběhu sezony.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName}% na kortach twardych na świeżym powietrzu wskazuje na dobry początek sezonu na tej nawierzchni. Jednak dopiero okaże się, czy uda mu się utrzymać ten poziom wyników w trakcie sezonu.`;
        }

        if (homeFormOnHO.winPerc < 75 && homeFormOnHO.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on outdoor hard courts indicates a promising start to the season on this surface. Nonetheless, the question remains whether he can sustain this level of performance throughout the remainder of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHO.winPerc}% pe terenuri dure în aer liber indică un început de sezon promițător pe această suprafață. Cu toate acestea, rămâne întrebarea dacă poate menține acest nivel de performanță pe tot restul sezonului.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName}% sui campi duri all'aperto indica un inizio di stagione promettente su questa superficie. Tuttavia, resta da chiedersi se riuscirà a mantenere questo livello di prestazioni per tutto il resto della stagione.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje de victorias actual de ${homeData.lastName}% de ${homeFormOnHO.winPerc}% en pista dura al aire libre indica un prometedor comienzo de temporada en esta superficie. Sin embargo, la cuestión sigue siendo si podrá mantener este nivel de rendimiento durante el resto de la temporada.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHO.winPerc}% em campos duros exteriores indica um início de época promissor nesta superfície. No entanto, resta saber se ele consegue manter este nível de desempenho durante o resto da época.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHO.winPerc}% sur les courts extérieurs en dur indique un début de saison prometteur sur cette surface. Néanmoins, la question reste de savoir s'il peut maintenir ce niveau de performance jusqu'à la fin de la saison.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHO.winPerc}% auf Hartplätzen im Freien deutet auf einen vielversprechenden Saisonstart auf diesem Belag hin. Dennoch bleibt die Frage, ob er dieses Leistungsniveau über den Rest der Saison halten kann.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName}% na venkovních tvrdých kurtech ${homeFormOnHO.winPerc}% naznačuje slibný začátek sezóny na tomto povrchu. Otázkou nicméně zůstává, zda si tuto úroveň výkonnosti dokáže udržet po zbytek sezony.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.lastName}% na twardych kortach zewnętrznych wskazuje na obiecujący początek sezonu na tej nawierzchni. Niemniej jednak pozostaje pytanie, czy będzie on w stanie utrzymać ten poziom gry przez resztę sezonu.`;
        }

        if (homeFormOnHO.winPerc < 50 && homeFormOnHO.winPerc >= 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage of ${homeFormOnHO.winPerc}% on outdoor hard courts suggests a challenging start to the season on this surface. However, the uncertainty still lingers over whether he can recover and showcase a better level of performance in the upcoming matches of the season.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} de ${homeFormOnHO.winPerc}% pe terenuri dure în aer liber sugerează un început de sezon dificil pe această suprafață. Cu toate acestea, încă persistă incertitudinea cu privire la posibilitatea ca el să-și revină și să afișeze un nivel mai bun de performanță în următoarele meciuri ale sezonului.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} di ${homeFormOnHO.winPerc}% sui campi duri all'aperto suggerisce un inizio di stagione difficile su questa superficie. Tuttavia, non si sa ancora se riuscirà a riprendersi e a mostrare un livello di prestazioni migliore nelle prossime partite della stagione.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El actual porcentaje de victorias de ${homeData.properName}% de ${homeFormOnHO.winPerc}% en pista dura al aire libre sugiere un inicio de temporada complicado en esta superficie. Sin embargo, aún persiste la incertidumbre sobre si podrá recuperarse y mostrar un mejor nivel de rendimiento en los próximos partidos de la temporada.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} de ${homeFormOnHO.winPerc}% em campos duros exteriores sugere um início de época difícil nesta superfície. No entanto, a incerteza continua a pairar sobre se ele consegue recuperar e apresentar um melhor nível de desempenho nos próximos jogos da época.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.properName} de ${homeFormOnHO.winPerc}% sur les courts extérieurs en dur suggère un début de saison difficile sur cette surface. Cependant, l'incertitude persiste quant à sa capacité à se rétablir et à afficher un meilleur niveau de performance lors des prochains matches de la saison.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.properName}s aktuelle Siegquote von ${homeFormOnHO.winPerc}% auf Hartplätzen im Freien deutet auf einen schwierigen Saisonstart auf diesem Belag hin. Es bleibt jedoch ungewiss, ob er sich davon erholen und in den kommenden Spielen der Saison ein besseres Leistungsniveau zeigen kann.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName}% na venkovních kurtech s tvrdým povrchem naznačuje náročný začátek sezóny na tomto povrchu. Stále však přetrvává nejistota, zda se dokáže zotavit a předvést lepší výkonnost v nadcházejících zápasech sezony.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.properName}% na kortach twardych na świeżym powietrzu sugeruje trudny początek sezonu na tej nawierzchni. Jednak wciąż nie wiadomo, czy uda mu się odzyskać formę i zaprezentować lepszy poziom w nadchodzących meczach sezonu.`;
        }

        if (homeFormOnHO.winPerc < 40) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.lastName}'s current win percentage of ${homeFormOnHO.winPerc}% on outdoor hard courts suggests a disappointing start to the season on this surface. In order to improve his results, he needs to step up his game and perform at a higher level.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.lastName} de ${homeFormOnHO.winPerc}% pe terenuri dure în aer liber sugerează un început de sezon dezamăgitor pe această suprafață. Pentru a-și îmbunătăți rezultatele, el trebuie să își intensifice jocul și să performeze la un nivel mai ridicat.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.lastName} di ${homeFormOnHO.winPerc}% sui campi duri all'aperto suggerisce un inizio di stagione deludente su questa superficie. Per migliorare i suoi risultati, ha bisogno di migliorare il suo gioco e di esibirsi a un livello più alto.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje de victorias actual de ${homeData.lastName}% de ${homeFormOnHO.winPerc}% en pistas duras al aire libre sugiere un inicio de temporada decepcionante en esta superficie. Para mejorar sus resultados, necesita intensificar su juego y rendir a un nivel superior.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.lastName} de ${homeFormOnHO.winPerc}% em campos duros exteriores sugere um início de época decepcionante nesta superfície. Para melhorar os seus resultados, ele precisa de melhorar o seu jogo e actuar a um nível mais elevado.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoire actuel de ${homeData.lastName} de ${homeFormOnHO.winPerc}% sur les courts extérieurs en dur suggère un début de saison décevant sur cette surface. Afin d'améliorer ses résultats, il doit intensifier son jeu et atteindre un niveau de performance plus élevé.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` ${homeData.lastName}s aktueller Gewinnprozentsatz von ${homeFormOnHO.winPerc}% auf Hartplätzen im Freien deutet auf einen enttäuschenden Saisonstart auf diesem Belag hin. Um seine Ergebnisse zu verbessern, muss er sein Spiel intensivieren und auf einem höheren Niveau spielen.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.lastName}% na venkovních kurtech s tvrdým povrchem naznačuje, že začátek sezony na tomto povrchu je pro hráče neuspokojivý. Aby své výsledky zlepšil, musí svou hru zintenzivnit a předvádět výkony na vyšší úrovni.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent wygranych ${homeData.lastName}% na twardych kortach zewnętrznych sugeruje rozczarowujący początek sezonu na tej nawierzchni. Aby poprawić swoje wyniki, musi on wzmocnić swoją grę i występować na wyższym poziomie.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (homeFormOnHO.totalMatches >= 5) {
        // console.log(`win perc ${homeFormOnHO.winPerc}%`);
        of.homeForm = `In the current season, ${homeData.properName} has played a sufficient number of matches on outdoor hard courts, allowing for a comprehensive analysis of his form on this surface.`;
        of.homeForm_RO = `În sezonul actual, ${homeData.properName} a jucat un număr suficient de meciuri pe terenuri dure în aer liber, ceea ce permite o analiză cuprinzătoare a formei sale pe această suprafață.`;
        of.homeForm_IT = `Nella stagione in corso, ${homeData.properName} ha giocato un numero sufficiente di partite su campi duri all'aperto, consentendo un'analisi completa della sua forma su questa superficie.`;
        of.homeForm_ES = `En la temporada actual, ${homeData.properName} ha jugado un número suficiente de partidos en pista dura al aire libre, lo que permite un análisis exhaustivo de su forma en esta superficie.`;
        of.homeForm_PT = `Na época actual, ${homeData.properName} disputou um número suficiente de jogos em campos duros exteriores, permitindo uma análise abrangente da sua forma nesta superfície.`;
        of.homeForm_FR = `Au cours de la saison actuelle, ${homeData.properName} a joué un nombre suffisant de matches sur des courts extérieurs en dur, ce qui permet une analyse complète de sa forme sur cette surface.`;
        of.homeForm_DE = `In der laufenden Saison hat ${homeData.properName} eine ausreichende Anzahl von Matches auf Hartplätzen im Freien gespielt, so dass eine umfassende Analyse seiner Form auf diesem Belag möglich ist.`;
        of.homeForm_CZ = `V aktuální sezóně odehrál ${homeData.properName} dostatečný počet zápasů na venkovních tvrdých kurtech, což umožňuje komplexní analýzu jeho formy na tomto povrchu.`;
        of.homeForm_PL = `W bieżącym sezonie ${homeData.properName}rozegrał wystarczającą liczbę spotkań na twardych kortach zewnętrznych, co pozwala na kompleksową analizę jego formy na tej nawierzchni.`;

        if (homeFormOnHO.winPerc >= 80) {
          of.homeForm =
            of.homeForm +
            ` His win rate on outdoor hard courts currently stands at an impressive ${homeFormOnHO.winPerc}%, having emerged victorious in ${homeFormOnHO.won} matches and suffered defeat in ${homeFormOnHO.lost}. This performance can certainly be regarded as excellent.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Rata sa de victorie pe terenurile dure în aer liber se situează în prezent la un impresionant ${homeFormOnHO.winPerc}%, după ce a ieșit victorios în ${homeFormOnHO.won} meciuri și a suferit înfrângeri în doar ${homeFormOnHO.lost}. Această performanță poate fi considerată cu siguranță excelentă.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua percentuale di vittorie sui campi duri all'aperto è attualmente pari a un impressionante ${homeFormOnHO.winPerc}%, avendo ottenuto la vittoria in ${homeFormOnHO.won} incontri e la sconfitta in ${homeFormOnHO.lost}. Questa prestazione può essere considerata eccellente.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su porcentaje de victorias en pista dura al aire libre se sitúa actualmente en un impresionante ${homeFormOnHO.winPerc}%, habiendo salido victorioso en ${homeFormOnHO.won} partidos y sufrido derrotas en ${homeFormOnHO.lost}. Este rendimiento puede considerarse excelente.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua taxa de vitórias em campos duros exteriores é actualmente de uns impressionantes ${homeFormOnHO.winPerc}%, tendo saído vitorioso em jogos ${homeFormOnHO.won} e sofrido uma derrota em jogos ${homeFormOnHO.lost}. Este desempenho pode certamente ser considerado excelente.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Son taux de victoire sur les courts extérieurs en dur est actuellement de ${homeFormOnHO.winPerc}%, ayant remporté ${homeFormOnHO.won} et perdu ${homeFormOnHO.lost}. Cette performance peut certainement être considérée comme excellente.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine Siegquote auf Hartplätzen im Freien liegt derzeit bei beeindruckenden ${homeFormOnHO.winPerc}%, wobei er in ${homeFormOnHO.won} Matches siegreich war und in ${homeFormOnHO.lost} eine Niederlage hinnehmen musste. Diese Leistung kann man durchaus als hervorragend bezeichnen.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho úspěšnost na venkovních tvrdých kurtech je v současné době impozantní ${homeFormOnHO.winPerc}%, když zvítězil v ${homeFormOnHO.won} zápasech a utrpěl porážku v ${homeFormOnHO.lost}. Tento výkon lze jistě považovat za vynikající.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego wskaźnik zwycięstw na kortach twardych wynosi obecnie imponujące ${homeFormOnHO.winPerc}%, zwyciężając w meczach o wartości ${homeFormOnHO.won} i ponosząc porażki w meczach o wartości ${homeFormOnHO.lost}. Ten wynik można z pewnością uznać za doskonały.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on outdoor hard courts this season (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard în aer liber în acest sezon (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri all'aperto in questa stagione (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura al aire libre esta temporada (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros exteriores esta época (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en extérieur cette saison (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien errungen (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na venkovních tvrdých kurtech (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na zewnętrznych kortach twardych (${homeFormOnHO.titles[0].titleName}).`;
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
                } has achieved the feat of clinching ${
                  homeFormOnHO.titles.length
                } titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHO.titles.length
                } títulos em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Co więcej, ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 80 && homeFormOnHO.winPerc >= 65) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current win percentage on outdoor hard courts stands at ${homeFormOnHO.winPerc}%, indicating a strong overall form on this surface.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Procentul actual de victorii al lui ${homeData.properName} pe terenuri dure în aer liber este de ${homeFormOnHO.winPerc}%, ceea ce indică o formă generală puternică pe această suprafață.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` L'attuale percentuale di vittorie di ${homeData.properName} sui campi duri all'aperto è pari a ${homeFormOnHO.winPerc}%, il che indica una forte forma generale su questa superficie.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` El porcentaje actual de victorias de ${homeData.properName} en pista dura al aire libre es de ${homeFormOnHO.winPerc}%, lo que indica un buen estado de forma en esta superficie.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A actual percentagem de vitórias de ${homeData.properName} em campos duros exteriores é de ${homeFormOnHO.winPerc}%, o que indica uma boa forma geral nesta superfície.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Le pourcentage de victoires de ${homeData.properName} sur les courts extérieurs en dur est de ${homeFormOnHO.winPerc}%, ce qui indique une bonne forme générale sur cette surface.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die aktuelle Siegquote von ${homeData.properName} auf Hartplätzen im Freien liegt bei ${homeFormOnHO.winPerc}%, was auf eine starke Gesamtform auf diesem Belag hinweist.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Aktuální procento výher ${homeData.properName} na venkovních tvrdých kurtech je ${homeFormOnHO.winPerc}%, což naznačuje celkově dobrou formu na tomto povrchu.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Aktualny procent zwycięstw ${homeData.properName} na kortach twardych wynosi ${homeFormOnHO.winPerc}%, co wskazuje na jego wysoką formę na tej nawierzchni.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on outdoor hard courts this season (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard în aer liber în acest sezon (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri all'aperto in questa stagione (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura al aire libre esta temporada (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros exteriores esta época (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en extérieur cette saison (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien errungen (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na venkovních tvrdých kurtech (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na zewnętrznych kortach twardych (${homeFormOnHO.titles[0].titleName}).`;
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
                } has achieved the feat of clinching ${
                  homeFormOnHO.titles.length
                } titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHO.titles.length
                } títulos em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Co więcej, ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 65 && homeFormOnHO.winPerc >= 50) {
          of.homeForm =
            of.homeForm +
            ` ${homeData.properName}'s current form on outdoor hard courts can be deemed acceptable, though there is certainly room for improvement.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma actuală a lui ${homeData.properName} pe terenurile dure în aer liber poate fi considerată acceptabilă, deși există cu siguranță loc de îmbunătățiri.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La forma attuale di ${homeData.properName} sui campi duri all'aperto può essere considerata accettabile, anche se c'è sicuramente un margine di miglioramento.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` La forma actual de ${homeData.properName} en pista dura al aire libre puede considerarse aceptable, aunque sin duda puede mejorar.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A forma actual de ${homeData.properName} em campos duros ao ar livre pode ser considerada aceitável, embora haja certamente espaço para melhorias.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` La forme actuelle de ${homeData.properName} sur les courts extérieurs en dur peut être considérée comme acceptable, bien qu'il y ait certainement une marge d'amélioration.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Die derzeitige Form von ${homeData.properName} auf Hartplätzen im Freien kann als akzeptabel bezeichnet werden, obwohl es sicherlich noch Raum für Verbesserungen gibt.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Současnou formu ${homeData.properName} na venkovních tvrdých kurtech lze považovat za přijatelnou, i když je jistě co zlepšovat.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Obecną formę ${homeData.properName} na zewnętrznych kortach twardych można uznać za akceptowalną, choć z pewnością jest miejsce na poprawę.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on outdoor hard courts this season (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard în aer liber în acest sezon (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri all'aperto in questa stagione (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura al aire libre esta temporada (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros exteriores esta época (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en extérieur cette saison (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien errungen (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na venkovních tvrdých kurtech (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na zewnętrznych kortach twardych (${homeFormOnHO.titles[0].titleName}).`;
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
                } has achieved the feat of clinching ${
                  homeFormOnHO.titles.length
                } titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHO.titles.length
                } títulos em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Co więcej, ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (homeFormOnHO.winPerc < 50) {
          of.homeForm =
            of.homeForm +
            ` His current form on outdoor hard courts is less than ideal, with only a ${homeFormOnHO.winPerc}% win rate in his matches played.`;
          of.homeForm_RO =
            of.homeForm_RO +
            ` Forma sa actuală pe terenurile dure în aer liber nu este deloc ideală, cu o rată de victorie de doar ${homeFormOnHO.winPerc}% în meciurile jucate.`;
          of.homeForm_IT =
            of.homeForm_IT +
            ` La sua forma attuale sui campi duri all'aperto non è ideale, con una percentuale di vittorie del ${homeFormOnHO.winPerc}% nelle partite giocate.`;
          of.homeForm_ES =
            of.homeForm_ES +
            ` Su forma actual en pistas duras al aire libre es menos que ideal, con sólo un ${homeFormOnHO.winPerc}% de victorias en sus partidos jugados.`;
          of.homeForm_PT =
            of.homeForm_PT +
            ` A sua forma actual em campos duros exteriores não é a ideal, com uma taxa de vitórias de apenas ${homeFormOnHO.winPerc}% nos jogos disputados.`;
          of.homeForm_FR =
            of.homeForm_FR +
            ` Sa forme actuelle sur les courts extérieurs en dur est loin d'être idéale, avec seulement ${homeFormOnHO.winPerc}% de victoires dans les matches qu'il a joués.`;
          of.homeForm_DE =
            of.homeForm_DE +
            ` Seine derzeitige Form auf Hartplätzen im Freien ist mit einer Gewinnquote von nur ${homeFormOnHO.winPerc}% in seinen Matches nicht gerade ideal.`;
          of.homeForm_CZ =
            of.homeForm_CZ +
            ` Jeho současná forma na venkovních tvrdých kurtech není ideální - v odehraných zápasech má pouze ${homeFormOnHO.winPerc}% úspěšnost.`;
          of.homeForm_PL =
            of.homeForm_PL +
            ` Jego obecna forma na twardych kortach jest mniej niż idealna, z zaledwie ${homeFormOnHO.winPerc}% wskaźnikiem wygranych w rozegranych meczach.`;

          /// check for titles
          if (homeFormOnHO.titles.length > 0) {
            if (homeFormOnHO.titles.length === 1) {
              of.homeForm =
                of.homeForm +
                ` Furthermore, ${homeData.lastName} has managed to secure one title on outdoor hard courts this season (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${homeData.lastName} a reușit să obțină un titlu pe terenuri hard în aer liber în acest sezon (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${homeData.lastName} è riuscito a conquistare un titolo sui campi duri all'aperto in questa stagione (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${homeData.lastName} ha conseguido un título en pista dura al aire libre esta temporada (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${homeData.lastName} conseguiu garantir um título em campos duros exteriores esta época (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${homeData.lastName} a réussi à remporter un titre sur dur en extérieur cette saison (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${homeData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien errungen (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Kromě toho se ${homeData.lastName} podařilo v této sezóně získat jeden titul na venkovních tvrdých kurtech (${homeFormOnHO.titles[0].titleName}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Ponadto ${homeData.lastName} zdołał w tym sezonie zapewnić sobie jeden tytuł na zewnętrznych kortach twardych (${homeFormOnHO.titles[0].titleName}).`;
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
                } has achieved the feat of clinching ${
                  homeFormOnHO.titles.length
                } titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.homeForm_RO =
                of.homeForm_RO +
                ` Mai mult, ${
                  homeData.properName
                } a reușit performanța de a cuceri ${
                  homeFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.homeForm_IT =
                of.homeForm_IT +
                ` Inoltre, ${
                  homeData.properName
                } ha realizzato l'impresa di conquistare ${
                  homeFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.homeForm_ES =
                of.homeForm_ES +
                ` Además, ${
                  homeData.properName
                } ha logrado la hazaña de conseguir ${
                  homeFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PT =
                of.homeForm_PT +
                ` Para além disso, ${
                  homeData.properName
                } conseguiu a proeza de conquistar ${
                  homeFormOnHO.titles.length
                } títulos em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.homeForm_FR =
                of.homeForm_FR +
                ` De plus, ${
                  homeData.properName
                } a réussi l'exploit de remporter ${
                  homeFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.homeForm_DE =
                of.homeForm_DE +
                ` Außerdem hat ${
                  homeData.properName
                } das Kunststück vollbracht, in dieser Saison ${
                  homeFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu gewinnen (${titles.join(
                  ', '
                )}).`;
              of.homeForm_CZ =
                of.homeForm_CZ +
                ` Navíc ${
                  homeData.properName
                } dosáhl v této sezóně úspěchu v podobě zisku ${
                  homeFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.homeForm_PL =
                of.homeForm_PL +
                ` Co więcej, ${
                  homeData.properName
                } dokonał w tym sezonie wyczynu polegającego na zdobyciu ${
                  homeFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych (${titles.join(
                  ', '
                )}).`;
            }
          }
        }
      }

      //// begin AWAY

      if (awayFormOnHO.totalMatches == 0) {
        of.awayForm = `At present, we are unable to display any statistics for ${awayData.properName} as there have been no matches played by him on outdoor hard courts thus far.`;
        of.awayForm_RO = `În acest moment nu putem afișa nicio statistică pentru ${awayData.properName} deoarece nu există niciun meci jucat de el pe terenuri dure în aer liber până acum.`;
        of.awayForm_IT = `Al momento non siamo in grado di visualizzare alcuna statistica per ${awayData.properName} in quanto non sono state giocate finora partite su campi duri all'aperto.`;
        of.awayForm_ES = `Actualmente no podemos mostrar estadísticas para ${awayData.properName} ya que no ha jugado ningún partido en pista dura al aire libre.`;
        of.awayForm_PT = `De momento, não podemos apresentar quaisquer estatísticas relativas a ${awayData.properName}, uma vez que não foram disputados quaisquer jogos por ele em campos duros exteriores até ao momento.`;
        of.awayForm_FR = `Pour l'instant, nous ne pouvons pas afficher de statistiques pour ${awayData.properName} car il n'a pas encore joué de matches sur des courts extérieurs en dur.`;
        of.awayForm_DE = `Zur Zeit können wir keine Statistik für ${awayData.properName} anzeigen, da er noch keine Matches auf Hartplätzen im Freien gespielt hat.`;
        of.awayForm_CZ = `V současné době nemůžeme zobrazit žádné statistiky pro hráče ${awayData.properName}, protože doposud neodehrál žádný zápas na venkovních tvrdých površích.`;
        of.awayForm_PL = `Obecnie nie możemy wyświetlić żadnych statystyk ${awayData.properName}, ponieważ do tej pory nie rozegrał żadnego meczu na twardych kortach zewnętrznych.`;
      }

      //// total of matches BELOW 5 and possible outcomes
      if (awayFormOnHO.totalMatches >= 1 && awayFormOnHO.totalMatches < 5) {
        // console.log(`win perc ${awayFormOnHO.winPerc}%`);

        of.awayForm = `Although there haven't been many matches played by ${
          awayData.properName
        } on outdoor hard courts this season - only ${converter.toWords(
          awayFormOnHO.totalMatches
        )} to be exact - we can still extract some statistics from these matches.`;
        of.awayForm_RO = `Deși nu au fost multe meciuri jucate de ${awayData.properName} pe terenuri dure în aer liber în acest sezon - mai exact doar ${awayFormOnHO.totalMatches} - putem totuși extrage câteva statistici din aceste meciuri.`;
        of.awayForm_IT = `Anche se non ci sono state molte partite giocate da ${awayData.properName} su campi duri all'aperto in questa stagione - solo ${awayFormOnHO.totalMatches} per essere precisi - possiamo comunque estrarre alcune statistiche da queste partite.`;
        of.awayForm_ES = `Aunque no ha habido muchos partidos jugados por ${awayData.properName} en pistas duras al aire libre esta temporada - sólo ${awayFormOnHO.totalMatches} para ser exactos - todavía podemos extraer algunas estadísticas de estos partidos.`;
        of.awayForm_PT = `Embora não tenha havido muitos jogos disputados por ${awayData.properName} em campos duros exteriores esta época - apenas ${awayFormOnHO.totalMatches} para ser exacto - ainda podemos extrair algumas estatísticas desses jogos.`;
        of.awayForm_FR = `Bien que ${awayData.properName} n'ait pas disputé beaucoup de matches sur des courts extérieurs en dur cette saison - seulement ${awayFormOnHO.totalMatches} pour être exact - nous pouvons tout de même extraire quelques statistiques de ces matches.`;
        of.awayForm_DE = `Obwohl ${awayData.properName} in dieser Saison nicht viele Matches auf Hartplätzen im Freien gespielt hat - nur ${awayFormOnHO.totalMatches}, um genau zu sein - können wir dennoch einige Statistiken aus diesen Matches extrahieren.`;
        of.awayForm_CZ = `Přestože v této sezóně neodehrála ${awayData.properName} na venkovních tvrdých kurtech mnoho zápasů - přesněji pouze ${awayFormOnHO.totalMatches} - můžeme z těchto zápasů získat některé statistiky.`;
        of.awayForm_PL = `Mimo, że w tym sezonie nie było zbyt wielu meczów rozegranych przez ${awayData.properName} na kortach twardych na świeżym powietrzu - dokładnie tylko ${awayFormOnHO.totalMatches} - to i tak możemy wyciągnąć z nich pewne statystyki.`;

        if (awayFormOnHO.winPerc >= 75) {
          of.awayForm =
            of.awayForm +
            ` It appears that ${awayData.lastName} has had a strong start to the season on outdoor hard courts, as indicated by his current win percentage of ${awayFormOnHO.winPerc}%. Nevertheless, it remains to be seen whether he can sustain this level of performance as the season moves forward.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon bun pe terenurile hard în aer liber, după cum indică procentajul său actual de victorii de ${awayFormOnHO.winPerc}%. Cu toate acestea, rămâne de văzut dacă poate menține acest nivel de performanță pe măsură ce sezonul avansează.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia iniziato bene la stagione sui campi duri all'aperto, come indica la sua attuale percentuale di vittorie di ${awayFormOnHO.winPerc}%. Tuttavia, resta da vedere se riuscirà a mantenere questo livello di prestazioni nel corso della stagione.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un buen comienzo de temporada en pista dura al aire libre, como indica su actual porcentaje de victorias de ${awayFormOnHO.winPerc}%. No obstante, queda por ver si puede mantener este nivel de rendimiento a medida que avance la temporada.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um forte início de época em campos duros exteriores, como indicado pela sua actual percentagem de vitórias de ${awayFormOnHO.winPerc}%. No entanto, resta saber se ele consegue manter este nível de desempenho à medida que a época avança.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un bon début de saison sur les courts extérieurs en dur, comme l'indique son pourcentage de victoire actuel de ${awayFormOnHO.winPerc}%. Néanmoins, il reste à voir s'il peut maintenir ce niveau de performance tout au long de la saison.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen starken Start in die Saison auf Hartplätzen im Freien hatte, wie seine aktuelle Gewinnquote von ${awayFormOnHO.winPerc}% zeigt. Es bleibt jedoch abzuwarten, ob er dieses Leistungsniveau im weiteren Verlauf der Saison halten kann.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou silný začátek sezóny na venkovních tvrdých kurtech, jak ukazuje jeho aktuální procento výher ${awayFormOnHO.winPerc}%. Nicméně se teprve ukáže, zda si tuto úroveň výkonnosti dokáže udržet i v dalším průběhu sezóny.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma dobry początek sezonu na twardych kortach, na co wskazuje jego aktualny procent wygranych ${awayFormOnHO.winPerc}%. Niemniej jednak, dopiero się okaże, czy będzie w stanie utrzymać ten poziom wyników w trakcie sezonu.`;
        }

        if (awayFormOnHO.winPerc < 75 && awayFormOnHO.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` The present win percentage of ${awayFormOnHO.winPerc}% on outdoor hard courts by ${awayData.lastName} presents a promising start to the season on this surface. Nevertheless, it raises the question of whether he can maintain this level of performance for the rest of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul actual de victorii de ${awayFormOnHO.winPerc}% pe terenuri dure în aer liber de către ${awayData.lastName} reprezintă un început de sezon promițător pe această suprafață. Cu toate acestea, se pune întrebarea dacă poate menține acest nivel de performanță pentru restul sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` L'attuale percentuale di vittorie di ${awayFormOnHO.winPerc}% sui campi duri all'aperto di ${awayData.lastName} rappresenta un inizio di stagione promettente su questa superficie. Tuttavia, ci si chiede se possa mantenere questo livello di prestazioni per il resto della stagione.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El actual porcentaje de victorias de ${awayFormOnHO.winPerc}% en pista dura al aire libre de ${awayData.lastName} presenta un prometedor comienzo de temporada en esta superficie. Sin embargo, plantea la cuestión de si podrá mantener este nivel de rendimiento durante el resto de la temporada.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A actual percentagem de vitórias de ${awayFormOnHO.winPerc}% em campos duros exteriores de ${awayData.lastName} apresenta um início de época promissor nesta superfície. No entanto, levanta a questão de saber se ele consegue manter este nível de desempenho durante o resto da época.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire actuel de ${awayFormOnHO.winPerc}% sur dur en extérieur de ${awayData.lastName} représente un début de saison prometteur sur cette surface. Néanmoins, la question se pose de savoir s'il peut maintenir ce niveau de performance pour le reste de la saison.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die aktuelle Siegquote von ${awayFormOnHO.winPerc}% auf Hartplätzen im Freien von ${awayData.lastName} stellt einen vielversprechenden Saisonstart auf diesem Belag dar. Es stellt sich jedoch die Frage, ob er dieses Leistungsniveau für den Rest der Saison halten kann.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Současné procento výher ${awayFormOnHO.winPerc}% na venkovních tvrdých kurtech ${awayData.lastName} představuje slibný začátek sezóny na tomto povrchu. Nicméně se nabízí otázka, zda si tuto úroveň výkonnosti dokáže udržet i po zbytek sezóny.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Aktualny procent wygranych ${awayFormOnHO.winPerc}% na kortach twardych zewnętrznych przez ${awayData.lastName} prezentuje obiecujący początek sezonu na tej nawierzchni. Niemniej jednak, rodzi się pytanie, czy jest on w stanie utrzymać ten poziom wyników przez resztę sezonu.`;
        }

        if (awayFormOnHO.winPerc < 50 && awayFormOnHO.winPerc >= 40) {
          of.awayForm =
            of.awayForm +
            ` The win percentage of ${awayFormOnHO.winPerc}% on outdoor hard courts by ${awayData.properName} portrays a tough start to the season on this surface. Nonetheless, there is still uncertainty as to whether he can bounce back and deliver a better performance in the upcoming matches of the season.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Procentul de victorii de ${awayFormOnHO.winPerc}% pe terenuri dure în aer liber al lui ${awayData.properName} arată un început de sezon dificil pe această suprafață. Cu toate acestea, există încă incertitudini cu privire la faptul dacă își poate reveni și poate oferi o performanță mai bună în următoarele meciuri ale sezonului.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` La percentuale di vittorie di ${awayFormOnHO.winPerc}% sui campi duri all'aperto da parte di ${awayData.properName} evidenzia un inizio di stagione difficile su questa superficie. Ciononostante, non si sa se riuscirà a riprendersi e a fornire prestazioni migliori nelle prossime partite della stagione.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El porcentaje de victorias de ${awayFormOnHO.winPerc}% en pista dura al aire libre de ${awayData.properName} retrata un duro comienzo de temporada en esta superficie. No obstante, aún no se sabe si podrá recuperarse y ofrecer un mejor rendimiento en los próximos partidos de la temporada.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` A percentagem de vitórias de ${awayFormOnHO.winPerc}% em campos duros exteriores por ${awayData.properName} retrata um início de época difícil nesta superfície. No entanto, ainda não se sabe se ele conseguirá recuperar e apresentar um melhor desempenho nos próximos jogos da época.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le pourcentage de victoire de ${awayFormOnHO.winPerc}% sur les courts extérieurs en dur de ${awayData.properName} témoigne d'un début de saison difficile sur cette surface. Néanmoins, l'incertitude demeure quant à sa capacité à rebondir et à réaliser de meilleures performances lors des prochains matchs de la saison.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Die Gewinnquote von ${awayFormOnHO.winPerc}% auf Hartplätzen im Freien von ${awayData.properName} zeigt einen schwierigen Saisonstart auf diesem Belag. Dennoch bleibt ungewiss, ob er sich davon erholen und in den kommenden Spielen der Saison eine bessere Leistung abliefern kann.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Procento výher ${awayFormOnHO.winPerc}% na venkovních tvrdých kurtech podle ${awayData.properName} ukazuje těžký začátek sezóny na tomto povrchu. Nicméně stále panuje nejistota, zda se dokáže odrazit ode dna a v nadcházejících zápasech sezóny podávat lepší výkony.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Procent zwycięstw ${awayFormOnHO.winPerc}% na kortach twardych na zewnątrz przez ${awayData.properName} obrazuje trudny początek sezonu na tej nawierzchni. Mimo to, wciąż nie ma pewności, czy uda mu się odbić od dna i zapewnić lepsze wyniki w nadchodzących meczach sezonu.`;
        }

        if (awayFormOnHO.winPerc < 40) {
          of.awayForm =
            of.awayForm +
            ` It seems that ${awayData.lastName} has had a discouraging start to the season on outdoor hard courts, with a current win percentage of ${awayFormOnHO.winPerc}%. To enhance his results, the player will need to elevate his game.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Se pare că ${awayData.lastName} a avut un început de sezon descurajator pe terenurile hard în aer liber, cu un procentaj actual de victorii de ${awayFormOnHO.winPerc}%. Pentru a-și îmbunătăți rezultatele, jucătorul va trebui să își ridice nivelul de joc.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sembra che ${awayData.lastName} abbia avuto un inizio di stagione scoraggiante sui campi duri all'aperto, con una percentuale di vittorie attuale di ${awayFormOnHO.winPerc}%. Per migliorare i suoi risultati, il giocatore dovrà migliorare il suo gioco.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Parece que ${awayData.lastName} ha tenido un comienzo de temporada desalentador en pistas duras exteriores, con un porcentaje de victorias actual de ${awayFormOnHO.winPerc}%. Para mejorar sus resultados, el jugador necesitará elevar su juego.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Parece que ${awayData.lastName} teve um início de época desanimador em campos duros exteriores, com uma percentagem de vitórias actual de ${awayFormOnHO.winPerc}%. Para melhorar os seus resultados, o jogador terá de elevar o seu jogo.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Il semble que ${awayData.lastName} ait connu un début de saison décourageant sur les courts extérieurs en dur, avec un pourcentage de victoire actuel de ${awayFormOnHO.winPerc}%. Pour améliorer ses résultats, le joueur devra élever son niveau de jeu.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Es scheint, dass ${awayData.lastName} einen entmutigenden Start in die Saison auf Hartplätzen im Freien hatte, mit einer aktuellen Gewinnquote von ${awayFormOnHO.winPerc}%. Um seine Ergebnisse zu verbessern, muss der Spieler sein Spiel verbessern.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Zdá se, že ${awayData.lastName} má za sebou neutěšený začátek sezóny na venkovních tvrdých površích, s aktuálním procentem výher ${awayFormOnHO.winPerc}%. Ke zlepšení svých výsledků bude hráč potřebovat zkvalitnit svou hru.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wygląda na to, że ${awayData.lastName}ma zniechęcający początek sezonu na twardych kortach na zewnątrz, z aktualnym procentem wygranych ${awayFormOnHO.winPerc}%. Aby poprawić swoje wyniki, gracz będzie musiał podnieść poziom swojej gry.`;
        }
      }

      //// total of matches ABOVE 5 and possible outcomes
      if (awayFormOnHO.totalMatches >= 5) {
        // console.log(`win perc ${awayFormOnHO.winPerc}%`);
        of.awayForm = `During this season, ${awayData.properName} has played an adequate amount of matches on outdoor hard courts, thus enabling a thorough evaluation of his form on this surface.`;
        of.awayForm_RO = `În acest sezon, ${awayData.properName} a jucat un număr adecvat de meciuri pe terenuri dure în aer liber, permițând astfel o evaluare completă a formei sale pe această suprafață.`;
        of.awayForm_IT = `In questa stagione, ${awayData.properName} ha giocato un numero adeguato di partite su campi duri all'aperto, consentendo così una valutazione approfondita della sua forma su questa superficie.`;
        of.awayForm_ES = `Durante esta temporada, ${awayData.properName} ha jugado una cantidad adecuada de partidos en pista dura al aire libre, lo que permite una evaluación exhaustiva de su forma en esta superficie.`;
        of.awayForm_PT = `Durante esta época, ${awayData.properName} disputou uma quantidade adequada de jogos em campos duros exteriores, permitindo assim uma avaliação exaustiva da sua forma nesta superfície.`;
        of.awayForm_FR = `Au cours de cette saison, ${awayData.properName} a joué un nombre suffisant de matches sur des courts extérieurs en dur, ce qui permet une évaluation complète de sa forme sur cette surface.`;
        of.awayForm_DE = `In dieser Saison hat ${awayData.properName} eine ausreichende Anzahl von Matches auf Hartplätzen im Freien gespielt, so dass eine gründliche Bewertung seiner Form auf diesem Belag möglich ist.`;
        of.awayForm_CZ = `Během této sezóny odehrál ${awayData.properName} dostatečné množství zápasů na venkovních tvrdých kurtech, což umožňuje důkladné zhodnocení jeho formy na tomto povrchu.`;
        of.awayForm_PL = `W tym sezonie ${awayData.properName} rozegrał odpowiednią ilość spotkań na zewnętrznych kortach twardych, co pozwala na dokładną ocenę jego formy na tej nawierzchni.`;

        if (awayFormOnHO.winPerc >= 80) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName} has an impressive win rate of ${awayFormOnHO.winPerc}% on outdoor hard courts, having won ${awayFormOnHO.won} matches and lost ${awayFormOnHO.lost}.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` ${awayData.properName} are o rată de victorie impresionantă de ${awayFormOnHO.winPerc}% pe terenuri dure în aer liber, câștigând ${awayFormOnHO.won} meciuri și pierzând ${awayFormOnHO.lost}.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` ${awayData.properName} ha un'impressionante percentuale di vittorie di ${awayFormOnHO.winPerc}% sui campi duri all'aperto, avendo vinto ${awayFormOnHO.won} e perso ${awayFormOnHO.lost}.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` ${awayData.properName} tiene un impresionante porcentaje de victorias de ${awayFormOnHO.winPerc}% en pista dura al aire libre, habiendo ganado ${awayFormOnHO.won} partidos y perdido ${awayFormOnHO.lost}.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` ${awayData.properName} tem uma taxa de vitórias impressionante de ${awayFormOnHO.winPerc}% em campos duros exteriores, tendo ganho ${awayFormOnHO.won} jogos e perdido ${awayFormOnHO.lost}.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Le joueur ${awayData.properName} a un taux de victoire impressionnant de ${awayFormOnHO.winPerc}% sur les courts extérieurs en dur, ayant gagné ${awayFormOnHO.won} et perdu ${awayFormOnHO.lost}.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName} hat eine beeindruckende Siegquote von ${awayFormOnHO.winPerc}% auf Hartplätzen im Freien. Er hat ${awayFormOnHO.won} Matches gewonnen und ${awayFormOnHO.lost} verloren.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} má na venkovních tvrdých kurtech působivou úspěšnost ${awayFormOnHO.winPerc}%, když vyhrál ${awayFormOnHO.won} zápasů a prohrál ${awayFormOnHO.lost}.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` ${awayData.properName}ma imponujący współczynnik wygranych ${awayFormOnHO.winPerc}% na kortach twardych zewnętrznych, wygrywając ${awayFormOnHO.won} mecze i przegrywając ${awayFormOnHO.lost}.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on outdoor hard courts this season (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard în aer liber în acest sezon (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri all'aperto in questa stagione (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura al aire libre esta temporada (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros exteriores esta época (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en extérieur cette saison (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien gewonnen hat (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na venkovních tvrdých kurtech (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na zewnętrznych kortach twardych (${awayFormOnHO.titles[0].titleName}).`;
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
                )} titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHO.titles.length
                } em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } v této sezóně podařil pozoruhodný kousek, když získal ${
                  awayFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 80 && awayFormOnHO.winPerc >= 65) {
          of.awayForm =
            of.awayForm +
            ` With a current win percentage of ${awayFormOnHO.winPerc}% on outdoor hard courts, ${awayData.properName} has displayed a robust form on this surface overall.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Cu un procentaj actual de victorii de ${awayFormOnHO.winPerc}% pe terenuri dure în aer liber, ${awayData.properName} a afișat o formă robustă pe această suprafață în general.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Con una percentuale di vittorie di ${awayFormOnHO.winPerc}% sui campi duri all'aperto, ${awayData.properName} ha mostrato una buona forma su questa superficie.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Con un porcentaje de victorias actual de ${awayFormOnHO.winPerc}% en pista dura al aire libre, ${awayData.properName} ha mostrado una forma robusta en esta superficie en general.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Com uma percentagem de vitórias actual de ${awayFormOnHO.winPerc}% em campos duros exteriores, ${awayData.properName} tem demonstrado uma forma robusta nesta superfície em geral.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Avec un pourcentage de victoire de ${awayFormOnHO.winPerc}% sur les courts extérieurs en dur, ${awayData.properName} affiche une forme robuste sur cette surface.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Mit einer aktuellen Siegquote von ${awayFormOnHO.winPerc}% auf Hartplätzen im Freien hat ${awayData.properName} auf diesem Belag insgesamt eine gute Form gezeigt.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` S aktuálním procentem výher ${awayFormOnHO.winPerc}% na venkovních tvrdých kurtech vykazuje ${awayData.properName} na tomto povrchu celkově solidní formu.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Z procentem zwycięstw ${awayFormOnHO.winPerc}% na twardych kortach, ${awayData.properName} prezentuje solidną formę na tej nawierzchni.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on outdoor hard courts this season (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard în aer liber în acest sezon (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri all'aperto in questa stagione (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura al aire libre esta temporada (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros exteriores esta época (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en extérieur cette saison (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien gewonnen hat (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na venkovních tvrdých kurtech (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na zewnętrznych kortach twardych (${awayFormOnHO.titles[0].titleName}).`;
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
                )} titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHO.titles.length
                } em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } v této sezóně podařil pozoruhodný kousek, když získal ${
                  awayFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 65 && awayFormOnHO.winPerc >= 50) {
          of.awayForm =
            of.awayForm +
            ` While ${awayData.lastName}'s current form on outdoor hard courts can be considered satisfactory, there is certainly potential for improvement.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` În timp ce forma actuală a lui ${awayData.lastName} pe terenurile dure în aer liber poate fi considerată satisfăcătoare, există cu siguranță un potențial de îmbunătățire.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Sebbene la forma attuale di ${awayData.lastName} sui campi duri all'aperto possa essere considerata soddisfacente, c'è sicuramente un potenziale di miglioramento.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` Aunque el estado de forma actual de ${awayData.lastName} en pistas duras al aire libre puede considerarse satisfactorio, no cabe duda de que puede mejorar.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` Embora a forma actual de ${awayData.lastName} em campos duros ao ar livre possa ser considerada satisfatória, há certamente potencial para melhorar.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Si la forme actuelle de ${awayData.lastName} sur les courts extérieurs en dur peut être considérée comme satisfaisante, il y a certainement un potentiel d'amélioration.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` Während ${awayData.lastName}s aktuelle Form auf Hartplätzen im Freien als zufriedenstellend angesehen werden kann, gibt es sicherlich noch Verbesserungspotenzial.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` Ačkoli lze současnou formu ${awayData.lastName} na venkovních tvrdých kurtech považovat za uspokojivou, určitě je zde potenciál ke zlepšení.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Choć obecną formę ${awayData.lastName} na zewnętrznych kortach twardych można uznać za zadowalającą, to z pewnością jest potencjał do poprawy.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on outdoor hard courts this season (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard în aer liber în acest sezon (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri all'aperto in questa stagione (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura al aire libre esta temporada (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros exteriores esta época (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en extérieur cette saison (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien gewonnen hat (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na venkovních tvrdých kurtech (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na zewnętrznych kortach twardych (${awayFormOnHO.titles[0].titleName}).`;
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
                )} titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHO.titles.length
                } em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } v této sezóně podařil pozoruhodný kousek, když získal ${
                  awayFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych w tym sezonie (${titles.join(
                  ', '
                )}).`;
            }
          }
        }

        if (awayFormOnHO.winPerc < 50) {
          of.awayForm =
            of.awayForm +
            ` ${awayData.properName}'s performance on outdoor hard courts is not good, with a win rate of only ${awayFormOnHO.winPerc}% in his matches played.`;
          of.awayForm_RO =
            of.awayForm_RO +
            ` Performanța lui ${awayData.properName} pe terenurile dure în aer liber nu este bună, cu o rată de victorie de numai ${awayFormOnHO.winPerc}% în meciurile jucate.`;
          of.awayForm_IT =
            of.awayForm_IT +
            ` Le prestazioni di ${awayData.properName} sui campi duri all'aperto non sono buone, con una percentuale di vittorie di solo ${awayFormOnHO.winPerc}% nelle sue partite giocate.`;
          of.awayForm_ES =
            of.awayForm_ES +
            ` El rendimiento de ${awayData.properName} en pistas duras al aire libre no es bueno, con un porcentaje de victorias de sólo ${awayFormOnHO.winPerc}% en sus partidos jugados.`;
          of.awayForm_PT =
            of.awayForm_PT +
            ` O desempenho de ${awayData.properName} em campos duros exteriores não é bom, com uma taxa de vitórias de apenas ${awayFormOnHO.winPerc}% nos jogos disputados.`;
          of.awayForm_FR =
            of.awayForm_FR +
            ` Les performances de ${awayData.properName} sur les courts extérieurs en dur ne sont pas bonnes, avec un taux de victoire de seulement ${awayFormOnHO.winPerc}% dans ses matchs joués.`;
          of.awayForm_DE =
            of.awayForm_DE +
            ` ${awayData.properName}s Leistung auf Hartplätzen im Freien ist nicht gut, mit einer Siegquote von nur ${awayFormOnHO.winPerc}% in seinen gespielten Matches.`;
          of.awayForm_CZ =
            of.awayForm_CZ +
            ` ${awayData.properName} jeho výkonnost na venkovních tvrdých kurtech není dobrá, v odehraných zápasech má pouze ${awayFormOnHO.winPerc}% vítězství.`;
          of.awayForm_PL =
            of.awayForm_PL +
            ` Wyniki ${awayData.properName} na kortach twardych zewnętrznych nie są dobre, a wskaźnik wygranych w jego rozegranych meczach wynosi zaledwie ${awayFormOnHO.winPerc}%.`;

          /// check for titles
          if (awayFormOnHO.titles.length > 0) {
            if (awayFormOnHO.titles.length === 1) {
              of.awayForm =
                of.awayForm +
                ` It is also worth noting that ${awayData.lastName} has clinched one title on outdoor hard courts this season (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` De asemenea, merită remarcat faptul că ${awayData.lastName} a câștigat un titlu pe terenuri hard în aer liber în acest sezon (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Vale la pena notare che ${awayData.lastName} ha conquistato un titolo su campi duri all'aperto in questa stagione (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` También cabe destacar que ${awayData.lastName} ha ganado un título en pista dura al aire libre esta temporada (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Também vale a pena notar que ${awayData.lastName} conquistou um título em campos duros exteriores esta época (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` Il convient également de noter que ${awayData.lastName} a remporté un titre sur dur en extérieur cette saison (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Es ist auch erwähnenswert, dass ${awayData.lastName} in dieser Saison einen Titel auf Hartplätzen im Freien gewonnen hat (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Za zmínku také stojí, že ${awayData.lastName} získal v této sezóně jeden titul na venkovních tvrdých kurtech (${awayFormOnHO.titles[0].titleName}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Warto również zauważyć, że ${awayData.lastName} zdobył w tym sezonie jeden tytuł na zewnętrznych kortach twardych (${awayFormOnHO.titles[0].titleName}).`;
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
                )} titles on outdoor hard courts this season (${titles.join(
                  ', '
                )}).`;
              of.awayForm_RO =
                of.awayForm_RO +
                ` În plus, ${
                  awayData.lastName
                } a reușit performanța remarcabilă de a obține ${
                  awayFormOnHO.titles.length
                } titluri pe terenuri hard în aer liber în acest sezon (${titles.join(
                  ', '
                )}).`;
              of.awayForm_IT =
                of.awayForm_IT +
                ` Inoltre, ${
                  awayData.lastName
                } ha compiuto la straordinaria impresa di aggiudicarsi ${
                  awayFormOnHO.titles.length
                } titoli sui campi duri all'aperto in questa stagione (${titles.join(
                  ', '
                )}).`;
              of.awayForm_ES =
                of.awayForm_ES +
                ` Además, ${
                  awayData.lastName
                } ha logrado la notable hazaña de conseguir ${
                  awayFormOnHO.titles.length
                } títulos en pistas duras al aire libre esta temporada (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PT =
                of.awayForm_PT +
                ` Além disso, ${
                  awayData.lastName
                } conseguiu a proeza notável de garantir títulos de ${
                  awayFormOnHO.titles.length
                } em campos de terra batida ao ar livre esta época (${titles.join(
                  ', '
                )}).`;
              of.awayForm_FR =
                of.awayForm_FR +
                ` De plus, ${
                  awayData.lastName
                } a réussi l'exploit de remporter ${
                  awayFormOnHO.titles.length
                } sur des courts extérieurs en dur cette saison (${titles.join(
                  ', '
                )}).`;
              of.awayForm_DE =
                of.awayForm_DE +
                ` Außerdem hat ${
                  awayData.lastName
                } das bemerkenswerte Kunststück vollbracht, sich in dieser Saison ${
                  awayFormOnHO.titles.length
                } Titel auf Hartplätzen im Freien zu sichern (${titles.join(
                  ', '
                )}).`;
              of.awayForm_CZ =
                of.awayForm_CZ +
                ` Kromě toho se ${
                  awayData.lastName
                } v této sezóně podařil pozoruhodný kousek, když získal ${
                  awayFormOnHO.titles.length
                } titulů na venkovních tvrdých površích (${titles.join(
                  ', '
                )}).`;
              of.awayForm_PL =
                of.awayForm_PL +
                ` Dodatkowo, ${
                  awayData.lastName
                } dokonał niezwykłego wyczynu, jakim jest zdobycie ${
                  awayFormOnHO.titles.length
                } tytułów na zewnętrznych kortach twardych w tym sezonie (${titles.join(
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

export { formOfPlayersOnHO };
