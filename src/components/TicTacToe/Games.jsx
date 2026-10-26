import TicTacToe from "./TicTacToe";
import { useState } from "react";

export default function Games({numofBoards = 1, size=3}){
    
    const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

    
    const handleEndGames = (result) => {
        setScore(prev => ({...prev, [result]: prev[result] + 1}));
    }

    return (<>
        <h1>Tic-Tac-Toe</h1>
        <p aria-label="winner">X : {score.X}, O : {score.O}, draw: {score.draw} </p>
        {Array.from({ length: numofBoards }, (_, i) => (
            <TicTacToe key={i} label={"Board_"+i} size={size} onGameEnd={handleEndGames} />
        ))}
    </>)
}