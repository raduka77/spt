'use strict';

const predictionByH2H = function (h2h, homeData, awayData, ground) {
  let h2s = {
    byH2H: '',
    byH2H_RO: '',
    byH2H_IT: '',
    byH2H_ES: '',
    byH2H_PT: '',
    byH2H_FR: '',
    byH2H_DE: '',
    byH2H_CZ: '',
    byH2H_PL: '',
  };

  if (typeof ground === 'undefined') {
    const h2hDiff = Math.abs(h2h.homeTeamWins - h2h.awayTeamWins);

    if (h2h.homeTeamWins === 0 && h2h.awayTeamWins === 0) {
      h2s.byH2H = `This is the first time the two players are facing each other, so there is no past record of direct matches between them.`;
      h2s.byH2H_RO = `Este pentru prima dată când cei doi jucători se întalnesc, astfel că nu există un istoric de meciuri directe între.`;
      h2s.byH2H_IT = `Questa è la prima volta che i due giocatori si affrontano, quindi non ci sono precedenti di incontri diretti tra loro.`;
      h2s.byH2H_ES = `Es la primera vez que ambos jugadores se enfrentan, por lo que no hay antecedentes de enfrentamientos directos entre ellos.`;
      h2s.byH2H_PT = `Esta é a primeira vez que os dois jogadores se defrontam, pelo que não há registo de confrontos directos entre eles.`;
      h2s.byH2H_FR = `C'est la première fois que les deux joueurs s'affrontent, il n'y a donc pas d'antécédents de matchs directs entre eux.`;
      h2s.byH2H_DE = `Es ist das erste Mal, dass sich die beiden Spieler gegenüberstehen, es gibt also keine direkten Begegnungen in der Vergangenheit zwischen ihnen.`;
      h2s.byH2H_CZ = `Oba hráči se proti sobě postaví poprvé, takže mezi nimi nejsou žádné přímé zápasy z minulosti.`;
      h2s.byH2H_PL = `Jest to pierwszy raz, kiedy obaj zawodnicy stają naprzeciw siebie, więc nie ma zapisu z przeszłości o bezpośrednich meczach między nimi.`;
    }

    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record is currently tied between the two players, with both of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul meciurilor directe este în prezent egal între cei doi jucători, ambii având același număr de victorii (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio dei testa a testa tra i due giocatori è attualmente in parità: entrambi hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El historial de enfrentamientos directos está actualmente empatado entre los dos jugadores, habiendo ganado ambos el mismo número de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registo frente a frente está actualmente empatado entre os dois jogadores, com ambos a vencerem o mesmo número de jogos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des face-à-face est actuellement à égalité entre les deux joueurs, qui ont tous deux remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Das Kopf-an-Kopf-Rennen zwischen den beiden Spielern ist derzeit ausgeglichen, da beide die gleiche Anzahl von Spielen gewonnen haben (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Vzájemná bilance obou hráčů je v současné době vyrovnaná, oba hráči vyhráli stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Rekord head-to-head jest obecnie remisowy między tymi dwoma graczami, z czego obaj wygrali taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }
    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `The head-to-head record shows that ${homeData.properName} has a slight edge over ${awayData.lastName}, but it's not significant enough to suggest any major advantage.`;
      h2s.byH2H_RO = `Recordul meciurilor directe arată că ${homeData.properName} are un ușor avantaj față de ${awayData.lastName}, dar nu este suficient de semnificativ pentru a sugera un avantaj major.`;
      h2s.byH2H_IT = `Il testa a testa mostra che ${homeData.properName} ha un leggero vantaggio su ${awayData.lastName}, ma non è abbastanza significativo da suggerire un vantaggio importante.`;
      h2s.byH2H_ES = `El registro de enfrentamientos directos muestra que ${homeData.properName} tiene una ligera ventaja sobre ${awayData.lastName}, pero no es lo suficientemente significativa como para sugerir una ventaja importante.`;
      h2s.byH2H_PT = `O registo frente-a-frente mostra que ${homeData.properName} tem uma ligeira vantagem sobre ${awayData.lastName}, mas não é suficientemente significativa para sugerir uma grande vantagem.`;
      h2s.byH2H_FR = `Le bilan des face-à-face montre que ${homeData.properName} a un léger avantage sur ${awayData.lastName}, mais il n'est pas assez significatif pour suggérer un avantage majeur.`;
      h2s.byH2H_DE = `Die direkte Gegenüberstellung zeigt, dass ${homeData.properName} einen leichten Vorsprung vor ${awayData.lastName} hat, der aber nicht signifikant genug ist, um auf einen großen Vorteil hinzuweisen.`;
      h2s.byH2H_CZ = `Z výsledků vzájemných zápasů vyplývá, že ${homeData.properName} má mírnou převahu nad ${awayData.lastName}, ale není natolik výrazná, aby naznačovala nějakou významnou výhodu.`;
      h2s.byH2H_PL = `Rekord head-to-head pokazuje, że ${homeData.properName} ma niewielką przewagę nad ${awayData.lastName}, ale nie jest ona na tyle znacząca, by sugerować jakąś większą przewagę.`;
    }

    //// H2H - Home is the leader, 2 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `Taking into account the history of head-to-head matches, ${homeData.properName} appears to hold a slight advantage over ${awayData.lastName}.`;
      h2s.byH2H_RO = `Ținând cont de istoricul meciurilor directe, ${homeData.properName} pare să dețină un ușor avantaj față de ${awayData.lastName}.`;
      h2s.byH2H_IT = `Tenendo conto della storia degli incontri testa a testa, ${homeData.properName} sembra avere un leggero vantaggio su ${awayData.lastName}.`;
      h2s.byH2H_ES = `Teniendo en cuenta el historial de enfrentamientos directos, ${homeData.properName} parece tener una ligera ventaja sobre ${awayData.lastName}.`;
      h2s.byH2H_PT = `Tendo em conta o histórico de confrontos directos, ${homeData.properName} parece ter uma ligeira vantagem sobre ${awayData.lastName}.`;
      h2s.byH2H_FR = `En tenant compte de l'historique des confrontations directes, ${homeData.properName} semble détenir un léger avantage sur ${awayData.lastName}.`;
      h2s.byH2H_DE = `Berücksichtigt man die Historie der direkten Begegnungen, scheint ${homeData.properName} einen leichten Vorteil gegenüber ${awayData.lastName} zu haben.`;
      h2s.byH2H_CZ = `S ohledem na historii vzájemných zápasů se zdá, že ${homeData.properName} má mírnou výhodu nad ${awayData.lastName}.`;
      h2s.byH2H_PL = `Biorąc pod uwagę historię meczów head-to-head, wydaje się, że ${homeData.properName} posiada nieznaczną przewagę nad ${awayData.lastName}.`;
    }

    //// H2H - Home is the leader, 3+ match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `One player who has been consistently dominating in the head-to-head matches is ${homeData.properName}.`;
      h2s.byH2H_RO = `Un jucător care a dominat în mod constant în meciurile directe este ${homeData.properName}.`;
      h2s.byH2H_IT = `Un giocatore che ha dominato costantemente nei testa a testa è ${homeData.properName}.`;
      h2s.byH2H_ES = `Un jugador que ha dominado constantemente en los enfrentamientos directos es ${homeData.properName}.`;
      h2s.byH2H_PT = `Um jogador que tem dominado consistentemente os confrontos directos é o ${homeData.properName}.`;
      h2s.byH2H_FR = `L'un des joueurs qui a constamment dominé les face-à-face est ${homeData.properName}.`;
      h2s.byH2H_DE = `Ein Spieler, der in den Kopf-an-Kopf-Matches stets dominiert hat, ist ${homeData.properName}.`;
      h2s.byH2H_CZ = `Jedním z hráčů, který v přímých soubojích neustále dominuje, je ${homeData.properName}.`;
      h2s.byH2H_PL = `Jednym z graczy, który konsekwentnie dominuje w meczach head-to-head jest ${homeData.properName}.`;
    }
    //// H2H - away is the leader, 1 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Upon examining the head-to-head record, it appears that ${awayData.properName} has a slight advantage over ${homeData.lastName}, but it's not substantial enough to indicate a significant advantage.`;
      h2s.byH2H_RO = `La examinarea meciurilor directe, se pare că ${awayData.properName} are un ușor avantaj față de ${homeData.lastName}, dar nu este suficient de substanțial pentru a fi considerat semnificativ.`;
      h2s.byH2H_IT = `Esaminando i record testa a testa, sembra che ${awayData.properName} abbia un leggero vantaggio su ${homeData.lastName}, ma non è abbastanza sostanziale da indicare un vantaggio significativo.`;
      h2s.byH2H_ES = `Al examinar el registro de enfrentamientos directos, parece que ${awayData.properName} tiene una ligera ventaja sobre ${homeData.lastName}, pero no es lo suficientemente sustancial como para indicar una ventaja significativa.`;
      h2s.byH2H_PT = `Ao examinar o registo frente-a-frente, parece que ${awayData.properName} tem uma ligeira vantagem sobre ${homeData.lastName}, mas não é suficientemente substancial para indicar uma vantagem significativa.`;
      h2s.byH2H_FR = `En examinant les résultats des face-à-face, il apparaît que ${awayData.properName} a un léger avantage sur ${homeData.lastName}, mais il n'est pas assez important pour indiquer un avantage significatif.`;
      h2s.byH2H_DE = `Bei der Prüfung des direkten Vergleichs scheint es, dass ${awayData.properName} einen leichten Vorteil gegenüber ${homeData.lastName} hat, der aber nicht erheblich genug ist, um auf einen signifikanten Vorteil hinzuweisen.`;
      h2s.byH2H_CZ = `Po prozkoumání vzájemných záznamů se zdá, že ${awayData.properName} má mírnou výhodu nad ${homeData.lastName}, ale není dostatečně výrazná na to, aby znamenala významnou výhodu.`;
      h2s.byH2H_PL = `Po zbadaniu rekordu head-to-head wydaje się, że ${awayData.properName} ma niewielką przewagę nad ${homeData.lastName}, ale nie jest ona na tyle znacząca, by wskazywać na znaczącą przewagę.`;
    }

    //// H2H - away is the leader, 2 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `${awayData.lastName} holds a slight edge over ${homeData.lastName} in their head-to-head matches, although the advantage is not significant.`;
      h2s.byH2H_RO = `${awayData.lastName} are un ușor avantaj față de ${homeData.lastName} în meciurile directe, deși avantajul nu este semnificativ.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un leggero vantaggio su ${homeData.lastName} nei testa a testa, anche se il vantaggio non è significativo.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ligera ventaja sobre ${homeData.lastName} en sus enfrentamientos directos, aunque la ventaja no es significativa.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma ligeira vantagem sobre ${homeData.lastName} nos seus confrontos directos, embora a vantagem não seja significativa.`;
      h2s.byH2H_FR = `Le nom de famille de ${awayData.lastName} est légèrement supérieur à celui de ${homeData.lastName} dans les confrontations directes, mais l'avantage n'est pas significatif.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen leichten Vorteil gegenüber ${homeData.lastName} in ihren direkten Duellen, obwohl der Vorteil nicht signifikant ist.`;
      h2s.byH2H_CZ = `${awayData.lastName} má ve vzájemných zápasech mírnou převahu nad ${homeData.lastName}, i když není nijak výrazná.`;
      h2s.byH2H_PL = `${awayData.lastName}posiada lekką przewagę nad ${homeData.lastName}w ich meczach head-to-head, choć przewaga ta nie jest znacząca.`;
    }

    //// H2H - away is the leader, 3+ match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${awayData.properName} has a clear lead in the head-to-head matches against ${homeData.lastName}.`;
      h2s.byH2H_RO = `${awayData.properName} are un avantaj clar în meciurile directe cu ${homeData.lastName}.`;
      h2s.byH2H_IT = `${awayData.properName} è in netto vantaggio nei testa a testa contro ${homeData.lastName}.`;
      h2s.byH2H_ES = `${awayData.properName} tiene una clara ventaja en los enfrentamientos directos contra ${homeData.lastName}.`;
      h2s.byH2H_PT = `${awayData.properName} tem uma clara vantagem nos confrontos directos contra ${homeData.lastName}.`;
      h2s.byH2H_FR = `${awayData.properName} a une nette avance dans les confrontations directes contre ${homeData.lastName}.`;
      h2s.byH2H_DE = `${awayData.properName} hat einen klaren Vorsprung in den Kopf-an-Kopf-Spielen gegen ${homeData.lastName}.`;
      h2s.byH2H_CZ = `${awayData.properName} jasně vede v přímých zápasech proti ${homeData.lastName}.`;
      h2s.byH2H_PL = `${awayData.properName} ma wyraźną przewagę w meczach head-to-head przeciwko ${homeData.lastName}.`;
    }
  }

  //// HARD OUTDOOR
  if (ground === 'Hardcourt outdoor') {
    const h2hDiff = Math.abs(h2h.homeTeamWins - h2h.awayTeamWins);

    //// if first match
    if (h2h.homeTeamWins === 0 && h2h.awayTeamWins === 0) {
      h2s.byH2H = `These players have never faced each other before, so this is their first-ever encounter on the court. As a result, there is no record of their previous matches.`;
      h2s.byH2H_RO = `Acești jucători nu s-au mai întâlnit pana acum, deoarece acesta este primul lor meci. Prin urmare, nu există nicio statistică a meciurilor directe anterioare.`;
      h2s.byH2H_IT = `Questi giocatori non si sono mai affrontati prima, quindi questo è il loro primo incontro in campo. Di conseguenza, non esistono registrazioni delle loro partite precedenti.`;
      h2s.byH2H_ES = `Estos jugadores nunca se han enfrentado antes, por lo que éste es su primer encuentro en la pista. Por lo tanto, no hay constancia de sus enfrentamientos anteriores.`;
      h2s.byH2H_PT = `Estes jogadores nunca se defrontaram antes, pelo que este é o seu primeiro encontro em campo. Por conseguinte, não há registo dos seus jogos anteriores.`;
      h2s.byH2H_FR = `Ces joueurs ne se sont jamais affrontés auparavant et c'est donc la première fois qu'ils se rencontrent sur le terrain. Par conséquent, il n'existe aucune trace de leurs matchs précédents.`;
      h2s.byH2H_DE = `Diese Spieler sind noch nie gegeneinander angetreten, so dass dies ihr allererstes Aufeinandertreffen auf dem Platz ist. Aus diesem Grund gibt es keine Aufzeichnungen über ihre früheren Spiele.`;
      h2s.byH2H_CZ = `Tito hráči proti sobě ještě nikdy nestáli, takže se na kurtu setkávají poprvé. Z tohoto důvodu neexistuje žádný záznam o jejich předchozích zápasech.`;
      h2s.byH2H_PL = `Zawodnicy ci nigdy wcześniej nie mierzyli się ze sobą, więc jest to ich pierwsze w życiu spotkanie na korcie. W związku z tym nie ma zapisu ich poprzednich meczów.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the two players is evenly matched, with each player having won an equal number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul meciurilor directe dintre cei doi jucători este egal, fiecare jucător având un număr egal de victorii (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio dei testa a testa tra i due giocatori è pari, con ciascun giocatore che ha vinto un numero uguale di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El historial de enfrentamientos directos entre los dos jugadores está igualado, y cada jugador ha ganado el mismo número de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registo frente-a-frente entre os dois jogadores é equilibrado, com cada jogador a ganhar um número igual de jogos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des confrontations directes entre les deux joueurs est équilibré, chaque joueur ayant remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Die Kopf-an-Kopf-Bilanz zwischen den beiden Spielern ist ausgeglichen, wobei jeder Spieler die gleiche Anzahl von Spielen gewonnen hat (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Vzájemná bilance obou hráčů je vyrovnaná, každý z nich vyhrál stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Rekord head-to-head pomiędzy tymi dwoma graczami jest wyrównany, każdy z nich wygrał taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Based on their previous head-to-head matches, ${homeData.properName} has a slight edge over ${awayData.properName}, but the difference is not significant enough to give a clear advantage.`;
      h2s.byH2H_RO = `Pe baza confruntărilor directe anterioare, ${homeData.properName} are un ușor avantaj față de ${awayData.properName}, dar diferența nu este suficient de semnificativă pentru a oferi un avantaj clar.`;
      h2s.byH2H_IT = `In base ai precedenti testa a testa, ${homeData.properName} ha un leggero vantaggio su ${awayData.properName}, ma la differenza non è abbastanza significativa da determinare un chiaro vantaggio.`;
      h2s.byH2H_ES = `Basándose en sus enfrentamientos directos anteriores, ${homeData.properName} tiene una ligera ventaja sobre ${awayData.properName}, pero la diferencia no es lo suficientemente significativa como para dar una ventaja clara.`;
      h2s.byH2H_PT = `Com base nos seus confrontos directos anteriores, ${homeData.properName} tem uma ligeira vantagem sobre ${awayData.properName}, mas a diferença não é suficientemente significativa para dar uma vantagem clara.`;
      h2s.byH2H_FR = `Sur la base de leurs précédents face-à-face, ${homeData.properName} a un léger avantage sur ${awayData.properName}, mais la différence n'est pas assez importante pour donner un avantage clair.`;
      h2s.byH2H_DE = `Ausgehend von den bisherigen direkten Begegnungen hat ${homeData.properName} einen leichten Vorteil gegenüber ${awayData.properName}, aber der Unterschied ist nicht signifikant genug, um einen klaren Vorteil zu ergeben.`;
      h2s.byH2H_CZ = `Na základě předchozích vzájemných zápasů má ${homeData.properName} mírnou výhodu nad ${awayData.properName}, ale rozdíl není natolik výrazný, aby poskytoval jasnou výhodu.`;
      h2s.byH2H_PL = `Na podstawie ich poprzednich meczów head-to-head, ${homeData.properName} ma lekką przewagę nad ${awayData.properName}, ale różnica nie jest na tyle znacząca, aby dać wyraźną przewagę.`;
    }

    //// H2H - Home is the leader, 2 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `Taking a closer look at their past encounters, it seems that ${homeData.lastName} has a slightly better record against ${awayData.lastName}.`;
      h2s.byH2H_RO = `Aruncând o privire mai atentă la întâlnirile lor anterioare, se pare că ${homeData.lastName} are un record ușor mai bun față de ${awayData.lastName}.`;
      h2s.byH2H_IT = `Dando un'occhiata ai loro incontri passati, sembra che ${homeData.lastName} abbia un record leggermente migliore contro ${awayData.lastName}.`;
      h2s.byH2H_ES = `Si analizamos sus enfrentamientos anteriores, parece que ${homeData.lastName} tiene un historial ligeramente mejor que ${awayData.lastName}.`;
      h2s.byH2H_PT = `Analisando melhor os seus encontros anteriores, parece que ${homeData.lastName} tem um registo ligeiramente melhor contra ${awayData.lastName}.`;
      h2s.byH2H_FR = `Si l'on regarde de plus près leurs confrontations passées, il semble que ${homeData.lastName} ait un bilan légèrement meilleur que ${awayData.lastName}.`;
      h2s.byH2H_DE = `Ein genauerer Blick auf die vergangenen Begegnungen zeigt, dass ${homeData.lastName} eine etwas bessere Bilanz gegen ${awayData.lastName} aufweist.`;
      h2s.byH2H_CZ = `Při bližším pohledu na jejich předchozí střetnutí se zdá, že ${homeData.lastName} má proti ${awayData.lastName} o něco lepší bilanci.`;
      h2s.byH2H_PL = `Przyglądając się bliżej ich dotychczasowym spotkaniom, wydaje się, że ${homeData.lastName} ma nieco lepszy rekord przeciwko ${awayData.lastName}.`;
    }

    //// H2H - Home is the leader, 3+ match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${homeData.lastName} holds a clear advantage in the head-to-head matches against ${awayData.properName}.`;
      h2s.byH2H_RO = `${homeData.lastName} deține un avantaj clar în meciurile directe cu ${awayData.properName}.`;
      h2s.byH2H_IT = `${homeData.lastName} è in netto vantaggio nei testa a testa contro ${awayData.properName}.`;
      h2s.byH2H_ES = `${homeData.lastName} tiene una clara ventaja en los enfrentamientos directos contra ${awayData.properName}.`;
      h2s.byH2H_PT = `${homeData.lastName} tem uma clara vantagem nos confrontos directos contra ${awayData.properName}.`;
      h2s.byH2H_FR = `${homeData.lastName} détient un net avantage dans les confrontations directes contre ${awayData.properName}.`;
      h2s.byH2H_DE = `${homeData.lastName} hat einen klaren Vorteil in den Kopf-an-Kopf-Spielen gegen ${awayData.properName}.`;
      h2s.byH2H_CZ = `${homeData.lastName} má jasnou převahu v přímých soubojích proti ${awayData.properName}.`;
      h2s.byH2H_PL = `${homeData.lastName} posiada wyraźną przewagę w meczach head-to-head przeciwko ${awayData.properName}.`;
    }
    //// H2H - away is the leader, 1 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Taking into account their previous head-to-head encounters, ${awayData.properName} seems to have a slight advantage over ${homeData.properName}, although the margin is not substantial enough to provide a decisive advantage.`;
      h2s.byH2H_RO = `Ținând cont de întâlnirile lor anterioare, ${awayData.properName} pare să aibă un ușor avantaj față de ${homeData.properName}, deși marja nu este suficient de mare pentru a oferi un avantaj decisiv.`;
      h2s.byH2H_IT = `Tenendo conto dei loro precedenti incontri testa a testa, ${awayData.properName} sembra avere un leggero vantaggio su ${homeData.properName}, anche se il margine non è abbastanza consistente da fornire un vantaggio decisivo.`;
      h2s.byH2H_ES = `Teniendo en cuenta sus enfrentamientos directos anteriores, ${awayData.properName} parece tener una ligera ventaja sobre ${homeData.properName}, aunque el margen no es lo suficientemente sustancial como para proporcionar una ventaja decisiva.`;
      h2s.byH2H_PT = `Tendo em conta os seus anteriores confrontos directos, ${awayData.properName} parece ter uma ligeira vantagem sobre ${homeData.properName}, embora a margem não seja suficientemente substancial para proporcionar uma vantagem decisiva.`;
      h2s.byH2H_FR = `Si l'on tient compte de leurs précédents face-à-face, ${awayData.properName} semble avoir un léger avantage sur ${homeData.properName}, bien que la marge ne soit pas assez importante pour fournir un avantage décisif.`;
      h2s.byH2H_DE = `In Anbetracht ihrer bisherigen direkten Begegnungen scheint ${awayData.properName} einen leichten Vorteil gegenüber ${homeData.properName} zu haben, obwohl der Vorsprung nicht groß genug ist, um einen entscheidenden Vorteil zu bieten.`;
      h2s.byH2H_CZ = `Vzhledem k předchozím vzájemným střetnutím se zdá, že ${awayData.properName} má mírnou převahu nad ${homeData.properName}, i když rozdíl není natolik výrazný, aby poskytoval rozhodující výhodu.`;
      h2s.byH2H_PL = `Biorąc pod uwagę ich poprzednie spotkania head-to-head, ${awayData.properName} wydaje się mieć lekką przewagę nad ${homeData.properName}, choć margines nie jest na tyle znaczący, by zapewnić decydującą przewagę.`;
    }

    //// H2H - away is the leader, 2 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `${awayData.lastName} holds a slight head-to-head advantage over ${homeData.lastName}, but the margin is not significant.`;
      h2s.byH2H_RO = `${awayData.lastName} are un ușor avantaj față de ${homeData.lastName}, dar marja nu este semnificativă.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un leggero vantaggio rispetto a ${homeData.lastName}, ma il margine non è significativo.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ligera ventaja sobre ${homeData.lastName}, pero el margen no es significativo.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma ligeira vantagem no confronto directo sobre ${homeData.lastName}, mas a margem não é significativa.`;
      h2s.byH2H_FR = `${awayData.lastName} possède un léger avantage sur ${homeData.lastName}, mais la marge n'est pas significative.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen leichten Vorsprung gegenüber ${homeData.lastName}, aber der Abstand ist nicht signifikant.`;
      h2s.byH2H_CZ = `${awayData.lastName} má mírnou převahu nad ${homeData.lastName}, ale rozdíl není významný.`;
      h2s.byH2H_PL = `${awayData.lastName}ma niewielką przewagę nad ${homeData.lastName}, ale margines nie jest znaczący.`;
    }

    //// H2H - away is the leader, 3+ match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${awayData.lastName} holds a significant advantage in the head-to-head record against ${homeData.lastName}.`;
      h2s.byH2H_RO = `${awayData.lastName} deține un avantaj semnificativ în meciurile directe cu ${homeData.lastName}.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un vantaggio significativo nei testa a testa contro ${homeData.lastName}.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ventaja significativa en el historial de enfrentamientos directos contra ${homeData.lastName}.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma vantagem significativa no registo frente a frente contra ${homeData.lastName}.`;
      h2s.byH2H_FR = `${awayData.lastName} détient un avantage significatif dans les confrontations directes avec ${homeData.lastName}.`;
      h2s.byH2H_DE = `${AuswärtsDaten.Nachname} hat einen deutlichen Vorsprung in der direkten Bilanz gegen ${HeimatDaten.Nachname}.`;
      h2s.byH2H_CZ = `${awayData.lastName} má výraznou převahu ve vzájemných zápasech proti ${homeData.lastName}.`;
      h2s.byH2H_PL = `${awayData.lastName}posiada znaczącą przewagę w rekordzie head-to-head przeciwko ${homeData.lastName}.`;
    }

    /// begin check on surface
    //// if first match on surface
    if (h2h.homeWinsOutHard === 0 && h2h.awayWinsOutHard === 0) {
      h2s.byH2H =
        h2s.byH2H +
        ` This is the first time the two players will be facing each other on an outdoor hard court.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Este pentru prima dată când cei doi jucători se vor confrunta pe un teren de outdoor hard.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` È la prima volta che i due giocatori si affrontano su un campo da gioco outdoor hard.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Es la primera vez que ambos jugadores se enfrentan en una pista de outdoor hard.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Esta é a primeira vez que os dois jogadores se defrontam num campo de outdoor hard.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` C'est la première fois que les deux joueurs s'affrontent sur un terrain outdoor hard.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Dies ist das erste Mal, dass sich die beiden Spieler auf einem outdoor-hard-Platz gegenüberstehen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Je to poprvé, co se oba hráči střetnou na kurtu outdoor hard.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Po raz pierwszy obaj zawodnicy zmierzą się ze sobą na korcie outdoor hard.`;
    }

    /// also equal on surface
    if (
      h2h.homeWinsOutHard > 0 &&
      h2h.awayWinsOutHard > 0 &&
      h2h.homeWinsOutHard === h2h.awayWinsOutHard
    ) {
      h2s.byH2H =
        h2s.byH2H +
        ` Both ${homeData.lastName} and ${awayData.lastName} have played on hardcourts in the past, and their record is currently tied at ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Atât ${homeData.lastName}, cât și ${awayData.lastName} au jucat pe terenurile outdoor hard în trecut, iar recordul lor este în prezent egal la ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Sia ${homeData.lastName} che ${awayData.lastName} hanno giocato in passato sui campi di outdoor hard e il loro record è attualmente pari a ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} han jugado en canchas outdoor hard en el pasado, y su récord está actualmente empatado a ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} jogaram em campos outdoor hard no passado, e o seu registo está actualmente empatado em ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} et ${awayData.lastName} ont tous deux joué sur les courts outdoor hard par le passé, et leur bilan est actuellement à égalité ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Sowohl ${homeData.lastName} als auch ${awayData.lastName} haben in der Vergangenheit auf outdoor hard Courts gespielt, und ihre Bilanz ist derzeit ausgeglichen bei ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jak ${homeData.lastName}, tak ${awayData.lastName} hrály v minulosti na kurtech outdoor hard a jejich bilance je v současné době vyrovnaná: ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Zarówno ${homeData.lastName} jak i ${awayData.lastName} grały w przeszłości na kortach outdoor hard, a ich bilans jest obecnie remisowy i wynosi ${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}.`;
    }

    //// home in adv
    if (h2h.homeWinsOutHard > h2h.awayWinsOutHard) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${homeData.lastName} has a better record than ${awayData.lastName} in their head-to-head matches played on hard courts (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${homeData.lastName} are un record mai bun decât ${awayData.lastName} în meciurile directe jucate pe terenurile outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${homeData.lastName} ha un record migliore di ${awayData.lastName} nei testa a testa giocati sui campi di outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${homeData.lastName} tiene un mejor récord que ${awayData.lastName} en sus enfrentamientos directos jugados en canchas outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${homeData.lastName} tem um registo melhor do que ${awayData.lastName} nos seus jogos frente a frente disputados em campos outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} a un meilleur bilan que ${awayData.lastName} dans leurs confrontations directes disputées sur les courts outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${homeData.lastName} hat eine bessere Bilanz als ${awayData.lastName} in ihren Kopf-an-Kopf-Matches auf outdoor hard Courts (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${homeData.lastName} má lepší bilanci než ${awayData.lastName} ve vzájemných zápasech hraných na kurtech outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${homeData.lastName} ma lepszy bilans niż ${awayData.lastName} w ich meczach head-to-head rozgrywanych na kortach outdoor hard (${h2h.homeWinsOutHard}-${h2h.awayWinsOutHard}).`;
    }

    //// away in adv
    if (h2h.homeWinsOutHard < h2h.awayWinsOutHard) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${awayData.properName} has won more hardcourt matches against ${homeData.lastName}, with a record of ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${awayData.properName} a câștigat mai multe meciuri pe teren dur împotriva lui ${homeData.lastName}, cu un record de ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${awayData.properName} ha vinto più partite su campi duri contro ${homeData.lastName}, con un record di ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${awayData.properName} ha ganado más partidos en pista dura contra ${homeData.lastName}, con un récord de ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${awayData.properName} ganhou mais jogos em campo duro contra ${homeData.lastName}, com um registo de ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${awayData.properName} a gagné plus de matches sur dur contre ${homeData.lastName}, avec un record de ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${awayData.properName} hat mehr Hartplatzspiele gegen ${homeData.lastName} gewonnen, mit einer Bilanz von ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${awayData.properName} vyhrál více zápasů na tvrdém povrchu proti ${homeData.lastName} s bilancí ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${awayData.properName}wygrał więcej meczów na twardym korcie przeciwko ${homeData.lastName}, z rekordem ${h2h.awayWinsOutHard}-${h2h.homeWinsOutHard}.`;
    }
  }

  ///// CLAY
  if (
    ground === 'Clay' ||
    ground === 'Red clay' ||
    ground === 'Red clay indoor' ||
    ground === 'Green clay'
  ) {
    const h2hDiff = Math.abs(h2h.homeTeamWins - h2h.awayTeamWins);

    //// if first match
    if (h2h.homeTeamWins === 0 && h2h.awayTeamWins === 0) {
      h2s.byH2H = `This game marks the first time these two players will face each other, so there's no record of their past matches.`;
      h2s.byH2H_RO = `Acest meci marchează prima confruntare între cei doi jucători. Nu există nicio înregistrare a meciurilor lor anterioare.`;
      h2s.byH2H_IT = `Questa partita segna la prima volta che i due giocatori si affrontano, quindi non ci sono precedenti.`;
      h2s.byH2H_ES = `Este partido marca la primera vez que estos dos jugadores se enfrentarán, por lo que no hay constancia de sus enfrentamientos anteriores.`;
      h2s.byH2H_PT = `Este jogo marca a primeira vez que estes dois jogadores se defrontam, pelo que não há registo dos seus confrontos anteriores.`;
      h2s.byH2H_FR = `C'est la première fois que ces deux joueurs s'affrontent, il n'y a donc pas d'historique de leurs rencontres.`;
      h2s.byH2H_DE = `Es ist das erste Mal, dass diese beiden Spieler gegeneinander antreten, daher gibt es keine Aufzeichnungen über ihre bisherigen Begegnungen.`;
      h2s.byH2H_CZ = `V tomto zápase se tito dva hráči utkají poprvé, takže nemáme k dispozici záznamy o jejich předchozích zápasech.`;
      h2s.byH2H_PL = `Ten mecz to pierwsze spotkanie tych dwóch zawodników, więc nie ma zapisu ich dotychczasowych spotkań.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the players is even, with each of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul meciurilor directe dintre cei doi jucători este egal, fiecare dintre ei câștigând același număr de meciuri (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio dei testa a testa tra i giocatori è pari, con ciascuno di essi che ha vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El historial de enfrentamientos directos entre los jugadores está igualado, ya que cada uno de ellos ha ganado el mismo número de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registo frente a frente entre os jogadores é equilibrado, tendo cada um deles ganho o mesmo número de jogos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des confrontations directes entre les joueurs est identique, chacun d'entre eux ayant remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Die Kopf-an-Kopf-Bilanz zwischen den Spielern ist ausgeglichen, da jeder von ihnen die gleiche Anzahl von Spielen gewonnen hat (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Vzájemná bilance hráčů je vyrovnaná, každý z nich vyhrál stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Rekord head-to-head między zawodnikami jest równy - każdy z nich wygrał taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Although ${homeData.properName} has won more head-to-head matches against ${awayData.lastName}, the margin is too narrow to give a clear advantage in this regard.`;
      h2s.byH2H_RO = `Deși ${homeData.properName} a câștigat mai multe meciuri directe împotriva lui ${awayData.lastName}, marja este prea mică pentru a oferi un avantaj clar în această privință.`;
      h2s.byH2H_IT = `Sebbene ${homeData.properName} abbia vinto più partite testa a testa contro ${awayData.lastName}, il margine è troppo stretto per dare un chiaro vantaggio in questo senso.`;
      h2s.byH2H_ES = `Aunque ${homeData.properName} ha ganado más enfrentamientos directos contra ${awayData.lastName}, el margen es demasiado estrecho para dar una clara ventaja en este sentido.`;
      h2s.byH2H_PT = `Embora ${homeData.properName} tenha ganho mais jogos frente a frente contra ${awayData.lastName}, a margem é demasiado pequena para dar uma vantagem clara a este respeito.`;
      h2s.byH2H_FR = `Bien que ${homeData.properName} ait remporté plus de confrontations directes contre ${awayData.lastName}, la marge est trop étroite pour donner un avantage clair à cet égard.`;
      h2s.byH2H_DE = `Obwohl ${homeData.properName} mehr Spiele gegen ${awayData.lastName} gewonnen hat, ist der Vorsprung zu gering, um einen klaren Vorteil in dieser Hinsicht zu erkennen.`;
      h2s.byH2H_CZ = `Ačkoli ${homeData.properName} vyhrálo více vzájemných zápasů proti ${awayData.lastName}, rozdíl je příliš malý na to, aby bylo možné v tomto ohledu hovořit o jasné výhodě.`;
      h2s.byH2H_PL = `Chociaż ${homeData.properName} wygrało więcej meczów head-to-head z ${awayData.lastName}, to margines jest zbyt wąski, aby dać wyraźną przewagę w tym względzie.`;
    }

    //// H2H - Home is the leader, 2 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `Taking a glance at the head-to-head matches, it appears that ${homeData.properName} has a slight edge over ${awayData.lastName}.`;
      h2s.byH2H_RO = `Aruncând o privire la meciurile directe, se pare că ${homeData.properName} are un ușor avantaj față de ${awayData.lastName}.`;
      h2s.byH2H_IT = `Dando un'occhiata alle partite testa a testa, sembra che ${homeData.properName} abbia un leggero vantaggio su ${awayData.lastName}.`;
      h2s.byH2H_ES = `Echando un vistazo a los enfrentamientos directos, parece que ${homeData.properName} tiene una ligera ventaja sobre ${awayData.lastName}.`;
      h2s.byH2H_PT = `Analisando os confrontos directos, verifica-se que ${homeData.properName} tem uma ligeira vantagem sobre ${awayData.lastName}.`;
      h2s.byH2H_FR = `Si l'on considère les confrontations directes, il apparaît que ${homeData.properName} a un léger avantage sur ${awayData.lastName}.`;
      h2s.byH2H_DE = `Ein Blick auf die Kopf-an-Kopf-Spiele zeigt, dass ${homeData.properName} einen leichten Vorteil gegenüber ${awayData.lastName} hat.`;
      h2s.byH2H_CZ = `Při pohledu na vzájemné zápasy se zdá, že ${homeData.properName} má mírnou převahu nad ${awayData.lastName}.`;
      h2s.byH2H_PL = `Patrząc na mecze head-to-head, wydaje się, że ${homeData.properName} ma lekką przewagę nad ${awayData.lastName}.`;
    }

    //// H2H - Home is the leader, 3+ match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `In the history of head-to-head matches between the two players, ${homeData.properName} has emerged as the clear leader.`;
      h2s.byH2H_RO = `În istoria meciurilor directe dintre cei doi jucători, ${homeData.properName} a devenit liderul clar.`;
      h2s.byH2H_IT = `Nella storia dei testa a testa tra i due giocatori, ${homeData.properName} è emerso come chiaro leader.`;
      h2s.byH2H_ES = `En el historial de enfrentamientos directos entre ambos jugadores, ${homeData.properName} se ha erigido como claro líder.`;
      h2s.byH2H_PT = `No histórico de confrontos directos entre os dois jogadores, ${homeData.properName} emergiu como o líder claro.`;
      h2s.byH2H_FR = `Dans l'histoire des face-à-face entre les deux joueurs, ${homeData.properName} s'est imposé comme le leader incontesté.`;
      h2s.byH2H_DE = `In der Geschichte der Kopf-an-Kopf-Matches zwischen den beiden Spielern hat sich ${homeData.properName} als klarer Spitzenreiter erwiesen.`;
      h2s.byH2H_CZ = `V historii vzájemných zápasů těchto dvou hráčů je ${homeData.properName} jasným lídrem.`;
      h2s.byH2H_PL = `W historii meczów head-to-head pomiędzy tymi dwoma graczami, ${homeData.properName} wyłonił się jako zdecydowany lider.`;
    }
    //// H2H - away is the leader, 1 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Despite ${awayData.properName} winning more head-to-head matches against ${homeData.lastName}, the difference is too slight to indicate any significant advantage in this aspect.`;
      h2s.byH2H_RO = `În ciuda faptului că ${awayData.properName} a câștigat mai multe meciuri directe împotriva lui ${homeData.lastName}, diferența este prea mică pentru a indica un avantaj semnificativ în acest aspect.`;
      h2s.byH2H_IT = `Nonostante ${awayData.properName} abbia vinto più partite testa a testa contro ${homeData.lastName}, la differenza è troppo lieve per indicare un vantaggio significativo in questo aspetto.`;
      h2s.byH2H_ES = `A pesar de que ${awayData.properName} ha ganado más enfrentamientos directos contra ${homeData.lastName}, la diferencia es demasiado pequeña para indicar una ventaja significativa en este aspecto.`;
      h2s.byH2H_PT = `Apesar de ${awayData.properName} ter ganho mais jogos frente a frente contra ${homeData.lastName}, a diferença é demasiado pequena para indicar qualquer vantagem significativa neste aspecto.`;
      h2s.byH2H_FR = `Bien que ${awayData.properName} ait remporté plus de confrontations directes contre ${homeData.lastName}, la différence est trop faible pour indiquer un avantage significatif dans ce domaine.`;
      h2s.byH2H_DE = `Obwohl ${awayData.properName} mehr Spiele gegen ${homeData.lastName} gewonnen hat, ist der Unterschied zu gering, um auf einen signifikanten Vorteil in diesem Aspekt hinzuweisen.`;
      h2s.byH2H_CZ = `Přestože ${awayData.properName} vyhrál více vzájemných zápasů proti ${homeData.lastName}, rozdíl je příliš malý na to, aby naznačoval nějakou významnou výhodu v tomto ohledu.`;
      h2s.byH2H_PL = `Pomimo tego, że ${awayData.properName} wygrało więcej meczów head-to-head z ${homeData.lastName}, różnica jest zbyt mała, aby wskazywać na jakąś znaczącą przewagę w tym aspekcie.`;
    }

    //// H2H - away is the leader, 2 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `${awayData.lastName} has a slight head-to-head advantage over ${homeData.properName}, but it's not significant enough to indicate a clear advantage.`;
      h2s.byH2H_RO = `${awayData.lastName} are un ușor avantaj față de ${homeData.properName}, dar nu este suficient de semnificativ pentru a indica un avantaj clar.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un leggero vantaggio rispetto a ${homeData.properName}, ma non è abbastanza significativo da indicare un chiaro vantaggio.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ligera ventaja sobre ${homeData.properName}, pero no es lo suficientemente significativa como para indicar una clara ventaja.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma ligeira vantagem frente a ${homeData.properName}, mas não é suficientemente significativa para indicar uma vantagem clara.`;
      h2s.byH2H_FR = `${awayData.lastName} a un léger avantage sur ${homeData.properName}, mais il n'est pas assez significatif pour indiquer un avantage clair.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen leichten Kopf-an-Kopf-Vorteil gegenüber ${homeData.properName}, aber er ist nicht signifikant genug, um einen klaren Vorteil anzuzeigen.`;
      h2s.byH2H_CZ = `${awayData.lastName} má mírnou převahu nad ${homeData.properName}, ale není dostatečně výrazná, aby znamenala jasnou výhodu.`;
      h2s.byH2H_PL = `${awayData.lastName} ma niewielką przewagę nad ${homeData.properName}, ale nie jest ona na tyle znacząca, by wskazywać na wyraźną przewagę.`;
    }

    //// H2H - away is the leader, 3+ match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${awayData.properName} has the upper hand in the head-to-head matches against ${homeData.lastName}.`;
      h2s.byH2H_RO = `${awayData.properName} are avantaj în meciurile directe cu ${homeData.lastName}.`;
      h2s.byH2H_IT = `${awayData.properName} ha la meglio nei testa a testa contro ${homeData.lastName}.`;
      h2s.byH2H_ES = `${awayData.properName} tiene ventaja en los enfrentamientos directos contra ${homeData.lastName}.`;
      h2s.byH2H_PT = `${awayData.properName} tem a vantagem nos confrontos directos contra ${homeData.lastName}.`;
      h2s.byH2H_FR = `${awayData.properName} a l'avantage dans les confrontations directes contre ${homeData.lastName}.`;
      h2s.byH2H_DE = `${awayData.properName} hat die Oberhand in den Kopf-an-Kopf-Spielen gegen ${homeData.lastName}.`;
      h2s.byH2H_CZ = `${awayData.properName} má v přímých zápasech proti ${homeData.lastName} navrch.`;
      h2s.byH2H_PL = `${awayData.properName}ma przewagę w meczach head-to-head przeciwko ${homeData.lastName}.`;
    }

    /// begin check on surface
    //// if first match on surface
    if (h2h.homeWinsClay === 0 && h2h.awayWinsClay === 0) {
      h2s.byH2H =
        h2s.byH2H +
        ` This is the first encounter between the two players on clay courts.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Aceasta este prima întâlnire dintre cei doi jucători pe zgură.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Questo è il primo incontro tra i due giocatori sui campi in terra battuta.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Este es el primer enfrentamiento entre ambos jugadores en tierra batida.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Este é o primeiro encontro entre os dois jogadores em courts de terra batida.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` Il s'agit de la première rencontre entre les deux joueurs sur terre battue.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Dies ist das erste Aufeinandertreffen der beiden Spieler auf Sandplätzen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jedná se o první vzájemné střetnutí obou hráčů na antukových kurtech.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` To pierwsze spotkanie obu zawodników na kortach ziemnych.`;
    }

    /// also equal on surface
    if (
      h2h.homeWinsClay > 0 &&
      h2h.awayWinsClay > 0 &&
      h2h.homeWinsClay === h2h.awayWinsClay
    ) {
      h2s.byH2H =
        h2s.byH2H +
        ` Both ${homeData.lastName} and ${awayData.lastName} have played on clay courts in the past, and their record is currently tied at ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Atât ${homeData.lastName}, cât și ${awayData.lastName} au jucat pe zgură în trecut, iar recordul lor este în prezent egal la ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Sia ${homeData.lastName} che ${awayData.lastName} hanno giocato su campi in terra battuta in passato, e il loro record è attualmente pari a ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} han jugado en tierra batida en el pasado, y su récord está actualmente empatado a ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} jogaram em campos de terra batida no passado, e os seus registos estão actualmente empatados em ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} et ${awayData.lastName} ont tous deux joué sur terre battue par le passé, et leur bilan est actuellement à égalité ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Sowohl ${homeData.lastName} als auch ${awayData.lastName} haben in der Vergangenheit auf Sandplätzen gespielt, und ihre Bilanz ist derzeit gleich: ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jak ${homeData.lastName}, tak ${awayData.lastName} hrály v minulosti na antukových kurtech a jejich bilance je v současnosti vyrovnaná: ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Zarówno ${homeData.lastName} jak i ${awayData.lastName} grali w przeszłości na kortach ziemnych, a ich bilans jest obecnie remisowy i wynosi ${h2h.homeWinsClay}-${h2h.awayWinsClay}.`;
    }

    //// home in adv
    if (h2h.homeWinsClay > h2h.awayWinsClay) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${homeData.lastName} has a better record than ${awayData.lastName} in their head-to-head matches played on clay courts (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${homeData.lastName} are un record mai bun decât ${awayData.lastName} în meciurile directe jucate pe zgură (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${homeData.lastName} ha un record migliore di ${awayData.lastName} nei loro testa a testa giocati su campi in terra battuta (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${homeData.lastName} tiene mejor récord que ${awayData.lastName} en sus enfrentamientos directos en tierra batida (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${homeData.lastName} tem um registo melhor do que ${awayData.lastName} nos seus confrontos directos jogados em campos de terra batida (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} a un meilleur bilan que ${awayData.lastName} dans leurs face-à-face sur terre battue (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${homeData.lastName} hat eine bessere Bilanz als ${awayData.lastName} in ihren Kopf-an-Kopf-Matches auf Sandplätzen (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${homeData.lastName} má lepší bilanci než ${awayData.lastName} ve vzájemných zápasech hraných na antukových kurtech (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${homeData.lastName} ma lepszy bilans niż ${awayData.lastName} w ich meczach head-to-head rozgrywanych na kortach ziemnych (${h2h.homeWinsClay}-${h2h.awayWinsClay}).`;
    }

    //// away in adv
    if (h2h.homeWinsClay < h2h.awayWinsClay) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${awayData.properName} has won more clay courts matches against ${homeData.lastName}, with a record of ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${awayData.properName} a câștigat mai multe meciuri pe zgură împotriva lui ${homeData.lastName}, cu un record de ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${awayData.properName} ha vinto più partite su terra battuta contro ${homeData.lastName}, con un record di ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${awayData.properName} ha ganado más partidos en tierra batida contra ${homeData.lastName}, con un récord de ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${awayData.properName} ganhou mais jogos em campos de terra batida contra ${homeData.lastName}, com um registo de ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${awayData.properName} a gagné plus de matches sur terre battue contre ${homeData.lastName}, avec un record de ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${awayData.properName} hat mehr Sandplatzspiele gegen ${homeData.lastName} gewonnen, mit einer Bilanz von ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${awayData.properName} vyhrál více zápasů na antuce proti ${homeData.lastName} s bilancí ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${awayData.properName} wygrał więcej meczów na kortach ziemnych przeciwko ${homeData.lastName}, z rekordem ${h2h.awayWinsClay}-${h2h.homeWinsClay}.`;
    }
  }

  ///// HARDCOURT INDOOR

  if (ground === 'Hardcourt indoor') {
    const h2hDiff = Math.abs(h2h.homeTeamWins - h2h.awayTeamWins);

    //// if first match
    if (h2h.homeTeamWins === 0 && h2h.awayTeamWins === 0) {
      h2s.byH2H = `These two players are going to face each other for the first time, so there's no past record of their matches to refer to.`;
      h2s.byH2H_RO = `Acești doi jucători se vor confrunta pentru prima dată, așa că nu există un istoric al meciurilor lor la care să se poată face referire.`;
      h2s.byH2H_IT = `Questi due giocatori si affrontano per la prima volta, quindi non ci sono precedenti di partite a cui fare riferimento.`;
      h2s.byH2H_ES = `Estos dos jugadores se enfrentarán por primera vez, por lo que no hay antecedentes de sus enfrentamientos.`;
      h2s.byH2H_PT = `Estes dois jogadores vão defrontar-se pela primeira vez, pelo que não há registo de confrontos anteriores.`;
      h2s.byH2H_FR = `Ces deux joueurs vont s'affronter pour la première fois, il n'y a donc pas d'antécédents de matches auxquels se référer.`;
      h2s.byH2H_DE = `Diese beiden Spieler stehen sich zum ersten Mal gegenüber, es gibt also keine Aufzeichnungen über frühere Kämpfe, auf die man sich beziehen könnte.`;
      h2s.byH2H_CZ = `Tito dva hráči se proti sobě postaví poprvé, takže není k dispozici žádný záznam jejich předchozích zápasů.`;
      h2s.byH2H_PL = `Ci dwaj zawodnicy zmierzą się ze sobą po raz pierwszy, więc nie ma żadnego zapisu ich meczów z przeszłości, do którego można by się odwołać.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head situation between the two players is currently tied, with each player having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Situația meciurilor directe dintre cei doi jucători este în prezent la egalitate, fiecare jucător având același număr de victorii (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il testa a testa tra i due giocatori è attualmente in parità, con ciascuno che ha vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `La situación en el mano a mano entre los dos jugadores está actualmente empatada, con cada jugador habiendo ganado el mismo número de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `A situação no confronto directo entre os dois jogadores está actualmente empatada, com cada jogador a ganhar o mesmo número de jogos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le face-à-face entre les deux joueurs est actuellement à égalité, chaque joueur ayant remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Das Kopf-an-Kopf-Rennen zwischen den beiden Spielern ist derzeit unentschieden, da beide Spieler die gleiche Anzahl von Spielen gewonnen haben (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Vzájemná bilance obou hráčů je v současné době vyrovnaná, každý z nich vyhrál stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Sytuacja Head-to-head pomiędzy tymi dwoma zawodnikami jest obecnie remisowa - każdy z nich wygrał taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `If we consider their previous matches against each other, ${homeData.properName} has a slight edge over ${awayData.lastName}. However, this alone may not necessarily translate into an advantage in the current match.`;
      h2s.byH2H_RO = `Dacă luăm în considerare meciurile anterioare dintre ei, ${homeData.properName} are un ușor avantaj față de ${awayData.lastName}. Cu toate acestea, numai acest lucru nu se poate traduce neapărat într-un avantaj în meciul actual.`;
      h2s.byH2H_IT = `Se consideriamo i loro precedenti confronti, ${homeData.properName} ha un leggero vantaggio su ${awayData.lastName}. Tuttavia, questo vantaggio non si traduce necessariamente in un vantaggio nella partita attuale.`;
      h2s.byH2H_ES = `Si tenemos en cuenta sus enfrentamientos anteriores, ${homeData.properName} tiene una ligera ventaja sobre ${awayData.lastName}. Sin embargo, esto por sí solo no se traduce necesariamente en una ventaja en el partido actual.`;
      h2s.byH2H_PT = `Se considerarmos os jogos anteriores entre eles, ${homeData.properName} tem uma ligeira vantagem sobre ${awayData.lastName}. No entanto, só isso pode não se traduzir necessariamente numa vantagem no jogo actual.`;
      h2s.byH2H_FR = `Si l'on considère leurs précédents affrontements, ${homeData.properName} a un léger avantage sur ${awayData.lastName}. Toutefois, cet avantage ne se traduit pas nécessairement par un avantage dans le match en cours.`;
      h2s.byH2H_DE = `Betrachtet man ihre früheren Spiele gegeneinander, hat ${homeData.properName} einen leichten Vorteil gegenüber ${awayData.lastName}. Dies allein muss jedoch nicht unbedingt zu einem Vorteil im aktuellen Spiel führen.`;
      h2s.byH2H_CZ = `Pokud vezmeme v úvahu jejich předchozí vzájemné zápasy, má ${homeData.properName} mírnou výhodu nad ${awayData.lastName}. To se však samo o sobě nemusí nutně promítnout do výhody v aktuálním zápase.`;
      h2s.byH2H_PL = `Jeśli weźmiemy pod uwagę ich poprzednie mecze przeciwko sobie, ${homeData.properName} ma lekką przewagę nad ${awayData.lastName}. Jednak samo to nie musi przekładać się na przewagę w obecnym meczu.`;
    }

    //// H2H - Home is the leader, 2 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `Taking a closer look at the history between these two players, it seems that ${homeData.properName} has had some success in their previous head-to-head matches against ${awayData.lastName}.`;
      h2s.byH2H_RO = `Dacă aruncăm o privire mai atentă la istoricul dintre acești doi jucători, se pare că ${homeData.properName} a avut ceva succes în meciurile directe anterioare cu ${awayData.lastName}.`;
      h2s.byH2H_IT = `Dando un'occhiata più da vicino ai precedenti tra questi due giocatori, sembra che ${homeData.properName} abbia avuto qualche successo nei suoi precedenti testa a testa contro ${awayData.lastName}.`;
      h2s.byH2H_ES = `Echando un vistazo más de cerca al historial entre estos dos jugadores, parece que ${homeData.properName} ha tenido cierto éxito en sus anteriores enfrentamientos directos contra ${awayData.lastName}.`;
      h2s.byH2H_PT = `Analisando mais de perto o histórico entre estes dois jogadores, parece que ${homeData.properName} teve algum sucesso nos seus confrontos directos anteriores contra ${awayData.lastName}.`;
      h2s.byH2H_FR = `En regardant de plus près l'historique entre ces deux joueurs, il semble que ${homeData.properName} ait eu du succès dans ses précédents face-à-face contre ${awayData.lastName}.`;
      h2s.byH2H_DE = `Ein genauerer Blick auf die Historie zwischen diesen beiden Spielern zeigt, dass ${homeData.properName} in den bisherigen Duellen gegen ${awayData.lastName} einige Erfolge verbuchen konnte.`;
      h2s.byH2H_CZ = `Při bližším pohledu na historii těchto dvou hráčů se zdá, že ${homeData.properName} byl v předchozích vzájemných zápasech proti ${awayData.lastName} úspěšný.`;
      h2s.byH2H_PL = `Przyglądając się bliżej historii pomiędzy tymi dwoma zawodnikami, wydaje się, że ${homeData.properName}odniósł pewien sukces w swoich poprzednich meczach head-to-head przeciwko ${awayData.lastName}.`;
    }

    //// H2H - Home is the leader, 3+ match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `There's no denying that ${homeData.lastName} has a significant advantage in the head-to-head matches against ${awayData.lastName}.`;
      h2s.byH2H_RO = `Nu se poate nega faptul că ${homeData.lastName} are un avantaj semnificativ în meciurile directe cu ${awayData.lastName}.`;
      h2s.byH2H_IT = `Non si può negare che ${homeData.lastName} abbia un vantaggio significativo nei testa a testa contro ${awayData.lastName}.`;
      h2s.byH2H_ES = `No se puede negar que ${homeData.lastName} tiene una ventaja significativa en los enfrentamientos directos contra ${awayData.lastName}.`;
      h2s.byH2H_PT = `Não há como negar que ${homeData.lastName} tem uma vantagem significativa nos confrontos directos contra ${awayData.lastName}.`;
      h2s.byH2H_FR = `Il est indéniable que ${homeData.lastName} a un avantage significatif dans les confrontations directes contre ${awayData.lastName}.`;
      h2s.byH2H_DE = `Es lässt sich nicht leugnen, dass ${homeData.lastName} in den direkten Duellen gegen ${awayData.lastName} einen deutlichen Vorteil hat.`;
      h2s.byH2H_CZ = `Nelze popřít, že ${homeData.lastName} má v přímých zápasech proti ${awayData.lastName} značnou výhodu.`;
      h2s.byH2H_PL = `Nie da się ukryć, że ${homeData.lastName} ma znaczną przewagę w meczach head-to-head z ${awayData.lastName}.`;
    }
    //// H2H - away is the leader, 1 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Although ${awayData.properName} has won more head-to-head matches against ${homeData.lastName}, the margin is too narrow to suggest any significant advantage in this regard.`;
      h2s.byH2H_RO = `Deși ${awayData.properName} a câștigat mai multe meciuri directe împotriva lui ${homeData.lastName}, marja este prea mică pentru a sugera un avantaj semnificativ în această privință.`;
      h2s.byH2H_IT = `Sebbene ${awayData.properName} abbia vinto più incontri testa a testa contro ${homeData.lastName}, il margine è troppo stretto per suggerire un vantaggio significativo in questo senso.`;
      h2s.byH2H_ES = `Aunque ${awayData.properName} ha ganado más enfrentamientos directos contra ${homeData.lastName}, el margen es demasiado estrecho para sugerir una ventaja significativa en este sentido.`;
      h2s.byH2H_PT = `Embora ${awayData.properName} tenha ganho mais jogos frente a frente contra ${homeData.lastName}, a margem é demasiado pequena para sugerir qualquer vantagem significativa a este respeito.`;
      h2s.byH2H_FR = `Bien que ${awayData.properName} ait remporté plus de confrontations directes contre ${homeData.lastName}, la marge est trop étroite pour suggérer un avantage significatif à cet égard.`;
      h2s.byH2H_DE = `Obwohl ${awayData.properName} mehr Spiele gegen ${homeData.lastName} gewonnen hat, ist der Vorsprung zu gering, um auf einen signifikanten Vorteil in dieser Hinsicht hinzuweisen.`;
      h2s.byH2H_CZ = `Ačkoli ${awayData.properName} vyhrálo více vzájemných zápasů proti ${homeData.lastName}, rozdíl je příliš malý na to, aby se dalo hovořit o nějaké významné výhodě.`;
      h2s.byH2H_PL = `Chociaż ${awayData.properName} wygrał więcej meczów head-to-head z ${homeData.lastName}, to margines jest zbyt wąski, aby sugerować jakąkolwiek znaczącą przewagę w tym względzie.`;
    }

    //// H2H - away is the leader, 2 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `${awayData.lastName} has a slight head-to-head advantage over ${homeData.lastName}, but the difference is not significant.`;
      h2s.byH2H_RO = `${awayData.lastName} are un ușor avantaj față de ${homeData.lastName}, dar diferența nu este semnificativă.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un leggero vantaggio rispetto a ${homeData.lastName}, ma la differenza non è significativa.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ligera ventaja sobre ${homeData.lastName}, pero la diferencia no es significativa.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma ligeira vantagem frente a ${homeData.lastName}, mas a diferença não é significativa.`;
      h2s.byH2H_FR = `${awayData.lastName} a un léger avantage sur ${homeData.lastName}, mais la différence n'est pas significative.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen leichten Kopf-an-Kopf-Vorteil gegenüber ${homeData.lastName}, aber der Unterschied ist nicht signifikant.`;
      h2s.byH2H_CZ = `${awayData.lastName} má mírnou převahu nad ${homeData.lastName}, ale rozdíl není významný.`;
      h2s.byH2H_PL = `${awayData.lastName} ma niewielką przewagę nad ${homeData.lastName}, ale różnica nie jest znacząca.`;
    }

    //// H2H - away is the leader, 3+ match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${awayData.lastName} has a significant lead in the head-to-head matches between the two players.`;
      h2s.byH2H_RO = `${awayData.lastName} are un avans semnificativ în meciurile directe dintre cei doi jucători.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un vantaggio significativo nei testa a testa tra i due giocatori.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ventaja significativa en los enfrentamientos directos entre ambos jugadores.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma vantagem significativa nos confrontos directos entre os dois jogadores.`;
      h2s.byH2H_FR = `${awayData.lastName} a une avance significative dans les face-à-face entre les deux joueurs.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen deutlichen Vorsprung in den Kopf-an-Kopf-Matches zwischen den beiden Spielern.`;
      h2s.byH2H_CZ = `${awayData.lastName} má ve vzájemných zápasech mezi oběma hráči výrazný náskok.`;
      h2s.byH2H_PL = `${awayData.lastName}ma znaczącą przewagę w meczach head-to-head pomiędzy tymi dwoma zawodnikami.`;
    }

    /// begin check on surface
    //// if first match on surface
    if (h2h.homeWinsIndHard === 0 && h2h.awayWinsIndHard === 0) {
      h2s.byH2H =
        h2s.byH2H +
        ` This is the first encounter between the two players on indoor hard courts.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Aceasta este prima întâlnire dintre cei doi jucători pe terenurile de indoor hard.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Questo è il primo incontro tra i due giocatori sui campi da gioco di indoor hard.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Este es el primer enfrentamiento entre ambos jugadores en canchas de indoor hard.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Este é o primeiro encontro entre os dois jogadores em campos de indoor hard.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` Il s'agit de la première rencontre entre les deux joueurs sur les courts indoor hard.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Dies ist die erste Begegnung zwischen den beiden Spielern auf indoor hard Courts.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jedná se o první střetnutí obou hráčů na kurtech indoor hard.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Jest to pierwsze spotkanie obu zawodników na kortach indoor hard.`;
    }

    /// also equal on surface
    if (
      h2h.homeWinsIndHard > 0 &&
      h2h.awayWinsIndHard > 0 &&
      h2h.homeWinsIndHard === h2h.awayWinsIndHard
    ) {
      h2s.byH2H =
        h2s.byH2H +
        ` Both ${homeData.lastName} and ${awayData.lastName} have played on indoor hardcourts in the past, and their record is currently tied at ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Atât ${homeData.lastName}, cât și ${awayData.lastName} au jucat pe terenurile indoor hard în trecut, iar recordul lor este în prezent egal la ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Sia ${homeData.lastName} che ${awayData.lastName} hanno giocato in passato sui campi di indoor hard e il loro record è attualmente pari a ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} han jugado en canchas de indoor hard en el pasado, y su récord está actualmente empatado a ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} jogaram em campos de indoor hard no passado, e os seus registos estão actualmente empatados em ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} et ${awayData.lastName} ont tous deux joué sur les courts indoor hard par le passé, et leur bilan est actuellement à égalité ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Sowohl ${homeData.lastName} als auch ${awayData.lastName} haben in der Vergangenheit auf indoor hard Courts gespielt, und ihre Bilanz ist derzeit ausgeglichen bei ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jak ${homeData.lastName}, tak ${awayData.lastName} hrály v minulosti na kurtech indoor hard a jejich bilance je v současné době vyrovnaná: ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Zarówno ${homeData.lastName} jak i ${awayData.lastName} grały w przeszłości na kortach indoor hard, a ich bilans jest obecnie remisowy i wynosi ${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}.`;
    }

    //// home in adv
    if (h2h.homeWinsIndHard > h2h.awayWinsIndHard) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${homeData.lastName} has a better record than ${awayData.lastName} in their head-to-head matches played on indoor hard courts (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${homeData.lastName} are un record mai bun decât ${awayData.lastName} în meciurile directe jucate pe terenurile indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${homeData.lastName} ha un record migliore di ${awayData.lastName} nei testa a testa giocati sui campi di indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${homeData.lastName} tiene un mejor récord que ${awayData.lastName} en sus enfrentamientos directos jugados en canchas indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${homeData.lastName} tem um registo melhor do que ${awayData.lastName} nos seus jogos frente a frente disputados em campos indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} a un meilleur bilan que ${awayData.lastName} dans leurs confrontations directes disputées sur les courts indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${homeData.lastName} hat eine bessere Bilanz als ${awayData.lastName} in ihren Kopf-an-Kopf-Matches auf indoor hard Courts (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${homeData.lastName} má lepší bilanci než ${awayData.lastName} ve vzájemných zápasech hraných na kurtech indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${homeData.lastName} ma lepszy bilans niż ${awayData.lastName} w ich meczach head-to-head rozgrywanych na kortach indoor hard (${h2h.homeWinsIndHard}-${h2h.awayWinsIndHard}).`;
    }

    //// away in adv
    if (h2h.homeWinsIndHard < h2h.awayWinsIndHard) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${awayData.properName} has won more indoor hardcourt matches against ${homeData.lastName}, with a record of ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${awayData.properName} a câștigat mai multe meciuri pe teren de indoor hard împotriva lui ${homeData.lastName}, cu un record de ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${awayData.properName} ha vinto più indoor hard partite in campo contro ${homeData.lastName}, con un record di ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${awayData.properName} ha ganado más partidos en pista de indoor hard contra ${homeData.lastName}, con un récord de ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${awayData.properName} ganhou mais indoor hard jogos em campo contra ${homeData.lastName}, com um registo de ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${awayData.properName} a gagné plus de indoor hard matches contre ${homeData.lastName}, avec un record de ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${awayData.properName} hat mehr indoor hard Spiele gegen ${homeData.lastName} gewonnen, mit einer Bilanz von ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${awayData.properName} vyhrál více indoor hard zápasů na kurtu proti ${homeData.lastName} s bilancí ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${awayData.properName} wygrał więcej indoor hard meczów na korcie przeciwko ${homeData.lastName}, z rekordem ${h2h.awayWinsIndHard}-${h2h.homeWinsIndHard}.`;
    }
  }

  ///// GRASS
  if (ground === 'Grass') {
    const h2hDiff = Math.abs(h2h.homeTeamWins - h2h.awayTeamWins);

    //// if first match
    if (h2h.homeTeamWins === 0 && h2h.awayTeamWins === 0) {
      h2s.byH2H = `This game marks the players' debut against each other, meaning they have no record of previous face-offs.`;
      h2s.byH2H_RO = `Acest meci marchează debutul jucătorilor unul împotriva celuilalt, ceea ce înseamnă că ei nu au nicio înregistrare a confruntărilor anterioare.`;
      h2s.byH2H_IT = `Questa partita segna il debutto dei giocatori l'uno contro l'altro, il che significa che non hanno precedenti di scontri diretti.`;
      h2s.byH2H_ES = `Este partido marca el debut de los jugadores entre sí, lo que significa que no tienen antecedentes de enfrentamientos previos.`;
      h2s.byH2H_PT = `Este jogo marca a estreia dos jogadores um contra o outro, o que significa que não têm qualquer registo de confrontos anteriores.`;
      h2s.byH2H_FR = `Ce match marque les débuts des joueurs l'un contre l'autre, ce qui signifie qu'ils n'ont pas d'antécédents en matière de confrontations.`;
      h2s.byH2H_DE = `In diesem Spiel treten die Spieler zum ersten Mal gegeneinander an, d. h. sie haben noch keine Erfahrungen mit früheren Begegnungen.`;
      h2s.byH2H_CZ = `Tento zápas je pro oba hráče premiérou, což znamená, že nemají žádné záznamy z předchozích vzájemných zápasů.`;
      h2s.byH2H_PL = `W tym meczu zawodnicy zadebiutują przeciwko sobie, co oznacza, że nie mają zapisanych wcześniejszych starć.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the players is evenly matched, with both of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Bilanțul meciurilor directe dintre jucători este egal, ambii jucători având același număr de victorii (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio dei testa a testa tra i giocatori è pari, con entrambi che hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El historial de enfrentamientos directos entre los jugadores está igualado, ya que ambos han ganado el mismo número de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registo frente a frente entre os jogadores é equilibrado, com ambos a terem ganho o mesmo número de jogos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des face-à-face entre les joueurs est équilibré, les deux ayant remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Die Kopf-an-Kopf-Bilanz zwischen den Spielern ist ausgeglichen, da beide die gleiche Anzahl von Spielen gewonnen haben (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Vzájemná bilance hráčů je vyrovnaná, oba hráči vyhráli stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Rekord head-to-head między zawodnikami jest wyrównany - obaj wygrali taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `The head-to-head record between ${homeData.properName} and ${awayData.lastName} slightly favors ${homeData.lastName}, but the difference is not significant enough to suggest a clear advantage in this regard.`;
      h2s.byH2H_RO = `Rezultatele directe dintre ${homeData.properName} și ${awayData.lastName} il favorizează ușor pe ${homeData.lastName}, dar diferența nu este suficient de semnificativă pentru a sugera un avantaj clar în această privință.`;
      h2s.byH2H_IT = `Il testa a testa tra ${homeData.properName} e ${awayData.lastName} favorisce leggermente ${homeData.lastName}, ma la differenza non è abbastanza significativa da suggerire un chiaro vantaggio in questo senso.`;
      h2s.byH2H_ES = `El historial de enfrentamientos directos entre ${homeData.properName} y ${awayData.lastName} favorece ligeramente a ${homeData.lastName}, pero la diferencia no es lo suficientemente significativa como para sugerir una clara ventaja en este sentido.`;
      h2s.byH2H_PT = `O registo frente-a-frente entre ${homeData.properName} e ${awayData.lastName} favorece ligeiramente ${homeData.lastName}, mas a diferença não é suficientemente significativa para sugerir uma vantagem clara a este respeito.`;
      h2s.byH2H_FR = `Le bilan des face-à-face entre ${homeData.properName} et ${awayData.lastName} est légèrement en faveur de ${homeData.lastName}, mais la différence n'est pas suffisamment significative pour suggérer un avantage clair à cet égard.`;
      h2s.byH2H_DE = `Der direkte Vergleich zwischen ${homeData.properName} und ${awayData.lastName} fällt leicht zugunsten von ${homeData.lastName} aus, aber der Unterschied ist nicht signifikant genug, um auf einen klaren Vorteil in dieser Hinsicht hinzuweisen.`;
      h2s.byH2H_CZ = `Vzájemný poměr mezi ${homeData.properName} a ${awayData.lastName} je mírně ve prospěch ${homeData.lastName}, ale rozdíl není natolik významný, aby naznačoval jasnou výhodu v tomto ohledu.`;
      h2s.byH2H_PL = `Rekord head-to-head pomiędzy ${homeData.properName} a ${awayData.lastName} nieznacznie faworyzuje ${homeData.lastName}, ale różnica nie jest na tyle znacząca, by sugerować wyraźną przewagę w tym względzie.`;
    }

    //// H2H - Home is the leader, 2 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `Upon examining the head-to-head matches, it appears that ${homeData.lastName} holds a slight advantage over ${awayData.lastName}.`;
      h2s.byH2H_RO = `La examinarea meciurilor directe, se pare că ${homeData.lastName} are un ușor avantaj față de ${awayData.lastName}.`;
      h2s.byH2H_IT = `Esaminando le partite testa a testa, sembra che ${homeData.lastName} abbia un leggero vantaggio su ${awayData.lastName}.`;
      h2s.byH2H_ES = `Al examinar los enfrentamientos directos, parece que ${homeData.lastName} tiene una ligera ventaja sobre ${awayData.lastName}.`;
      h2s.byH2H_PT = `Ao examinar os confrontos directos, verifica-se que ${homeData.lastName} tem uma ligeira vantagem sobre ${awayData.lastName}`;
      h2s.byH2H_FR = `Après examen des confrontations directes, il apparaît que ${homeData.lastName} détient un léger avantage sur ${awayData.lastName}`;
      h2s.byH2H_DE = `Bei der Untersuchung der Kopf-an-Kopf-Vergleiche scheint ${homeData.lastName} einen leichten Vorteil gegenüber ${awayData.lastName} zu haben`;
      h2s.byH2H_CZ = `Po prozkoumání vzájemných zápasů se zdá, že ${homeData.lastName} má mírnou výhodu nad ${awayData.lastName}.`;
      h2s.byH2H_PL = `Po przeanalizowaniu meczów head-to-head okazuje się, że ${homeData.lastName} ma niewielką przewagę nad ${awayData.lastName}.`;
    }

    //// H2H - Home is the leader, 3+ match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${homeData.properName} has been dominating the head-to-head matches against ${awayData.lastName}.`;
      h2s.byH2H_RO = `${homeData.properName} a dominat meciurile directe cu ${awayData.lastName}.`;
      h2s.byH2H_IT = `${homeData.properName} ha dominato i testa a testa contro ${awayData.lastName}.`;
      h2s.byH2H_ES = `${homeData.properName} ha dominado los enfrentamientos directos contra ${awayData.lastName}.`;
      h2s.byH2H_PT = `${homeData.properName} tem vindo a dominar os confrontos directos contra ${awayData.lastName}.`;
      h2s.byH2H_FR = `${homeData.properName} a dominé les face-à-face contre ${awayData.lastName}.`;
      h2s.byH2H_DE = `${homeData.properName} hat die direkten Duelle gegen ${awayData.lastName} dominiert.`;
      h2s.byH2H_CZ = `${homeData.properName} dominuje v přímých zápasech proti ${awayData.lastName}.`;
      h2s.byH2H_PL = `${homeData.properName} dominuje w meczach head-to-head przeciwko ${awayData.lastName}.`;
    }
    //// H2H - away is the leader, 1 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `Despite ${awayData.properName} having a higher number of head-to-head wins against ${homeData.lastName}, the margin is not significant enough to suggest any major advantage in this regard.`;
      h2s.byH2H_RO = `În ciuda faptului că ${awayData.properName} are un număr mai mare de victorii directe față de ${homeData.lastName}, marja nu este suficient de semnificativă pentru a sugera un avantaj major în această privință.`;
      h2s.byH2H_IT = `Nonostante ${awayData.properName} abbia un numero maggiore di vittorie nei testa a testa contro ${homeData.lastName}, il margine non è abbastanza significativo da suggerire un vantaggio importante in questo senso.`;
      h2s.byH2H_ES = `A pesar de que ${awayData.properName} tiene un mayor número de victorias frente a ${homeData.lastName}, el margen no es lo suficientemente significativo como para sugerir una ventaja importante en este sentido.`;
      h2s.byH2H_PT = `Apesar de ${awayData.properName} ter um maior número de vitórias frente a frente contra ${homeData.lastName}, a margem não é suficientemente significativa para sugerir qualquer vantagem importante a este respeito.`;
      h2s.byH2H_FR = `Bien que ${awayData.properName} ait un plus grand nombre de victoires face à ${homeData.lastName}, la marge n'est pas assez importante pour suggérer un avantage majeur à cet égard.`;
      h2s.byH2H_DE = `Obwohl ${awayData.properName} eine höhere Anzahl von direkten Siegen gegen ${homeData.lastName} hat, ist der Abstand nicht signifikant genug, um auf einen großen Vorteil in dieser Hinsicht hinzuweisen.`;
      h2s.byH2H_CZ = `Přestože ${awayData.properName} má vyšší počet vítězství v přímém souboji s ${homeData.lastName}, rozdíl není natolik významný, aby naznačoval nějakou významnou výhodu v tomto ohledu.`;
      h2s.byH2H_PL = `Pomimo tego, że ${awayData.properName} ma większą liczbę zwycięstw head-to-head w stosunku do ${homeData.lastName}, to margines nie jest na tyle znaczący, aby sugerować jakąś większą przewagę w tym względzie.`;
    }

    //// H2H - away is the leader, 2 match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 1 && h2hDiff <= 3) {
      h2s.byH2H = `${awayData.lastName} holds a slight head-to-head advantage over ${homeData.lastName}.`;
      h2s.byH2H_RO = `${awayData.lastName} are un ușor avantaj față de ${homeData.lastName}.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un leggero vantaggio rispetto a ${homeData.lastName}.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ligera ventaja sobre ${homeData.lastName}.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma ligeira vantagem no confronto directo sobre ${homeData.lastName}.`;
      h2s.byH2H_FR = `Le nom de famille de ${awayData.lastName} possède un léger avantage sur le nom de famille de ${homeData.lastName}.`;
      h2s.byH2H_DE = `${awayData.lastName} hat einen leichten Kopf-an-Kopf-Vorsprung gegenüber ${homeData.lastName}.`;
      h2s.byH2H_CZ = `${awayData.lastName} má mírnou převahu nad ${homeData.lastName}.`;
      h2s.byH2H_PL = `${awayData.lastName}ma niewielką przewagę nad ${homeData.lastName}.`;
    }

    //// H2H - away is the leader, 3+ match adv
    if (h2h.homeTeamWins < h2h.awayTeamWins && h2hDiff > 3) {
      h2s.byH2H = `${awayData.properName} has a notable lead in the head-to-head record against ${homeData.lastName}.`;
      h2s.byH2H_RO = `${awayData.properName} are un avans notabil în meciurile directe cu ${homeData.lastName}.`;
      h2s.byH2H_IT = `${awayData.properName} ha un notevole vantaggio nei testa a testa contro ${homeData.lastName}.`;
      h2s.byH2H_ES = `${awayData.properName} tiene una notable ventaja en el historial de enfrentamientos directos contra ${homeData.lastName}.`;
      h2s.byH2H_PT = `${awayData.properName} tem uma vantagem notável no registo frente a frente contra ${homeData.lastName}.`;
      h2s.byH2H_FR = `${awayData.properName} a une avance notable dans le bilan des face-à-face contre ${homeData.lastName}.`;
      h2s.byH2H_DE = `${awayData.properName} hat einen deutlichen Vorsprung in der Head-to-Head-Bilanz gegen ${homeData.lastName}.`;
      h2s.byH2H_CZ = `${awayData.properName} má výrazný náskok v přímém souboji s ${homeData.lastName}.`;
      h2s.byH2H_PL = `${awayData.properName} ma znaczącą przewagę w rekordzie head-to-head przeciwko ${homeData.lastName}.`;
    }

    /// begin check on surface
    //// if first match on surface
    if (h2h.homeWinsGrass === 0 && h2h.awayWinsGrass === 0) {
      h2s.byH2H =
        h2s.byH2H +
        ` This is the first encounter between the two players on grass courts.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Aceasta este prima întâlnire dintre cei doi jucători pe iarbă.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Questo è il primo incontro tra le due giocatrici sui campi in erba.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Este es el primer enfrentamiento entre ambos jugadores en pistas de hierba.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Este é o primeiro encontro entre os dois jogadores em campos de relva.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` Il s'agit de la première rencontre entre les deux joueuses sur gazon.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Dies ist das erste Aufeinandertreffen der beiden Spielerinnen auf Rasenplätzen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jedná se o první vzájemné střetnutí obou hráčů na travnatých kurtech.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` To pierwsze spotkanie obu zawodników na kortach trawiastych.`;
    }

    /// also equal on surface
    if (
      h2h.homeWinsGrass > 0 &&
      h2h.awayWinsGrass > 0 &&
      h2h.homeWinsGrass === h2h.awayWinsGrass
    ) {
      h2s.byH2H =
        h2s.byH2H +
        ` Both ${homeData.lastName} and ${awayData.lastName} have played on grass courts in the past, and their record is currently tied at ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Atât ${homeData.lastName}, cât și ${awayData.lastName} au jucat pe iarbă în trecut, iar recordul lor este în prezent egal la ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Sia ${homeData.lastName} che ${awayData.lastName} hanno giocato su campi in erba in passato, e il loro record è attualmente pari a ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} han jugado en hierba en el pasado, y su récord está actualmente empatado a ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Tanto ${homeData.lastName} como ${awayData.lastName} jogaram em campos de relva no passado, e os seus registos estão actualmente empatados em ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} et ${awayData.lastName} ont tous deux joué sur gazon dans le passé, et leur record est actuellement à égalité ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Sowohl ${homeData.lastName} als auch ${awayData.lastName} haben in der Vergangenheit auf Rasenplätzen gespielt, und ihre Bilanz ist derzeit gleich: ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Jak ${homeData.lastName}, tak ${awayData.lastName} hrály v minulosti na travnatých kurtech a jejich bilance je v současnosti vyrovnaná: ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` Zarówno ${homeData.lastName} jak i ${awayData.lastName} grały w przeszłości na kortach trawiastych, a ich bilans jest obecnie remisowy i wynosi ${h2h.homeWinsGrass}-${h2h.awayWinsGrass}.`;
    }

    //// home in adv
    if (h2h.homeWinsGrass > h2h.awayWinsGrass) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${homeData.lastName} has a better record than ${awayData.lastName} in their head-to-head matches played on grass courts (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${homeData.lastName} are un record mai bun decât ${awayData.lastName} în meciurile directe jucate pe iarbă (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${homeData.lastName} ha un record migliore di ${awayData.lastName} nei testa a testa giocati su campi in erba (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${homeData.lastName} tiene mejor récord que ${awayData.lastName} en sus enfrentamientos directos sobre hierba (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${homeData.lastName} tem um registo melhor do que ${awayData.lastName} nos seus jogos frente a frente disputados em campos de relva (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${homeData.lastName} a un meilleur bilan que ${awayData.lastName} dans leurs face-à-face sur gazon (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${homeData.lastName} hat eine bessere Bilanz als ${awayData.lastName} in ihren Kopf-an-Kopf-Matches auf Rasenplätzen (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${homeData.lastName} má lepší bilanci než ${awayData.lastName} ve vzájemných zápasech hraných na travnatých kurtech (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${homeData.lastName} ma lepszy bilans niż ${awayData.lastName} w ich meczach head-to-head rozgrywanych na kortach trawiastych (${h2h.homeWinsGrass}-${h2h.awayWinsGrass}).`;
    }

    //// away in adv
    if (h2h.homeWinsGrass < h2h.awayWinsGrass) {
      h2s.byH2H =
        h2s.byH2H +
        ` ${awayData.properName} has won more matches against ${homeData.lastName} on grass courts, with a record of ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` ${awayData.properName} a câștigat mai multe meciuri împotriva lui ${homeData.lastName} pe terenuri cu iarbă, cu un record de ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` ${awayData.properName} ha vinto più partite contro ${homeData.lastName} sui campi in erba, con un record di ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` ${awayData.properName} ha ganado más partidos contra ${homeData.lastName} en hierba, con un récord de ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` ${awayData.properName} ganhou mais jogos contra ${homeData.lastName} em campos de relva, com um registo de ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` ${awayData.properName} a gagné plus de matchs contre ${homeData.lastName} sur gazon, avec un record de ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` ${awayData.properName} hat mehr Matches gegen ${homeData.lastName} auf Rasenplätzen gewonnen, mit einer Bilanz von ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` ${awayData.properName} vyhrál více zápasů proti ${homeData.lastName} na travnatých kurtech s bilancí ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` ${awayData.properName} wygrał więcej meczów z ${homeData.lastName} na kortach trawiastych, z bilansem ${h2h.awayWinsGrass}-${h2h.homeWinsGrass}.`;
    }
  }

  if (
    h2h.homeWinsInFinals > 0 &&
    h2h.awayWinsInFinals > 0 &&
    h2h.homeWinsInFinals === h2h.awayWinsInFinals
  ) {
    h2s.byH2H =
      h2s.byH2H +
      ` The head-to-head record for tournament finals between the players is even - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_RO =
      h2s.byH2H_RO +
      ` Recordul meciurilor directe dintre cei doi jucători în finalele turneelor este egal - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_IT =
      h2s.byH2H_IT +
      ` Il bilancio dei testa a testa per le finali dei tornei tra i due giocatori è pari - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_ES =
      h2s.byH2H_ES +
      ` El historial de enfrentamientos directos en finales de torneos entre ambos jugadores está igualado - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PT =
      h2s.byH2H_PT +
      ` O registo frente a frente nas finais de torneios entre os jogadores é equilibrado - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_FR =
      h2s.byH2H_FR +
      ` Le bilan des face-à-face pour les finales de tournoi entre les deux joueurs est identique, les deux ayant gagné ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_DE =
      h2s.byH2H_DE +
      ` Die Head-to-Head-Bilanz bei Turnierfinals zwischen den beiden Spielern ist ausgeglichen, beide haben ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals} gewonnen.`;
    h2s.byH2H_CZ =
      h2s.byH2H_CZ +
      ` Vzájemná bilance hráčů ve finále turnaje je vyrovnaná, oba hráči vyhráli ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PL =
      h2s.byH2H_PL +
      ` Rekord head-to-head w finałach turniejów pomiędzy tymi graczami jest równy, obaj wygrali ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
  }

  if (h2h.homeWinsInFinals > h2h.awayWinsInFinals) {
    h2s.byH2H =
      h2s.byH2H +
      ` ${homeData.lastName} holds the advantage over ${awayData.lastName} in matches played in tournament finals, with a score of ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_RO =
      h2s.byH2H_RO +
      ` ${homeData.lastName} are avantaj față de ${awayData.lastName} în meciurile jucate în finale de turneu, cu un scor de ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_IT =
      h2s.byH2H_IT +
      ` ${homeData.lastName} è in vantaggio su ${awayData.lastName} nelle partite giocate nelle finali dei tornei, con un punteggio di ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_ES =
      h2s.byH2H_ES +
      ` ${homeData.lastName} tiene ventaja sobre ${awayData.lastName} en partidos jugados en finales de torneos, con una puntuación de ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PT =
      h2s.byH2H_PT +
      ` ${homeData.lastName} tem a vantagem sobre ${awayData.lastName} em jogos disputados em finais de torneios, com um resultado de ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_FR =
      h2s.byH2H_FR +
      ` ${homeData.lastName} détient l'avantage sur ${awayData.lastName} dans les matchs disputés en finale de tournoi, avec un score de ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_DE =
      h2s.byH2H_DE +
      ` ${homeData.lastName} hat den Vorteil gegenüber ${awayData.lastName} in Spielen, die in Turnierfinals ausgetragen werden, mit einem Punktestand von ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_CZ =
      h2s.byH2H_CZ +
      ` ${homeData.lastName} má výhodu nad ${awayData.lastName} v zápasech odehraných ve finále turnaje se skóre ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PL =
      h2s.byH2H_PL +
      ` ${homeData.lastName} posiada przewagę nad ${awayData.lastName} w meczach rozgrywanych w finałach turniejów, z wynikiem ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
  }

  if (h2h.homeWinsInFinals < h2h.awayWinsInFinals) {
    h2s.byH2H =
      h2s.byH2H +
      ` ${awayData.lastName} holds the advantage over ${homeData.lastName} in matches played in tournament finals, with a score of ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_RO =
      h2s.byH2H_RO +
      ` ${awayData.lastName} deține avantajul față de ${homeData.lastName} în meciurile disputate în finalele turneelor, cu un scor de ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_IT =
      h2s.byH2H_IT +
      ` ${awayData.lastName} è in vantaggio su ${homeData.lastName} nelle partite giocate nelle finali dei tornei, con un punteggio di ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_ES =
      h2s.byH2H_ES +
      ` ${awayData.lastName} tiene ventaja sobre ${homeData.lastName} en partidos jugados en finales de torneos, con una puntuación de ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_PT =
      h2s.byH2H_PT +
      ` ${awayData.lastName} tem a vantagem sobre ${homeData.lastName} em jogos disputados em finais de torneios, com um resultado de ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_FR =
      h2s.byH2H_FR +
      ` ${awayData.lastName} détient l'avantage sur ${homeData.lastName} dans les matchs disputés en finale de tournoi, avec un score de ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_DE =
      h2s.byH2H_DE +
      ` ${AuswärtsDaten.Nachname} hat den Vorteil gegenüber ${HeimDaten.Nachname} in Spielen, die in Turnierfinalen ausgetragen werden, mit einem Punktestand von ${h2h.AuswärtsSiegeImFinale}-${h2h.HeimSiegeImFinale}.`;
    h2s.byH2H_CZ =
      h2s.byH2H_CZ +
      ` ${awayData.lastName} má výhodu nad ${homeData.lastName} v zápasech odehraných ve finále turnaje se skóre ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
    h2s.byH2H_PL =
      h2s.byH2H_PL +
      ` ${awayData.lastName} posiada przewagę nad ${homeData.lastName} w meczach rozgrywanych w finałach turniejów, z wynikiem ${h2h.awayWinsInFinals}-${h2h.homeWinsInFinals}.`;
  }
  // console.log(h2s);
  return h2s;
};

export { predictionByH2H };
