import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './Events.scss';

export const Events: React.FC = () => {
  return (
    <section className="events-section section-wrapper" id="events">
      {/* Decorative Parallax Background Layer */}
      <div className="events-bg-flourish" />

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="events-heading-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Auspicious Itinerary</span>
          <h2 className="section-title">Wedding Celebrations</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Two sacred days of vibrant rituals, music, joyous dancing, and starlit feasts.
          </p>
        </motion.div>

        {/* Events Editorial List */}
        <div className="events-editorial-list">
          {weddingConfig.events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-editorial-item"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="event-photo-wrapper">
                <img src={event.image} alt={event.title} className="event-photo" loading="lazy" />
                <div className="event-number-tag">
                  <span>0{index + 1}</span>
                </div>
              </div>

              <div className="event-info-wrapper">
                <div className="event-badge-row">
                  <span className="event-date-tag">
                    <Calendar size={13} />
                    {event.date}
                  </span>
                  <span className="event-time-tag">
                    <Clock size={13} />
                    {event.time}
                  </span>
                </div>

                <h3 className="event-title">{event.title}</h3>
                <p className="event-subtitle">{event.subtitle}</p>

                <p className="event-desc">{event.description}</p>

                <div className="event-meta-footer">
                  <div className="meta-pill venue-pill">
                    <MapPin size={14} className="meta-icon" />
                    <span>{event.venue}</span>
                  </div>

                  <div className="meta-pill dresscode-pill">
                    <Shirt size={14} className="meta-icon" />
                    <span><strong>Attire:</strong> {event.dressCode}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
