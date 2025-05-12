"use client";

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState<Date>(new Date());
  
  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format the time to HH:MM
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = (hours % 12) || 12; // Convert to 12-hour format
  
  // Get day of week and date
  const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dayOfWeek = time.toLocaleDateString(undefined, dayOptions);
  
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  const dateStr = time.toLocaleDateString(undefined, dateOptions);
  
  // Add appropriate suffix to day number (st, nd, rd, th)
  const day = time.getDate();
  const suffix = 
    day === 1 || day === 21 || day === 31 ? 'st' :
    day === 2 || day === 22 ? 'nd' :
    day === 3 || day === 23 ? 'rd' : 'th';
    
  return (
    <div className="live-clock-card">
      <p className="time-text">
        <span>{displayHours}:{minutes}</span>
        <span className="time-sub-text">{ampm}</span>
      </p>
      <p className="day-text">{dayOfWeek}, {time.toLocaleDateString(undefined, { month: 'long' })} {day}{suffix}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" strokeWidth="0" fill="currentColor" stroke="currentColor" className="moon">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
      </svg>
    </div>
  );
}
