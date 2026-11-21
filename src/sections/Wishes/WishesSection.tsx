import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../config/wedding';
import './WishesSection.scss';

interface Wish {
  id: string;
  name: string;
  city: string;
  message: string;
  date: string;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: 'w1',
    name: 'Aarav & Priya Sharma',
    city: 'New Delhi',
    message: 'Wishing Shivam and Muskan a lifetime of laughter, shared adventures, and unshakeable harmony. Cannot wait to dance at the Sangeet!',
    date: 'Just now'
  },
  {
    id: 'w2',
    name: 'Vikram & Ananya Verma',
    city: 'Mumbai',
    message: 'Heartiest congratulations to the most radiant couple! May your sacred union be showered with endless joy and blessings.',
    date: 'Today'
  },
  {
    id: 'w3',
    name: 'Rohan Mehra',
    city: 'Bangalore',
    message: 'Seeing you two together is pure poetry. Cheers to forever and the grandest wedding of 2026!',
    date: 'Yesterday'
  }
];

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes_sm');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      city: city.trim() || 'Well-wisher',
      message: message.trim(),
      date: 'Just now'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_sm', JSON.stringify(updated));

    setName('');
    setCity('');
    setMessage('');
    setSubmitted(true);

    // Fire golden celebration confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#c5a059', '#dec28e', '#5c1e2b', '#ffffff']
    });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="wishes-section section-wrapper" id="wishes">
      <div className="container">
        {/* Section Heading */}
        <div className="wishes-heading-center">
          <span className="section-label">Shower Your Blessings</span>
          <h2 className="section-title">Wishes &amp; Guestbook</h2>
          <div className="ornamental-divider">
            <span className="ornament-diamond" />
          </div>
          <p className="section-subtitle">
            Leave a loving blessing, nostalgic memory, or celebratory toast for {weddingConfig.couple.groom.name} &amp; {weddingConfig.couple.bride.name}.
          </p>
        </div>

        <div className="wishes-content-grid">
          {/* Wishes Form Card */}
          <div className="wishes-form-card">
            <div className="form-card-header">
              <MessageSquare size={20} className="header-icon" />
              <h3 className="form-title">Send Your Blessings</h3>
            </div>

            <form onSubmit={handleSubmit} className="guest-wishes-form">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="guest-name">Your Name *</label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder="e.g. Aditi Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="guest-city">Relationship / City</label>
                  <input
                    id="guest-city"
                    type="text"
                    placeholder="e.g. Friend, Jaipur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="guest-message">Your Heartfelt Message *</label>
                <textarea
                  id="guest-message"
                  required
                  rows={4}
                  placeholder="Share your warm wishes and blessings..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-gold full-width">
                <Send size={15} />
                <span>Send Wedding Blessing</span>
              </button>

              {submitted && (
                <div className="wish-submitted-alert">
                  <Sparkles size={16} />
                  <span>Thank you! Your heartfelt blessing has been shared.</span>
                </div>
              )}
            </form>
          </div>

          {/* Real-time Wishes Stream */}
          <div className="wishes-stream-column">
            <div className="stream-header">
              <Heart size={16} className="heart-icon" />
              <span className="stream-count">{wishes.length} Warm Blessings Received</span>
            </div>

            <div className="wishes-cards-scroll">
              {wishes.map((w) => (
                <div key={w.id} className="single-wish-bubble">
                  <div className="bubble-top">
                    <span className="sender-name">{w.name}</span>
                    <span className="sender-city">{w.city}</span>
                  </div>
                  <p className="bubble-message">"{w.message}"</p>
                  <span className="bubble-time">{w.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
