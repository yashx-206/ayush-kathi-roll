import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const pink = (lastOut * 0.94) + (white * 0.06);
        lastOut = pink;

        // Micro-crackle bursts for authentic hot iron tawa sizzle
        const crackle = Math.random() > 0.982 ? (Math.random() - 0.5) * 2.2 : 0;
        data[i] = pink * 0.4 + crackle * 0.6;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2600, ctx.currentTime);
      bandpass.Q.setValueAtTime(1.8, ctx.currentTime);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(4500, ctx.currentTime);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(masterGain);

      noiseSource.start();
      noiseSourceRef.current = noiseSource;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(() => {
        try {
          noiseSourceRef.current?.stop();
          ctx.close();
        } catch {
          // ignore
        }
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 650);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {
        // cleanup
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      type="button"
      className="group flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-full border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/40 text-stone-300 hover:text-amber-200 text-xs tracking-wider uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
      title={isPlaying ? 'Mute Tawa Ambience' : 'Listen to Tawa Sizzle Ambience'}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline font-semibold text-[11px] text-amber-300">Tawa Sizzle</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
          <span className="hidden sm:inline font-semibold text-[11px] text-stone-400 group-hover:text-stone-200">Ambience</span>
        </>
      )}
    </button>
  );
};
