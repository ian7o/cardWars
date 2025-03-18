let player1Name = "";
let player2Name = "";
function registerNameOfPlayers() {
  document
    .getElementById("startGame")
    .addEventListener("click", function (event) {
      const player1Name = document.getElementById("firstPlayerName").value;
      const player2Name = document.getElementById("secondPlayerName").value;

      if (player1Name && player2Name) {
        alert(`Jogo iniciado! ${player1Name} vs ${player2Name}`);
      }
    });
}
export { player1Name, player2Name };
