export interface RSSInputParams {
  vEgoKmh: number;        // Ego vehicle speed in km/h
  vLeadKmh: number;       // Lead vehicle speed in km/h
  reactionTimeSec: number;// Reaction time t_rho in seconds
  egoMaxAccel: number;    // Ego max acceleration during response (m/s^2)
  egoMinBrake: number;    // Ego min braking capability a_min (m/s^2)
  leadMaxBrake: number;   // Lead max braking capability b_max (m/s^2)
  currentDistanceM: number; // Current measured following distance in meters
}

export interface RSSCalculationResult {
  vEgoMs: number;
  vLeadMs: number;
  minSafeDistanceM: number;
  currentDistanceM: number;
  marginM: number;
  state: 'SAFE' | 'CAUTION' | 'UNSAFE';
  stateColor: string;
  explanation: string;
}

/**
 * Calculates Responsibility Sensitive Safety (RSS) Longitudinal Distance
 * Based on the public Mobileye RSS safety model specifications.
 */
export function calculateRSSLongitudinal(params: RSSInputParams): RSSCalculationResult {
  // Convert km/h to m/s (1 km/h = 1/3.6 m/s)
  const vEgoMs = Math.max(0, params.vEgoKmh / 3.6);
  const vLeadMs = Math.max(0, params.vLeadKmh / 3.6);

  const t = Math.max(0.1, params.reactionTimeSec);
  const aAccel = Math.max(0, params.egoMaxAccel);
  const aBrake = Math.max(0.5, params.egoMinBrake);
  const bBrake = Math.max(0.5, params.leadMaxBrake);

  // RSS Longitudinal Safe Distance Formula:
  // d_min = v_ego * t + 0.5 * a_accel * t^2 + (v_ego + t * a_accel)^2 / (2 * a_brake) - (v_lead^2 / (2 * b_brake))
  const distanceDuringReaction = vEgoMs * t + 0.5 * aAccel * (t * t);
  const vEgoPeak = vEgoMs + t * aAccel;
  const egoBrakingDistance = (vEgoPeak * vEgoPeak) / (2 * aBrake);
  const leadBrakingDistance = (vLeadMs * vLeadMs) / (2 * bBrake);

  const rawMinSafeDistance = distanceDuringReaction + egoBrakingDistance - leadBrakingDistance;
  const minSafeDistanceM = +(Math.max(0, rawMinSafeDistance)).toFixed(2);
  const marginM = +(params.currentDistanceM - minSafeDistanceM).toFixed(2);

  let state: 'SAFE' | 'CAUTION' | 'UNSAFE';
  let stateColor: string;
  let explanation: string;

  if (params.currentDistanceM >= minSafeDistanceM) {
    state = 'SAFE';
    stateColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    explanation = `Current following distance (${params.currentDistanceM}m) exceeds the minimum RSS safe distance boundary (${minSafeDistanceM}m). Vehicle is in a provably safe state.`;
  } else if (params.currentDistanceM >= minSafeDistanceM * 0.7) {
    state = 'CAUTION';
    stateColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    explanation = `Current distance (${params.currentDistanceM}m) is below the minimum safe RSS margin (${minSafeDistanceM}m). Driver or AV controller must apply moderate braking to restore safe headway.`;
  } else {
    state = 'UNSAFE';
    stateColor = 'text-red-400 border-red-500/40 bg-red-500/10';
    explanation = `Critical hazard state! Current distance (${params.currentDistanceM}m) violates safe RSS boundaries (${minSafeDistanceM}m). Emergency collision avoidance maneuver required.`;
  }

  return {
    vEgoMs: +vEgoMs.toFixed(2),
    vLeadMs: +vLeadMs.toFixed(2),
    minSafeDistanceM,
    currentDistanceM: params.currentDistanceM,
    marginM,
    state,
    stateColor,
    explanation
  };
}
