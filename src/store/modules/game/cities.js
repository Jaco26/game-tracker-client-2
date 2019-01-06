import CITY_GRAPH from '@/store/static-data/city-graph';

const STORAGE_KEY = 'cities';

function initEmptyInfectionLevels() {
  return CITY_GRAPH.reduce((a, city) => {
    a[city.id] = 0;
    return a;
  }, {});
}

function initialState() {
  return {
    graph: CITY_GRAPH,
    infectionLevels: initEmptyInfectionLevels(),
  }
}

function loadFromStorage(state) {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storage) {    
    state.infectionLevels = storage.infectionLevels;
  }
  return state;
}

export default {
  state: loadFromStorage(initialState()),
  mutations: {
    setInfectionLevel(state, { id, amount }) {
      state.infectionLevels[id] = amount;
    },
  },
  actions: {
    updateCityInfection({ commit, state, dispatch }, { id, amount }) {   
      console.log(id);
      
      if (amount === 4) {
        console.log('OUTBREAK!!!')
        const firstConnections = state.graph.find(city => city.id == id).connections[0];
        Object.keys(firstConnections).forEach(key => {
          const newAmount = state.infectionLevels[key] + 1;
          if (false) {
            // TODO: Keep track of outbreak origin cities so that I don't create an
            // infinite self-referential loop of outbreaking!!
            dispatch('updateCityInfection', { id: key, amount: newAmount });
          }
        });
      }   
      if (amount < 4 && amount > -1) {
        commit('setInfectionLevel', { id, amount });
        commit('saveToStorage', { STORAGE_KEY, keys: ['infectionLevels'] });
      }
    },
  },
  getters: {
    simpleCities: state => state.graph.map(c => ({
      name: c.name,
      id: c.id,
    })),
  }
}