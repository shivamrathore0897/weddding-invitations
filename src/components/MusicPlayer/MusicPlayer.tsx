import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './MusicPlayer.scss';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Web Audio ambient sitar/tanpura harmonic generator (100% self-contained, no network request needed)
  const startWebAudioMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Tanpura warm drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(masterGain);

      osc1.start();
      osc2.start();

      // Pentatonic Raag Bhupali harp notes
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

        noteGain.gain.setValueAtTime(0.06, now);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        noteOsc.connect(noteGain);
        noteGain.connect(masterGain);

        noteOsc.start(now);
        noteOsc.stop(now + 3.0);
      }, 2400);

      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio fallback initialization:', err);
    }
  };

  const stopWebAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopWebAudio();
      setIsPlaying(false);
    } else {
      try {
        if (!audioRef.current) {
          const audio = new Audio();
          audio.preload = 'none';
          audio.src = weddingConfig.audio.src;
          audio.loop = true;
          audio.volume = 0.6;
          audio.onended = () => setIsPlaying(false);
          audioRef.current = audio;
        }

        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            startWebAudioMelody();
          });
      } catch {
        startWebAudioMelody();
      }
    }
  };

  return (
    <div className="music-player-widget">
      <button
        type="button"
        className={`music-toggle-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause background wedding melody' : 'Play background wedding melody'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <div className="icon-wrapper">
          {isPlaying ? (
            <Disc className="disc-icon spinning" size={16} />
          ) : (
            <Music size={16} />
          )}
        </div>

        <span className="music-label">
          {isPlaying ? 'Shehnai & Ambient' : 'Play Music'}
        </span>

        <div className="audio-bars" aria-hidden="true">
          <span className={`bar bar-1 ${isPlaying ? 'active' : ''}`}></span>
          <span className={`bar bar-2 ${isPlaying ? 'active' : ''}`}></span>
          <span className={`bar bar-3 ${isPlaying ? 'active' : ''}`}></span>
        </div>

        <div className="volume-state-icon">
          {isPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </div>
      </button>
    </div>
  );
};
