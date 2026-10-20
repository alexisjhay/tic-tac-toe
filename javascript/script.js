const gameBoard = (() => {
	const board = [];

	for (let i = 0; i < 9; i++) {
		board.push("");
	}

	const getBoard = () => [...board];

	const placeToken = (token, position) => (board[position] = token);

	const resetBoard = () => {
		for (let i = 0; i < 9; i++) {
			board[i] = "";
		}
	};

	return {
		getBoard,
		placeToken,
		resetBoard,
	};
})();

const createPlayer = (name, token) => {
	let score = 0;

	const getScore = () => score;
	const addWin = () => (score += 1);

	return {
		name,
		token,
		getScore,
		addWin,
	};
};

const displayController = () => {
	const board = document.querySelector(".gameboard");

	const clearBoard = () => (board.textContent = "");

	const renderCell = () => {
		clearBoard();

		for (let mark of gameBoard.getBoard()) {
			let newCell = document.createElement("div");
			let cellMark = document.createElement("p");

			if (mark) {
				newCell.classList.add(mark.toLowerCase());
			}

			cellMark.textContent = mark;

			newCell.appendChild(cellMark);
			newCell.classList.add("cell");

			board.appendChild(newCell);
		}
	};

	const displayPlayerTurn = (res, activePlayer) => {
		res.textContent = `${activePlayer.name}'s Turn`;
	};

	const scorePlayerOne = (name, score) => {
		const scoreP1 = document.querySelector(".score-player1");
		scoreP1.textContent = `${name}(X): ${score}`;
	};

	const scorePlayerTwo = (name, score) => {
		const scoreP1 = document.querySelector(".score-player2");
		scoreP1.textContent = `${name}(O): ${score}`;
	};

	const playerScores = (p1name, p1score, p2name, p2score) => {
		scorePlayerOne(p1name, p1score);
		scorePlayerTwo(p2name, p2score);
	};

	renderCell();

	return {
		renderCell,
		clearBoard,
		displayPlayerTurn,
		playerScores,
	};
};

const gameController = () => {
	const player1 = startGame.createPlayer1();
	const player2 = startGame.createPlayer2();

	const display = displayController();

	let isActive = true;
	let isWinner = false;
	let isDraw;

	let activePlayer = player1;

	const switchTurn = () => {
		activePlayer === player1
			? (activePlayer = player2)
			: (activePlayer = player1);
	};

	const getActivePlayer = () => activePlayer;
	const res = document.querySelector(".result");

	const restartGame = () => {
		gameBoard.resetBoard();

		display.renderCell();

		activePlayer = player1;

		isActive = true;

		isWinner = false;

		isDraw = false;

		playRound();
	};

	const playRound = () => {
		const cell = document.querySelectorAll(".cell");

		const renderPlayerScore = () =>
			display.playerScores(
				player1.name,
				player1.getScore(),
				player2.name,
				player2.getScore(),
			);

		const renderPlayerTurn = () => display.displayPlayerTurn(res, activePlayer);

		renderPlayerTurn();
		renderPlayerScore();

		cell.forEach((button, index) => {
			button.addEventListener("click", () => {
				if (!isActive) {
				} else {
					if (gameBoard.getBoard()[index] !== "") {
						res.textContent = `${activePlayer.name}'s move is Invalid, select again`;
					} else {
						gameBoard.placeToken(activePlayer.token, index);
						display.renderCell();
						checkWinner(gameBoard.getBoard());
						allOccupied();

						if (isWinner) {
							res.textContent = `${activePlayer.name} is the Winner`;
							activePlayer.addWin();
							renderPlayerScore();
						} else if (isDraw) {
							res.textContent = `Draw`;
						} else {
							switchTurn();
							playRound();
						}
					}
				}
			});
		});
	};

	const allOccupied = () => {
		if (gameBoard.getBoard().every((index) => index !== "")) {
			isDraw = true;
			isActive = false;
		}
	};

	const checkWinner = (board) => {
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let conditions of winConditions) {
			const [a, b, c] = conditions;

			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				isActive = false;
				isWinner = true;
			}
		}
	};

	return {
		playRound,
		getActivePlayer,
		restartGame,
	};
};

const startGame = (() => {
	const form = document.querySelector("form");
	const restart = document.querySelector(".reset");

	let game;

	const playerOne = document.querySelector("#player1");
	const playerTwo = document.querySelector("#player2");

	const createPlayer1 = () => createPlayer(playerOne.value, "X");
	const createPlayer2 = () => createPlayer(playerTwo.value, "O");

	restart.addEventListener("click", () => {
		if (game) {
			game.restartGame();
		}
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		gameBoard.resetBoard();
		game = gameController();
		game.playRound();
	});

	return {
		createPlayer1,
		createPlayer2,
	};
})();
