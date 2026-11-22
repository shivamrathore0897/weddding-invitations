import React, { useState, useEffect } from 'react';
import './ProgressiveImage.scss';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  thumbSrc?: string;
  className?: string;
  wrapperClassName?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  onClick?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  thumbSrc,
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  decoding = 'async',
  style,
  imgStyle,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Automatically derive thumbnail path (e.g. photo.jpg -> photo-thumb.jpg)
  const defaultThumb = src.replace(/\.(jpg|jpeg|png)$/i, '-thumb.jpg');
  const activeThumb = thumbSrc || defaultThumb;

  // Check if image is already cached in browser memory
  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`progressive-image-wrap ${wrapperClassName} ${isLoaded ? 'is-loaded' : 'is-loading'}`}
      style={style}
      onClick={onClick}
    >
      {/* 1. Shimmer Skeleton Background */}
      <div className="progressive-shimmer" />

      {/* 2. Low-Quality Blur-Up Thumbnail (Frosted Glass Preview) */}
      <img
        src={activeThumb}
        alt=""
        aria-hidden="true"
        className={`progressive-thumb ${isLoaded ? 'thumb-hidden' : 'thumb-visible'}`}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />

      {/* 3. High-Resolution Master Image (Smooth Dissolve) */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        className={`progressive-highres ${className} ${isLoaded ? 'highres-loaded' : 'highres-loading'}`}
        style={imgStyle}
      />
    </div>
  );
};
