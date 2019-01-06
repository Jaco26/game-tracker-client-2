<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <MenuBar />
        <b-btn @click="$store.commit('game/players/saveToStorage', { STORAGE_KEY: 'players', keys: ['list'] })">save players</b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <PlayersList />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MenuBar from './components/MenuBar';
import PlayersList from './components/PlayersList'
export default {
  name: 'app',
  components: {
    MenuBar,
    PlayersList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
