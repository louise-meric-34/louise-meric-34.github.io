/**
 * Renders an animated topological graph (nodes + edges) on a
 * full-screen canvas — purely decorative background.
 */
class TopoCanvas {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx    = canvas.getContext('2d');
    this._nodes  = [];
    this._raf    = null;

    this._cfg = CONFIG.canvas;
    this._buildNodes();
    this._bindResize();
    this._resize();
  }

  start() {
    this._raf = requestAnimationFrame(() => this._loop());
  }

  stop() {
    if (this._raf !== null) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }

  // ── Private ───────────────────────────────────────────────

  _buildNodes() {
    const { nodeCount, nodeSpeed, nodeMinRadius, nodeMaxRadius } = this._cfg;
    this._nodes = Array.from({ length: nodeCount }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      r:  nodeMinRadius + Math.random() * (nodeMaxRadius - nodeMinRadius),
      vx: (Math.random() - 0.5) * nodeSpeed,
      vy: (Math.random() - 0.5) * nodeSpeed,
    }));
  }

  _bindResize() {
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    this._canvas.width  = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  _loop() {
    this._update();
    this._draw();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _update() {
    for (const node of this._nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > 1) node.vx *= -1;
      if (node.y < 0 || node.y > 1) node.vy *= -1;
    }
  }

  _draw() {
    const { width: W, height: H } = this._canvas;
    const { edgeThreshold, edgeColor, nodeColor } = this._cfg;
    const ctx = this._ctx;

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth   = 0.6;

    // Edges
    for (let i = 0; i < this._nodes.length; i++) {
      for (let j = i + 1; j < this._nodes.length; j++) {
        const a = this._nodes[i];
        const b = this._nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist >= edgeThreshold) continue;

        ctx.globalAlpha = (1 - dist / edgeThreshold) * 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x * W, a.y * H);
        ctx.lineTo(b.x * W, b.y * H);
        ctx.stroke();
      }
    }

    // Nodes
    ctx.globalAlpha = 0.8;
    ctx.fillStyle   = nodeColor;
    for (const node of this._nodes) {
      ctx.beginPath();
      ctx.arc(node.x * W, node.y * H, node.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
