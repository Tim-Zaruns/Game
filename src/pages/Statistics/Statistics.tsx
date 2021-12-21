import { useAppSelector } from '../../store/hooks';
import './statistics.scss';

const Statistics = () => {
  const gameStats = useAppSelector((store) => store.game.statistics);

  if (gameStats.length === 0) {
    return <h3 className="game__stats">No Games Played</h3>;
  }

  return (
    <div className="statistics">
      {
        gameStats.map(({
          winner, playerChoice, botChoice, turn,
        }) => (
          <div className="wrapper" key={turn}>
            <h3 className="game__stats">{`turn: ${turn}`}</h3>
            <h3 className="game__stats">{`player: ${playerChoice}`}</h3>
            <h3 className="game__stats">{`bot: ${botChoice}`}</h3>
            <h3 className="game__stats">{`winner: ${winner}`}</h3>
          </div>
        ))
      }
    </div>
  );
};
export default Statistics;
