<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <MenuBar />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <PlayersList allowEdit />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CityGraph />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MenuBar from './components/MenuBar';
import PlayersList from './components/PlayersList';
import CityGraph from './components/CityGraph';
export default {
  name: 'app',
  components: {
    MenuBar,
    PlayersList,
    CityGraph,
  },
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
