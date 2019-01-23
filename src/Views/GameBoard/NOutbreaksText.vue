<script>
export default {
  inject: ['provider'],
  props: {
    nOutbreaks: {
      type: Number,
      default: 0,
    },
  },

  render() {
    if (!this.provider.ctx) return;
    const { ctx } = this.provider;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Outbreaks: ' + this.nOutbreaks, 30, 50);
    ctx.closePath();
  }
}
</script>
