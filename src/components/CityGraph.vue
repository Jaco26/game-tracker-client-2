<template>
  <div>
    <ul>
      <li v-for="c in simpleCities" :key="c.id">
        {{c.name}}: {{infectionLevels[c.id]}}
        <button @click="newInfectionLevel(c, 1)">+</button>
        <button @click="newInfectionLevel(c, -1)">-</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState('game/cities', [
      'infectionLevels',
    ]),
    ...mapGetters('game/cities', [
      'simpleCities',
    ]),
  },
  methods: {
    ...mapActions('game/cities', [
      'updateCityInfection',
    ]),
    newInfectionLevel(city, step) {
      this.updateCityInfection({
        id: city.id,
        amount: this.infectionLevels[city.id] + step,
      });
    }
  }
}
</script>

