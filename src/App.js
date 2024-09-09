import React, { useState } from 'react';

function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const updatedHistory = [...history.slice(0,currentMove+1),nextSquares];
    setXIsNext(!xIsNext);
    setHistory(updatedHistory);
    setCurrentMove(updatedHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    if(move > 0){
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return (
    <div className="game">
      <div className='game-board'>
        <Board xTurn={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Square(props){
  return (
    <button className="square" onClick={props.onSquareClick}>{props.value}</button>
  );
}

function Board({xTurn, squares, onPlay}){
  // const [xTurn,setXturn] = useState(true);
  // const [squares,setSquares] = useState(Array(9).fill(null));
  console.log(squares);


  function handleClick(i){
    if(squares[i] || checkWinner(squares)){
      return ;
    }
    const nextSquares = squares.slice();
    if(xTurn){
      nextSquares[i]="X";
    } else {
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }


  const winner = checkWinner(squares);
  let status;

  if(winner){
    status = "Winner : "+winner;
  } else {
    status = "Next Move : " + (xTurn ? "X":"O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
  function checkWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i=0; i<lines.length;i++){
      const[a,b,c] = lines[i];

      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
}


function App() {
  return (
    <div>App</div>
  );
}

export default Game;