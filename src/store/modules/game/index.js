import players from './players';
import cities from './cities';
import infectionDeck from './infection-deck';

export default {
  modules: {
    players,
    cities,
    'infection-deck': infectionDeck,
  },
}