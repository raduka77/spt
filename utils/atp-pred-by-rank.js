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
      pr.rank = `Both players are ranked within the Top 5 of the ATP, which may imply that their rankings may not be crucial in determining the outcome of today's match. However, it is possible that the player with the higher ranking may still hold a slight advantage over his opponent.`;
      pr.rank_RO = `Ambii jucători sunt clasați în Top 5 ATP, ceea ce ar putea însemna că clasamentul lor nu va fi crucial în determinarea rezultatului meciului de astăzi. Cu toate acestea, este posibil ca jucătorul cu cea mai bună clasare să dețină totuși un ușor avantaj față de adversarul său.`;
      pr.rank_IT = `Entrambi i giocatori sono classificati nella Top 5 dell'ATP, il che potrebbe far pensare che la loro classifica non sia determinante per l'esito della partita di oggi. Tuttavia, è possibile che il giocatore con la classifica più alta abbia ancora un leggero vantaggio sul suo avversario.`;
      pr.rank_ES = `Ambos jugadores están clasificados dentro del Top 5 de la ATP, lo que puede implicar que sus clasificaciones no sean cruciales para determinar el resultado del partido de hoy. Sin embargo, es posible que el jugador con mejor ranking tenga una ligera ventaja sobre su rival.`;
      pr.rank_PT = `Ambos os jogadores estão classificados no Top 5 da ATP, o que pode implicar que as suas classificações podem não ser cruciais para determinar o resultado do jogo de hoje. No entanto, é possível que o jogador com a classificação mais elevada ainda tenha uma ligeira vantagem sobre o seu adversário.`;
      pr.rank_FR = `Les deux joueurs sont classés dans le Top 5 de l'ATP, ce qui peut laisser penser que leur classement ne sera pas déterminant pour l'issue du match d'aujourd'hui. Cependant, il est possible que le joueur le mieux classé ait un léger avantage sur son adversaire.`;
      pr.rank_DE = `Beide Spieler gehören zu den Top 5 der ATP-Rangliste, was bedeuten könnte, dass ihre Platzierungen nicht entscheidend für den Ausgang des heutigen Matches sind. Es ist jedoch möglich, dass der Spieler mit dem höheren Ranking immer noch einen leichten Vorteil gegenüber seinem Gegner hat.`;
      pr.rank_CZ = `Oba hráči se nacházejí v Top 5 žebříčku ATP, což může znamenat, že jejich umístění nemusí být pro výsledek dnešního zápasu rozhodující. Je však možné, že hráč s vyšším žebříčkem bude mít nad svým soupeřem stále mírnou výhodu.`;
      pr.rank_PL = `Obaj zawodnicy znajdują się w Top 5 rankingu ATP, co może sugerować, że ich rankingi nie będą miały kluczowego znaczenia dla wyniku dzisiejszego meczu. Możliwe jest jednak, że zawodnik z wyższym rankingiem będzie miał niewielką przewagę nad swoim przeciwnikiem.`;
    }

    /// both in top 10, away is 1 place behind (so 5 and 6)
    if (
      homeData.ranking <= 5 &&
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      rankDiff == 1
    ) {
      pr.rank = `Both players are among the top 10 in the ATP rankings, implying that the difference in their rankings may not significantly impact the outcome of the match.`;
      pr.rank_RO = `Ambii jucători se află printre primii 10 în clasamentul ATP, ceea ce înseamnă că diferența dintre pozițiile lor nu va avea un impact semnificativ asupra rezultatului meciului.`;
      pr.rank_IT = `Entrambi i giocatori sono tra i primi 10 della classifica ATP, il che implica che la differenza di posizione potrebbe non avere un impatto significativo sull'esito dell'incontro.`;
      pr.rank_ES = `Ambos jugadores se encuentran entre los 10 primeros de la clasificación ATP, lo que implica que la diferencia en sus posiciones puede no afectar significativamente al resultado del partido.`;
      pr.rank_PT = `Ambos os jogadores estão entre os 10 primeiros na classificação ATP, o que implica que a diferença nas suas posições pode não ter um impacto significativo no resultado do jogo.`;
      pr.rank_FR = `Les deux joueurs font partie du top 10 du classement ATP, ce qui implique que la différence de leurs positions ne devrait pas avoir d'impact significatif sur l'issue du match.`;
      pr.rank_DE = `Beide Spieler sind in der ATP-Rangliste unter den Top 10 zu finden, was bedeutet, dass der Unterschied in ihren Positionen den Ausgang des Matches nicht wesentlich beeinflussen dürfte.`;
      pr.rank_CZ = `Oba hráči jsou v první desítce žebříčku ATP, což naznačuje, že rozdíl v jejich postavení nemusí mít na výsledek zápasu zásadní vliv.`;
      pr.rank_PL = `Obaj zawodnicy znajdują się w pierwszej dziesiątce rankingu ATP, co sugeruje, że różnica w ich pozycjach może nie wpłynąć znacząco na wynik meczu.`;
    }

    /// both in top 10, away is 2 places or more behind (so 5 and 7,8,9,10)
    if (
      homeData.ranking <= 5 &&
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      rankDiff >= 2
    ) {
      pr.rank = `If we take into account the ATP ranking, ${homeData.lastName} could potentially hold a slight advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Dacă luăm în considerare clasamentul ATP, ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Se teniamo conto della classifica ATP, ${homeData.lastName} potrebbe potenzialmente avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Si tenemos en cuenta la clasificación ATP, ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Se tivermos em conta a classificação ATP, ${homeData.lastName} pode potencialmente ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Si nous prenons en compte le classement ATP, ${homeData.lastName} pourrait avoir un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Wenn wir die ATP-Rangliste berücksichtigen, könnte ${homeData.lastName} im heutigen Match möglicherweise einen leichten Vorteil gegenüber ${awayData.lastName} haben.`;
      pr.rank_CZ = `Pokud vezmeme v úvahu žebříček ATP, ${homeData.lastName} by v dnešním zápase mohl mít potenciálně mírnou výhodu nad ${awayData.lastName}.`;
      pr.rank_PL = `Jeśli weźmiemy pod uwagę ranking ATP, ${homeData.lastName} może potencjalnie posiadać niewielką przewagę nad ${awayData.lastName} w dzisiejszym meczu.`;
    }
    //// NOW REVERSE
    /// both in top 10, home is 1 place behind (so 5 and 6)
    if (
      awayData.ranking <= 5 &&
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      rankDiff == 1
    ) {
      pr.rank = `Both players are among the top 10 in the ATP rankings, implying that the difference in their rankings may not significantly impact the outcome of the match.`;
      pr.rank_RO = `Ambii jucători se află printre primii 10 jucători din clasamentul ATP, ceea ce înseamnă că diferența dintre clasamente nu va avea un impact semnificativ asupra rezultatului meciului.`;
      pr.rank_IT = `Entrambi i giocatori sono tra i primi 10 della classifica ATP, il che implica che la differenza di classifica potrebbe non avere un impatto significativo sull'esito dell'incontro.`;
      pr.rank_ES = `Ambos jugadores se encuentran entre los 10 primeros de la clasificación ATP, lo que implica que la diferencia en sus clasificaciones puede no tener un impacto significativo en el resultado del partido.`;
      pr.rank_PT = `Ambos os jogadores estão entre os 10 primeiros da classificação ATP, o que implica que a diferença entre as suas classificações pode não ter um impacto significativo no resultado do jogo.`;
      pr.rank_FR = `Les deux joueurs font partie du top 10 du classement ATP, ce qui implique que la différence de classement ne devrait pas avoir d'impact significatif sur l'issue du match.`;
      pr.rank_DE = `Beide Spieler befinden sich unter den Top 10 der ATP-Rangliste, was bedeutet, dass der Unterschied in der Rangliste den Ausgang des Matches nicht wesentlich beeinflussen dürfte.`;
      pr.rank_CZ = `Oba hráči se nacházejí v první desítce žebříčku ATP, což naznačuje, že rozdíl v jejich žebříčcích nemusí mít na výsledek zápasu zásadní vliv.`;
      pr.rank_PL = `Obaj zawodnicy znajdują się w pierwszej dziesiątce rankingu ATP, co sugeruje, że różnica w ich rankingach może nie wpłynąć znacząco na wynik meczu.`;
    }

    /// both in top 10, home is 2 places or more behind (so 5 and 7,8,9,10)
    if (
      awayData.ranking <= 5 &&
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      rankDiff >= 2
    ) {
      pr.rank = `If we take into account the ATP ranking, ${awayData.lastName} could potentially hold a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Dacă luăm în considerare clasamentul ATP, ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Se teniamo conto della classifica ATP, ${awayData.lastName} potrebbe potenzialmente avere un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Si tenemos en cuenta la clasificación ATP, ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Se tivermos em conta a classificação ATP, ${awayData.lastName} pode potencialmente ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Si nous prenons en compte le classement ATP, ${awayData.lastName} pourrait avoir un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Wenn wir die ATP-Rangliste berücksichtigen, könnte ${awayData.lastName} im heutigen Match möglicherweise einen leichten Vorteil gegenüber ${homeData.lastName} haben.`;
      pr.rank_CZ = `Pokud vezmeme v úvahu žebříček ATP, ${awayData.lastName} by v dnešním zápase mohl mít potenciálně mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Jeśli weźmiemy pod uwagę ranking ATP, to ${awayData.lastName} może potencjalnie mieć niewielką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ////// xxxxxxxxxxxxxxxxxx done with matches with top 10 players xxxxxxxxxxxxxxxxxx

    /// home player is in top 5, away is in top 10 or more
    if (homeData.ranking <= 5 && awayData.ranking > 10) {
      pr.rank = `Checking out the ATP rankings, it's pretty clear that ${homeData.lastName} has a huge upper hand over ${awayData.lastName}.`;
      pr.rank_RO = `Dacă ne uităm în clasamentul ATP, este destul de clar că ${homeData.lastName} are un avantaj uriaș față de ${awayData.lastName}.`;
      pr.rank_IT = `Se si guarda alla classifica ATP, è chiaro che ${homeData.lastName} ha un enorme vantaggio su ${awayData.lastName}.`;
      pr.rank_ES = `Echando un vistazo a la clasificación ATP, está bastante claro que ${homeData.lastName} tiene una enorme ventaja sobre ${awayData.lastName}.`;
      pr.rank_PT = `Ao verificar as classificações ATP, é bastante claro que ${homeData.lastName} tem uma enorme vantagem sobre ${awayData.lastName}.`;
      pr.rank_FR = `En consultant le classement ATP, il apparaît clairement que ${homeData.lastName} a une longueur d'avance sur ${awayData.lastName}.`;
      pr.rank_DE = `Wenn man sich die ATP-Rangliste ansieht, ist es ziemlich klar, dass ${homeData.lastName} gegenüber ${awayData.lastName} die Oberhand hat.`;
      pr.rank_CZ = `Když se podíváte na žebříček ATP, je jasné, že ${homeData.lastName} má obrovskou převahu nad ${awayData.lastName}.`;
      pr.rank_PL = `Sprawdzając rankingi ATP, widać wyraźnie, że ${homeData.lastName} ma ogromną przewagę nad ${awayData.lastName}.`;
    }
    /// away player is in top 5, home is in top 10 or more
    if (awayData.ranking <= 5 && homeData.ranking > 10) {
      pr.rank = `Judging from the ATP rankings, it's obvious that ${awayData.lastName} has a big advantage over ${homeData.lastName}.`;
      pr.rank_RO = `Judecând după clasamentul ATP, este evident că ${awayData.lastName} are un mare avantaj față de ${homeData.lastName}.`;
      pr.rank_IT = `A giudicare dalla classifica ATP, è ovvio che ${awayData.lastName} ha un grande vantaggio su ${homeData.lastName}.`;
      pr.rank_ES = `A juzgar por la clasificación ATP, es obvio que ${awayData.lastName} tiene una gran ventaja sobre ${homeData.lastName}.`;
      pr.rank_PT = `A julgar pelas classificações ATP, é óbvio que ${awayData.lastName} tem uma grande vantagem sobre ${homeData.lastName}.`;
      pr.rank_FR = `À en juger par les classements ATP, il est évident que ${awayData.lastName} a un avantage considérable sur ${homeData.lastName}.`;
      pr.rank_DE = `Nach den ATP-Ranglisten zu urteilen, ist es offensichtlich, dass ${awayData.lastName} einen großen Vorteil gegenüber ${homeData.lastName} hat.`;
      pr.rank_CZ = `Podle žebříčku ATP je zřejmé, že ${awayData.lastName} má oproti ${homeData.lastName} velkou výhodu.`;
      pr.rank_PL = `Sądząc po rankingach ATP, to oczywiste, że ${awayData.lastName} ma dużą przewagę nad ${homeData.lastName}.`;
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
      pr.rank = `Since both players are ranked quite closely in the ATP standings, it shouldn't make much of a difference in today's game.`;
      pr.rank_RO = `Având în vedere că ambii jucători se află pe poziții destul de apropiate în clasamentul ATP, acest lucru nu ar trebui să facă o mare diferență în meciul de astăzi.`;
      pr.rank_IT = `Dato che entrambi i giocatori hanno una classifica ATP abbastanza vicina, non dovrebbe fare molta differenza nella partita di oggi.`;
      pr.rank_ES = `Dado que ambos jugadores están muy cerca en la clasificación de la ATP, no debería haber mucha diferencia en el partido de hoy.`;
      pr.rank_PT = `Uma vez que ambos os jogadores estão muito próximos na classificação ATP, isso não deverá fazer muita diferença no jogo de hoje.`;
      pr.rank_FR = `Comme les deux joueurs sont très proches au classement ATP, cela ne devrait pas faire une grande différence dans le match d'aujourd'hui.`;
      pr.rank_DE = `Da beide Spieler in der ATP-Rangliste recht eng beieinander liegen, dürfte das für das heutige Spiel keinen großen Unterschied machen.`;
      pr.rank_CZ = `Vzhledem k tomu, že oba hráči jsou v žebříčku ATP poměrně blízko, nemělo by to v dnešním utkání znamenat velký rozdíl.`;
      pr.rank_PL = `Ponieważ obaj zawodnicy są dość blisko sklasyfikowani w rankingu ATP, nie powinno to mieć większego znaczenia w dzisiejszym meczu.`;
    }

    //// home is top 5-10, away is 11-20, but difference is bigger
    if (
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      rankDiff >= 2
    ) {
      pr.rank = `Based on the ATP rankings, it seems like ${homeData.lastName} could have the upper hand against ${awayData.lastName}.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${homeData.lastName} ar putea avea un avantaj în fața lui ${awayData.lastName}.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${homeData.lastName} possa avere la meglio su ${awayData.lastName}.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName}.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName}.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${homeData.lastName} puisse avoir le dessus sur ${awayData.lastName}.`;
      pr.rank_DE = `Anhand der ATP-Rangliste sieht es so aus, als ob ${homeData.lastName} die Oberhand gegen ${awayData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${homeData.lastName} by mohl mít proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName}.`;
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
      pr.rank = `Given that both players are neck and neck in the ATP rankings, the difference in their standings isn't expected to play a huge role in today's match.`;
      pr.rank_RO = `Având în vedere că ambii jucători sunt foarte apropiați în clasamentul ATP, nu se așteaptă ca diferența de clasament să joace un rol important în meciul de astăzi.`;
      pr.rank_IT = `Dato che entrambi i giocatori sono molto vicini nella classifica ATP, non si prevede che la differenza di classifica giocherà un ruolo enorme nella partita di oggi.`;
      pr.rank_ES = `Dado que ambos jugadores están muy cerca en la clasificación de la ATP, no se espera que la diferencia en sus posiciones juegue un papel importante en el partido de hoy.`;
      pr.rank_PT = `Dado que ambos os jogadores estão muito próximos no ranking ATP, não se espera que a diferença nas suas classificações desempenhe um papel importante no jogo de hoje.`;
      pr.rank_FR = `Les deux joueurs étant très proches au classement ATP, la différence de classement ne devrait pas jouer un rôle important dans le match d'aujourd'hui.`;
      pr.rank_DE = `Da beide Spieler in der ATP-Rangliste sehr nahe beieinander liegen, dürfte der Unterschied in der Rangliste keine große Rolle für das heutige Match spielen.`;
      pr.rank_CZ = `Vzhledem k tomu, že oba hráči jsou si v žebříčku ATP velmi blízko, neočekává se, že by rozdíl v jejich postavení hrál v dnešním zápase velkou roli.`;
      pr.rank_PL = `Biorąc pod uwagę, że obaj zawodnicy są bardzo blisko siebie w rankingach ATP, różnica w ich statusie nie powinna odgrywać wielkiej roli w dzisiejszym meczu.`;
    }

    //// away is top 5-10, home is 11-20, but difference is bigger
    if (
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      rankDiff >= 2
    ) {
      pr.rank = `After taking a look at the ATP rankings, it appears that ${awayData.lastName} might have a bit of an edge over ${homeData.lastName} in today's game.`;
      pr.rank_RO = `După ce am aruncat o privire în clasamentul ATP, se pare că ${awayData.lastName} ar putea avea un mic avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `Dopo aver dato un'occhiata alla classifica ATP, sembra che ${awayData.lastName} abbia un po' di vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Después de echar un vistazo a la clasificación ATP, parece que ${awayData.lastName} podría tener un poco de ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Depois de consultar as classificações ATP, parece que ${awayData.lastName} pode ter alguma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Après avoir consulté le classement ATP, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Nach einem Blick auf die ATP-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Spiel einen kleinen Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Po nahlédnutí do žebříčku ATP se zdá, že ${awayData.lastName} může mít v dnešním zápase trochu navrch nad ${homeData.lastName}.`;
      pr.rank_PL = `Po spojrzeniu na rankingi ATP okazuje się, że ${awayData.lastName} może mieć w dzisiejszym meczu nieco przewagi nad ${homeData.lastName}.`;
    }
    //// HERE FOR top 6-10 vs rest of world
    //// home is in top 6-10 vs away > 20,40 etc
    if (
      homeData.ranking > 5 &&
      homeData.ranking <= 10 &&
      awayData.ranking > 20
    ) {
      pr.rank = `By checking out the ATP rankings, it appears that ${homeData.lastName} has got the edge over ${awayData.lastName} for today's showdown.`;
      pr.rank_RO = `Verificând clasamentul ATP, se pare că ${homeData.lastName} are un avantaj față de ${awayData.lastName} pentru confruntarea de astăzi.`;
      pr.rank_IT = `Controllando la classifica ATP, sembra che ${homeData.lastName} sia in vantaggio su ${awayData.lastName} per la sfida di oggi.`;
      pr.rank_ES = `Al consultar la clasificación ATP, parece que ${homeData.lastName} tiene ventaja sobre ${awayData.lastName} para el enfrentamiento de hoy.`;
      pr.rank_PT = `Ao verificar as classificações ATP, parece que ${homeData.lastName} tem vantagem sobre ${awayData.lastName} para o confronto de hoje.`;
      pr.rank_FR = `En consultant les classements ATP, il apparaît que ${homeData.lastName} a l'avantage sur ${awayData.lastName} pour le match d'aujourd'hui.`;
      pr.rank_DE = `Ein Blick auf die ATP-Rangliste zeigt, dass ${homeData.lastName} gegenüber ${awayData.lastName} für den heutigen Showdown einen Vorteil hat.`;
      pr.rank_CZ = `Podle žebříčku ATP se zdá, že ${homeData.lastName} má pro dnešní souboj výhodu před ${awayData.lastName}.`;
      pr.rank_PL = `Sprawdzając rankingi ATP, wygląda na to, że ${homeData.lastName}ma przewagę nad ${awayData.lastName} w dzisiejszym starciu.`;
    }

    if (
      awayData.ranking > 5 &&
      awayData.ranking <= 10 &&
      homeData.ranking > 20
    ) {
      pr.rank = `The ATP rankings are telling us that ${awayData.lastName} is likely to have the advantage over ${homeData.lastName} in today's game.`;
      pr.rank_RO = `Clasamentul ATP ne spune că ${awayData.lastName} va avea probabil un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `La classifica ATP ci dice che ${awayData.lastName} è probabilmente in vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `La clasificación ATP nos dice que ${awayData.lastName} probablemente tenga ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações ATP dizem-nos que é provável que ${awayData.lastName} tenha vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Les classements ATP nous indiquent que ${awayData.lastName} est susceptible d'avoir l'avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Die ATP-Rangliste sagt uns, dass ${AuswärtsDaten.Nachname} im heutigen Spiel wahrscheinlich im Vorteil gegenüber ${HeimatDaten.Nachname} sein wird.`;
      pr.rank_CZ = `Žebříček ATP nám říká, že ${awayData.lastName} bude mít v dnešním zápase pravděpodobně výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Rankingi ATP mówią nam, że ${awayData.lastName} w dzisiejszym meczu prawdopodobnie będzie miał przewagę nad ${homeData.lastName}.`;
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
      pr.rank = `The ATP rankings are giving us a hint that ${homeData.lastName} might just have the upper hand against ${awayData.lastName} in today's faceoff.`;
      pr.rank_RO = `Clasamentul ATP ne dă un indiciu că ${homeData.lastName} ar putea avea avantajul în fața lui ${awayData.lastName} în confruntarea de astăzi.`;
      pr.rank_IT = `La classifica ATP ci suggerisce che ${homeData.lastName} potrebbe avere la meglio su ${awayData.lastName} nello scontro diretto di oggi.`;
      pr.rank_ES = `La clasificación ATP nos da una pista de que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações ATP estão a dar-nos uma pista de que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName} no confronto de hoje.`;
      pr.rank_FR = `Les classements ATP nous indiquent que ${homeData.lastName} pourrait bien avoir le dessus sur ${awayData.lastName} dans le face-à-face d'aujourd'hui.`;
      pr.rank_DE = `Die ATP-Rangliste gibt uns einen Hinweis darauf, dass ${homeData.lastName} im heutigen Duell gegen ${awayData.lastName} die Oberhand haben könnte.`;
      pr.rank_CZ = `Žebříček ATP nám napovídá, že ${homeData.lastName} může mít v dnešní konfrontaci proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Rankingi ATP podpowiadają nam, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName} w dzisiejszym pojedynku.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${homeData.lastName} could have a slight edge over ${awayData.lastName} in today's match, but it's not a sure thing.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi, dar nu este un lucru sigur.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${homeData.lastName} possa avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi, ma non è una cosa sicura.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy, pero no es seguro.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${homeData.lastName} pode ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje, mas não é uma certeza.`;
      pr.rank_FR = `D'après le classement ATP, il semble que ${homeData.lastName} ait un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui, mais ce n'est pas certain.`;
      pr.rank_DE = `Anhand der ATP-Rangliste sieht es so aus, als könnte ${homeData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${awayData.lastName} haben, aber das ist keine sichere Sache.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že by ${homeData.lastName} mohl mít v dnešním zápase mírnou výhodu nad ${awayData.lastName}, ale není to jisté.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${homeData.lastName} może mieć lekką przewagę nad ${awayData.lastName} w dzisiejszym meczu, ale nie jest to pewne.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${awayData.lastName} might be in a better position than ${homeData.lastName} to win today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} ar putea fi într-o poziție mai bună decât ${homeData.lastName} pentru a câștiga meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} sia in una posizione migliore rispetto a ${homeData.lastName} per vincere la partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} podría estar en mejor posición que ${homeData.lastName} para ganar el partido de hoy.`;
      pr.rank_PT = `Com base na classificação ATP, parece que ${awayData.lastName} pode estar em melhor posição do que ${homeData.lastName} para ganhar o jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${awayData.lastName} soit en meilleure position que ${homeData.lastName} pour remporter le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der ATP-Rangliste scheint ${awayData.lastName} in einer besseren Position als ${homeData.lastName} zu sein, um das heutige Match zu gewinnen.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} by mohl být v lepší pozici pro vítězství v dnešním zápase než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} może być w lepszej sytuacji niż ${homeData.lastName}, aby wygrać dzisiejszy mecz.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${awayData.lastName} might have a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} abbia un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${awayData.lastName} pode ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der ATP-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} by mohl mít v dnešním zápase mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} może mieć lekką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ///// home is in top 10-20, away is ranked over 50
    //// home in advatange
    if (
      homeData.ranking > 10 &&
      homeData.ranking <= 20 &&
      awayData.ranking > 20
    ) {
      pr.rank = `Based on the ATP rankings, it seems that ${homeData.lastName} is more likely to have an advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${homeData.lastName} are mai multe șanse să aibă un avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${homeData.lastName} sia più avvantaggiato rispetto a ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${homeData.lastName} tiene más probabilidades de tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${homeData.lastName} tem mais probabilidades de ter uma vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${homeData.lastName} soit plus susceptible d'avoir un avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der ATP-Rangliste scheint es, dass ${homeData.lastName} im heutigen Match eher einen Vorteil gegenüber ${awayData.lastName} hat.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${homeData.lastName} má v dnešním zápase větší šanci získat výhodu než ${awayData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${homeData.lastName} ma większe szanse na uzyskanie przewagi nad ${awayData.lastName} w dzisiejszym meczu.`;
    }

    ///// away is in top 20-50, home is ranked over 50
    //// away in advatange
    if (
      awayData.ranking > 10 &&
      awayData.ranking <= 20 &&
      homeData.ranking > 20
    ) {
      pr.rank = `Based on the ATP rankings, it seems that ${awayData.lastName} is more likely to have an advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} are mai multe șanse să aibă un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} sia più avvantaggiato rispetto a ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} tiene más probabilidades de tener ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${awayData.lastName} tem mais probabilidades de ter uma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base des classements ATP, il semble que ${awayData.lastName} soit plus susceptible d'avoir un avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der ATP-Rangliste scheint es, dass ${awayData.lastName} im heutigen Match eher einen Vorteil gegenüber ${homeData.lastName} haben wird.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} má v dnešním zápase větší šanci získat výhodu než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} ma większe szanse na uzyskanie przewagi nad ${homeData.lastName} w dzisiejszym meczu.`;
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
      pr.rank = `The ATP rankings are giving us a hint that ${homeData.lastName} might just have the upper hand against ${awayData.lastName} in today's faceoff.`;
      pr.rank_RO = `Clasamentul ATP ne dă un indiciu că ${homeData.lastName} ar putea avea avantajul în fața lui ${awayData.lastName} în confruntarea de astăzi.`;
      pr.rank_IT = `La classifica ATP ci suggerisce che ${homeData.lastName} potrebbe avere la meglio su ${awayData.lastName} nello scontro diretto di oggi.`;
      pr.rank_ES = `La clasificación ATP nos da una pista de que ${homeData.lastName} podría tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `As classificações ATP estão a dar-nos uma pista de que ${homeData.lastName} pode ter vantagem sobre ${awayData.lastName} no confronto de hoje.`;
      pr.rank_FR = `Les classements ATP nous indiquent que ${homeData.lastName} pourrait bien avoir le dessus sur ${awayData.lastName} dans le face-à-face d'aujourd'hui.`;
      pr.rank_DE = `Die ATP-Rangliste gibt uns einen Hinweis darauf, dass ${homeData.lastName} im heutigen Duell gegen ${awayData.lastName} die Oberhand haben könnte.`;
      pr.rank_CZ = `Žebříček ATP nám napovídá, že ${homeData.lastName} může mít v dnešní konfrontaci proti ${awayData.lastName} navrch.`;
      pr.rank_PL = `Rankingi ATP podpowiadają nam, że ${homeData.lastName} może mieć przewagę nad ${awayData.lastName} w dzisiejszym pojedynku.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${homeData.lastName} could have a slight edge over ${awayData.lastName} in today's match, but it's not a sure thing.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${homeData.lastName} ar putea avea un ușor avantaj față de ${awayData.lastName} în meciul de astăzi, dar nu este un lucru sigur.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${homeData.lastName} possa avere un leggero vantaggio su ${awayData.lastName} nella partita di oggi, ma non è una cosa sicura.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${homeData.lastName} podría tener una ligera ventaja sobre ${awayData.lastName} en el partido de hoy, pero no es seguro.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${homeData.lastName} pode ter uma ligeira vantagem sobre ${awayData.lastName} no jogo de hoje, mas não é uma certeza.`;
      pr.rank_FR = `D'après le classement ATP, il semble que ${homeData.lastName} ait un léger avantage sur ${awayData.lastName} dans le match d'aujourd'hui, mais ce n'est pas certain.`;
      pr.rank_DE = `Anhand der ATP-Rangliste sieht es so aus, als könnte ${homeData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${awayData.lastName} haben, aber das ist keine sichere Sache.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že by ${homeData.lastName} mohl mít v dnešním zápase mírnou výhodu nad ${awayData.lastName}, ale není to jisté.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${homeData.lastName} może mieć lekką przewagę nad ${awayData.lastName} w dzisiejszym meczu, ale nie jest to pewne.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${awayData.lastName} might be in a better position than ${homeData.lastName} to win today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} ar putea fi într-o poziție mai bună decât ${homeData.lastName} pentru a câștiga meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} sia in una posizione migliore rispetto a ${homeData.lastName} per vincere la partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} podría estar en mejor posición que ${homeData.lastName} para ganar el partido de hoy.`;
      pr.rank_PT = `Com base na classificação ATP, parece que ${awayData.lastName} pode estar em melhor posição do que ${homeData.lastName} para ganhar o jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${awayData.lastName} soit en meilleure position que ${homeData.lastName} pour remporter le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der ATP-Rangliste scheint ${awayData.lastName} in einer besseren Position als ${homeData.lastName} zu sein, um das heutige Match zu gewinnen.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} by mohl být v lepší pozici pro vítězství v dnešním zápase než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} może być w lepszej sytuacji niż ${homeData.lastName}, aby wygrać dzisiejszy mecz.`;
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
      pr.rank = `Based on the ATP rankings, it seems like ${awayData.lastName} might have a slight advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} ar putea avea un ușor avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} abbia un leggero vantaggio su ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} podría tener una ligera ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${awayData.lastName} pode ter uma ligeira vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${awayData.lastName} ait un léger avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der ATP-Rangliste sieht es so aus, als ob ${awayData.lastName} im heutigen Match einen leichten Vorteil gegenüber ${homeData.lastName} haben könnte.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} by mohl mít v dnešním zápase mírnou výhodu nad ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} może mieć lekką przewagę nad ${homeData.lastName} w dzisiejszym meczu.`;
    }

    ///// home is in top 20-50, away is ranked over 50
    //// home in advatange
    if (
      homeData.ranking > 20 &&
      homeData.ranking <= 50 &&
      awayData.ranking > 50
    ) {
      pr.rank = `Based on the ATP rankings, it seems that ${homeData.lastName} is more likely to have an advantage over ${awayData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${homeData.lastName} are mai multe șanse să aibă un avantaj față de ${awayData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${homeData.lastName} sia più avvantaggiato rispetto a ${awayData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${homeData.lastName} tiene más probabilidades de tener ventaja sobre ${awayData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${homeData.lastName} tem mais probabilidades de ter uma vantagem sobre ${awayData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base du classement ATP, il semble que ${homeData.lastName} soit plus susceptible d'avoir un avantage sur ${awayData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Ausgehend von der ATP-Rangliste scheint es, dass ${homeData.lastName} im heutigen Match eher einen Vorteil gegenüber ${awayData.lastName} hat.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${homeData.lastName} má v dnešním zápase větší šanci získat výhodu než ${awayData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${homeData.lastName} ma większe szanse na uzyskanie przewagi nad ${awayData.lastName} w dzisiejszym meczu.`;
    }

    ///// away is in top 20-50, home is ranked over 50
    //// away in advatange
    if (
      awayData.ranking > 20 &&
      awayData.ranking <= 50 &&
      homeData.ranking > 50
    ) {
      pr.rank = `Based on the ATP rankings, it seems that ${awayData.lastName} is more likely to have an advantage over ${homeData.lastName} in today's match.`;
      pr.rank_RO = `Pe baza clasamentului ATP, se pare că ${awayData.lastName} are mai multe șanse să aibă un avantaj față de ${homeData.lastName} în meciul de astăzi.`;
      pr.rank_IT = `In base alla classifica ATP, sembra che ${awayData.lastName} sia più avvantaggiato rispetto a ${homeData.lastName} nella partita di oggi.`;
      pr.rank_ES = `Según la clasificación ATP, parece que ${awayData.lastName} tiene más probabilidades de tener ventaja sobre ${homeData.lastName} en el partido de hoy.`;
      pr.rank_PT = `Com base nas classificações ATP, parece que ${awayData.lastName} tem mais probabilidades de ter uma vantagem sobre ${homeData.lastName} no jogo de hoje.`;
      pr.rank_FR = `Sur la base des classements ATP, il semble que ${awayData.lastName} soit plus susceptible d'avoir un avantage sur ${homeData.lastName} dans le match d'aujourd'hui.`;
      pr.rank_DE = `Anhand der ATP-Rangliste scheint es, dass ${awayData.lastName} im heutigen Match eher einen Vorteil gegenüber ${homeData.lastName} haben wird.`;
      pr.rank_CZ = `Na základě žebříčku ATP se zdá, že ${awayData.lastName} má v dnešním zápase větší šanci získat výhodu než ${homeData.lastName}.`;
      pr.rank_PL = `Na podstawie rankingów ATP wydaje się, że ${awayData.lastName} ma większe szanse na uzyskanie przewagi nad ${homeData.lastName} w dzisiejszym meczu.`;
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
