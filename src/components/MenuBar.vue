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

    <b-dropdown size="lg" boundary="viewport" class="m-2" text="Actions">
      <b-dropdown-item
        v-for="item in actionsDropdownItems" 
        :key="item.text"
        @click="item.action"
        
      >
        {{item.text}}
      </b-dropdown-item>
    </b-dropdown>
    
  </b-navbar>
</template>

<script>
import { bindState } from '@/store/index';
export default {
  data() {
    return {
      actionsDropdownItems: [
        {
          text: 'Redeal Infection Deck',
          action: () => this.$store.dispatch('game/infection-deck/refreshDeck'),
        },
        {
          text: 'Clear Infections',
          action: () => this.$store.dispatch('game/cities/clearInfections'),
        },
      ],
    }
  },
  computed: {

  }

}
</script>

<style scoped>

</style>
