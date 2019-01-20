<template>
  <div>
    Infection Deck
    <b-form-select :options="simpleCities"></b-form-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('game/cities', [
      'simpleCities',
    ]),
  },
  data() {
    return {
      cardsNotDrawn: [],
    }
  },
  mounted() {
    this.cardsNotDrawn = this.simpleCities.map(c => c.id);
  }

}
</script>
