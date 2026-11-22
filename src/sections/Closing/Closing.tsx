import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Calendar } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './Closing.scss';

interface ClosingProps {
  onOpenCalendar: () => void;
}

export const Closing: React.FC<ClosingProps> = ({ onOpenCalendar }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="closing-section section-wrapper" id="closing">
      <div className="closing-ambient-glow" />

      <div className="container closing-container">
        {/* Sacred Sanskrit Farewell */}
        <div className="farewell-shloka">
          <span className="shloka-om">॥ शुभम् भवतु ॥</span>
        </div>

        <motion.div
          className="closing-announcement"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="closing-eyebrow">With Boundless Love &amp; Gratitude</span>
          <h2 className="closing-title">We Would Love To Celebrate With You</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="closing-desc">
            Your love, laughter, and presence mean everything to us as we begin this new lifetime together.
          </p>

          <div className="closing-couple-names-wrap">
            <span className="closing-date-badge">
              {weddingConfig.weddingDate.dayOfWeek}, {weddingConfig.weddingDate.displayDate} &bull; {weddingConfig.weddingDate.city}
            </span>
            <span className="closing-hashtag">{weddingConfig.couple.hashtag}</span>
          </div>
        </motion.div>

        {/* Action Button: Add to Calendar */}
        <div className="closing-actions-row">
          <button type="button" className="btn-gold" onClick={onOpenCalendar}>
            <Calendar size={15} />
            <span>Add 12 Dec 2026 to Calendar</span>
          </button>
        </div>

        {/* Back to top button */}
        <div className="back-to-top-wrap">
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <ArrowUp size={16} />
            <span>Back To Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
