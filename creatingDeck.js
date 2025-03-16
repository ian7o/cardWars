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

let zee = [];
let joao = [];
let battleArea = [];
let zeeVitories = 0;
let joaoVitories = 0;

// para criar as cartas
function createDeck(cards, naip) {
  let deck = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < 1; j++) {
      deck.push({ card: cards[i], naip: naip[j], value: i + 1 });
    }
  }
  return deck;
}

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
    battleArea = [];
    battleArea.push(zee.shift(), joao.shift());
    console.log("zee throw", battleArea[0].card);
    console.log("joao throw", battleArea[1].card);
    if (battleArea[0].value > battleArea[1].value) {
      zee.push(...battleArea);
      console.log("zee wins");
      zeeVitories++;
    } else if (battleArea[1].value > battleArea[0].value) {
      joao.push(...battleArea);
      console.log("joao wins");
      joaoVitories++;
    }
    if (battleArea[1].value === battleArea[0].value) {
      disputeRound();
    }

    //para mostrar o placar
    console.log(`zee Wins: ${zeeVitories} x joao Wins: ${joaoVitories}`);
    console.log(`zee has ${zee.length} cards`);
    console.log(`joao has ${joao.length} cards`);
    insertCard(battleArea);
    showscoreboard();
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

function disputeRound() {
  console.log("draw");
  if (zee.length < 4 || joao.length < 4) {
    if (zee.length < 4 && joao.length < 4) {
      console.log("no one can do draw so it's a draw");
    } else if (zee.length < 4) {
      console.log("zee can't do draw so joao wins");
    } else if (joao.length < 4) {
      console.log("joao can't do draw so zee wins");
    }
  } else {
    // Add 3 cards from each player
    for (let i = 0; i < 3; i++) {
      battleArea.push(zee.shift());
      battleArea.push(joao.shift());
    }
    // Get the last card from each player for comparison
    let zeeCard = zee.shift();
    let joaoCard = joao.shift();

    console.log("zee war card", zeeCard);
    console.log("joao war card", joaoCard);

    battleArea.push(zeeCard, joaoCard);

    if (zeeCard.value > joaoCard.value) {
      zee.push(...battleArea);
      console.log("zee wins war");
      zeeVitories++;
    } else if (joaoCard.value > zeeCard.value) {
      joao.push(...battleArea);
      console.log("joao wins war");
      joaoVitories++;
    } else {
      console.log("draw the draw");
    }
  }
}

function showscoreboard() {
  const scoreboard = document.getElementsByClassName("scoreboard")[0];
  scoreboard.innerHTML = `Player1:  ${zeeVitories} x Player2:  ${joaoVitories}`;
}

splitDeck(shuffleDeck(createDeck(cards, naip)));
doRounds();

function insertCard(cardsArray) {
  const myBattleAreaDiv = document.getElementsByClassName("battleArea")[0];
  for (let value of cardsArray) {
    switch (value.card) {
      case "a":
        myBattleAreaDiv.innerHTML += `<div class="heartsuitA cardContainer">
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
      </div>`;
        break;

      case "2":
        myBattleAreaDiv.innerHTML += `<div class="heartsuit2 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit3 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit4 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit5 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit6 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit7 cardContainer">
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
        myBattleAreaDiv.innerHTML += `
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
        myBattleAreaDiv.innerHTML += `<div class="heartsuit9 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuit10 cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuitJack cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuitQueen cardContainer">
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
        myBattleAreaDiv.innerHTML += `      <div class="heartsuitking cardContainer">
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
  myBattleAreaDiv.innerHTML = " ";
}
