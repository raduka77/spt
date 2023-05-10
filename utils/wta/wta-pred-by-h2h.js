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
      h2s.byH2H_RO = `Aceasta este prima dată când cele două jucătoare se confruntă, deci nu există nicio înregistrare anterioară a meciurilor directe între ele.`;
      h2s.byH2H_IT = `Questa è la prima volta che le due giocatrici si affrontano, quindi non ci sono precedenti di partite dirette tra di loro.`;
      h2s.byH2H_ES = `Esta es la primera vez que las dos jugadoras se enfrentan entre sí, por lo que no hay un registro previo de partidos directos entre ellas.`;
      h2s.byH2H_PT = `Esta é a primeira vez que as duas jogadoras se enfrentam, então não há registro prévio de partidas diretas entre elas.`;
      h2s.byH2H_FR = `C'est la première fois que les deux joueuses se font face, il n'y a donc aucun précédent de matchs directs entre elles.`;
      h2s.byH2H_DE = `Dies ist das erste Mal, dass die beiden Spielerinnen aufeinandertreffen, daher gibt es keine Vergangenheitsbilanz direkter Matches zwischen ihnen.`;
      h2s.byH2H_CZ = `Tohle je poprvé, kdy se tyto dvě hráčky potkávají, takže zatím neexistuje žádná minulá záznamy o přímých zápasech mezi nimi.`;
      h2s.byH2H_PL = `To jest pierwszy raz, kiedy dwie zawodniczki stają przed sobą, dlatego nie ma żadnych wcześniejszych zapisów ich bezpośrednich meczów.`;
    }

    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record is currently tied between the two players, with both of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul meciurilor directe este deocamdată egal între cele două jucătoare, ambele câștigând același număr de meciuri (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il record degli scontri diretti è attualmente in parità tra le due giocatrici, entrambe hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El récord de enfrentamientos directos está empatado actualmente entre las dos jugadoras, ambas han ganado la misma cantidad de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registro de confrontos diretos está atualmente empatado entre as duas jogadoras, com ambas tendo vencido o mesmo número de partidas (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des confrontations directes est actuellement à égalité entre les deux joueuses, avec chacune remportant le même nombre de matchs (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Der direkte Vergleich steht derzeit zwischen den beiden Spielerinnen unentschieden, da beide dieselbe Anzahl an Spielen gewonnen haben (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Současně jsou hráčky udržující poměr vzájemných zápasů v remíze, kdy obě vyhrály stejný počet utkání (${h2h.homeTeamWins} - ${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Obecnie bilans bezpośrednich spotkań między tymi dwiema zawodniczkami jest wyrównany, obie wygrały tę samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
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
      h2s.byH2H_RO = `O jucătoare care a dominat constant în meciurile directe este ${homeData.properName}.`;
      h2s.byH2H_IT = `Una giocatrice che ha continuamente dominato negli scontri diretti è ${homeData.properName}.`;
      h2s.byH2H_ES = `Una jugadora que ha estado dominando consistentemente en los partidos uno contra uno es ${homeData.properName}.`;
      h2s.byH2H_PT = `Uma jogadora que tem dominado consistentemente os jogos de confronto direto é ${homeData.properName}.`;
      h2s.byH2H_FR = `Une joueuse qui a été constamment dominante dans les matchs tête-à-tête est ${homeData.properName}.`;
      h2s.byH2H_DE = `Eine Spielerin, die in den Kopf-an-Kopf-Matches konstant dominiert hat, ist ${homeData.properName}.`;
      h2s.byH2H_CZ = `Jedna hráčka, která pravidelně dominuje v zápasech jeden na jednoho, je ${homeData.properName}.`;
      h2s.byH2H_PL = `Jedna z zawodniczek, która systematycznie dominuje w meczach jeden na jeden, to ${homeData.properName}.`;
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
      h2s.byH2H_RO = `Aceste jucătoare nu s-au întâlnit niciodată până acum, astfel că aceasta este prima lor confruntare pe teren. În consecință, nu există nicio înregistrare a meciurilor lor anterioare.`;
      h2s.byH2H_IT = `Queste giocatrici non si sono mai affrontate prima, quindi questo è il loro primo incontro sul campo. Di conseguenza, non esiste alcun record delle loro partite precedenti.`;
      h2s.byH2H_ES = `Estas jugadoras nunca se han enfrentado antes, por lo que este es su primer encuentro en la cancha. Como resultado, no hay registro de sus partidos anteriores.`;
      h2s.byH2H_PT = `Essas jogadoras nunca se enfrentaram antes, então este é o primeiro encontro delas no campo. Como resultado, não há registro de suas partidas anteriores.`;
      h2s.byH2H_FR = `Ces joueuses ne se sont jamais affrontées auparavant, donc c'est leur toute première rencontre sur le terrain. Par conséquent, il n'y a pas de registre de leurs matchs précédents.`;
      h2s.byH2H_DE = `Diese Spielerinnen haben sich noch nie zuvor gegenübergestanden, daher ist dies ihre allererste Begegnung auf dem Platz. Folglich gibt es keine Aufzeichnung ihrer vorherigen Matches.`;
      h2s.byH2H_CZ = `Tyto hráčky se nikdy předtím nestřetly, takže toto je jejich první setkání na kurtu. V důsledku toho neexistuje žádný záznam o jejich předchozích zápasech.`;
      h2s.byH2H_PL = `Te zawodniczki nigdy wcześniej się nie spotkały, więc to ich pierwsze spotkanie na korcie. W związku z tym nie ma żadnego zapisu ich poprzednich meczów.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the two players is evenly matched, with each player having won an equal number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul cap-la-cap între cele două jucătoare este egal, fiecare jucătoare având un număr egal de victorii (${h2h.homeTeamWins} - ${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il record testa a testa tra le due giocatrici è equilibrato, con entrambe le atlete che hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El registro de enfrentamientos directos entre las dos jugadoras está parejo, cada una ha ganado la misma cantidad de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registro de confrontos diretos entre as duas jogadoras está equilibrado, com cada uma tendo vencido um número igual de partidas (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des face-à-face entre les deux joueuses est équilibré, chaque joueuse ayant remporté le même nombre de matchs (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Der Kopf-an-Kopf-Vergleich zwischen den beiden Spielerinnen ist ausgeglichen, mit jeder Spielerin, die eine gleiche Anzahl an Spielen gewonnen hat (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `So záznam vzájemných zápasů mezi oběma hráčkami je vyrovnaný, přičemž každá hráčka vyhrála stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Bilans pojedynków między dwiema zawodniczkami jest równo zrównoważony, z tym że każda z zawodniczek wygrała tyle samo meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
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
        `Aceasta este prima dată când cele două jucătoare se vor întâlni pe un teren dur în aer liber.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        `Questa è la prima volta che le due giocatrici si sfideranno su un campo duro all'aperto.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        `Esta es la primera vez que las dos jugadoras se enfrentarán entre sí en una cancha dura al aire libre.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        `Esta é a primeira vez que as duas jogadoras se enfrentarão em uma quadra de piso duro ao ar livre.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        `C'est la première fois que les deux joueuses se rencontreront sur un terrain en dur en plein air.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        `Dies ist das erste Mal, dass sich die beiden Spielerinnen auf einem Outdoor-Hartplatz gegenüberstehen werden.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        `Toto je poprvé, kdy se tyto hráčky setkají na venkovním tvrdém povrchu.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        `To pierwszy raz, gdy dwie zawodniczki zmierzą się na otwartej, twardo- kortowej powierzchni.`;
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
      h2s.byH2H = `This game marks the first time these two players will face each other.`;
      h2s.byH2H_RO = `Această partidă marchează prima oară când cele două jucătoare se întâlnesc.`;
      h2s.byH2H_IT = `Questo gioco segna la prima volta in cui queste due giocatrici si sfideranno.`;
      h2s.byH2H_ES = `Este juego marca la primera vez que estas dos jugadoras se enfrentarán entre sí.`;
      h2s.byH2H_PT = `Este jogo marca a primeira vez que essas duas jogadoras se enfrentarão.`;
      h2s.byH2H_FR = `Ce match marque la première fois que ces deux joueuses vont s'affronter.`;
      h2s.byH2H_DE = `Dieses Spiel markiert das erste Mal, dass sich diese beiden Spielerinnen gegenüberstehen werden.`;
      h2s.byH2H_CZ = `Tento zápas představuje poprvé, kdy se tyto dvě hráčky budou střetnout.`;
      h2s.byH2H_PL = `Ten mecz oznacza pierwszy raz, kiedy te dwie zawodniczki spotkają się ze sobą.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the players is even, with each of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul direct dintre jucătoare este egal, fiecare dintre ele câștigând același număr de meciuri (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio testa a testa tra le giocatrici è pari, con entrambe le giocatrici che hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El registro cabeza a cabeza entre las jugadoras está empatado, cada una de ellas ha ganado la misma cantidad de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O histórico de confrontos diretos entre as jogadoras é equilibrado, com cada uma delas tendo vencido o mesmo número de partidas (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan de face à face entre les joueuses est égal, chacune ayant remporté le même nombre de matchs (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Der direkte Vergleich zwischen den Spielerinnen ist ausgeglichen, da jede von ihnen die gleiche Anzahl an Spielen gewonnen hat (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Mezi hráčkami je vyrovnaný bilanční záznam, každá z nich vyhrála stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Bilans bezpośrednich spotkań między zawodniczkami jest wyrównany, z tym że każda z nich wygrała tę samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
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
      h2s.byH2H_RO = `În istoria meciurilor directe dintre cele două jucătoare, ${homeData.properName} a ieșit clar învingătoare.`;
      h2s.byH2H_IT = `Nella storia dei confronti diretti tra le due giocatrici, ${homeData.properName} è emersa come la leader indiscussa.`;
      h2s.byH2H_ES = `En la historia de los partidos cabeza a cabeza entre las dos jugadoras, ${homeData.properName} ha surgido como la clara líder.`;
      h2s.byH2H_PT = `Na história dos confrontos diretos entre as duas jogadoras, ${homeData.properName} emergiu como a clara líder.`;
      h2s.byH2H_FR = `Dans l'histoire des confrontations directes entre les deux joueuses, ${homeData.properName} s'est démarquée comme la leader incontestée.`;
      h2s.byH2H_DE = `In der Geschichte der Direktbegegnungen zwischen den beiden Spielerinnen hat sich ${homeData.properName} als klare Führerin durchgesetzt.`;
      h2s.byH2H_CZ = `V historii vzájemných zápasů mezi oběma hráčkami se ${homeData.properName} projevuje jako jasná vůdkyně.`;
      h2s.byH2H_PL = `W historii pojedynków między dwoma zawodniczkami, ${homeData.properName} wyłania się jako zdecydowany lider.`;
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
        `Aceasta este prima întâlnire între cele două jucătoare pe terenuri de zgură.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        `Questo è il primo incontro tra le due giocatrici sui campi di terra battuta.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        `Este es el primer encuentro entre las dos jugadoras en canchas de arcilla.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        `Este é o primeiro encontro entre as duas jogadoras em quadras de saibro.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        `C'est la première rencontre entre les deux joueuses sur les courts en terre battue.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        `Dies ist die erste Begegnung zwischen den beiden Spielerinnen auf Sandplätzen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        `Toto je první setkání mezi oběma hráčkami na antukových kurtech.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        `Jest to pierwsze spotkanie między dwiema zawodniczkami na kortach ziemnych.`;
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
      h2s.byH2H = `These two players are going to face each other for the first time.`;
      h2s.byH2H_RO = `Aceste două jucătoare se vor confrunta pentru prima dată.`;
      h2s.byH2H_IT = `Queste due giocatrici si affronteranno per la prima volta.`;
      h2s.byH2H_ES = `Estas dos jugadoras se enfrentarán por primera vez.`;
      h2s.byH2H_PT = `Essas duas jogadoras vão se enfrentar pela primeira vez.`;
      h2s.byH2H_FR = `Ces deux joueuses vont s'affronter pour la première fois.`;
      h2s.byH2H_DE = `Diese beiden Spielerinnen werden sich zum ersten Mal gegenüberstehen.`;
      h2s.byH2H_CZ = `Tyto dvě hráčky se budou potkat poprvé.`;
      h2s.byH2H_PL = `Te dwie zawodniczki stają przed sobą po raz pierwszy.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the players is even, with each of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Recordul direct dintre jucătoare este egal, fiecare dintre ele câștigând același număr de meciuri (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il bilancio testa a testa tra le giocatrici è pari, con entrambe le giocatrici che hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El registro cabeza a cabeza entre las jugadoras está empatado, cada una de ellas ha ganado la misma cantidad de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O histórico de confrontos diretos entre as jogadoras é equilibrado, com cada uma delas tendo vencido o mesmo número de partidas (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan de face à face entre les joueuses est égal, chacune ayant remporté le même nombre de matchs (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Der direkte Vergleich zwischen den Spielerinnen ist ausgeglichen, da jede von ihnen die gleiche Anzahl an Spielen gewonnen hat (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Mezi hráčkami je vyrovnaný bilanční záznam, každá z nich vyhrála stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Bilans bezpośrednich spotkań między zawodniczkami jest wyrównany, z tym że każda z nich wygrała tę samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `If we consider their previous matches against each other, ${homeData.properName} has a slight edge over ${awayData.lastName}. However, this alone may not necessarily translate into an advantage in the current match.`;
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
      h2s.byH2H = `Taking a closer look at the history between these two players, it seems that ${homeData.properName} has had some success in the previous head-to-head matches against ${awayData.lastName}.`;
      h2s.byH2H_RO = `Analizând mai îndeaproape istoricul dintre aceste două jucătoare, se pare că ${homeData.properName} a avut un oarecare succes în meciurile anterioare cu ${awayData.lastName}.`;
      h2s.byH2H_IT = `Dando un'occhiata più approfondita alla storia tra queste due giocatrici, sembra che ${homeData.properName} abbia avuto successo nei precedenti scontri diretti contro ${awayData.lastName}.`;
      h2s.byH2H_ES = `Al examinar más de cerca la historia entre estas dos jugadoras, parece que ${homeData.properName} ha tenido cierto éxito en los encuentros anteriores cara a cara contra ${awayData.lastName}.`;
      h2s.byH2H_PT = `Ao examinarmos mais de perto a história entre essas duas jogadoras, parece que ${homeData.properName} teve algum sucesso nas partidas anteriores contra ${awayData.lastName}.`;
      h2s.byH2H_FR = `En examinant de plus près l'historique entre ces deux joueuses, il semblerait que ${homeData.properName} ait remporté quelques succès lors des précédents face-à-face contre ${awayData.lastName}.`;
      h2s.byH2H_DE = `Wenn man sich die Geschichte zwischen diesen beiden Spielerinnen genauer ansieht, scheint es, dass ${homeData.properName} in den vorherigen Duellen gegen ${awayData.lastName} einige Erfolge erzielt hat.`;
      h2s.byH2H_CZ = `Při podrobnějším pohledu na historii mezi těmito dvěma hráčkami se zdá, že ${homeData.properName} měla v předchozích zápasech proti ${awayData.lastName} určitý úspěch.`;
      h2s.byH2H_PL = `Przyjrzenie się historii między tymi dwoma zawodniczkami wykazuje, że ${homeData.properName} odnosiła sukcesy w poprzednich pojedynkach z ${awayData.lastName}.`;
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
      h2s.byH2H_RO = `${awayData.lastName} are un avantaj semnificativ în meciurile directe dintre cele două jucătoare.`;
      h2s.byH2H_IT = `${awayData.lastName} ha un vantaggio significativo nei confronti diretti tra le due giocatrici.`;
      h2s.byH2H_ES = `${awayData.lastName} tiene una ventaja significativa en los enfrentamientos cara a cara entre ambas jugadoras.`;
      h2s.byH2H_PT = `${awayData.lastName} tem uma vantagem significativa nos jogos diretos entre as duas jogadoras.`;
      h2s.byH2H_FR = `${awayData.lastName} a une avance significative dans les confrontations directes entre les deux joueuses.`;
      h2s.byH2H_DE = `{awayData.lastName} hat einen signifikanten Vorsprung in den direkten Aufeinandertreffen zwischen den beiden Spielerinnen.`;
      h2s.byH2H_CZ = `${awayData.lastName} má významné vedení v osobním zápase mezi oběma hráčkami.`;
      h2s.byH2H_PL = `"{awayData.lastName}" ma znaczną przewagę w meczach bezpośrednich między tymi dwoma zawodniczkami.`;
    }

    /// begin check on surface
    //// if first match on surface
    if (h2h.homeWinsIndHard === 0 && h2h.awayWinsIndHard === 0) {
      h2s.byH2H =
        h2s.byH2H +
        ` This is the first encounter between the two players on indoor hard courts.`;
      h2s.byH2H_RO =
        h2s.byH2H_RO +
        ` Aceasta este prima întâlnire dintre cele două jucătoare pe terenurile de tenis acoperite cu suprafață dură.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        ` Questa è la prima volta che le due giocatrici si incontrano su campi indoor in cemento.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        ` Este es el primer encuentro entre las dos jugadoras en pistas duras bajo techo.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        ` Este é o primeiro encontro entre as duas jogadoras em quadras duras cobertas.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        ` C'est la première rencontre entre les deux joueuses sur un court dur intérieur.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        ` Dies ist das erste Aufeinandertreffen zwischen den beiden Spielerinnen auf Hallen-Hartplätzen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        ` Toto je první setkání mezi oběma hráčkami na krytých tvrdých kurtech.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        ` To jest pierwsze spotkanie między dwiema zawodniczkami na kortach twardych w hali.`;
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
      h2s.byH2H_RO = `Acest joc marchează prima întâlnire a jucătoarelor, ceea ce înseamnă că nu au nicio înregistrare a confruntărilor anterioare.`;
      h2s.byH2H_IT = `Questo gioco segna il primo incontro delle giocatrici, il che significa che non hanno alcun registro di scontri precedenti.`;
      h2s.byH2H_ES = `Este juego marca el primer encuentro de las jugadoras, lo que significa que no tienen registro de enfrentamientos previos.`;
      h2s.byH2H_PT = `Este jogo marca o primeiro encontro das jogadoras, o que significa que não há registro de confrontos anteriores.`;
      h2s.byH2H_FR = `Ce jeu marque la première rencontre des joueuses, ce qui signifie qu'elles n'ont aucun enregistrement de confrontations antérieures.`;
      h2s.byH2H_DE = `Dieses Spiel markiert das erste Treffen der Spielerinnen, was bedeutet, dass sie keine Aufzeichnungen von früheren Begegnungen haben.`;
      h2s.byH2H_CZ = `Tento zápas představuje první setkání hráček, což znamená, že nemají žádný záznam o předchozích střetnutích.`;
      h2s.byH2H_PL = `Ten mecz stanowi pierwsze spotkanie zawodniczek, co oznacza, że nie mają żadnej historii wcześniejszych starć.`;
    }

    //// if equal, but check further on surface
    if (
      h2h.homeTeamWins > 0 &&
      h2h.awayTeamWins > 0 &&
      h2h.homeTeamWins === h2h.awayTeamWins
    ) {
      h2s.byH2H = `The head-to-head record between the players is evenly matched, with both of them having won the same number of matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_RO = `Statistica anterioară a meciurilor dintre jucătoare este echilibrată, deoarece ambele au câștigat același număr de jocuri (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_IT = `Il record di confronti diretti tra le giocatrici è equilibrato, entrambe hanno vinto lo stesso numero di partite (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_ES = `El historial entre las jugadoras está igualado, ambas han ganado la misma cantidad de partidos (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PT = `O registro de confrontos diretos entre as jogadoras está igualmente equilibrado, ambas venceram o mesmo número de partidas (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_FR = `Le bilan des confrontations directes entre les joueuses est équitable, avec chacune d'elles ayant remporté le même nombre de matches (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_DE = `Der direkte Vergleich zwischen den Spielerinnen ist ausgeglichen, wobei jeweils dieselbe Anzahl an Spielen gewonnen wurde (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_CZ = `Mezi hráčkami je poměr vzájemných zápasů vyrovnaný, obě z nich vyhrály stejný počet zápasů (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
      h2s.byH2H_PL = `Statystyka bezpośrednich spotkań między zawodniczkami jest wyrównana. Obie wygrały taką samą liczbę meczów (${h2h.homeTeamWins}-${h2h.awayTeamWins}).`;
    }

    //// H2H - Home is the leader, 1 match adv
    if (h2h.homeTeamWins > h2h.awayTeamWins && h2hDiff === 1) {
      h2s.byH2H = `The head-to-head record between ${homeData.properName} and ${awayData.lastName} slightly favors ${homeData.lastName}, but the difference is not significant enough to suggest a clear advantage in this regard.`;
      h2s.byH2H_RO = `Statistica rezultatelor directe dintre ${homeData.properName} și ${awayData.lastName} favorizează ușor pe ${homeData.lastName}, dar diferența nu este suficient de semnificativă pentru a sugera un avantaj clar în acest sens.`;
      h2s.byH2H_IT = `Il record testa a testa tra ${awayData.lastName} e ${homeData.properName} favorisce leggermente ${homeData.lastName}, ma la differenza non è abbastanza significativa da suggerire un chiaro vantaggio in questo senso.`;
      h2s.byH2H_ES = `El registro de enfrentamientos directos entre ${homeData.properName} y ${awayData.lastName} favorece ligeramente a ${homeData.lastName}, pero la diferencia no es lo suficientemente significativa como para sugerir una clara ventaja en este aspecto para las jugadoras.`;
      h2s.byH2H_PT = `O registro de confrontos diretos entre ${homeData.properName} e ${awayData.lastName} favorece ligeiramente ${homeData.lastName}, porém a diferença não é significativa o suficiente para sugerir uma clara vantagem nesse sentido.`;
      h2s.byH2H_FR = `Le bilan des face-à-face entre ${homeData.properName} et ${awayData.lastName} penche légèrement en faveur de ${homeData.lastName}, mais la différence n'est pas suffisamment significative pour suggérer un avantage clair à cet égard. Les joueuses doivent donc se surpasser pour gagner.`;
      h2s.byH2H_DE = `Der direkte Vergleich zwischen ${homeData.properName} und ${awayData.lastName} steht leicht zugunsten von ${homeData.lastName}, doch der Unterschied ist nicht signifikant genug, um einen klaren Vorteil in dieser Hinsicht zu suggerieren.`;
      h2s.byH2H_CZ = `Hlava-hlavě záznam mezi hráčkami ${homeData.properName} a ${awayData.lastName} mírně přeje hráčce ${homeData.lastName}, ale rozdíl není dostatečně významný na to, aby naznačoval jasnou výhodu v tomto ohledu.`;
      h2s.byH2H_PL = `Rekord bezpośrednich pojedynków między ${homeData.properName} i ${awayData.lastName} nieznacznie przemawia na korzyść ${homeData.lastName}, ale różnica nie jest wystarczająco znacząca, aby sugerować wyraźną przewagę w tym względzie z perspektywy zawodniczek.`;
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
        `Aceasta este prima intalnire dintre cele doua jucatoare pe teren de iarba.`;
      h2s.byH2H_IT =
        h2s.byH2H_IT +
        `Questa è la prima sfida tra le due giocatrici su campi in erba.`;
      h2s.byH2H_ES =
        h2s.byH2H_ES +
        `Este es el primer encuentro entre las dos jugadoras en canchas de césped.`;
      h2s.byH2H_PT =
        h2s.byH2H_PT +
        `Este é o primeiro encontro entre as duas jogadoras em quadras de grama.`;
      h2s.byH2H_FR =
        h2s.byH2H_FR +
        `Il s'agit de la première rencontre entre les deux joueuses sur les courts en herbe.`;
      h2s.byH2H_DE =
        h2s.byH2H_DE +
        `Dies ist das erste Aufeinandertreffen zwischen den beiden Spielerinnen auf Rasenplätzen.`;
      h2s.byH2H_CZ =
        h2s.byH2H_CZ +
        `Toto je první setkání mezi oběma hráčkami na travnatých kurtech.`;
      h2s.byH2H_PL =
        h2s.byH2H_PL +
        `To pierwsze spotkanie między dwoma zawodniczkami na kortach trawiastych.`;
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
      ` The head-to-head record in tournament finals between the players is even - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_RO =
      h2s.byH2H_RO +
      `Recordul celor două jucătoare în cadrul finalelor de turneu este egal - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_IT =
      h2s.byH2H_IT +
      `Il bilancio testa a testa delle finali del torneo tra le giocatrici è pari - ${h2h.homeWinsInFinals} - ${h2h.awayWinsInFinals}.`;
    h2s.byH2H_ES =
      h2s.byH2H_ES +
      `El registro uno a uno para finales de torneos entre las jugadoras está parejo - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PT =
      h2s.byH2H_PT +
      `O histórico de confrontos diretos em finais de torneios entre as jogadoras é equilibrado - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_FR =
      h2s.byH2H_FR +
      `Le bilan des confrontations en finale de tournoi entre les joueuses est égal - ${h2h.homeWinsInFinals} victoires à domicile contre ${h2h.awayWinsInFinals} victoires à l'extérieur.`;
    h2s.byH2H_DE =
      h2s.byH2H_DE +
      `Der direkte Vergleich in Finalspielen zwischen den Spielerinnen ist ausgeglichen - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_CZ =
      h2s.byH2H_CZ +
      `Hlava-hlavu záznam turnajových finálových zápasů mezi hráčkami je vyrovnaný - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
    h2s.byH2H_PL =
      h2s.byH2H_PL +
      `Bilans bezpośrednich meczów finałowych między zawodniczkami jest wyrównany - ${h2h.homeWinsInFinals}-${h2h.awayWinsInFinals}.`;
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
