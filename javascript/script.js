const gameBoard = (() => {
	const board = [];

	for (let i = 0; i < 9; i++) {
		board.push("");
	}

	const getBoard = () => [...board];

	const placeToken = (token, position) => (board[position] = token);

	return {
		getBoard,
		placeToken,
	};
})();

const createPlayer = (name, token) => {
	return {
		name,
		token,
	};
};

const displayController = (() => {
	const container = document.querySelector(".container");
	const board = document.createElement("div");
	board.classList.add("gameboard");
	container.appendChild(board);

	const clearBoard = () => (board.textContent = "");

	const renderCell = () => {
		clearBoard();

		for (let mark of gameBoard.getBoard()) {
			let newCell = document.createElement("div");
			let cellMark = document.createElement("p");

			cellMark.textContent = mark;
			newCell.appendChild(cellMark);
			newCell.classList.add("cell");

			board.appendChild(newCell);
		}
	};

	const displayPlayerTurn = () => {
		const res = document.querySelector(".result");
		res.textContent = `${gameController.getActivePlayer().name}'s Turn`;
	};

	renderCell();

	return {
		renderCell,
		clearBoard,
		displayPlayerTurn,
	};
})();

const gameController = (() => {
	const player1 = createPlayer("Alexis", "X");
	const player2 = createPlayer("Maria", "O");

	let activePlayer = player1;

	let isActive = true;
	let isWinner = false;

	const switchTurn = () => {
		activePlayer === player1
			? (activePlayer = player2)
			: (activePlayer = player1);
	};

	const getActivePlayer = () => activePlayer;

	const res = document.querySelector(".result");

	const playRound = () => {
		const cell = document.querySelectorAll(".cell");

		displayController.displayPlayerTurn();

		cell.forEach((button, index) => {
			button.addEventListener("click", () => {
				if (!isActive) {
				} else {
					if (gameBoard.getBoard()[index] !== "") {
						res.textContent = `${getActivePlayer().name}'s move is Invalid, select again`;
					} else {
						gameBoard.placeToken(getActivePlayer().token, index);
						displayController.renderCell();
						checkWinner(gameBoard.getBoard());
						allOccupied();

						if (isWinner) {
							res.textContent = `${getActivePlayer().name} wins`;
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
			res.textContent = `Draw`;
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
		switchTurn,
		playRound,
		getActivePlayer,
		checkWinner,
	};
})();

gameController.playRound();
