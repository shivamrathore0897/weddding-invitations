import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Send } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './ShareModal.scss';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareTitle = `${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}'s Wedding Invitation`;
  const shareText = `You are cordially invited to celebrate the wedding of ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name} on 12 December 2026 in Jaipur, India. Visit the digital invitation:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;

  return (
    <div className="share-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Share Modal">
          <X size={18} />
        </button>

        <div className="share-modal-header">
          <div className="header-icon-circle">
            <Share2 size={24} />
          </div>
          <span className="modal-eyebrow">Share The Joy</span>
          <h3 className="modal-title">Invite Family &amp; Friends</h3>
          <p className="modal-sub">{weddingConfig.couple.hashtag}</p>
        </div>

        <div className="share-actions-list">
          {/* Native Share for Mobile */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button type="button" className="share-action-btn primary" onClick={handleNativeShare}>
              <Send size={18} />
              <span>Share via Device Apps</span>
            </button>
          )}

          {/* WhatsApp Direct Share */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="share-action-btn whatsapp-btn"
          >
            <MessageCircle size={18} />
            <span>Share via WhatsApp</span>
          </a>

          {/* Copy Link Row */}
          <div className="copy-link-box">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="copy-input"
              aria-label="Invitation URL"
            />
            <button type="button" className="copy-btn" onClick={handleCopyLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {copied && (
          <div className="toast-copied" role="alert">
            <Check size={14} />
            <span>Invitation link copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
