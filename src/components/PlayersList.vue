<template>
  <div>
    <b-form-group>
      <b-form-input placeholder="Add a new player" v-model.trim="newPlayerName"></b-form-input>
      <b-button @click="addPlayer({ name: newPlayerName })">Add Player</b-button>
    </b-form-group>
    
    <b-list-group>
      <b-list-group-item 
        v-for="player in list" 
        :key="player.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <b-form-input v-if="editId === player.id" v-model="newPlayerName"></b-form-input>
          <p v-else>{{player.name}}</p>
          <div>
            <div v-if="editId === player.id">
              <b-button @click="updatePlayer"></b-button>
              <b-button @click="cancelEdit" variant="sm">Cancel</b-button>
            </div>
            
            <b-button v-else @click="editId = player.id">Edit</b-button>
            <b-button variant="sm">Delete</b-button>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
  
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { bindState } from '@/store/index'; // try to only use for form data
export default {
  computed: {
    ...mapState('game/players', [
      'list',
    ]),
    ...bindState('forms/players', [
      'newPlayerName',
      'editId',
    ]),
  },
  methods: {
    ...mapMutations('game/players', [
      'addPlayer',
      'updatePlayer',
      'removePlayer',
    ]),
    ...mapActions('game/players', [
      'addPlayer'
    ]),
    cancelEdit() {
      this.newPlayerName = '';
      this.editId = '';
    }
  }
}
</script>
