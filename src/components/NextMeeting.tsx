"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, ArrowUpRight } from "lucide-react";

const liveMeetingLink =
  "https://calendar.app.google/PeEcnigtLzd4QizU9";

const getNextSaturday8PM = (now = new Date()) => {
  const date = new Date(now);

  const day = date.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;

  date.setDate(date.getDate() + daysUntilSaturday);
  date.setHours(20, 0, 0, 0);

  const meetingEnd = new Date(date.getTime() + 90 * 60 * 1000);

  // If this week's meeting has already ended,
  // move to next Saturday.
  if (now >= meetingEnd) {
    date.setDate(date.getDate() + 7);
  }

  return date;
};

const NextMeeting = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [meetingStatus, setMeetingStatus] = useState<
    "upcoming" | "join" | "live"
  >("upcoming");

  const [meetingDate, setMeetingDate] = useState<Date | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const meetingStart = getNextSaturday8PM(now);
      const meetingEnd = new Date(
        meetingStart.getTime() + 90 * 60 * 1000
      );

      const joinTime = new Date(
        meetingStart.getTime() - 30 * 60 * 1000
      );

      setMeetingDate(meetingStart);

      // LIVE
      if (now >= meetingStart && now < meetingEnd) {
        setMeetingStatus("live");

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      // JOIN WINDOW — 30 minutes before meeting
      if (now >= joinTime && now < meetingStart) {
        const diff = meetingStart.getTime() - now.getTime();

        setMeetingStatus("join");

        setTimeLeft({
          days: 0,
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor(
            (diff / (1000 * 60)) % 60
          ),
          seconds: Math.floor(
            (diff / 1000) % 60
          ),
        });

        return;
      }

      // UPCOMING
      const diff = meetingStart.getTime() - now.getTime();

      setMeetingStatus("upcoming");

      setTimeLeft({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (diff / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (diff / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = meetingDate
    ? meetingDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-16 md:py-20">

      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0B132B] shadow-2xl">

          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full border border-white/10" />

          <div className="relative px-6 py-10 md:px-12 md:py-14">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">

                <span
                  className={`w-2 h-2 rounded-full ${
                    meetingStatus === "live"
                      ? "bg-red-500 animate-pulse"
                      : "bg-blue-400"
                  }`}
                />

                <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                  {meetingStatus === "live"
                    ? "Meeting is Live"
                    : "Weekly Mindset Meeting"}
                </span>

              </div>


              <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {meetingStatus === "live"
                  ? "Join Us Now"
                  : "Next Mindset Meeting Starts In"}
              </h2>


              <p className="mt-4 text-white/60 text-sm md:text-base">
                Every Saturday at 8:00 PM
              </p>

            </div>


            {/* LIVE */}
            {meetingStatus === "live" && (
              <div className="mt-10 text-center">

                <div className="inline-flex items-center gap-3 rounded-2xl bg-red-500/10 border border-red-400/20 px-6 py-4">

                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />

                  <span className="text-white font-semibold">
                    We are live right now
                  </span>

                </div>


                <div className="mt-8">

                  <a
                    href={liveMeetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-7 py-3.5 text-white font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Join Meeting
                    <ArrowUpRight size={18} />
                  </a>

                </div>

              </div>
            )}


            {/* JOIN SOON */}
            {meetingStatus === "join" && (
              <div className="mt-10 text-center">

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">

                  <TimeBox
                    value={timeLeft.hours}
                    label="Hours"
                  />

                  <TimeBox
                    value={timeLeft.minutes}
                    label="Minutes"
                  />

                  <TimeBox
                    value={timeLeft.seconds}
                    label="Seconds"
                  />

                </div>


                <p className="mt-6 text-white/60 text-sm">
                  The meeting starts soon. You can join now.
                </p>


                <a
                  href={liveMeetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-7 py-3.5 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  Join Meeting
                  <ArrowUpRight size={18} />
                </a>

              </div>
            )}


            {/* UPCOMING */}
            {meetingStatus === "upcoming" && (
              <>

                {/* Countdown */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-3xl mx-auto">

                  <TimeBox
                    value={timeLeft.days}
                    label="Days"
                  />

                  <TimeBox
                    value={timeLeft.hours}
                    label="Hours"
                  />

                  <TimeBox
                    value={timeLeft.minutes}
                    label="Minutes"
                  />

                  <TimeBox
                    value={timeLeft.seconds}
                    label="Seconds"
                  />

                </div>


                {/* Meeting details */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">

                  <div className="flex items-center gap-2 text-white/70">

                    <CalendarDays
                      size={17}
                      className="text-blue-400"
                    />

                    <span>
                      {formattedDate}
                    </span>

                  </div>


                  <div className="flex items-center gap-2 text-white/70">

                    <Clock3
                      size={17}
                      className="text-blue-400"
                    />

                    <span>
                      8:00 PM
                    </span>

                  </div>

                </div>

              </>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};


/* =====================================
   TIME BOX
===================================== */

const TimeBox = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-5 md:px-5 md:py-6 backdrop-blur-sm">

      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
        {label}
      </p>

    </div>
  );
};

export default NextMeeting;