import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import type { GalleryPhoto } from '../../types/wedding';
import { ProgressiveImage } from '../../components/ProgressiveImage/ProgressiveImage';
import './GallerySection.scss';

interface GallerySectionProps {
  onOpenPhoto: (photo: GalleryPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenPhoto }) => {
  const photos = weddingConfig.gallery;

  return (
    <section className="gallery-section section-wrapper" id="gallery">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="gallery-heading-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Moments in Time</span>
          <h2 className="section-title">The Wedding Gallery</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Glimpses of love, sacred traditions, and memories captured through an editorial lens.
          </p>
        </motion.div>

        {/* Masonry Layout with Staggered Scroll-Triggered Reveal */}
        <div className="editorial-gallery-masonry">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`gallery-masonry-card aspect-${photo.aspect}`}
              onClick={() => onOpenPhoto(photo)}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.85,
                delay: (index % 3) * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenPhoto(photo);
              }}
            >
              <div className="card-image-wrap">
                <ProgressiveImage
                  src={photo.src}
                  alt={photo.title}
                  className="gallery-thumb-img"
                  wrapperClassName="gallery-image-wrap"
                  loading="lazy"
                />
                <div className="card-hover-overlay">
                  <div className="overlay-content">
                    <h4 className="photo-card-title">{photo.title}</h4>
                    <p className="photo-card-caption">{photo.caption}</p>
                    <span className="view-fullscreen-cue">
                      <Eye size={14} />
                      <span>View Fullscreen</span>
                    </span>
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
