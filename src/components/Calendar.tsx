import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';

interface CalendarProps {
  onClose: () => void;
}

interface Event {
  date: string;
  description: string;
}

export default function Calendar({ onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = useCallback(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const saveEvents = useCallback((newEvents: Event[]) => {
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
  }, []);

  const addEvent = (date: string) => {
    const eventDescription = prompt('Enter event description:');
    if (eventDescription) {
      const newEvent: Event = { date, description: eventDescription };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
    }
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === new Date(date).toDateString();
      days.push(
        <div key={i} className={`calendar-day ${isToday ? 'today' : ''}`} onClick={() => addEvent(date)}>
          {i}
          {dayEvents.map((event, index) => (
            <div key={index} className="event-indicator" title={event.description}>
              •
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="window calendar">
      <div className="window-header">
        <span>Calendar</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <div className="calendar-controls">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Prev</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Next</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day day-name">{day}</div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}