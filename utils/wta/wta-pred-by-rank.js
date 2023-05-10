'use strict';

const predictionByRank = function (homeData, awayData) {
  // console.log(homeData.ranking);
  // console.log(awayData.ranking);
  let pr = {
    rank: '',
    rank_RO: '',
    rank_IT: '',
    rank_ES: '',
    rank_PT: '',
    rank_FR: '',
    rank_DE: '',
    rank_CZ: '',
    rank_PL: '',
  };
  if (homeData.ranking && awayData.ranking) {
    let rankDiff;

    if (homeData.ranking > awayData.ranking) {
      rankDiff = homeData.ranking - awayData.ranking;
    } else {
      rankDiff = awayData.ranking - homeData.ranking;
    }

    if (homeData.ranking <= 5 && awayData.ranking <= 5) {
      pr.rank = `Both players are ranked within the Top 5 of the WTA, which may imply that their rankings may not be crucial in determining the outcome of today's match. However, it is possible that the player with the higher ranking may still hold a slight advantage over his opponent.`;
      pr.rank_RO = `Ambele jucătoare se află în Top 5 al WTA, ceea ce poate însemna că clasamentul lor nu este crucial în determinarea rezultatului meciului de astăzi. Cu toate acestea, este posibil ca jucătoarea cu clasamentul mai mare să aibă încă un avantaj ușor față de adversara sa.`;
      pr.rank_IT = `Entrambe le giocatrici sono classificate tra le prime 5 della classifica WTA, il che potrebbe implicare che le loro posizioni in classifica potrebbero non essere decisive nel determinare l'esito della partita odierna. Tuttavia, è possibile che la giocatrice con la posizione più alta possa ancora avere un leggero vantaggio sulla sua avversaria.`;
      pr.rank_ES = `Ambas jugadoras están clasificadas dentro de las cinco mejores del WTA, lo que puede implicar que sus clasificaciones no sean decisivas en la determinación del resultado del partido de hoy. Sin embargo, es posible que la jugadora con la posición más alta aún tenga una ligera ventaja sobre su oponente.`;
      pr.rank_PT = `Ambas as jogadoras estão classificadas entre as cinco primeiras do ranking da WTA, o que pode sugerir que suas posições no ranking podem não ser cruciais para determinar o resultado da partida de hoje. No entanto, é possível que a jogadora com a classificação mais alta ainda tenha uma ligeira vantagem sobre sua oponente.`;
      pr.rank_FR = `Les deux joueuses sont classées parmi les cinq meilleures de la WTA, ce qui pourrait suggérer que leur classement n'est pas crucial pour déterminer l'issue du match d'aujourd'hui. Cependant, il est possible que la joueuse ayant le classement le plus élevé conserve tout de même un léger avantage sur son adversaire.`;
      pr.rank_DE = `Beide Spielerinnen sind unter den Top 5 der WTA-Rangliste platziert, was darauf hindeuten könnte, dass ihre Platzierungen möglicherweise nicht ausschlaggebend für das Ergebnis des heutigen Spiels sind. Es ist jedoch möglich, dass die Spielerin mit der höheren Platzierung immer noch einen leichten Vorteil gegenüber ihrer Gegnerin hat.`;
      pr.rank_CZ = `Obě hráčky jsou umístěny v první pětce žebříčku WTA, což by mohlo naznačovat, že jejich umístění nemusí být klíčové při určování výsledku dnešního zápasu. Nicméně může nastat situace, kdy hráčka s vyšším umístěním stále drží mírnou výhodu před svou soupeřkou.`;
      pr.rank_PL = `Obie zawodniczki zajmują miejsca w pierwszej piątce rankingu WTA, co może sugerować, że ich pozycje nie są kluczowe w określaniu wyniku dzisiejszego meczu. Niemniej jednak istnieje możliwość, że zawodniczka z wyższym rankingiem nadal będzie miała nieznaczna przewagę nad swoją rywalką.`;
    }

    /// both in top 10, away is 1 place behind (so 5 and 6)
    if (
      homeData.ranking <= 5 &&
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      rankDiff == 1
    ) {
      pr.rank = `Both players are among the top 10 in the WTA rankings, implying that the difference in their rankings may not significantly impact the outcome of the match.`;
      pr.rank_RO = `Ambele jucătoare se află printre primele 10 din clasamentul WTA, ceea ce înseamnă că diferența dintre pozițiile lor în clasament poate să nu afecteze semnificativ rezultatul meciului.`;
      pr.rank_IT = `Entrambe le giocatrici si trovano tra le prime 10 del ranking WTA, il che suggerisce che la differenza tra le loro posizioni potrebbe non avere un impatto significativo sull'esito del match.`;
      pr.rank_ES = `Ambas jugadoras se encuentran entre las diez mejores del ranking de la WTA, lo que implica que la diferencia en sus clasificaciones puede no tener un impacto significativo en el resultado del partido.`;
      pr.rank_PT = `Ambas as jogadoras estão entre as 10 melhores no ranking da WTA, o que implica que a diferença em suas classificações pode não impactar significativamente o resultado do jogo.`;
      pr.rank_FR = `Les deux joueuses font partie des dix meilleures du classement WTA, ce qui implique que la différence de leur classement pourrait ne pas avoir un impact significatif sur l'issue du match.`;
      pr.rank_DE = `Beide Spielerinnen gehören zu den Top 10 der WTA-Rangliste und die Unterschiede in ihren Platzierungen dürfen daher nicht unbedingt signifikant auf das Ergebnis des Spiels Einfluss nehmen.`;
      pr.rank_CZ = `Obě hráčky se řadí mezi top 10 tenistek na žebříčku WTA, což naznačuje, že rozdíl v jejich pozicích na žebříčku nemusí mít výrazný vliv na výsledek zápasu.`;
      pr.rank_PL = `Obie zawodniczki znajdują się wśród dziesięciu najlepszych na liście WTA, co sugeruje, że różnica w ich rankingach może nie mieć istotnego wpływu na wynik meczu.`;
    }

    /// both in top 10, away is 2 places or more behind (so 5 and 7,8,9,10)
    if (
      homeData.ranking <= 5 &&
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      rankDiff >= 2
    ) {
      pr.rank = `If we take into account the WTA ranking, ${homeData.lastName} could potentially hold a slight advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Dacă luăm în considerare clasamentul WTA, ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Se teniamo conto della classifica WTA, ${homeData.lastName} potrebbe potenzialmente avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Si tenemos en cuenta la clasificación WTA, ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Se tivermos em conta a classificação WTA, ${homeData.lastName} pode potencialmente ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Si nous prenons en compte le classement WTA, ${homeData.lastName} pourrait avoir un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Wenn wir die WTA-Rangliste berücksichtigen, könnte ${homeData.lastName} im heutigen Match möglicherweise einen leichten Vorteil gegenüber ${awayData.lastName} haben.`;
      pr.rank_CZ = `Pokud vezmeme v úvahu žebříček WTA, ${homeData.lastName} by v dnešním zápase mohl mít potenciálně mírnou výhodu nad ${awayData.lastName}.`;
      pr.rank_PL = `Jeśli weźmiemy pod uwagę ranking WTA, ${homeData.lastName} może potencjalnie posiadać niewielką przewagę nad ${awayData.lastName} w dzisiejszym meczu.`;
    }
    //// NOW REVERSE
    /// both in top 10, home is 1 place behind (so 5 and 6)
    if (
      awayData.ranking <= 5 &&
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      rankDiff == 1
    ) {
      pr.rank = `Both players are among the top 10 in the WTA rankings, implying that the difference in their rankings may not significantly impact the outcome of the match.`;
      pr.rank_RO = `Ambele jucătoare se numără printre primele 10 în clasamentul WTA, ceea ce înseamnă că diferența în clasamentul lor poate să nu afecteze semnificativ rezultatul meciului.`;
      pr.rank_IT = `Entrambe le giocatrici sono tra le prime 10 nel ranking WTA, il che implica che la differenza nei loro punteggi potrebbe non influire significativamente sull'esito della partita.`;
      pr.rank_ES = `Ambas jugadoras se encuentran entre las diez mejores clasificadas en el ranking de la WTA, lo que implica que la diferencia en sus clasificaciones puede no impactar significativamente en el resultado del partido.`;
      pr.rank_PT = `Ambas as jogadoras estão entre as 10 melhores no ranking da WTA, o que implica que a diferença em seus rankings pode não impactar significativamente o resultado da partida.`;
      pr.rank_FR = `Les deux joueuses figurent parmi les dix premières du classement WTA, ce qui implique que la différence entre leurs classements ne devrait pas avoir un impact significatif sur l'issue du match.`;
      pr.rank_DE = `Beide Spielerinnen gehören zu den Top 10 der WTA-Weltrangliste und dies lässt vermuten, dass der Unterschied in ihren Platzierungen das Ergebnis des Matches nicht signifikant beeinflussen wird.`;
      pr.rank_CZ = `Obě hráčky patří mezi nejlepších 10 na žebříčku WTA, což naznačuje, že rozdíl v jejich umístění na žebříčku nemusí výrazně ovlivnit výsledek zápasu.`;
      pr.rank_PL = `Obie zawodniczki znajdują się wśród dziesiątki najlepszych zawodniczek WTA, co sugeruje, że różnica w ich rankingach może nie mieć istotnego wpływu na wynik meczu.`;
    }

    /// both in top 10, home is 2 places or more behind (so 5 and 7,8,9,10)
    if (
      awayData.ranking <= 5 &&
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      rankDiff >= 2
    ) {
      pr.rank = `If we take into account the WTA ranking, ${awayData.lastName} could potentially hold a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Dacă luăm în considerare clasamentul WTA, ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Se teniamo conto della classifica WTA, ${awayData.lastName} potrebbe potenzialmente avere un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Si tenemos en cuenta la clasificación WTA, ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Se tivermos em conta a classificação WTA, ${awayData.lastName} pode potencialmente ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Si nous prenons en compte le classement WTA, ${awayData.lastName} pourrait avoir un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Wenn wir die WTA-Rangliste berücksichtigen, könnte ${awayData.lastName} im heutigen Match möglicherweise einen leichten Vorteil gegenüber ${homeData.lastName} haben.`;
      pr.rank_CZ = `Pokud vezmeme v úvahu žebříček WTA, ${awayData.lastName} by v dnešním zápase mohl mít potenciálně mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Jeśli weźmiemy pod uwagę ranking WTA, to ${awayData.lastName} może potencjalnie mieć niewielką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ////// xxxxxxxxxxxxxxxxxx done with matches with top 10 players xxxxxxxxxxxxxxxxxx

    /// home player is in top 5, away is in top 10 or more
    if (homeData.ranking <= 5 && awayData.ranking > 10) {
      pr.rank = `Checking out the WTA rankings, it's pretty clear that ${homeData.lastName} has a huge upper hand over ${awayData.lastName}.`;
      pr.rank_RO = `Dacă ne uităm în clasamentul WTA, este destul de clar că ${homeData.lastName} are un avantaj uriaș față de ${awayData.lastName}.`;
      pr.rank_IT = `Se si guarda alla classifica WTA, è chiaro che ${homeData.lastName} ha un enorme vantaggio su ${awayData.lastName}.`;
      pr.rank_ES = `Echando un vistazo a la clasificación WTA, está bastante claro que ${homeData.lastName} tiene una enorme ventaja sobre ${awayData.lastName}.`;
      pr.rank_PT = `Ao verificar as classificações WTA, é bastante claro que ${homeData.lastName} tem uma enorme vantagem sobre ${awayData.lastName}.`;
      pr.rank_FR = `En consultant le classement WTA, il apparaît clairement que ${homeData.lastName} a une longueur d'avance sur ${awayData.lastName}.`;
      pr.rank_DE = `Wenn man sich die WTA-Rangliste ansieht, ist es ziemlich klar, dass ${homeData.lastName} gegenüber ${awayData.lastName} die Oberhand hat.`;
      pr.rank_CZ = `Když se podíváte na žebříček WTA, je jasné, že ${homeData.lastName} má obrovskou převahu nad ${awayData.lastName}.`;
      pr.rank_PL = `Sprawdzając rankingi WTA, widać wyraźnie, że ${homeData.lastName} ma ogromną przewagę nad ${awayData.lastName}.`;
    }
    /// away player is in top 5, home is in top 10 or more
    if (awayData.ranking <= 5 && homeData.ranking > 10) {
      pr.rank = `Judging from the WTA rankings, it's obvious that ${awayData.lastName} has a big advantage over ${homeData.lastName}.`;
      pr.rank_RO = `Judecând după clasamentul WTA, este evident că ${awayData.lastName} are un mare avantaj față de ${homeData.lastName}.`;
      pr.rank_IT = `A giudicare dalla classifica WTA, è ovvio che ${awayData.lastName} ha un grande vantaggio su ${homeData.lastName}.`;
      pr.rank_ES = `A juzgar por la clasificación WTA, es obvio que ${awayData.lastName} tiene una gran ventaja sobre ${homeData.lastName}.`;
      pr.rank_PT = `A julgar pelas classificações WTA, é óbvio que ${awayData.lastName} tem uma grande vantagem sobre ${homeData.lastName}.`;
      pr.rank_FR = `À en juger par les classements WTA, il est évident que ${awayData.lastName} a un avantage considérable sur ${homeData.lastName}.`;
      pr.rank_DE = `Nach den WTA-Ranglisten zu urteilen, ist es offensichtlich, dass ${awayData.lastName} einen großen Vorteil gegenüber ${homeData.lastName} hat.`;
      pr.rank_CZ = `Podle žebříčku WTA je zřejmé, že ${awayData.lastName} má oproti ${homeData.lastName} velkou výhodu.`;
      pr.rank_PL = `Sądząc po rankingach WTA, to oczywiste, że ${awayData.lastName} ma dużą przewagę nad ${homeData.lastName}.`;
    }

    //// HERE MATCHES BETWEEN 5-10 and 11-20
    //// home is top 5-10, aways is 11-20, diff is just one place (10 vs 11)
    if (
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      rankDiff == 1
    ) {
      pr.rank = `Since both players are ranked quite closely in the WTA standings, it shouldn't make much of a difference in today's game.`;
      pr.rank_RO = `Deoarece amândouă jucătoarele sunt clasate destul de aproape în clasamentul WTA, acest fapt nu ar trebui să afecteze rezultatul partidei.`;
      pr.rank_IT = `Poiché entrambe le giocatrici sono classificate abbastanza vicine nella classifica WTA, non dovrebbe fare molta differenza nel gioco di oggi.`;
      pr.rank_ES = `Como ambas jugadoras están bastante cerca en la clasificación de la WTA, no debería haber mucha diferencia en el juego de hoy.`;
      pr.rank_PT = `Como ambas as jogadoras têm classificações bastante próximas no ranking da WTA, não deverá haver muita diferença no jogo de hoje.`;
      pr.rank_FR = `Comme les deux joueuses sont classées assez proches dans le classement de la WTA, ça ne devrait pas beaucoup changer le résultat du match d'aujourd'hui.`;
      pr.rank_DE = `Da beide Spielerinnen in der WTA-Rangliste ziemlich nah beieinander stehen, wird es in diesem Spiel heute nicht viel Unterschied machen.`;
      pr.rank_CZ = `Vzhledem k tomu, že obě hráčky jsou poměrně blízko v hodnocení WTA, nemělo by to dnes ve hře příliš velký rozdíl.`;
      pr.rank_PL = `Ponieważ obie zawodniczki są dość blisko siebie w klasyfikacji WTA, nie powinno to mieć dużego wpływu na dzisiejszy mecz.`;
    }

    //// home is top 5-10, away is 11-20, but difference is bigger
    if (
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      rankDiff >= 2
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${homeData.lastName} could have the upper hand against ${awayData.lastName}.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${homeData.lastName} ar putea avea un avantaj în fața lui ${awayData.lastName}.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${homeData.lastName} possa avere la meglio su ${awayData.lastName}.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName}.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName}.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${homeData.lastName} puisse avoir le dessus sur ${awayData.lastName}.`;
      pr.rank_DE = `Anhand der WTA-Rangliste sieht es so aus, als ob ${homeData.lastName} die Oberhand gegen ${awayData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${homeData.lastName} by mohl mít proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName}.`;
    }
    //// REVERSE
    //// away is top 5-10, home is 11-20, diff is just one place (10 vs 11)
    if (
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      rankDiff == 1
    ) {
      pr.rank = `Given that both players are neck and neck in the WTA rankings, the difference in their standings isn't expected to play a huge role in today's match.`;
      pr.rank_RO = `Dat fiind că ambele jucătoare au aproape același rank în clasamentul WTA, diferența dintre pozițiile lor nu se așteaptă să joace un rol foarte important în meciul de astăzi.`;
      pr.rank_IT = `Dato che entrambe le giocatrici sono a pari merito nei ranking WTA, la differenza nella loro posizione non dovrebbe svolgere un ruolo importante nella partita di oggi.`;
      pr.rank_ES = `Dado que ambas jugadoras están codo a codo en el ranking de la WTA, se espera que la diferencia en sus posiciones no tenga un papel muy importante en el partido de hoy.`;
      pr.rank_PT = `Dado que ambas as jogadoras estão quase empatadas no ranking da WTA, a diferença em sua classificação não é esperada para desempenhar um papel enorme na partida de hoje.`;
      pr.rank_FR = `Étant donné que les deux joueuses sont à égalité de points dans les classements de la WTA, la différence dans leurs positions n'est pas censée jouer un rôle majeur dans le match d'aujourd'hui.`;
      pr.rank_DE = `Angesichts der Tatsache, dass beide Spielerinnen im WTA Ranking Kopf an Kopf liegen, wird erwartet, dass der Unterschied in ihrer Platzierung bei dem heutigen Spiel keine große Rolle spielen wird.`;
      pr.rank_CZ = `Vzhledem k tomu, že obě hráčky jsou na WTA žebříčku na stejné úrovni, rozdíl v jejich postavení se neočekává, že bude hrát velkou roli v dnešním zápase.`;
      pr.rank_PL = `Biorąc pod uwagę, że obie zawodniczki są na równi w rankingu WTA, różnica w ich pozycjach nie powinna odgrywać dużą rolę w dzisiejszym meczu.`;
    }

    //// away is top 5-10, home is 11-20, but difference is bigger
    if (
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      rankDiff >= 2
    ) {
      pr.rank = `After taking a look at the WTA rankings, it appears that ${awayData.lastName} might have a bit of an edge over ${homeData.lastName} in today's game.`;
      pr.rank_RO = `După ce am aruncat o privire în clasamentul WTA, se pare că ${awayData.lastName} ar putea avea un mic avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Dopo aver dato un'occhiata alla classifica WTA, sembra che ${awayData.lastName} abbia un po' di vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Después de echar un vistazo a la clasificación WTA, parece que ${awayData.lastName} podría tener un poco de ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Depois de consultar as classificações WTA, parece que ${awayData.lastName} pode ter alguma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Après avoir consulté le classement WTA, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Nach einem Blick auf die WTA-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Spiel einen kleinen Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Po nahlédnutí do žebříčku WTA se zdá, že ${awayData.lastName} může mít v dnešním zápase trochu navrch nad ${homeData.lastName}.`;
      pr.rank_PL = `Po spojrzeniu na rankingi WTA okazuje się, że ${awayData.lastName} może mieć w dzisiejszym meczu nieco przewagi nad ${homeData.lastName}.`;
    }
    //// HERE FOR top 6-10 vs rest of world
    //// home is in top 6-10 vs away > 20,40 etc
    if (
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      awayData.ranking > 20
    ) {
      pr.rank = `By checking out the WTA rankings, it appears that ${homeData.lastName} has got the edge over ${awayData.lastName} for today's showdown.`;
      pr.rank_RO = `Verificând clasamentul WTA, se pare că ${homeData.lastName} are un avantaj față de ${awayData.lastName} pentru confruntarea de astăzi.`;
      pr.rank_IT = `Controllando la classifica WTA, sembra che ${homeData.lastName} sia in vantaggio su ${awayData.lastName} per la sfida di oggi.`;
      pr.rank_ES = `Al consultar la clasificación WTA, parece que ${homeData.lastName} tiene ventaja sobre ${awayData.lastName} para el enfrentamiento de hoy.`;
      pr.rank_PT = `Ao verificar as classificações WTA, parece que ${homeData.lastName} tem vantagem sobre ${awayData.lastName} para o confronto de hoje.`;
      pr.rank_FR = `En consultant les classements WTA, il apparaît que ${homeData.lastName} a l'avantage sur ${awayData.lastName} pour le match d'aujourd'hui.`;
      pr.rank_DE = `Ein Blick auf die WTA-Rangliste zeigt, dass ${homeData.lastName} gegenüber ${awayData.lastName} für den heutigen Showdown einen Vorteil hat.`;
      pr.rank_CZ = `Podle žebříčku WTA se zdá, že ${homeData.lastName} má pro dnešní souboj výhodu před ${awayData.lastName}.`;
      pr.rank_PL = `Sprawdzając rankingi WTA, wygląda na to, że ${homeData.lastName}ma przewagę nad ${awayData.lastName} w dzisiejszym starciu.`;
    }

    if (
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      homeData.ranking > 20
    ) {
      pr.rank = `The WTA rankings are telling us that ${awayData.lastName} is likely to have the advantage over ${homeData.lastName} in today's game.`;
      pr.rank_RO = `Clasamentul WTA ne spune că ${awayData.lastName} va avea probabil un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `La classifica WTA ci dice che ${awayData.lastName} è probabilmente in vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `La clasificación WTA nos dice que ${awayData.lastName} probablemente tenga ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações WTA dizem-nos que é provável que ${awayData.lastName} tenha vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Les classements WTA nous indiquent que ${awayData.lastName} est susceptible d'avoir l'avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Die WTA-Rangliste sagt uns, dass ${awayData.lastName} im heutigen Spiel wahrscheinlich im Vorteil gegenüber ${homeData.lastName} sein wird.`;
      pr.rank_CZ = `Žebříček WTA nám říká, že ${awayData.lastName} bude mít v dnešním zápase pravděpodobně výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Rankingi WTA mówią nam, że ${awayData.lastName} w dzisiejszym meczu prawdopodobnie będzie miał przewagę nad ${homeData.lastName}.`;
    }

    ///// both players are in top 11-20, home is ranked better and difference is more or equal to 10
    //// home in advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking < awayData.ranking &&
      rankDiff >= 5
    ) {
      pr.rank = `The WTA rankings are giving us a hint that ${homeData.lastName} might just have the upper hand against ${awayData.lastName} in today's faceoff.`;
      pr.rank_RO = `Clasamentul WTA ne dă un indiciu că ${homeData.lastName} ar putea avea avantajul în fața lui ${awayData.lastName} în confruntarea de astăzi.`;
      pr.rank_IT = `La classifica WTA ci suggerisce che ${homeData.lastName} potrebbe avere la meglio su ${awayData.lastName} nello scontro diretto di oggi.`;
      pr.rank_ES = `La clasificación WTA nos da una pista de que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações WTA estão a dar-nos uma pista de que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName} no confronto de hoje.`;
      pr.rank_FR = `Les classements WTA nous indiquent que ${homeData.lastName} pourrait bien avoir le dessus sur ${awayData.lastName} dans le face-à-face d'aujourd'hui.`;
      pr.rank_DE = `Die WTA-Rangliste gibt uns einen Hinweis darauf, dass ${homeData.lastName} im heutigen Duell gegen ${awayData.lastName} die Oberhand haben könnte.`;
      pr.rank_CZ = `Žebříček WTA nám napovídá, že ${homeData.lastName} může mít v dnešní konfrontaci proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Rankingi WTA podpowiadają nam, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName} w dzisiejszym pojedynku.`;
    }

    ///// both players are in top 20-50, home is ranked better and difference is less than 10
    //// home in small advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking < awayData.ranking &&
      rankDiff < 5
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${homeData.lastName} could have a slight edge over ${awayData.lastName} in today's match, but it's not a sure thing.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi, dar nu este un lucru sigur.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${homeData.lastName} possa avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi, ma non è una cosa sicura.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy, pero no es seguro.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${homeData.lastName} pode ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje, mas não é uma certeza.`;
      pr.rank_FR = `D'après le classement WTA, il semble que ${homeData.lastName} ait un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui, mais ce n'est pas certain.`;
      pr.rank_DE = `Anhand der WTA-Rangliste sieht es so aus, als könnte ${homeData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${awayData.lastName} haben, aber das ist keine sichere Sache.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že by ${homeData.lastName} mohl mít v dnešním zápase mírnou výhodu nad ${awayData.lastName}, ale není to jisté.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${homeData.lastName} może mieć lekką przewagę nad ${awayData.lastName} w dzisiejszym meczu, ale nie jest to pewne.`;
    }

    ///// both players are in top 20-50, away is ranked better and difference is more or equal to 10
    //// away in advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking > awayData.ranking &&
      rankDiff >= 5
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${awayData.lastName} might be in a better position than ${homeData.lastName} to win today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} ar putea fi într-o poziție mai bună decât ${homeData.lastName} pentru a câștiga meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} sia in una posizione migliore rispetto a ${homeData.lastName} per vincere la partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} podría estar en mejor posición que ${homeData.lastName} para ganar el partido de hoy.`;
      pr.rank_PT = `Com base na classificação WTA, parece que ${awayData.lastName} pode estar em melhor posição do que ${homeData.lastName} para ganhar o jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${awayData.lastName} soit en meilleure position que ${homeData.lastName} pour remporter le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der WTA-Rangliste scheint ${awayData.lastName} in einer besseren Position als ${homeData.lastName} zu sein, um das heutige Match zu gewinnen.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} by mohl být v lepší pozici pro vítězství v dnešním zápase než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} może być w lepszej sytuacji niż ${homeData.lastName}, aby wygrać dzisiejszy mecz.`;
    }

    ///// both players are in top 20-50, away is ranked better and difference is less than 10
    //// away in small advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking > awayData.ranking &&
      rankDiff < 5
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${awayData.lastName} might have a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} abbia un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${awayData.lastName} pode ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der WTA-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} by mohl mít v dnešním zápase mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} może mieć lekką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ///// home is in top 10-20, away is ranked over 50
    //// home in advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 20
    ) {
      pr.rank = `Based on the WTA rankings, it seems that ${homeData.lastName} is more likely to have an advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${homeData.lastName} are mai multe șanse să aibă un avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${homeData.lastName} sia più avvantaggiato rispetto a ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${homeData.lastName} tiene más probabilidades de tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${homeData.lastName} tem mais probabilidades de ter uma vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${homeData.lastName} soit plus susceptible d'avoir un avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der WTA-Rangliste scheint es, dass ${homeData.lastName} im heutigen Match eher einen Vorteil gegenüber ${awayData.lastName} hat.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${homeData.lastName} má v dnešním zápase větší šanci získat výhodu než ${awayData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${homeData.lastName} ma większe szanse na uzyskanie przewagi nad ${awayData.lastName} w dzisiejszym meczu.`;
    }

    ///// away is in top 20-50, home is ranked over 50
    //// away in advatange
    if (
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking > 20
    ) {
      pr.rank = `Based on the WTA rankings, it seems that ${awayData.lastName} is more likely to have an advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} are mai multe șanse să aibă un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} sia più avvantaggiato rispetto a ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} tiene más probabilidades de tener ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${awayData.lastName} tem mais probabilidades de ter uma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base des classements WTA, il semble que ${awayData.lastName} soit plus susceptible d'avoir un avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der WTA-Rangliste scheint es, dass ${awayData.lastName} im heutigen Match eher einen Vorteil gegenüber ${homeData.lastName} haben wird.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} má v dnešním zápase větší šanci získat výhodu než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} ma większe szanse na uzyskanie przewagi nad ${homeData.lastName} w dzisiejszym meczu.`;
    }
    ////xxxxxxxxxxxxxxx done with top 20 players xxxxxxxxxxxxxx

    //// what to do
    // top 20-50 with diff only

    ///// both players are in top 20-50, home is ranked better and difference is more or equal to 10
    //// home in advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking < awayData.ranking &&
      rankDiff >= 10
    ) {
      pr.rank = `The WTA rankings are giving us a hint that ${homeData.lastName} might just have the upper hand against ${awayData.lastName} in today's faceoff.`;
      pr.rank_RO = `Clasamentul WTA ne dă un indiciu că ${homeData.lastName} ar putea avea avantajul în fața lui ${awayData.lastName} în confruntarea de astăzi.`;
      pr.rank_IT = `La classifica WTA ci suggerisce che ${homeData.lastName} potrebbe avere la meglio su ${awayData.lastName} nello scontro diretto di oggi.`;
      pr.rank_ES = `La clasificación WTA nos da una pista de que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações WTA estão a dar-nos uma pista de que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName} no confronto de hoje.`;
      pr.rank_FR = `Les classements WTA nous indiquent que ${homeData.lastName} pourrait bien avoir le dessus sur ${awayData.lastName} dans le face-à-face d'aujourd'hui.`;
      pr.rank_DE = `Die WTA-Rangliste gibt uns einen Hinweis darauf, dass ${homeData.lastName} im heutigen Duell gegen ${awayData.lastName} die Oberhand haben könnte.`;
      pr.rank_CZ = `Žebříček WTA nám napovídá, že ${homeData.lastName} může mít v dnešní konfrontaci proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Rankingi WTA podpowiadają nam, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName} w dzisiejszym pojedynku.`;
    }

    ///// both players are in top 20-50, home is ranked better and difference is less than 10
    //// home in small advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking < awayData.ranking &&
      rankDiff < 10
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${homeData.lastName} could have a slight edge over ${awayData.lastName} in today's match, but it's not a sure thing.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi, dar nu este un lucru sigur.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${homeData.lastName} possa avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi, ma non è una cosa sicura.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy, pero no es seguro.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${homeData.lastName} pode ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje, mas não é uma certeza.`;
      pr.rank_FR = `D'après le classement WTA, il semble que ${homeData.lastName} ait un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui, mais ce n'est pas certain.`;
      pr.rank_DE = `Anhand der WTA-Rangliste sieht es so aus, als könnte ${homeData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${awayData.lastName} haben, aber das ist keine sichere Sache.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že by ${homeData.lastName} mohl mít v dnešním zápase mírnou výhodu nad ${awayData.lastName}, ale není to jisté.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${homeData.lastName} może mieć lekką przewagę nad ${awayData.lastName} w dzisiejszym meczu, ale nie jest to pewne.`;
    }

    ///// both players are in top 20-50, away is ranked better and difference is more or equal to 10
    //// away in advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking > awayData.ranking &&
      rankDiff >= 10
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${awayData.lastName} might be in a better position than ${homeData.lastName} to win today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} ar putea fi într-o poziție mai bună decât ${homeData.lastName} pentru a câștiga meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} sia in una posizione migliore rispetto a ${homeData.lastName} per vincere la partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} podría estar en mejor posición que ${homeData.lastName} para ganar el partido de hoy.`;
      pr.rank_PT = `Com base na classificação WTA, parece que ${awayData.lastName} pode estar em melhor posição do que ${homeData.lastName} para ganhar o jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${awayData.lastName} soit en meilleure position que ${homeData.lastName} pour remporter le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der WTA-Rangliste scheint ${awayData.lastName} in einer besseren Position als ${homeData.lastName} zu sein, um das heutige Match zu gewinnen.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} by mohl být v lepší pozici pro vítězství v dnešním zápase než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} może być w lepszej sytuacji niż ${homeData.lastName}, aby wygrać dzisiejszy mecz.`;
    }

    ///// both players are in top 20-50, away is ranked better and difference is less than 10
    //// away in small advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking > awayData.ranking &&
      rankDiff < 10
    ) {
      pr.rank = `Based on the WTA rankings, it seems like ${awayData.lastName} might have a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} abbia un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${awayData.lastName} pode ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der WTA-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} by mohl mít v dnešním zápase mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} może mieć lekką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ///// home is in top 20-50, away is ranked over 50
    //// home in advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 50
    ) {
      pr.rank = `Based on the WTA rankings, it seems that ${homeData.lastName} is more likely to have an advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${homeData.lastName} are mai multe șanse să aibă un avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${homeData.lastName} sia più avvantaggiato rispetto a ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${homeData.lastName} tiene más probabilidades de tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${homeData.lastName} tem mais probabilidades de ter uma vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement WTA, il semble que ${homeData.lastName} soit plus susceptible d'avoir un avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der WTA-Rangliste scheint es, dass ${homeData.lastName} im heutigen Match eher einen Vorteil gegenüber ${awayData.lastName} hat.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${homeData.lastName} má v dnešním zápase větší šanci získat výhodu než ${awayData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${homeData.lastName} ma większe szanse na uzyskanie przewagi nad ${awayData.lastName} w dzisiejszym meczu.`;
    }

    ///// away is in top 20-50, home is ranked over 50
    //// away in advatange
    if (
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking > 50
    ) {
      pr.rank = `Based on the WTA rankings, it seems that ${awayData.lastName} is more likely to have an advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului WTA, se pare că ${awayData.lastName} are mai multe șanse să aibă un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica WTA, sembra che ${awayData.lastName} sia più avvantaggiato rispetto a ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación WTA, parece que ${awayData.lastName} tiene más probabilidades de tener ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações WTA, parece que ${awayData.lastName} tem mais probabilidades de ter uma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base des classements WTA, il semble que ${awayData.lastName} soit plus susceptible d'avoir un avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der WTA-Rangliste scheint es, dass ${awayData.lastName} im heutigen Match eher einen Vorteil gegenüber ${homeData.lastName} haben wird.`;
      pr.rank_CZ = `Na základě žebříčku WTA se zdá, že ${awayData.lastName} má v dnešním zápase větší šanci získat výhodu než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów WTA wydaje się, że ${awayData.lastName} ma większe szanse na uzyskanie przewagi nad ${homeData.lastName} w dzisiejszym meczu.`;
    }
  }
  return pr;
  // console.log(pr);
};

// let x = {
//   lastName: 'Gigi',
//   ranking: 20,
// };

// let y = {
//   lastName: 'Gogu',
//   ranking: 35,
// };

// predictionByRank(x, y);

export { predictionByRank };
