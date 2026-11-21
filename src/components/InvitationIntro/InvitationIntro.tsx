import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import './InvitationIntro.scss';

interface InvitationIntroProps {
  onOpen: () => void;
  onReveal?: () => void;
  onStart?: () => void;
  isOpen: boolean;
}

export const InvitationIntro: React.FC<InvitationIntroProps> = ({ onOpen, onReveal, onStart, isOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef(false);
  const fadingTriggeredRef = useRef(false);

  // Trigger completion safely once
  const triggerComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onOpen();
  }, [onOpen]);

  // Trigger fade out and begin parallel smooth website reveal
  const triggerFade = useCallback(() => {
    if (fadingTriggeredRef.current) return;
    fadingTriggeredRef.current = true;
    setIsFading(true);
    onReveal?.();
  }, [onReveal]);

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);

    // Audio starts playing immediately on tap
    onStart?.();

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }

    setTimeout(() => {
      triggerFade();
    }, 3800);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime >= 3.75 && !isFading) {
      triggerFade();
    }
  };

  const handleVideoEnded = () => {
    triggerFade();
  };

  // Complete handover to main website ONLY when overlay opacity transition finishes
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current && e.propertyName === 'opacity' && isFading) {
      triggerComplete();
    }
  };

  // Fallback timer to ensure reveal always triggers even if transitionend is skipped
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        triggerComplete();
      }, 900); // 850ms CSS fade + 50ms buffer
      return () => clearTimeout(timer);
    }
  }, [isFading, triggerComplete]);

  if (isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`invitation-video-overlay ${isFading ? 'fade-out' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Ambient Warm Golden Halo */}
      <div className="ambient-halo-glow" />

      {/* Video Invitation Card Container */}
      <div
        className={`video-card-container ${isPlaying ? 'is-playing' : ''}`}
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        aria-label="Tap to open wedding invitation"
      >
        {/* Corner Metallic Gold Filigree */}
        <div className="corner-filigree top-left" />
        <div className="corner-filigree top-right" />
        <div className="corner-filigree bottom-left" />
        <div className="corner-filigree bottom-right" />

        <div className="video-viewport">
          <video
            ref={videoRef}
            src="assets/video/invitation-opening.mp4"
            poster="assets/video/invitation-poster.jpg"
            playsInline
            muted
            preload="auto"
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="invitation-video-element"
          />
        </div>

        {/* Tap to Open Prompt — Smoothly fades when video begins playing */}
        <div className={`tap-open-prompt ${isPlaying ? 'prompt-hidden' : ''}`}>
          <Sparkles size={14} className="sparkle-icon" />
          <span>Tap to open invitation</span>
          <Sparkles size={14} className="sparkle-icon" />
        </div>

        {/* Golden Radiant Light Bloom on Reveal */}
        <div className={`cinematic-light-bloom ${isFading ? 'bloom-max' : ''}`} />
      </div>
    </div>
  );
};
