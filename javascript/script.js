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

const gameController = (() => {
	const player1 = createPlayer("Alexis", "X");
	const player2 = createPlayer("Maria", "O");

	let activePlayer = player1;
	let isActive = true;

	const switchTurn = () => {
		activePlayer === player1
			? (activePlayer = player2)
			: (activePlayer = player1);
	};

	const isValidMove = (index) => {
		if (index < 0 || index > gameBoard.getBoard().length - 1 || index == null) {
			console.log("Invalid Input");
		} else {
			if (gameBoard.getBoard()[index] !== "") {
				console.log("Cell is taken");
			} else {
				gameBoard.placeToken(activePlayer.token, index);
				console.log(
					`${activePlayer.name} places marker ${activePlayer.token} at cell ${index}`,
				);
				checkWinner(gameBoard.getBoard());
				switchTurn();
			}
		}
	};

	const playRound = () => {
		do {
			const position = prompt(`${activePlayer.name}'s turn to enter position`);

			isValidMove(position);

			allOccupied();

			console.log(gameBoard.getBoard());
		} while (isActive);
	};

	const allOccupied = () => {
		if (gameBoard.getBoard().every((index) => index !== "")) {
			isActive = false;
		}
	};

	return {
		switchTurn,
		playRound,
	};
})();

gameController.playRound();
