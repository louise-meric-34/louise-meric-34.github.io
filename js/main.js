/**
 * Entry point — wires up all components once the DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
  const { start, end } = CONFIG.thesis;

  // ── Topological background canvas ─────────────────────────
  new TopoCanvas(document.getElementById('topo-canvas')).start();

  // ── Countdown ─────────────────────────────────────────────
  new Countdown(end, {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  }).start();

  // ── Progress bar ──────────────────────────────────────────
  new ProgressBar(start, end, {
    fill:  document.getElementById('progress-fill'),
    pct:   document.getElementById('progress-pct'),
    today: document.getElementById('today-date'),
  }).start();
});
