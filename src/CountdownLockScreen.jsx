import React, { useState, useEffect } from "react";
import "./CountdownLockScreen.css";

export default function CountdownLockScreen() {
  const targetDate = new Date("2026-11-20T00:00:00").getTime();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setCurrentTime(now);

      const difference = targetDate - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num) => String(num).padStart(2, "0");

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="app-container">
      <div className="phone-frame">
        {/* TOP NOTCH */}
        <div className="notch" style={{ zIndex: 3, position: "relative" }}></div>

        {/* 1. LOCK SCREEN VIEW */}
        <div className={`screen-view lock-screen ${isUnlocked ? "unlocked" : ""}`}>
          <div>
            <div className="lock-header">
              <p className="current-date">{formattedDate}</p>
              <h1 className="current-time">{formattedTime}</h1>
            </div>

            {/* Glassmorphism Countdown Widget */}
            <div className="countdown-widget">
              <div className="event-title">Countdown • Fri, 20 Nov 2026</div>
              <div className="timer-grid">
                <div className="time-box">
                  <span className="time-number">{pad(timeLeft.days)}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-box">
                  <span className="time-number">{pad(timeLeft.hours)}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-box">
                  <span className="time-number">{pad(timeLeft.minutes)}</span>
                  <span className="time-label">Mins</span>
                </div>
                <div className="time-box">
                  <span className="time-number">{pad(timeLeft.seconds)}</span>
                  <span className="time-label">Secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Up to Unlock Trigger */}
          <div className="bottom-bar" onClick={() => setIsUnlocked(true)}>
            <p className="swipe-text">Swipe up to unlock</p>
            <div className="home-indicator"></div>
          </div>
        </div>

        {/* 2. HOME SCREEN VIEW */}
        <div className={`screen-view home-screen ${isUnlocked ? "active" : ""}`}>
          <div className="home-header">
            <h2 className="home-title">Home Screen</h2>
            <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Welcome back!</p>
          </div>

          <div className="app-grid">
            <div className="app-icon"><span>📷</span><label>Camera</label></div>
            <div className="app-icon"><span>💬</span><label>Messages</label></div>
            <div className="app-icon"><span>🎵</span><label>Music</label></div>
            <div className="app-icon"><span>⚙️</span><label>Settings</label></div>
            <div className="app-icon"><span>🗺️</span><label>Maps</label></div>
            <div className="app-icon"><span>📅</span><label>Calendar</label></div>
            <div className="app-icon"><span>📝</span><label>Notes</label></div>
            <div className="app-icon"><span>⏰</span><label>Clock</label></div>
          </div>

          <button className="lock-device-btn" onClick={() => setIsUnlocked(false)}>
            🔒 Lock Device
          </button>
        </div>
      </div>
    </div>
  );
}