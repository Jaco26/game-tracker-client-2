<script>
export default {
  // get access to the provider data property from the parent CityCanvasGraph component
  inject: ['provider'],  
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    infectionLevel: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    connectedCityIds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    drawNode() {
      const ctx = this.provider.ctx;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = 'black'
      ctx.stroke();
      ctx.closePath();
    },
    drawInfectionLevel() {
      const ctx = this.provider.ctx;
      ctx.beginPath();
      ctx.font = '25px Arial';
      ctx.fillStyle = this.color === 'yellow' ? 'black' : 'white';
      ctx.fillText(this.infectionLevel, this.x - 7, this.y + 8);
      ctx.closePath();
    }
  },
  render() {
    if (!this.provider.ctx) return;
    this.drawNode();
    this.drawInfectionLevel();
  
  }
}
</script>
