import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/wedding';
import './OurStory.scss';

export const OurStory: React.FC = () => {
  const { groom, bride } = weddingConfig.couple;

  return (
    <section className="story-section section-wrapper" id="story">
      {/* Decorative subtle background aura */}
      <div className="story-bg-aura" />

      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="story-heading-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Our Sacred Journey</span>
          <h2 className="section-title">The Couple &amp; Their Story</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            "Every love story is beautiful, but ours is our favourite."
          </p>
        </motion.div>

        {/* Couple Individual Profiles Grid */}
        <div className="couple-profiles-grid">
          {/* Groom Profile */}
          <motion.div
            className="profile-card groom-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="profile-image-container arch-frame">
              <img src={groom.photo} alt={groom.fullName} className="profile-photo" loading="lazy" decoding="async" />
              <div className="profile-overlay-tag">
                <span className="tag-role">The Groom</span>
              </div>
            </div>
            <div className="profile-details">
              <span className="family-lineage">Son of {groom.mother} &amp; {groom.father}</span>
              <h3 className="profile-name">{groom.fullName}</h3>
              <p className="profile-bio">{groom.bio}</p>
            </div>
          </motion.div>

          {/* Central Union Monogram */}
          <motion.div
            className="couple-center-symbol"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="center-monogram-circle">
              <span className="monogram-text">&amp;</span>
            </div>
            <span className="flourish-text">Forever &amp; Always</span>
          </motion.div>

          {/* Bride Profile */}
          <motion.div
            className="profile-card bride-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="profile-image-container arch-frame">
              <img src={bride.photo} alt={bride.fullName} className="profile-photo" loading="lazy" decoding="async" />
              <div className="profile-overlay-tag">
                <span className="tag-role">The Bride</span>
              </div>
            </div>
            <div className="profile-details">
              <span className="family-lineage">Daughter of {bride.mother} &amp; {bride.father}</span>
              <h3 className="profile-name">{bride.fullName}</h3>
              <p className="profile-bio">{bride.bio}</p>
            </div>
          </motion.div>
        </div>

        {/* Story Chapters Timeline with Staggered Parallax Reveal */}
        <div className="story-chapters-wrapper">
          <div className="chapters-timeline-line" />

          {weddingConfig.story.map((chapter, idx) => (
            <motion.div
              key={chapter.id}
              className={`chapter-block ${chapter.reverse ? 'is-reversed' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="chapter-visual">
                <div className="chapter-photo-frame">
                  <img src={chapter.image} alt={chapter.title} className="chapter-img" style={{ height: idx < 2 ? 'unset' : '100%' }} loading="lazy" decoding="async" />
                </div>
                <div className="chapter-step-badge">
                  <span>0{idx + 1}</span>
                </div>
              </div>

              <div className="chapter-content">
                <span className="chapter-milestone-tag">{chapter.year}</span>
                <h4 className="chapter-title">{chapter.title}</h4>
                <p className="chapter-quote">"{chapter.quote}"</p>
                <p className="chapter-desc">{chapter.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
