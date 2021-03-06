
const STORAGE_KEY = 'infectionDeck';

function initialState() {
  return {
    allCardIds: [],
    discardIds: [],
    intensifyStackIds: [],
    isEpidemic: false,
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
      state.intensifyStackIds.unshift(state.discardIds);
      state.discardIds = [];
    },
    spliceFromIntensifyTop(state, id) {
      // const top = state.intensifyStackIds.length - 1
      const index = state.intensifyStackIds[0].indexOf(id);
      state.intensifyStackIds[0].splice(index, 1);
    },
    popIntensify(state) {
      state.intensifyStackIds.shift();
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
    epidemicInfect({ commit, dispatch, state, rootState }, id) {
      // increase infection rate
      // infect
      dispatch(
        'game/cities/updateCityInfection',
        { id, amount: rootState.game.cities.infectionLevels[id] + 3 },
        { root: true },
      );
      commit('setState', {
        key: 'discardIds',
        data: [...state.discardIds, id],
      });
      // intensify
      commit('pushIntensify');
      commit('setState', { key: 'isEpidemic', data: false });
      commit('saveToStorage', { STORAGE_KEY, keys: ['intensifyStackIds', 'discardIds'] });
    },
    drawCard({ commit, dispatch, state, rootState }, id) { 
      dispatch(
        'game/cities/updateCityInfection', 
        { id,  amount: rootState.game.cities.infectionLevels[id] + 1 },
        { root: true },
      );
      if (state.intensifyStackIds[0]) {
        commit('spliceFromIntensifyTop', id);
        if (!state.intensifyStackIds[0].length) {
          commit('popIntensify');
        }
      }
      commit('setState', {
        key: 'discardIds',
        data: [...state.discardIds, id],
      });
      commit('saveToStorage', { STORAGE_KEY, keys: ['intensifyStackIds', 'discardIds'] });
    },
    intensify({ commit }) {
      commit('pushIntensify');
      commit('saveToStorage', { STORAGE_KEY, keys: ['intensifyStackIds', 'discardIds'] });
    },
  },
  getters: {
    cardsForEpidemicInfecting: state => {
      if (state.isEpidemic) {
        const discardIds = state.discardIds.reduce((accum, cardId) => {
          accum[cardId] = true;
          return accum;
        }, {});
        if (state.intensifyStackIds.length) {
          const flattenedIntensify = state.intensifyStackIds.reduce((accum, group) => {
            group.forEach(cardId => accum[cardId] = true);
            return accum;
          }, {});
          const cardsNotOnBottom = {...discardIds, ...flattenedIntensify};
          return state.allCardIds.filter(cardId => !cardsNotOnBottom[cardId]);
        } else {
          return state.allCardIds.filter(cardId => !discardIds[cardId]);
        }
      }
      return null;
    },
    possibleNextCardIds: (state, getters) => {
      if (getters.cardsForEpidemicInfecting) {
        return getters.cardsForEpidemicInfecting;
      }
      if (state.intensifyStackIds) {
        return state.intensifyStackIds.length
        ? state.intensifyStackIds[0].filter(id => !state.discardIds.includes(id))
        : state.allCardIds.filter(id => !state.discardIds.includes(id));
      }
    },
  }
}
