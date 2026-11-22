import { useState, useEffect } from 'react';
import { weddingConfig } from './config/wedding';
import type { GalleryPhoto } from './types/wedding';
import { InvitationIntro } from './components/InvitationIntro/InvitationIntro';
import { PetalCanvas } from './components/PetalCanvas/PetalCanvas';
import { BackgroundMusic } from './components/BackgroundMusic/BackgroundMusic';
import { CalendarModal } from './components/AddToCalendar/CalendarModal';
import { ShareModal } from './components/ShareModal/ShareModal';
import { GalleryModal } from './components/Gallery/GalleryModal';
import { Hero } from './sections/Hero/Hero';
import { OurStory } from './sections/OurStory/OurStory';
import { Events } from './sections/Events/Events';
import { Venue } from './sections/Venue/Venue';
import { GallerySection } from './sections/GallerySection/GallerySection';
import { Closing } from './sections/Closing/Closing';

export function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isWebsiteRevealed, setIsWebsiteRevealed] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [musicActive, setMusicActive] = useState(false);

  useEffect(() => {
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInvitationOpen]);

  const handleStartInvitation = () => {
    // 3. Audio starts as soon as user clicks the invitation
    setMusicActive(true);
  };

  const handleRevealWebsite = () => {
    // 4. Smooth blur-in and fade-in begins in parallel with overlay dissolve
    setIsWebsiteRevealed(true);
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsWebsiteRevealed(true);
  };

  return (
    <div className="wedding-experience-root">
      {/* 1. Opening Invitation / Wax-Sealed Envelope Reveal */}
      <InvitationIntro
        isOpen={isInvitationOpen}
        onStart={handleStartInvitation}
        onReveal={handleRevealWebsite}
        onOpen={handleOpenInvitation}
      />

      {/* 2. Ambient Falling Rose Petals & Gold Shimmer Canvas (Always On) */}
      <PetalCanvas enabled={true} />

      {/* 3. Automatic Continuous Background Wedding Music (Always Plays) */}
      <BackgroundMusic shouldPlay={musicActive} />

      {/* 4. Main Experience Sections (Cinematic blur-in and fade-in dissolve) */}
      <main className={`wedding-main-content ${isWebsiteRevealed ? 'website-revealed' : 'website-hidden'}`}>
        <Hero onOpenCalendar={() => setCalendarOpen(true)} />
        <OurStory />
        <Events />
        <Venue />
        <GallerySection onOpenPhoto={(photo) => setSelectedPhoto(photo)} />
        <Closing onOpenCalendar={() => setCalendarOpen(true)} />
      </main>

      {/* 5. Modals & Viewers */}
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      <GalleryModal
        photo={selectedPhoto}
        photos={weddingConfig.gallery}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
      />
    </div>
  );
}

export default App;
