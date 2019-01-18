const players = {
  state: {
    newName: '',
    editId: '',
    editName: '',
  },
}

const menuBar = {
  state: {
    mainComponet: 'CityGraphCanvas',
    components: [
      'PlayersList',
      'CityGraphCanvas',
    ],
  },
};

export default {
  modules: {
    players,
    menuBar,
  },
};