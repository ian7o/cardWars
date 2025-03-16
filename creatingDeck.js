const cards = [
  "a",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];

const naip = ["ouro", "copa", "paus", "espadas"];

let joao = [];
let zee = [];
let tableCards = [];
let zeeVitories = 0;
let joaoVitories = 0;

function splitDeck(deck) {
  let half = Math.ceil(deck.length / 2);
  console.log(half);
  zee = deck.slice(0, half);
  joao = deck.slice(half, deck.length);
  return {
    zee,
    joao,
  };
}

// para embaralhar as cartas
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index including i
    // Troca os elementos
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function doRounds() {
  while (
    zee.length > 0 &&
    joao.length > 0 &&
    zeeVitories < 1000 &&
    joaoVitories < 1000
  ) {
    tableCards = [];
    tableCards.push(zee.shift(), joao.shift());
    console.log("zee throw", tableCards[0]);
    console.log("joao throw", tableCards[1]);
    if (tableCards[0] > tableCards[1]) {
      zee.push(...tableCards);
      console.log("zee wins");
      zeeVitories++;
    } else if (tableCards[1] > tableCards[0]) {
      joao.push(...tableCards);
      console.log("joao wins");
      joaoVitories++;
    } else {
      console.log("draw");
      if (zee.length < 4 || joao.length < 4) {
        if (zee.length < 4 && joao.length < 4) {
          console.log("no one can do draw so it's a draw");
          break;
        } else if (zee.length < 4) {
          console.log("zee can't do draw so joao wins");
          break;
        } else if (joao.length < 4) {
          console.log("joao can't do draw so zee wins");
          break;
        }
      } else {
        // Add 3 cards from each player
        for (let i = 0; i < 3; i++) {
          tableCards.push(zee.shift());
          tableCards.push(joao.shift());
        }
        // Get the last card from each player for comparison
        let zeeCard = zee.shift();
        let joaoCard = joao.shift();

        console.log("zee war card", zeeCard);
        console.log("joao war card", joaoCard);

        tableCards.push(zeeCard, joaoCard);

        if (zeeCard > joaoCard) {
          zee.push(...tableCards);
          console.log("zee wins war");
          zeeVitories++;
        } else if (joaoCard > zeeCard) {
          joao.push(...tableCards);
          console.log("joao wins war");
          joaoVitories++;
        } else {
          console.log("draw the draw");
        }
      }
    }

    //para mostrar o placar
    console.log(`zee Wins: ${zeeVitories} x joao Wins: ${joaoVitories}`);
    console.log(`zee has ${zee.length} cards`);
    console.log(`joao has ${joao.length} cards`);
  }
  //para mostrar o vencedor
  if (joaoVitories < zeeVitories) {
    console.log("zee winnnns");
  }
  if (joaoVitories > zeeVitories) {
    console.log("joao winnnns");
  }
  if (joaoVitories === zeeVitories) {
    console.log("draw");
  }
}

splitDeck(
  shuffleDeck([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10])
);
doRounds();

// para criar as cartas
function createDeck(cards, naip) {
  let deck = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < naip.length; j++) {
      deck.push({ card: cards[i], naip: naip[j], value: i + 1 });
    }
  }
  return deck;
}

//splitDeck(shuffleDeck(createDeck(cards, naip)));

/*function drawRound() {
  roundHadDrawAndWasPossibleDoDraw = false;

  if(zee.length < 4 || joao.length < 4){
    if(zee.length < 4){
     console.log("zee can't do draw so joao wins");
    }
    if(joao.length < 4){ 
    console.log("joao can't do draw so zee wins");
    }
  }


  if (zee.length < 4 && joao.length < 4) {
    else if (zee.length < 4 && joao.length < 4) {
      console.log("no one can do draw so it's a draw");
    } else if (zee.length < 4) {
      console.log("zee can't do draw so joao wins");
    } else if (joao.length < 4) {
      console.log("joao can't do draw so zee wins");
    }
  } else if (zee.length >= 4 && joao.length >= 4) {
    console.log("roundHadDrawAndWasPossibleDoDraw");
    roundHadDrawAndWasPossibleDoDraw = true;

    tableCards.push(zee.shift(), joao.shift());
    tableCards.push(zee.shift(), joao.shift());
    tableCards.push(zee.shift(), joao.shift());

    if (tableCards[6] > tableCards[7]) {
      console.log("zee wins");
      zee.push(
        tableCards[0],
        tableCards[1],
        tableCards[2],
        tableCards[3],
        tableCards[4],
        tableCards[5],
        tableCards[6],
        tableCards[7]
      );
      zeeVitories++;
      //compareCards();
    }

    if (tableCards[7] > tableCards[6]) {
      console.log("joao wins");
      joao.push(
        tableCards[0],
        tableCards[1],
        tableCards[2],
        tableCards[3],
        tableCards[4],
        tableCards[5],
        tableCards[6],
        tableCards[7]
      );
      joaoVitories++;
      //compareCards();
    } else if (tableCards[6] === tableCards[7]) {
      console.log("draw the draw");
      // drawRound();
    }
  }
}

function insertCard(deck) {
  let mySuit = document.getElementById("testSuitss");
  for (let i = 0; i < deck.length; i++) {
    switch (deck[i]) {
      case "a":
        let baseCard =
          (mySuit.innerHTML = `<div class="heartsuitA cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">A</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">A</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`);
        break;

      case "2":
        mySuit.innerHTML = `<div class="heartsuit2 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">2</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">2</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "3":
        mySuit.innerHTML = `      <div class="heartsuit3 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">3</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">3</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "4":
        mySuit.innerHTML = `      <div class="heartsuit4 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">4</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle"></div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">4</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "5":
        mySuit.innerHTML = `      <div class="heartsuit5 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">5</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">5</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "6":
        mySuit.innerHTML = `      <div class="heartsuit6 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">6</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle"></div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">6</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "7":
        mySuit.innerHTML = `      <div class="heartsuit7 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">7</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle">
          <img class="hearts" data-specialHeart="1" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">7</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "8":
        mySuit.innerHTML = `
      <div class="heartsuit8 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">8</p><img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">8</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "9":
        mySuit.innerHTML = `<div class="heartsuit9 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">9</p><img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle">
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">9</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "10":
        mySuit.innerHTML = `      <div class="heartsuit10 cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">10</p><img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-middle">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium">
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">10</p>  <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "Jack":
        mySuit.innerHTML = `      <div class="heartsuitJack cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">J</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="jack" src="/images/jack.png" alt="heart" />
          <img class="jack itensUpsideDown" src="/images/jack.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">J</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "Queen":
        mySuit.innerHTML = `      <div class="heartsuitQueen cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">Q</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="queen" src="/images/queen.png" alt="heart" />
          <img class="queen itensUpsideDown" src="/images/queen.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">Q</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      case "King":
        mySuit.innerHTML = `      <div class="heartsuitking cardContainer">
        <div class="card-column-small">
          <p class="cardNumber">K</p>
          <img class="hearts" src="/images/hearts.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-middle">
          <img class="king" src="/images/king-cópia.png" alt="heart" />
          <img class="king itensUpsideDown" src="/images/king-cópia.png" alt="heart" />
        </div>
        <div class="card-column-medium"></div>
        <div class="card-column-small Column-reversed">
          <p class="cardNumber itensUpsideDown">K</p>
          <img class="hearts itensUpsideDown" src="/images/hearts.png" alt="heart" />
        </div>
      </div>`;

        break;

      default:
        break;
    }
  }
}

*/
