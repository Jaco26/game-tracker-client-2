<template>
  <div>
    <b-input-group class="col-6" >
      <b-form-input
        placeholder="Add a new player" 
        v-model.trim="newName"
        @keyup.enter.native="addPlayer({ name: newName })"
      />
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
            class="col-6"
            @keyup.enter.native="updatePlayer"
          />
          <div v-else>{{player.name}}</div>
          <div v-if="allowEdit">
            <div v-if="editId === player.id">
              <b-btn size="sm" variant="primary" @click="updatePlayer">Save</b-btn>
              <b-btn size="sm" variant="warning" @click="cancelEdit" >Cancel</b-btn>
            </div>
            <div v-else>
              <b-btn size="sm" variant="outline-info" @click="startEdit(player)">Edit</b-btn>
              <b-btn size="sm" variant="outline-danger" @click="confirmDelete(player)">Delete</b-btn>
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
  props: {
    allowEdit: {
      type: Boolean,
      default: false,
    },
  },
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
    },
    confirmDelete(player) {
      if (confirm('Are you sure you want to delete ' + player.name + '?')) {
        this.removePlayer(player.id);
      }
    }
  }
}
</script>
