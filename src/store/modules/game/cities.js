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
  };
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
    updateCityInfection({ commit, state }, { id, amount }) {
      if (amount === 4) {
        const newInfectionLevels = handleOutbreak(id, state.infectionLevels, state.graph);
        commit('setState', { 
          key: 'infectionLevels', 
          data: newInfectionLevels 
        });
        commit('saveToStorage', { STORAGE_KEY, keys: ['infectionLevels'] });
      } else if (amount < 4 && amount > -1) {
        commit('setInfectionLevel', { id, amount });
        commit('saveToStorage', { STORAGE_KEY, keys: ['infectionLevels'] });
      }
    },
    clearInfections({ commit }) {
      commit('setState', {
        key: 'infectionLevels',
        data: initEmptyInfectionLevels(),
      });
      commit('saveToStorage', { STORAGE_KEY, keys: ['infectionLevels'] });
    }
  },
  getters: {
    simpleCities: state => state.graph.map(city => ({
      name: city.name,
      id: city.id,
      color: city.color,
    })),
    citiesById: state => state.graph.reduce((a, city) => {
      a[city.id] = {
        name: city.name,
        color: city.color,
      }
      return a;
    }, {}),
  }
}


function handleOutbreak(outbreakCityId, infectionLevels, graph, initialAmount = 4) {
  infectionLevels = JSON.parse(JSON.stringify(infectionLevels));
  const outbreakCities = {}; // keep track of which cities have already caused an outbreak as outbreak radiates outward...no inifinete loop
  (function innerHelper(cityId, amount) {
    if (amount > 3) { // OUTBREAK!
      outbreakCities[cityId] = true; // this city has had an outbreak
      let newAmount;
      const firstConnections = graph.find(city => city.id == cityId).connections[0]; // use == for value, not type, equality in find (cityId is String sometimes)
      Object.keys(firstConnections).forEach(key => {
        if (!outbreakCities[key]) { // if given city connection has not been an earlier cause of outbreak...          
          newAmount = infectionLevels[key] + 1;
          return innerHelper(key, newAmount);
        }
      });
    } else { // Otherwise...
      return infectionLevels[cityId] = amount;
    }
  })(outbreakCityId, initialAmount); // handleOutbreak is only called when the "amount" is 4 so instead of passing 4 from the outside, 
                         // we just start the call with 4 as an initial arguement for "amount"
  return infectionLevels;
}