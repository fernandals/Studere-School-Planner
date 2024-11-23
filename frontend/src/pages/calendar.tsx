import React from 'react';

import { Calendar as MyCalendar, dateFnsLocalizer } from 'react-big-calendar';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/calendar.module.css';

import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const studySessions = [
    { title: "Math Practice", plan: "Algebra", date: "2024-11-01", startTime: "2024-11-01T14:00:00Z", endTime: "2024-11-01T15:00:00Z", duration: 60 },
    { title: "Physics Review", plan: "Mechanics", date: "2024-11-02", startTime: "2024-11-02T16:30:00Z", endTime: "2024-11-02T17:15:00Z", duration: 45 },
    { title: "Chemistry Lab Prep", plan: "Organic Chemistry", date: "2024-11-03", startTime: "2024-11-03T09:00:00Z", endTime: "2024-11-03T10:30:00Z", duration: 90 },
    { title: "History Essay", plan: "World History", date: "2024-11-04", startTime: "2024-11-04T18:00:00Z", endTime: "2024-11-04T20:00:00Z", duration: 120 },
    { title: "Biology Study", plan: "Genetics", date: "2024-11-05", startTime: "2024-11-05T13:00:00Z", endTime: "2024-11-05T14:30:00Z", duration: 90 },
    { title: "English Essay", plan: "Literature", date: "2024-11-06", startTime: "2024-11-06T10:00:00Z", endTime: "2024-11-06T11:45:00Z", duration: 105 },
    { title: "Programming Practice", plan: "Data Structures", date: "2024-11-07", startTime: "2024-11-07T15:30:00Z", endTime: "2024-11-07T17:00:00Z", duration: 90 },
    { title: "Math Revision", plan: "Calculus", date: "2024-11-08", startTime: "2024-11-08T08:00:00Z", endTime: "2024-11-08T09:15:00Z", duration: 75 },
    { title: "Physics Quiz Prep", plan: "Electromagnetism", date: "2024-11-09", startTime: "2024-11-09T11:00:00Z", endTime: "2024-11-09T12:00:00Z", duration: 60 },
    { title: "Chemistry Review", plan: "Inorganic Chemistry", date: "2024-11-10", startTime: "2024-11-10T14:30:00Z", endTime: "2024-11-10T16:00:00Z", duration: 90 },
  ];

  const events = studySessions.map(session => ({
    title: session.title,
    start: new Date(session.startTime),
    end: new Date(session.endTime),
  }));

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }}>
        
        <Header 
          title="Calendar" 
          buttonText={undefined} 
          onButtonClick={undefined} 
        />

        <div style={{ height: '80vh' }}>
          <MyCalendar
            localizer={localizer}
            events={events}
            views={['day', 'week', 'month']}
            defaultView="month"
            style={{ height: '100%' }}
          />
        </div>

      </main>
    </div>
  );
};

export default Calendar;
