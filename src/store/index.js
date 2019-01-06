import Vue from 'vue';
import Vuex from 'vuex';

// modules
import game from './modules/game/index';
import forms from './modules/forms';

Vue.use(Vuex);

export const store = new Vuex.Store(wrap({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    game,
    forms,
  },
}));


function wrap(mod) {
  const wrapped = mergeToPreserve({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
  }, mod);

  wrapped.modules = wrapModules(wrapped.modules);

  return wrapped;
}

function wrapModules(mods) {
  return Object.keys(mods).reduce((wrappedMods, name) => {    
    wrappedMods[name] = wrap(mods[name]);
    return wrappedMods;
  }, {});
}

function reduceNamespace(namespace, key) {
  let stateRef = store.state;
  return [...namespace.split('/'), key].reduce((a, b) => {
    stateRef = stateRef[b];
    return stateRef;
  }, stateRef);
}

export function bindState(namespace, items) {  
  return items.reduce((accum, b) => {
    accum[b] = {
      get: () => reduceNamespace(namespace, b),
      set: val => store.commit(namespace + '/setState', { key: b, data: val }),
    };
    return accum;
  }, {});
}

function setState(state, { key, data }) {  
  let stateRef = state;
  key.split('.').reduce((a, b, i, arr) => {
    if (i === arr.length - 1) {
      stateRef[b] = data;
    } else {
      stateRef = stateRef[b];
    }
    return stateRef;
  }, stateRef);
}

function clearFields(state, keys = []) {
  keys.forEach(key => {
    state[key] = '';
  });
}

function saveToStorage(state, { STORAGE_KEY, keys }) {
  const toSave = Object.keys(state).reduce((a, b) => {
    if (keys.includes(b)) {
      a[b] = state[b];
    } 
    return a;
  }, {});
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

// a wrapper around Object.assign used to ensure that all 
// modules' mutation objects has a setState mutation
function mergeToPreserve(target, source) {
  source.mutations = { ...source.mutations, setState, clearFields, saveToStorage };
  return Object.assign(target, source);
}