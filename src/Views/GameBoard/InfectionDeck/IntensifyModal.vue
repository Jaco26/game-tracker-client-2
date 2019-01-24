<template>
  <b-modal v-model="showIntensifyModal" @change="jandle">
    <h1>Intensify!</h1>

  </b-modal>
</template>

<script>
import { bindState } from '@/store/index'
export default {
  computed: {
    ...bindState('game/infection-deck', [
      'showIntensifyModal'
    ])
  },
  methods: {
    jandle(e) {
      if (!e) {
        console.log('now intensify');
        
      }
      
    }
  }
}
</script>
