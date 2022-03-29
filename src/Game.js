import React,{Component} from 'react';
import Grid from './Grid';

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            stepCount:0,
            isNext:false,
            boardHistory:[
                {squares: Array(9).fill(null)}
            ]
        }

    }

    handleClick(i){
        //increasecount,toggglenext,boardhistoryupdate
        const history = this.state.boardHistory.slice(0,this.state.stepCount+1)
        const latestMove = history[history.length -1 ];
        const squares = latestMove.squares.slice();
        const winner = calculateWinner(squares);
        if(winner || squares[i]){
            return;
        }

        squares[i] = this.state.isNext ? 'X':'O';


        this.setState({
            boardHistory: history.concat({squares:squares}),isNext: !this.state.isNext,stepCount:history.length
        })

    }

    jumpTo(step){
        this.setState({
            stepCount: step,
            IsNext: (step%2)===0
        })
    }

    render(){
        const history = this.state.boardHistory
        const latestMove = history[this.state.stepCount];
        const winner = calculateWinner(latestMove.squares);
        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.isNext ? 'X Player' : 'O PLayer');
        }
        
        return (
            <div className="game">
                <div >
                    <Grid onClick={(i) => this.handleClick(i)}
                        squares={latestMove.squares} />
                </div>
                <div>
                    <div>{status}</div>
                </div>

            </div>
        )
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
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

