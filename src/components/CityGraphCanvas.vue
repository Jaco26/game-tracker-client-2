<template>
  <div>
    <canvas 
      ref="city-graph-canvas"
      @click="checkForCityHit"
    ></canvas>
    <CityGraphNode 
      v-for="node in canvasGraphNodes"
      :key="node.id"
      :x="node.x"
      :y="node.y"
      :radius="node.radius"
      :color="node.color"
      :infectionLevel="infectionLevels[node.id]"
      :id="node.id"
      :name="node.name"
      :connectedCityIds="Object.keys(node.connections[0])"
    />
  </div>
</template>

<script>
import CityGraphNode from './CityGraphNode';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    CityGraphNode,
  },
  computed: {
    ...mapState('game/cities', [
      'graph',
      'infectionLevels'
    ]),
    canvasGraphNodes() {
      const { width, height } = this;
      return this.graph.reduce((accum, city) => {
        const { xRatKey, yRatKey, xRat, yRat, color, connections, id, name } = city;
        const x = (xRat / xRatKey) * this.width;
        const y = (yRat / yRatKey) * this.height;
        const radius = 20;
        accum.push({ x, y, radius, color, connections, id, name });
        return accum;
      }, []);
    }
  },
  methods: {
    ...mapActions('game/cities', [
      'updateCityInfection',
    ]),
    checkForCityHit(e) {      
      let diffX, diffY, distance;
      this.canvasGraphNodes.forEach(node => {
        diffX = e.offsetX - node.x;
        diffY = e.offsetY - node.y;
        distance = Math.sqrt(diffX**2 + diffY**2);
        if (distance < node.radius) {
          const step = e.shiftKey ? -1 : 1;
          this.updateCityInfection({
            id: node.id,
            amount: this.infectionLevels[node.id] + step,
          });
        }
      });
    },
  },
  data() {
    return {
      // by creating the provider in the data property, it becomes
      // reactive so child components will update when `ctx` changes.
      provider: {
        ctx: null,
      },
      width: 1200,
      height: 800,
    };
  },
  provide() {
    // allows any child component to `inject: ['provider']` and have access to it
    return {
      provider: this.provider,
    };
  },
  mounted() {
    // we can't access the rendering context until the canvas is mounted to the DOM.
    // once we have it, provide it to all child components.
    this.provider.ctx = this.$refs['city-graph-canvas'].getContext('2d');
    this.provider.ctx.canvas.style.backgroundColor = 'lightblue'

    this.$refs['city-graph-canvas'].width = this.width;
    this.$refs['city-graph-canvas'].height = this.height;
  }
}
</script>


