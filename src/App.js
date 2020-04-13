import { Client } from 'boardgame.io/react';
import TicTacToe from './game.js';
import TicTacToeBoard from './board.js';


const App = Client({ game: TicTacToe, board: TicTacToeBoard, });

export default App;