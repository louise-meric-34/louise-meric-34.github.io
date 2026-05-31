/**
 * Drives the thesis progress bar and the "today" date label.
 * Updates once per second in sync with the Countdown.
 */
class ProgressBar {
  /**
   * @param {Date}   start    - Thesis start date.
   * @param {Date}   end      - Thesis end date.
   * @param {object} elements - { fill, pct, today } DOM nodes.
   */
  constructor(start, end, elements) {
    this._start    = start;
    this._total    = end - start;
    this._els      = elements;
    this._interval = null;
  }

  start() {
    this._tick();
    this._interval = setInterval(() => this._tick(), 1000);
  }

  stop() {
    if (this._interval !== null) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  // ── Private ───────────────────────────────────────────────

  _tick() {
    const now     = Date.now();
    const elapsed = now - this._start;
    const pct     = Math.max(0, Math.min(100, (elapsed / this._total) * 100));

    this._els.fill.style.width    = `${pct}%`;
    this._els.pct.textContent     = pct < 0.1 ? '0%' : `${pct.toFixed(1)}%`;
    this._els.today.textContent   = ProgressBar._formatDate(new Date(now));
  }

  static _formatDate(date) {
    return date.toLocaleDateString(CONFIG.locale, {
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  }
}
