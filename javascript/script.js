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
