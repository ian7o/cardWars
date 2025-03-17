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

const naip = ["diamonds", "hearts", "clubs", "spades"];

let player1 = [];
let player2 = [];
let battleArea = [];
let player1Vitories = 0;
let player2Vitories = 0;

function createDeck(cards, naip) {
  let deck = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push({ card: cards[i], naip: naip[j], value: i + 1 });
    }
  }
  return deck;
}

function splitDeck(deck) {
  let half = Math.ceil(deck.length / 2);
  console.log(half);
  player1 = deck.slice(0, half);
  player2 = deck.slice(half, deck.length);
  return {
    player1,
    player2,
  };
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Troca os elementos
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function playRounds(player1, player2) {
  while (
    player1.length > 0 &&
    player2.length > 0 &&
    player1Vitories < 10 &&
    player2Vitories < 10
  ) {
    let battleArea = [];
    battleArea.push(player1.shift(), player2.shift());
    console.log("player1 throw", battleArea[0].card);
    console.log("player2 throw", battleArea[1].card);

    if (battleArea[0].value > battleArea[1].value) {
      player1.push(...battleArea);
      console.log("player1 wins");
      player1Vitories++;
    } else if (battleArea[1].value > battleArea[0].value) {
      player2.push(...battleArea);
      console.log("player2 wins");
      player2Vitories++;
    } else {
      resolveDraw(player1, player2, battleArea);
    }

    console.log(
      `player1 Wins: ${player1Vitories} x player2 Wins: ${player2Vitories}`
    );
    console.log(`player1 has ${player1.length} cards`);
    console.log(`player2 has ${player2.length} cards`);
  }

  if (player2Vitories < player1Vitories) {
    console.log("player1 wins");
  } else if (player2Vitories > player1Vitories) {
    console.log("player2 wins");
  } else {
    console.log("draw");
  }
}

function resolveDraw(player1, player2, battleArea) {
  console.log("draw");

  // Verifica se algum jogador não tem cartas suficientes para o desempate
  if (player1.length < 4 || player2.length < 4) {
    if (player1.length < 4 && player2.length < 4) {
      console.log("no one can do draw so it's a draw");
    } else if (player1.length < 4) {
      console.log("player1 can't do draw so player2 wins");
      player2.push(...battleArea); // Adiciona as cartas da disputa ao player2
      player2Vitories++;
      return;
    } else if (player2.length < 4) {
      console.log("player2 can't do draw so player1 wins");
      player1.push(...battleArea); // Adiciona as cartas da disputa ao player1
      player1Vitories++;
      return;
    }
  } else {
    // Adiciona 3 cartas de cada jogador
    for (let i = 0; i < 3; i++) {
      battleArea.push(player1.shift());
      battleArea.push(player2.shift());
    }
    // Pega a última carta de cada jogador para comparação
    let player1Card = player1.shift();
    let player2Card = player2.shift();

    console.log("player1 war card", player1Card);
    console.log("player2 war card", player2Card);

    battleArea.push(player1Card, player2Card);

    if (player1Card.value > player2Card.value) {
      player1.push(...battleArea);
      console.log("player1 wins war");
      player1Vitories++;
    } else if (player2Card.value > player1Card.value) {
      player2.push(...battleArea);
      console.log("player2 wins war");
      player2Vitories++;
    } else {
      console.log("draw the draw");
      // Se houver um empate novamente
      resolveDraw(player1, player2, battleArea);
    }
  }
}

function showscoreboard() {
  const scoreboard = document.getElementsByClassName("scoreboard")[0];
  scoreboard.innerHTML = `Player1:  ${player1Vitories} x Player2:  ${player2Vitories}`;
}

function showPlayersNumberOfCards() {
  const player1NumberOfCards = document.getElementsByClassName(
    "player1NumberOfCards"
  )[0];
  const player2NumberOfCards = document.getElementsByClassName(
    "player2NumberOfCards"
  )[0];

  player1NumberOfCards.innerHTML = `player1 numbers of cards:  ${player1.length}`;
  player2NumberOfCards.innerHTML = `player2 numbers of cards:  ${player2.length}`;
}

function insertCard(cardsArray) {
  const myBattleAreaDiv = document.getElementsByClassName("battleArea")[0];
  for (let value of cardsArray) {
    let cardSuit = value.naip;
    let suitAlt = value.naip;
    let suitImage = `/images/${value.naip}.png`;

    switch (value.card) {
      case "a":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suitA cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">A</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">A</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      case "2":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit2 cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">2</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">2</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      case "3":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit3 cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">3</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">3</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      case "4":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit4 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">4</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle"></div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">4</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "5":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit5 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">5</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">5</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "6":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit6 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">6</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle"></div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">6</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "7":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit7 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">7</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle">
              <img class="${cardSuit}" data-specialHeart="1" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">7</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "8":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit8 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">8</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">8</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "9":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit9 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">9</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle">
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">9</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "10":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suit10 cardContainer">
            <div class="card-column-small">
              <p class="cardNumber">10</p>
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-middle">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-medium">
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
            <div class="card-column-small Column-reversed">
              <p class="cardNumber itensUpsideDown">10</p>
              <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
            </div>
          </div>`;
        break;

      case "Jack":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suitJack cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">J</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="jack" src="/images/jack.png" alt="jack" />
            <img class="jack itensUpsideDown" src="/images/jack.png" alt="jack" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">J</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      case "Queen":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suitQueen cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">Q</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="queen" src="/images/queen.png" alt="queen" />
            <img class="queen itensUpsideDown" src="/images/queen.png" alt="queen" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">Q</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      case "King":
        myBattleAreaDiv.innerHTML += `<div class="${cardSuit}suitking cardContainer">
          <div class="card-column-small">
            <p class="cardNumber">K</p>
            <img class="${cardSuit}" src="${suitImage}" alt="${suitAlt}" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-middle">
            <img class="king" src="/images/king-cópia.png" alt="king" />
            <img class="king itensUpsideDown" src="/images/king-cópia.png" alt="king" />
          </div>
          <div class="card-column-medium"></div>
          <div class="card-column-small Column-reversed">
            <p class="cardNumber itensUpsideDown">K</p>
            <img class="${cardSuit} itensUpsideDown" src="${suitImage}" alt="${suitAlt}" />
          </div>
        </div>`;
        break;

      default:
        break;
    }
  }

  //myBattleAreaDiv.innerHTML = " ";
}

/*
function showCards(){
  const nextRoundButton = document.getElementsByClassName("nextRoundButton")[0];

  nextRoundButton.addEventListener("click", function)
}
  */

splitDeck(shuffleDeck(createDeck(cards, naip)));

showPlayersNumberOfCards();

showscoreboard();

playRounds(player1, player2);
