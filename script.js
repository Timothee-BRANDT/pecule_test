const choices = ["paper", "rock", "scissor"];

let gameCounter = 1;
let gameHistory = [];

// get the localStorage when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const storedHistory = localStorage.getItem("gameHistory");

    if (storedHistory) {
        gameHistory = JSON.parse(storedHistory);
        gameCounter = gameHistory.length;
        updateHistory();
    }
});

// make the computer play
function randomChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

// logic of the game
function game_logic(player, computer) {
    if (player === computer)
        return "Égalité";
    else if (
        (player === "rock" && computer === "scissor") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissor" && computer === "paper")
    ) 
        return "Vous avez gagner";
     else
        return "Vous avez perdu";
}

// launch the game
function game(player) {
    const computer = randomChoice();
    const result = game_logic(player, computer);
    document.getElementById("result").textContent = result;

    gameHistory.push({
        game: gameCounter,
        player: player,
        computer: computer,
        result: result
    });

    updateHistory();
    saveToLocalStorage();
    gameCounter++;
}

function updateHistory() {
    const historyBody = document.getElementById("history-body");
    historyBody.innerHTML = "";
    gameHistory.forEach(entry => {
        const newRow = historyBody.insertRow(historyBody.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = entry.game;
        cell2.textContent = entry.player;
        cell3.textContent = entry.computer;
        cell4.textContent = entry.result;
    });
}

function saveToLocalStorage() {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}