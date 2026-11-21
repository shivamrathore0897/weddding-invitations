import React, { useEffect, useRef } from 'react';
import { weddingConfig } from '../../config/wedding';

interface BackgroundMusicProps {
  shouldPlay: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ shouldPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Web Audio ambient sitar/tanpura harmonic generator (self-contained fallback)
  const startWebAudioHarmonics = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.07, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Tanpura warm drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.035, ctx.currentTime);
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(masterGain);

      osc1.start();
      osc2.start();

      // Pentatonic Raag Bhupali harp notes played cyclically
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 587.33, 659.25];
      let noteIndex = 0;

      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = audioCtxRef.current.currentTime;
        const noteOsc = audioCtxRef.current.createOscillator();
        const noteGain = audioCtxRef.current.createGain();

        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(notes[noteIndex % notes.length], now);
        noteIndex++;

        noteGain.gain.setValueAtTime(0.055, now);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        noteOsc.connect(noteGain);
        noteGain.connect(masterGain);

        noteOsc.start(now);
        noteOsc.stop(now + 3.0);
      }, 2500);
    } catch (err) {
      console.warn('Web Audio background music initialization:', err);
    }
  };

  useEffect(() => {
    if (!shouldPlay) return;

    try {
      if (!audioRef.current) {
        const audio = new Audio();
        audio.src = weddingConfig.audio.src;
        audio.loop = true;
        audio.volume = 0.55;
        audioRef.current = audio;
      }

      audioRef.current
        .play()
        .catch(() => {
          // If browser restricts audio file play, run harmonic synth
          startWebAudioHarmonics();
        });
    } catch {
      startWebAudioHarmonics();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldPlay]);

  return null;
};
