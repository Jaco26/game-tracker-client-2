const STORAGE_KEY = 'turns';

function initialState() {
  return {
    whoseTurn: '',
    history: [],
  }
}

function loadFromStorage(state) {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storage) {
    Object.keys(storage).forEach(key => {
      state[key] = storage[key];
    });
  }
  return state;
}

export default {
  state: loadFromStorage(initialState()),
  
}