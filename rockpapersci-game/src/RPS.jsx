import { useState } from 'react';
import './RPS.css';

const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '✊', paper: '🖐️', scissors: '✌️' };

const winsAgainst = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  return winsAgainst[player] === computer ? 'win' : 'lose';
}

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [outcome, setOutcome] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  function playRound(choice) {
    const compChoice = getComputerChoice();
    const gameOutcome = getResult(choice, compChoice);

    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setOutcome(gameOutcome);

    if (gameOutcome === 'win') {
      setPlayerScore(prev => prev + 1);
      setResult('You Win! 🎉');
    } else if (outcome === 'lose') {
      setComputerScore(prev => prev + 1);
      setResult('You Lose! 😢');
    } else {
      setResult("It's a Draw! 🤝");
    }
  }

  function resetGame() {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setOutcome('')
  }

  return (
    <div className="game-box">
      <h3>Rock.Paper.Scissor</h3>

      <div className="score-board">
        <p>You: {playerScore}</p>
        <p>Computer: {computerScore}</p>
      </div>

      <div className="choices">
        {choices.map(choice => (
          <button
            key={choice}
            className="choice-btn"
            onClick={() => playRound(choice)}
          >
            {emojis[choice]}
          </button>
        ))}
      </div>

      <div className="result-area">
        <p>You: {playerChoice ? emojis[playerChoice] : '-'}</p>
        <p>Computer: {computerChoice ? emojis[computerChoice] : '-'}</p>
        <h2 className={outcome}>{result}</h2>
      </div>

      <button id="reset-btn" onClick={resetGame}>Reset Score</button>
    </div>
  );
}