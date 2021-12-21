import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type GameChoice = {
  choice: string,
  image: string,
}

type StatisticsType = {
  turn: number
  winner: string;
  playerChoice: string;
  botChoice: string;
}

const InitialState = {
  player: {
    choice: '',
    image: '',
  },
  bot: {
    choice: '',
    image: '',
  },
  turn: 0,
  winner: '',
  statistics: [] as StatisticsType[],
  winningConditions: [
    { win: 'scissors', lose: 'paper' },
    { win: 'scissors', lose: 'lizard' },
    { win: 'rock', lose: 'scissors' },
    { win: 'rock', lose: 'lizard' },
    { win: 'lizard', lose: 'spock' },
    { win: 'lizard', lose: 'paper' },
    { win: 'spock', lose: 'scissors' },
    { win: 'spock', lose: 'rock' },
    { win: 'paper', lose: 'rock' },
    { win: 'paper', lose: 'spock' },
  ],
};

const setInitialState = (): typeof InitialState => {
  const gameLocalStorage = localStorage.getItem('game-local');
  if (gameLocalStorage) {
    return JSON.parse(gameLocalStorage);
  }
  return InitialState;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: setInitialState(),
  reducers: {
    playerChoice(state, action: PayloadAction<GameChoice>) {
      state.player = action.payload;
      state.winner = '';
      state.turn += 1;
    },
    botChoice(state, action: PayloadAction<GameChoice>) {
      state.bot = action.payload;
    },
    setWinner(state) {
      if (state.player.choice === state.bot.choice) {
        state.winner = 'tie';
      } else if (state.winningConditions
        .find(({ lose, win }) => win === state.player.choice && lose === state.bot.choice)) {
        state.winner = 'player';
      } else {
        state.winner = 'bot';
      }
      state.statistics.push({
        winner: state.winner,
        botChoice: state.bot.choice,
        playerChoice: state.player.choice,
        turn: state.turn,
      });
    },
  },
});

export const { playerChoice, botChoice, setWinner } = gameSlice.actions;
export const game = (state: RootState) => state.game;
export default gameSlice.reducer;
