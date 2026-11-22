import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { Countdown } from '../../components/Countdown/Countdown';
import './Hero.scss';

interface HeroProps {
  onOpenCalendar: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalendar }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layered parallax transformations
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section paper-texture" id="hero" ref={containerRef}>
      {/* Parallax Floating Ambient Halo Layer */}
      <motion.div
        className="hero-ambient-glow"
        style={{ y: bgGlowY }}
      />

      <div className="container hero-container">
        {/* Sacred Sanskrit Shloka */}
        <motion.div
          className="shloka-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="shloka-symbol">ॐ</span>
          <p className="shloka-text">{weddingConfig.invitationNote.shlokaSanskrit}</p>
          <span className="shloka-english">{weddingConfig.invitationNote.shlokaTranslation}</span>
        </motion.div>

        <motion.div
          className="hero-main-content"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-eyebrow">
            {weddingConfig.invitationNote.intro}
          </span>
          <h2 className="hero-family-name">
            {weddingConfig.invitationNote.familyGreeting}
          </h2>

          <div className="hero-names-block">
            <h1 className="couple-grand-title">
              <span className="name groom">{weddingConfig.couple.groom.name}</span>
              <span className="conjunction">&amp;</span>
              <span className="name bride">{weddingConfig.couple.bride.name}</span>
            </h1>
          </div>

          <p className="hero-tagline">
            "{weddingConfig.couple.quote}"
          </p>

          <div className="hero-meta-badges">
            <div className="meta-badge">
              <Calendar size={15} />
              <span>{weddingConfig.weddingDate.dayOfWeek}, {weddingConfig.weddingDate.displayDate}</span>
            </div>
            <span className="badge-dot">&bull;</span>
            <div className="meta-badge">
              <MapPin size={15} />
              <span>{weddingConfig.venue.name}, {weddingConfig.weddingDate.city}</span>
            </div>
          </div>
        </motion.div>

        {/* Cinematic Arch Visual Frame with Smooth Scroll Parallax */}
        <div className="hero-photo-showcase">
          <motion.div
            className="photo-parallax-wrapper arch-frame"
            style={{ y: photoY, scale: photoScale }}
          >
            <img
              src="assets/images/hero/hero-couple.jpg"
              alt="Shivam Rathore and Muskan Gupta"
              className="hero-main-image"
              loading="eager"
              decoding="async"
            />
            <div className="photo-overlay-tint" />
            <div className="photo-bottom-caption">
              <span className="hashtag">{weddingConfig.couple.hashtag}</span>
            </div>
          </motion.div>
        </div>

        {/* Live Countdown Integration */}
        <motion.div
          className="hero-countdown-wrap"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Countdown />
        </motion.div>

        {/* Hero Quick CTA */}
        <div className="hero-cta-actions">
          <button type="button" className="btn-gold" onClick={onOpenCalendar}>
            <Calendar size={15} />
            <span>Save The Date</span>
          </button>
          <a href="#events" className="btn-outline-gold">
            <span>Explore Celebrations</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" onClick={scrollToStory} role="button" tabIndex={0}>
          <span className="scroll-text">The Wedding Story</span>
          <ChevronDown size={18} className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
};
