<template>
  <b-navbar type="dark" variant="dark">
    <div class="d-flex align-items-center">
      <b-nav-text class="mr-4">
        <h1>Menu Bar</h1>
      </b-nav-text>

      <b-nav class="ml-4">
        <b-nav-item :to="{name: 'gameboard'}">
          <h5>gameboard</h5>
        </b-nav-item>
        <b-nav-item :to="{name: 'players'}">
          <h5>players</h5>
        </b-nav-item>
      </b-nav>
    </div>

    <b-btn size="lg" @click="$store.dispatch('game/cities/clearInfections')">
      Clear Infections
    </b-btn>
    
  </b-navbar>
</template>

<script>
import { bindState } from '@/store/index';
export default {
  computed: { 
    // ...bindState('')
  },

}
</script>

<style scoped>

</style>
