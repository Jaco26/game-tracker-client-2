<template>
  <div>
    <h1>Menu Bar</h1>
    <button @click="$store.dispatch('game/cities/clearInfections')">Clear Infections</button>
  </div>
</template>

<script>
import { bindState } from '@/store/index';
export default {
  computed: { 
    // ...bindState('')
  },

}
</script>
