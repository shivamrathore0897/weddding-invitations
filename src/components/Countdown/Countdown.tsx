import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import './Countdown.scss';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReached: false
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.weddingDate.iso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isReached: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isReached: false
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') }
  ];

  if (timeLeft.isReached) {
    return (
      <div className="countdown-container celebration-state">
        <div className="celebration-badge">
          <span className="celebration-title">Today Is The Day!</span>
          <p className="celebration-sub">Shivam &amp; Muskan begin their eternal journey of love.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <span className="countdown-subtitle">Counting Down Every Sacred Moment</span>
      </div>

      <div className="countdown-grid">
        {timeBlocks.map((block) => (
          <div key={block.label} className="time-block">
            <div className="time-box">
              <span className="time-value">{block.value}</span>
            </div>
            <span className="time-label">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
