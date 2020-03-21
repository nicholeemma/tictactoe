import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// class Square extends React.Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        value: null
//     }
//   }
  
//   render() {
//     return (
//       <button className="square"
//               onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  // constructor(props) {
  //   super(props)
  
  //   this.state = {
  //      squares: Array(9).fill(null),
  //      xIsNext: true,
  //   }
  // }
  
 

  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
                  onClick={() => this.props.onClick(i)}/>;
  }

  render() {

    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'winner:' + winner;
    // } else {
    //   status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
    // }

    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let squares = []
    for (let i = 0; i < 3; i++) {
      let low = [] 
      for (let j = 0; j < 3; j++) {
        low.push(this.renderSquare(i*3 + j))
      }
      squares.push(<div className="board-row">{low}</div>)
    }
    return (
      <div>
        {squares}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       history: [{
         squares: Array(9).fill(null),
       }],
       stepNumber: 0,
       xIsNext: true,
       locationX: 0,
       locationY: 0,
       isAscending : true,
    }
  }
  

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // create a copy of the squares array
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        locationX: parseInt(i / 3) + 1,
        locationY: i % 3 + 1,
      }]),
      stepNumber : history.length,
      xIsNext: !this.state.xIsNext,
      
    })
  }

  jumpTo(step) {
    this.setState( {
      stepNumber : step,
      xIsNext: (step % 2) === 0,
    })
  }

  handlerToggle() {
    this.setState({
      isAscending: !this.state.isAscending,
    })
  }
  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const isAscending = this.state.isAscending;
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move:
      'Go to game start';
      return (
        <div>
         <p>current location {step.locationX}, {step.locationY}</p>
        <li key={move}>
          <button className = {move===stepNumber ? 'move-list-item-selected' : ''}
                  onClick={() => this.jumpTo(move)}>
                    {desc}
          </button>
        </li>
        </div>
      )
    })
    if (!isAscending) {
      moves.reverse();
    }
    let status;
    if (winner) {
      status = 'Winner' + winner;
    } else {
      status = "Next player is" + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
           
        </div>
        <div className="game-info">
          <div>{status}</div>
    <button onClick={() => this.handlerToggle()}>{isAscending ? 'Descend' : 'Asecond'}</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
