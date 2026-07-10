/**
 * Central configuration — all magic values live here.
 */
const CONFIG = Object.freeze({
  thesis: {
    name:  'Louise Méric',
    field: 'Analyse Topologique des Données',
    start: new Date('2026-06-01T00:00:00'),
    end:   new Date('2029-06-01T00:00:00'),
  },

  canvas: {
    nodeCount:       40,
    edgeThreshold:   0.22,
    nodeSpeed:       0.00015,
    nodeMinRadius:   1.5,
    nodeMaxRadius:   3.5,
    nodeColor:       '#c084fc',
    edgeColor:       '#7c5cfc',
    opacity:         0.18,
  },

  locale: 'fr-FR',
});
