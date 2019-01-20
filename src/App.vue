<template>
  <b-container fluid id="app">
    <b-row>
      <b-col>
        <MenuBar />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <transition name="route" mode="out-in">
          <router-view></router-view>
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MenuBar from './components/MenuBar';
export default {
  name: 'app',
  components: {
    MenuBar,
  },
}
</script>

<style>

html, body {
  overflow: hidden;
  height: 100%;
}

b-col {
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  height: 100%;
}

.route-enter, .route-leave-to {
  opacity: 0;
}

.route-enter-active, .route-leave-active {
  transition: opacity .05s;
}


</style>
