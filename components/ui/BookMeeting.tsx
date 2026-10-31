'use client';

import { useEffect, useMemo, useState } from 'react';
import { google, office365, outlook, yahoo } from 'calendar-link';
import { CalendarPlus } from 'lucide-react';

const EMAIL = 'contact@24xdev.co.uk';

const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

function tomorrowInputValue() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export default function BookMeeting() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');

  useEffect(() => {
    setDate(tomorrowInputValue());
  }, []);

  const links = useMemo(() => {
    if (!date) return [];
    const start = new Date(`${date}T${time}:00`);
    const event = {
      title: name ? `24xDev intro with ${name}` : 'Intro meeting with 24xDev',
      description: `30-minute intro with 24xDev. Please invite ${EMAIL}.`,
      start,
      duration: [30, 'minute'] as [number, 'minute'],
      location: 'Video call',
      organizer: { name: '24xDev', email: EMAIL },
      guests: [EMAIL],
      url: 'https://24xdev.co.uk/contact',
    };
    return [
      { label: 'Google Calendar', href: google(event) },
      { label: 'Outlook', href: outlook(event) },
      { label: 'Office 365', href: office365(event) },
      { label: 'Yahoo', href: yahoo(event) },
    ];
  }, [date, time, name]);

  return (
    <div id="book" className="scroll-mt-28 rounded-3xl border border-line bg-surface p-7">
      <div className="flex items-center gap-2 text-accent">
        <CalendarPlus className="h-4 w-4" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">Book a meeting</p>
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Thirty minutes with the studio.</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
        Pick a time. The calendar link invites {EMAIL}, so the meeting lands with us as well as on your calendar.
      </p>

      <div className="mt-5 grid gap-3">
        <label className="text-xs font-medium text-ink-secondary">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            placeholder="Your name"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-medium text-ink-secondary">
            Date
            <input
              type="date"
              value={date}
              min={tomorrowInputValue()}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </label>
          <label className="text-xs font-medium text-ink-secondary">
            Time
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            >
              {times.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
