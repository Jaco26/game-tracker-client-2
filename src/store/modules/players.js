function bigRandom() {
  const key = 'abcdef1234567890';
  let i, j, randomI, accum = '';
  for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        randomI = Math.floor(Math.random() * key.length);
      }
      accum += key[randomI];
  }
  return accum;
}

function indexOfPlayer(state, playerId) {
  return state.players.map(p => p.id).indexOf(playerId);
}

export default {
  state: {
    list: [],
    activePlayerId: '',
  },
  mutations: {
    removePlayer(state, playerId) {
      state.list.splice(indexOfPlayer(playerId), 1);
    },
    updatePlayer(state, { playerId, name }) {
      state.list.splice(indexOfPlayer(playerId, 1, { id: playerId, name }));
    }
  },
  actions: {
    addPlayer({ state, rootState, commit }) {
      const { newPlayerName } = rootState.forms.players;
      if (!state.list.map(p => p.name).includes(newPlayerName)) {
        commit('setState', { 
          key: 'list', 
          data: [...state.list, {
            name: newPlayerName,
            id: bigRandom(),
          }],
        });
        commit('forms/players/clearFields', ['newPlayerName'], { root: true });
      }
    },
  },
  getters: {
    activePlayer: state => state.list.find(p => p.id === state.activePlayerId),
  }
}