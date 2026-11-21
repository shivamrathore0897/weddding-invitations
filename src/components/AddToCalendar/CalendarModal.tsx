import React from 'react';
import { X, Calendar as CalendarIcon, Download, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';
import './CalendarModal.scss';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const eventTitle = `${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}'s Wedding Celebration`;
  const location = `${weddingConfig.venue.name}, ${weddingConfig.venue.address}, ${weddingConfig.venue.cityStateZip}`;
  const description = `Join us in celebrating the holy union of ${weddingConfig.couple.groom.fullName} and ${weddingConfig.couple.bride.fullName}.\\nVenue: ${location}\\nHashtag: ${weddingConfig.couple.hashtag}`;

  // Google Calendar URL generator
  // Starts 2026-12-12 18:30 IST (+0530) -> 20261212T130000Z
  // Ends 2026-12-13 01:00 IST -> 20261212T193000Z
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=20261212T130000Z/20261212T193000Z&details=${encodeURIComponent(
    description.replace(/\\n/g, '\n')
  )}&location=${encodeURIComponent(location)}`;

  // Download .ics file
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shivam & Muskan Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-shivam-muskan-20261212@weddinginvitation.local',
      'DTSTAMP:20261121T000000Z',
      'DTSTART:20261212T130000Z',
      'DTEND:20261212T193000Z',
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Shivam & Muskan Wedding tomorrow!',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shivam-and-Muskan-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calendar-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="calendar-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Calendar Modal">
          <X size={18} />
        </button>

        <div className="calendar-modal-header">
          <div className="header-icon-circle">
            <CalendarIcon size={24} />
          </div>
          <span className="modal-eyebrow">Save The Date</span>
          <h3 className="modal-title">Add to Your Calendar</h3>
          <p className="modal-sub">
            Saturday, 12 December 2026 &bull; Jaipur, India
          </p>
        </div>

        <div className="calendar-options">
          {/* Google Calendar Link */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-btn google-cal"
          >
            <div className="cal-btn-content">
              <span className="cal-name">Google Calendar</span>
              <span className="cal-desc">Add directly to your Google account</span>
            </div>
            <ExternalLink size={16} />
          </a>

          {/* Apple Calendar / Outlook (.ics) */}
          <button
            type="button"
            className="calendar-btn ics-download"
            onClick={handleDownloadICS}
          >
            <div className="cal-btn-content">
              <span className="cal-name">Apple Calendar &amp; Outlook</span>
              <span className="cal-desc">Download .ICS file for iPhone, Mac &amp; PC</span>
            </div>
            <Download size={16} />
          </button>
        </div>

        <div className="calendar-modal-footer">
          <p className="footer-note">
            Includes ceremony timings, banquet details, and venue address.
          </p>
        </div>
      </div>
    </div>
  );
};
