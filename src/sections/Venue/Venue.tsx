import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Compass } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './Venue.scss';

export const Venue: React.FC = () => {
  const { venue } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const fullAddress = `${venue.name}, ${venue.address}, ${venue.cityStateZip}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="venue-section section-wrapper" id="venue">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="venue-heading-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">The Sacred Destination</span>
          <h2 className="section-title">The Wedding Venue</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            {venue.tagline}
          </p>
        </motion.div>

        {/* Venue Showcase Card */}
        <motion.div
          className="venue-card-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Details Column */}
          <div className="venue-info-card">
            <div className="venue-badge">
              <MapPin size={14} className="pin-icon" />
              <span>Faridabad &bull; Delhi NCR</span>
            </div>

            <h3 className="venue-name">{venue.name}</h3>
            <p className="venue-address-text">{venue.address}</p>
            <p className="venue-city-text">{venue.cityStateZip}</p>

            <div className="venue-actions-row">
              <a
                href={venue.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                className="btn-outline-gold"
                onClick={handleCopyAddress}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Address Copied' : 'Copy Address'}</span>
              </button>
            </div>

            {/* Nearby Points & Landmarks */}
            <div className="nearby-points-section">
              <div className="nearby-header">
                <Compass size={16} className="nearby-compass-icon" />
                <span className="nearby-header-title">Nearby &amp; Key Landmarks</span>
              </div>

              <div className="nearby-points-list">
                {venue.nearby.map((point, index) => (
                  <div key={index} className="nearby-point-item">
                    <span className="point-dot" />
                    <div className="point-content">
                      <span className="point-title">{point.title}</span>
                      <span className="point-meta">{point.distance} &bull; {point.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed Frame */}
          <div className="venue-map-column">
            <div className="map-frame-wrapper">
              <iframe
                title="Wedding Venue Map Location"
                src={venue.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
