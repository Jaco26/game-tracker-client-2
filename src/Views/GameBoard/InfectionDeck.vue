<template>
  <div>
    <b-form-row>
      <b-col>
        Infection Deck
        <b-form-select 
          ref="infectionDeck"
          :options="infectionDeckOptions"
          v-model="selected"
          @change="selectCard"
        ></b-form-select>
        <ul style="list-style: none;">
          <li v-for="item in discardPile" :key="item">{{item}}</li>
        </ul>
      </b-col>
      <b-col>
        Intensification Stack
        <b-button @click="intensify">Intensify</b-button>
        <div
          v-for="(arr, i) in intensifyStack"
          :key="i"
          class="mb-2"
        >
          <ul style="list-style: none;">
            <li 
              v-for="item in arr"
              :key="item"
            >{{item}}</li>
          </ul>
        </div>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  mounted() {
    if (!this.allCardIds.length) {
      this.setAllCardIds(Object.keys(this.citiesById));
    }
  },
  data() {
    return {
      alwaysSelectedOption: {
        value: 'always', 
        text: 'Draw a card',
        disabled: true,
      },
      selected: 'always',
    }
  },
  computed: {
    ...mapState('game/infection-deck', [
      'allCardIds',
      'discardIds',
      'intensifyStackIds',
    ]),
    ...mapGetters('game/infection-deck', [
      'possibleNextCardIds'
    ]), 
    ...mapGetters('game/cities', [
      'citiesById',
    ]),
    intensifyStack() {
      return this.intensifyStackIds.map(arr => (
        arr.map(id => this.citiesById[id].name)
      ));
    },
    infectionDeckOptions() {
      return [this.alwaysSelectedOption, ...this.possibleNextCardIds.map(id => ({
          value: id,
          text: this.citiesById[id].name,
        }))
      ];
    },
    discardPile() {
      if (this.discardIds.length) {
        return this.discardIds.map(id => this.citiesById[id].name);
      }
    }
  },
  methods: {
    ...mapActions('game/infection-deck', [
      'setAllCardIds',
      'drawCard',
      'intensify'
    ]),
    selectCard(id) {
      // This is dumb but I have to check if the id has a value
      // because when I set this.selected back to its default 'always',
      // the b-form-select emits another "change" event which in turn 
      // invokes this method and passes in a null value for as the "id"
      // argument and everything gets fucked up if I try to commit it.
      if (id) this.drawCard(id); 
      this.$nextTick(() => {
        this.selected = 'always'
      });
    },
  },

}
</script>
