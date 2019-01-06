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


export default {
  state: {
    list: [],
    activePlayerId: '',
  },
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
    },
    removePlayer({ state, commit, getters }, playerId) { 
      const newList = state.list.slice();
      newList.splice(getters.indexOfPlayer(playerId), 1)
      commit('setState', {
        key: 'list',
        data: newList,
      });
    }
  },
  getters: {
    activePlayer: state => state.list.find(p => p.id === state.activePlayerId),
    indexOfPlayer: state => playerId => state.list.map(p => p.id).indexOf(playerId),
  }
}