/**
 * Manages the live countdown ticker.
 * Writes into four DOM elements: days / hours / minutes / seconds.
 */
class Countdown {
  /**
   * @param {Date}   target   - The deadline to count down to.
   * @param {object} elements - { days, hours, minutes, seconds } DOM nodes.
   */
  constructor(target, elements) {
    this._target   = target;
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
    const remaining = Math.max(0, this._target - Date.now());
    const { d, h, m, s } = Countdown._decompose(remaining);

    this._els.days.textContent    = String(d);
    this._els.hours.textContent   = Countdown._pad(h);
    this._els.minutes.textContent = Countdown._pad(m);
    this._els.seconds.textContent = Countdown._pad(s);
  }

  static _decompose(ms) {
    const totalSecs = Math.floor(ms / 1000);
    return {
      d: Math.floor(totalSecs / 86400),
      h: Math.floor((totalSecs % 86400) / 3600),
      m: Math.floor((totalSecs % 3600) / 60),
      s: totalSecs % 60,
    };
  }

  static _pad(n) {
    return String(n).padStart(2, '0');
  }
}
