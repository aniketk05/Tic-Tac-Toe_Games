
import { useState } from "react";
import Player from "./componets/Player"
import GameBoard from "./componets/GameBoard";
import Log from "./componets/LOg";
import GameOver from "./componets/GameOver";
import { WINNING_COMBINATIONS } from "./Winning-Combination";

const initialBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]


function DerivedActivePlayer(gameTurns)
{
  let currentPlayer='X'
  if(gameTurns.length>0 && gameTurns[0].player==='X')
    {
      currentPlayer='O';
    }

    return currentPlayer;
}

function App() {
  // const [activePlayer,setActivePlayer]=useState('X');
  const [gameTurns, setGameTurn]=useState([]);

  const activePlayer=DerivedActivePlayer(gameTurns); 

  let gameBoard=[...initialBoard.map((array)=>[...array])];

  for(const turn of gameTurns)
      {
          const {square,player}=turn;
          const {row,col}=square;

          gameBoard[row][col]=player;
      }

      let winner;

  for (const combination of WINNING_COMBINATIONS)
    {
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

      if(
        firstSquareSymbol &&
        firstSquareSymbol===secondSquareSymbol &&
        firstSquareSymbol===thirdSquareSymbol
      )
      {
        winner=firstSquareSymbol;
      }

    }

    const hasDraw=gameTurns.length ===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex)
  {
    // setActivePlayer((curActivePlayer)=> curActivePlayer==='X'?'O':'X');
    setGameTurn(
      (preTurn)=>{
        const currentPlayer=DerivedActivePlayer(preTurn);
          const updatedTurn=[
            { square:{row:rowIndex,col:colIndex},player:currentPlayer}
            ,...preTurn
          ];

          return updatedTurn;
      }

    );

  }
  function handleRestart()
  {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player initialName="Player 1" symbol="X"  isActive={activePlayer ==='X'}/>
         <Player initialName="Player 2" symbol="O" isActive={activePlayer ==='O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
       <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
        <Log turns={gameTurns}/>
      </main>
  );
}

export default App
