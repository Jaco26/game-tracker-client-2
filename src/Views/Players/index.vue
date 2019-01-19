<template>
  <div>
    <h1>Players!</h1>
    <PlayersList allowEdit />
  </div>
  
</template>

<script>
import PlayersList from './PlayersList';
export default {
  components: {
    PlayersList
  }
}
</script>

