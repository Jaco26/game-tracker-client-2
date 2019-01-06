<template>
  <div>
    <b-form-input></b-form-input>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      newPlayerName: '',
      formOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'newPlayer', text: 'Create new player' },
        { value: 'updatePlayer', text: 'Edit player info' },
        { value: 'deletePlayer', text: 'Remove player' },
      ]
    }
  },
  methods: {
    
  }
}
</script>

