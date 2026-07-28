import { describe, it, expect } from 'vitest';
import { calculateRSSLongitudinal } from './rssMath';

describe('RSS Longitudinal Distance Calculation Unit Tests', () => {
  it('should correctly calculate safe distance when vehicles are at equal speed (100 km/h)', () => {
    const res = calculateRSSLongitudinal({
      vEgoKmh: 100,
      vLeadKmh: 100,
      reactionTimeSec: 1.0,
      egoMaxAccel: 0,
      egoMinBrake: 4.0,
      leadMaxBrake: 4.0,
      currentDistanceM: 40
    });

    // At 100 km/h (27.78 m/s), 1 sec reaction distance = 27.78m. Since braking is equal, minSafeDistance = 27.78m.
    expect(res.minSafeDistanceM).toBeGreaterThan(27);
    expect(res.minSafeDistanceM).toBeLessThan(29);
    expect(res.state).toBe('SAFE');
  });

  it('should detect UNSAFE state when following distance is dangerously low', () => {
    const res = calculateRSSLongitudinal({
      vEgoKmh: 120,
      vLeadKmh: 60,
      reactionTimeSec: 1.5,
      egoMaxAccel: 1.5,
      egoMinBrake: 3.5,
      leadMaxBrake: 6.0,
      currentDistanceM: 20
    });

    expect(res.state).toBe('UNSAFE');
    expect(res.marginM).toBeLessThan(0);
  });

  it('should return SAFE when current distance is far above minimum safe margin', () => {
    const res = calculateRSSLongitudinal({
      vEgoKmh: 50,
      vLeadKmh: 50,
      reactionTimeSec: 0.75,
      egoMaxAccel: 1.0,
      egoMinBrake: 4.5,
      leadMaxBrake: 4.5,
      currentDistanceM: 100
    });

    expect(res.state).toBe('SAFE');
    expect(res.marginM).toBeGreaterThan(80);
  });
});
