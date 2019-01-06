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

const STORAGE_KEY = 'players';

function loadStorage(state) {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storage) {
    state.list = storage.list;
  }
  return state;
}

function initialState() {
  return {
    list: [],
    activePlayerId: '',
  }
}


export default {
  state: loadStorage(initialState()),
  actions: {
    addPlayer({ state, rootState, commit }) {
      const { newName } = rootState.forms.players;
      if (newName && !state.list.map(p => p.name).includes(newName)) {
        commit('setState', { 
          key: 'list', 
          data: [...state.list, {
            name: newName,
            id: bigRandom(),
          }],
        });
        commit(
          'forms/players/clearFields', 
          ['newName'], 
          { root: true }
        );
        commit('saveToStorage', { STORAGE_KEY, keys: ['list'] });
      }
    },
    updatePlayer({ state, rootState, getters, commit }) {
      const { editName, editId } = rootState.forms.players;
      const newList = state.list.slice();  
      newList.splice(getters.indexOfPlayer(editId), 1, {
        name: editName,
        id: editId,
      });      
      commit('setState', {
        key: 'list',
        data: newList,
      });
      commit(
        'forms/players/clearFields', 
        ['editName', 'editId'], 
        { root: true }
      );
      commit('saveToStorage', { STORAGE_KEY, keys: ['list'] });
    },
    removePlayer({ state, commit, getters }, playerId) { 
      const newList = state.list.slice();
      newList.splice(getters.indexOfPlayer(playerId), 1)
      commit('setState', {
        key: 'list',
        data: newList,
      });
      commit('saveToStorage', { STORAGE_KEY, keys: ['list'] });
    }
  },
  getters: {
    activePlayer: state => state.list.find(p => p.id === state.activePlayerId),
    indexOfPlayer: state => playerId => state.list.map(p => p.id).indexOf(playerId),
  }
}