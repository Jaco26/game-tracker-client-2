
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
  mutations: {
    pushIntensify(state) {      
      state.intensifyStackIds.push(state.discardIds);
      state.discardIds = [];
    },
    spliceFromIntensifyTop(state, id) {
      const top = state.intensifyStackIds.length - 1
      const index = state.intensifyStackIds[top].indexOf(id);
      state.intensifyStackIds[top].splice(index, 1);
    },
    popIntensify(state) {
      state.intensifyStackIds.pop();
    }
  },
  actions: {
    setAllCardIds({ commit }, ids) {
      commit('setState', {
        key: 'allCardIds',
        data: ids,
      });
    },
    refreshDeck({ commit }) {
      const keys = ['discardIds', 'intensifyStackIds'];
      keys.forEach(key => {
        commit('setState', { key, data: [] });
      });
      commit('saveToStorage', { STORAGE_KEY, keys });
    },
    drawCard({ commit, dispatch, state, rootState }, id) {      
      // TODO: INFECT CITY 
      const top = state.intensifyStackIds.length - 1;
      if (top > -1 && state.intensifyStackIds[top].length) {
        commit('spliceFromIntensifyTop', id);
        if (!state.intensifyStackIds[top].length) {
          commit('popIntensify');
        }
      }
      commit('setState', {
        key: 'discardIds',
        data: [...state.discardIds, id],
      });
      commit('saveToStorage', { STORAGE_KEY, keys: ['intensifyStackIds', 'discardIds'] });
    },
    intensify({ commit, state }) {      
      commit('pushIntensify')
      commit('saveToStorage', { STORAGE_KEY, keys: ['intensifyStackIds', 'discardIds'] });
    },
  },
  getters: {
    possibleNextCardIds: state => {
      if (state.intensifyStackIds) {
        return state.intensifyStackIds.length
        ? state.intensifyStackIds[state.intensifyStackIds.length - 1].filter(id => !state.discardIds.includes(id))
        : state.allCardIds.filter(id => !state.discardIds.includes(id));
      }
    },
  }
}
