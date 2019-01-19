<template>
  <b-container fluid id="app">
    <b-row>
      <b-col>
        <MenuBar />
      </b-col>
    </b-row>
    <router-view></router-view>

  </b-container>
</template>

<script>
import MenuBar from './components/MenuBar';
// import PlayersList from './components/PlayersList';
export default {
  name: 'app',
  components: {
    MenuBar,
    // PlayersList,
  },
}
</script>

<style>

html, body {
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
}
</style>
