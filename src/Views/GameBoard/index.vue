<template>
  <b-row class="h-100 pl-1">
    <b-col cols="sm-3">
      <h1>Game Controls</h1>
      <b-form-row class="pa-1">
        <b-col>
          <InfectionDeck />
        </b-col>
      </b-form-row>
    </b-col>
    <b-col cols="sm-9" >
      <CityGraphCanvas  />
    </b-col>
  </b-row> 
</template>

<script>
import CityGraphCanvas from './CityGraphCanvas'
import InfectionDeck from './InfectionDeck/index'
export default {
  components: {
    CityGraphCanvas,
    InfectionDeck,
  },
}
</script>
