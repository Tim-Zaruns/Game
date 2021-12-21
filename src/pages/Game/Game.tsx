import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { playerChoice, botChoice, setWinner } from '../../slices/gameSlice';
import Button from '../../components/Button';
import './game.scss';
import spockImg from '../../assets/spock.png';
import lizardImg from '../../assets/lizard.png';
import paperImg from '../../assets/paper.png';
import rockImg from '../../assets/rock.png';
import scissorsImg from '../../assets/scissors.png';

const choices = [
  { name: 'rock', image: rockImg },
  { name: 'paper', image: paperImg },
  { name: 'scissors', image: scissorsImg },
  { name: 'lizard', image: lizardImg },
  { name: 'spock', image: spockImg },
];

const Game = () => {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((store) => store.game);
  const [disabled, setDisabled] = useState(false);

  const playerScore = gameInfo.statistics.filter(({ winner }) => winner === 'player').length;
  const botScore = gameInfo.statistics.filter(({ winner }) => winner === 'bot').length;

  useEffect(() => {
    localStorage.setItem('game-local', JSON.stringify(gameInfo));
  }, [gameInfo]);

  const Choices = (choice: string, image: string) => {
    const randomChoice = choices[Math.floor(Math.random() * 5)];
    dispatch(playerChoice({
      choice,
      image,
    }));
    dispatch(botChoice({
      choice: randomChoice.name,
      image: randomChoice.image,
    }));
    setDisabled(true);
  };

  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        dispatch(setWinner());
        setDisabled(false);
      }, 1000);
    }
  }, [disabled]);

  return (
    <div className="game">
      <div className="game__info--wrapper">
        <div>
          <h3 className="game__info">PLAYER:</h3>
          <h3 className="game__info">
            score:
            <span className="game__score">{playerScore}</span>
          </h3>
          <div className={`game__player--wrapper ${gameInfo.winner === 'player' && 'winner bounce'}`}>
            {gameInfo.player.image === ''
              ? <h3 className="game__info">P</h3>
              : (
                <img
                  src={gameInfo.player.image}
                  alt="player"
                  className="player__image"
                />
              )}
          </div>
        </div>
        <div>
          <h3 className="game__info">winner:</h3>
          <h3 className="game__info">{gameInfo.winner}</h3>
        </div>
        <div>
          <h3 className="game__info">BOT:</h3>
          <h3 className="game__info">
            score:
            <span className="game__score">{botScore}</span>
          </h3>
          <div className={`game__bot--wrapper ${gameInfo.winner === 'bot' && 'winner bounce'}`}>
            {gameInfo.bot.image === ''
              ? <h3 className="game__info">B</h3>
              : (
                <img
                  src={gameInfo.bot.image}
                  alt="bot"
                  className="bot__image"
                />
              )}
          </div>
        </div>
      </div>
      <div className="game__choices--wrapper">
        {
          choices.map(({ name, image }) => (
            <div key={name}>
              <Button
                name={name}
                onClick={() => Choices(name, image)}
                isDisabled={disabled}
              />
            </div>
          ))
        }
      </div>
      <div>
        <Button
          name="Start new game"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default Game;
