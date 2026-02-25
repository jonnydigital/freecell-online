/**
 * Sound effects manager using Web Audio API
 *
 * All sounds are generated programmatically — no audio files needed.
 * Respects mute setting persisted in localStorage.
 */

import { loadSettings, saveSettings } from './storage';

class SoundManager {
  private ctx: AudioContext | null = null;
  private _muted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;
  private lastMoveTime: number = 0;
  private comboCount: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this._muted = !loadSettings().soundEnabled;
    }
  }

  get muted(): boolean {
    return this._muted;
  }

  toggleMute(): boolean {
    this._muted = !this._muted;
    const settings = loadSettings();
    settings.soundEnabled = !this._muted;
    saveSettings(settings);
    return this._muted;
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer || this.noiseBuffer.sampleRate !== ctx.sampleRate) {
      const length = Math.ceil(ctx.sampleRate * 0.2);
      this.noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return this.noiseBuffer;
  }

  /** Subtle lift — card picked up */
  cardSelect(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Quick upward sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.04);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);

    // Tiny noise tick for texture
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);
    const nGain = ctx.createGain();
    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 4000;
    nGain.gain.setValueAtTime(0.08, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    noise.connect(hpf).connect(nGain).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.02);
  }

  /** Satisfying thwack with reverb — card placed on cascade or free cell */
  cardPlace(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Noise burst — the "thwack" impact
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);
    const nGain = ctx.createGain();
    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 800;
    bpf.Q.value = 1.5;
    nGain.gain.setValueAtTime(0.35, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    noise.connect(bpf).connect(nGain).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.06);

    // Low thud tone
    const osc = ctx.createOscillator();
    const oGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
    oGain.gain.setValueAtTime(0.3, t);
    oGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(oGain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);

    // Reverb tail — delayed filtered noise
    const revNoise = ctx.createBufferSource();
    revNoise.buffer = this.getNoiseBuffer(ctx);
    const rGain = ctx.createGain();
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 600;
    rGain.gain.setValueAtTime(0, t);
    rGain.gain.linearRampToValueAtTime(0.08, t + 0.03);
    rGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    revNoise.connect(lpf).connect(rGain).connect(ctx.destination);
    revNoise.start(t);
    revNoise.stop(t + 0.15);
  }

  /** Ascending rewarding chime — card moved to foundation */
  cardToFoundation(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Three-note ascending sparkle (A major triad: A5, C#6, E6)
    const notes = [880, 1108.7, 1318.5];
    notes.forEach((freq, i) => {
      const start = t + i * 0.06;

      // Main tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);

      // Harmonic overtone for bell-like shimmer
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 2.5;
      gain2.gain.setValueAtTime(0, start);
      gain2.gain.linearRampToValueAtTime(0.06, start + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(start);
      osc2.stop(start + 0.12);
    });
  }

  /** Rising pitch for consecutive fast moves (3+) */
  combo(count: number): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    const step = Math.min(count, 8);
    const baseFreq = 500 + step * 80;

    // Rising triangle tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, t + 0.08);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);

    // Sparkle overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = baseFreq * 2;
    gain2.gain.setValueAtTime(0.08, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.08);
  }

  /** Track moves and auto-trigger combo sounds for 3+ fast consecutive moves */
  trackMove(): void {
    const now = Date.now();
    if (now - this.lastMoveTime < 800) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastMoveTime = now;

    if (this.comboCount >= 3) {
      this.combo(this.comboCount);
    }
  }

  /** Rapid shuffling — initial deal */
  deal(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    for (let i = 0; i < 8; i++) {
      const start = t + i * 0.05;
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);
      const gain = ctx.createGain();
      const hpf = ctx.createBiquadFilter();
      hpf.type = 'highpass';
      hpf.frequency.value = 2000 + Math.random() * 2000;
      const vol = 0.12 + Math.random() * 0.06;
      gain.gain.setValueAtTime(vol, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.03);
      noise.connect(hpf).connect(gain).connect(ctx.destination);
      noise.start(start);
      noise.stop(start + 0.03);
    }
  }

  /** Soft bonk — invalid move */
  invalidMove(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Pitch-dropping bonk
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);

    // Second softer bonk for "boing" character
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(250, t + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(100, t + 0.15);
    gain2.gain.setValueAtTime(0.1, t + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(t + 0.06);
    osc2.stop(t + 0.18);
  }

  /** Descending tone — undo */
  undo(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(250, t + 0.1);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  /** Triumphant fanfare — chord progression win celebration */
  winFanfare(): void {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Chord progression: C major → F major → G major → C major (octave up)
    const chords = [
      [261.6, 329.6, 392.0], // C4 E4 G4
      [349.2, 440.0, 523.3], // F4 A4 C5
      [392.0, 493.9, 587.3], // G4 B4 D5
      [523.3, 659.3, 784.0], // C5 E5 G5
    ];

    chords.forEach((chord, ci) => {
      const chordStart = t + ci * 0.3;

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = ci < 3 ? 'triangle' : 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, chordStart);
        gain.gain.linearRampToValueAtTime(0.18, chordStart + 0.02);
        gain.gain.setValueAtTime(0.18, chordStart + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, chordStart + 0.35);
        osc.connect(gain).connect(ctx.destination);
        osc.start(chordStart);
        osc.stop(chordStart + 0.35);
      });
    });

    // Final shimmer on last chord
    const shimmerStart = t + 3 * 0.3;
    const shimmer = ctx.createOscillator();
    const sGain = ctx.createGain();
    shimmer.type = 'sine';
    shimmer.frequency.value = 1568;
    sGain.gain.setValueAtTime(0, shimmerStart);
    sGain.gain.linearRampToValueAtTime(0.1, shimmerStart + 0.05);
    sGain.gain.exponentialRampToValueAtTime(0.001, shimmerStart + 0.5);
    shimmer.connect(sGain).connect(ctx.destination);
    shimmer.start(shimmerStart);
    shimmer.stop(shimmerStart + 0.5);
  }
}

export const soundManager = new SoundManager();
