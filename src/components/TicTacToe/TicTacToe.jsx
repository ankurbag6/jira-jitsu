/*
1. accept size as props
2. STATE : board[] -> flat array,  currentPlayer: X | O
3. draw grid
4. Events : onClick -> setValue of the board index

*/

import { useState } from "react";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export function getWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export default function TicTacToe({ size }) {
  const gridSize = size * size;
  const [board, setBoard] = useState(() => Array(gridSize).fill(null));

  const moves =  board.filter(cell => cell !== null).length;
  const currentPlayer = moves %2 === 0 ? "X" : "O";
  const lineWinner = getWinner(board);
  const winner = lineWinner ?? (moves === gridSize ? "Draw" : null);
  const handleClick = (idx) => {
    if (board[idx] !== null || winner) return;

    setBoard((prev) => {
      const next = [...prev];
      next[idx] = currentPlayer;
      return next;
    });

  };

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <p aria-live="polite">Current Player : {currentPlayer}</p>
      <p aria-live="polite">Winner : {winner}</p>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 40px)`,
          gap: 4 
        }}
        aria-label="Tic tac toe"
      >
        {board.map((cell, i) => (
          <button
            key={i}
            style={{ border: "1px solid black", height: 40, width: 40 }}
            onClick={() => handleClick(i)}
            aria-label={`Row ${Math.floor(i / size) + 1}, column ${(i % size) + 1}, ${cell ?? "empty"}`}
          >
            {cell !== null ? cell : " "}
          </button>
        ))}
      </section>
    </>
  );
}
