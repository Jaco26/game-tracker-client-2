
const STORAGE_KEY = 'infectionDeck';

function initialState() {
  return {
    allCardIds: [],
    discardIds: [],
    intensifyStackIds: [],
  }
}

function loadFromStorage(state, customKeys) {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storage) {
    const keysToLoad = customKeys || Object.keys(storage);
    keysToLoad.forEach(key => {
      state[key] = storage[key];
    });
  }
  return state;
}

export default {
  state: loadFromStorage(initialState()),
  actions: {
    setAllCardIds({ commit }, ids) {
      commit('setState', {
        key: 'allCardIds',
        data: ids,
      });
    },
    drawCard({ commit, state }, id) {      
      commit('setState', {
        key: 'discardIds',
        data: state.discardIds.length
          ? [...state.discardIds, id]
          : [id],
      });
    },
    intensify({ commit, state }) {
      
    },
  },
  getters: {
    possibleNextCardIds: state => state.intensifyStackIds.length
      ? state.intensifyStack[state.intensifyStack.length - 1].filter(id => !state.discardIds.includes(id))
      : state.allCardIds.filter(id => !state.discardIds.includes(id)),
  }
}
