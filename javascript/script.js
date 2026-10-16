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

	const switchTurn = () => {
		activePlayer === player1
			? (activePlayer = player2)
			: (activePlayer = player1);
	};

	return {
		switchTurn,
	};
})();

gameController.playRound();
