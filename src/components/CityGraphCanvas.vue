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
    />
  </div>
</template>

<script>
import CityGraphNode from './CityGraphNode';
import { mapState, mapActions, mapGetters } from 'vuex';
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
        const radius = 15;
        accum.push({ x, y, radius, color, id, connections, name });
        return accum;
      }, []);
    },
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
    checkForPacificCrossing(node0, node1) {
      const t = { [node0.name]: true, [node1.name]: true };
      return (t['Los Angeles'] && t['Sydney']) ||
        (t['San Francisco'] && t['Manila']) ||
        (t['San Francisco'] && t['Tokyo']);
    },
    assembleEdges() {
      const drawnConnections = [];
      const connectionLines = [];
      let x0, x1, y0, y1, name0, name1, end;
      this.canvasGraphNodes.forEach(node => {
        x0 = Math.round(node.x);
        y0 = Math.round(node.y);
        name0 = node.name;
        Object.keys(node.connections[0]).forEach(edge => {
          end = this.canvasGraphNodes.find(n => n.id == edge);
          if (this.checkForPacificCrossing(node, end)) {
            console.log(node.name, end.name);
            
          } else {
            x1 = Math.round(end.x);
            y1 = Math.round(end.y);
            name1 = end.name;
          }
          if (!drawnConnections.find(c => c.n1 === node.id && c.n2 === edge)) {
            // TODO: handle connections spanning the pacific.
            connectionLines.push({ x0, y0, x1, y1, name0, name1 });
            drawnConnections.push({ n1: node.id, n2: edge });
          }
        });
      });
      return connectionLines;
    },
    drawEdges() {
      const edges = this.assembleEdges();
      const ctx = this.provider.ctx;
      edges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(edge.x0, edge.y0);
        ctx.lineTo(edge.x1, edge.y1);
        ctx.stroke();
        ctx.closePath();
      });
    }
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

    this.drawEdges();
  }
}
</script>


