import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '../../types/wedding';
import './Gallery.scss';

interface GalleryModalProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto
}) => {
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  return (
    <div className="gallery-fullscreen-backdrop lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button
        type="button"
        className="gallery-close-btn"
        onClick={onClose}
        aria-label="Close fullscreen gallery"
      >
        <X size={22} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        className="gallery-nav-btn prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        type="button"
        className="gallery-nav-btn next"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Image Container */}
      <div className="gallery-view-container" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-image-frame">
          <img src={photo.src} alt={photo.title} className="gallery-fullscreen-img" />
        </div>

        <div className="gallery-caption-bar">
          <div className="caption-text-block">
            <h4 className="caption-title">{photo.title}</h4>
            <p className="caption-desc">{photo.caption}</p>
          </div>
          <span className="gallery-index-indicator">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
};
