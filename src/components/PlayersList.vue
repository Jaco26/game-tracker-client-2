<template>
  <div>
    <b-input-group class="col-6" >
      <b-form-input placeholder="Add a new player" v-model.trim="newName"></b-form-input>
      <b-input-group-append>
        <b-btn cols="4" @click="addPlayer({ name: newName })">Add Player</b-btn>
      </b-input-group-append>
    </b-input-group>

    <b-list-group class="col-6">
      <b-list-group-item 
        v-for="player in list" 
        :key="player.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <b-form-input 
            v-if="editId === player.id" 
            v-model="editName"
            class="col-8"
          />
          <p v-else>{{player.name}}</p>
          <div>
            <div v-if="editId === player.id">
              <b-btn @click="updatePlayer">Save</b-btn>
              <b-button @click="cancelEdit" variant="sm">Cancel</b-button>
            </div>
            <div v-else>
              <b-button @click="startEdit(player)">Edit</b-button>
              <b-button variant="sm" @click="removePlayer(player.id)">Delete</b-button>
            </div>
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
      'newName',
      'editId',
      'editName',
    ]),
  },
  methods: {
    ...mapActions('game/players', [
      'addPlayer',
      'updatePlayer',
      'removePlayer',
    ]),
    startEdit(player) {
      this.editName = player.name;
      this.editId = player.id;
    },
    cancelEdit() {
      this.editName = '';
      this.editId = '';
    }
  }
}
</script>
