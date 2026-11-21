import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Share2, Sparkles, MailOpen } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import './Navbar.scss';

interface NavbarProps {
  onOpenCalendar: () => void;
  onOpenShare: () => void;
  onReopenInvitation: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCalendar,
  onOpenShare,
  onReopenInvitation,
  petalsEnabled,
  onTogglePetals
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Celebrations', href: '#events' },
    { label: 'Location', href: '#venue' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Wishes', href: '#wishes' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo / Monogram */}
          <a href="#" className="nav-monogram" aria-label="Shivam & Muskan Home">
            <span className="monogram-letters">{weddingConfig.couple.initials}</span>
            <span className="monogram-date">12.12.26</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-links" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="nav-link-btn"
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="nav-actions">
            {/* Music Toggle */}
            <MusicPlayer />

            {/* Petal Canvas Ambient Toggle */}
            <button
              type="button"
              className={`icon-action-btn ${petalsEnabled ? 'active' : ''}`}
              onClick={onTogglePetals}
              title={petalsEnabled ? 'Disable falling petals' : 'Enable falling petals'}
              aria-label="Toggle falling rose petals"
            >
              <Sparkles size={16} />
            </button>

            {/* Calendar */}
            <button
              type="button"
              className="icon-action-btn"
              onClick={onOpenCalendar}
              title="Add to Calendar"
              aria-label="Add wedding to Calendar"
            >
              <Calendar size={16} />
            </button>

            {/* Share */}
            <button
              type="button"
              className="icon-action-btn"
              onClick={onOpenShare}
              title="Share Invitation"
              aria-label="Share Wedding Invitation"
            >
              <Share2 size={16} />
            </button>

            {/* Reopen Invitation */}
            <button
              type="button"
              className="icon-action-btn re-invite-btn"
              onClick={onReopenInvitation}
              title="View Formal Card"
              aria-label="Re-open wedding envelope"
            >
              <MailOpen size={16} />
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="drawer-content">
          <div className="drawer-header">
            <span className="drawer-title">{weddingConfig.couple.groom.name} &amp; {weddingConfig.couple.bride.name}</span>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Drawer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="drawer-links">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="drawer-link-item"
                onClick={() => handleLinkClick(link.href)}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="drawer-footer">
            <button className="btn-gold full-w" onClick={() => { setMobileMenuOpen(false); onOpenCalendar(); }}>
              <Calendar size={15} />
              <span>Add 12 Dec 2026 to Calendar</span>
            </button>

            <button className="btn-outline-gold full-w" onClick={() => { setMobileMenuOpen(false); onOpenShare(); }}>
              <Share2 size={15} />
              <span>Share Wedding Invitation</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
