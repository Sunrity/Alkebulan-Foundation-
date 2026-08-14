"use client";

import {
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

const milestones = [
  {
    date: "10 September 2025",
    title: "The Vision Was Born",
    description:
      "Alkebulan Foundation began with a dream to empower young people, help them gain clarity about their lives and future, and contribute to building a better future for generations yet unborn.",
  },
  {
    date: "September 2025",
    title: "The First Community",
    description:
      "Felix shared the vision through a WhatsApp post and invited people who believed in the idea to join him. 34 people expressed interest. Although many eventually stepped away, a few remained committed to the vision.",
  },
  {
    date: "September 2025",
    title: "Saturday Meetings Began",
    description:
      "Weekly online meetings began every Saturday, creating a space where young people could learn, gain clarity, discuss their experiences, and develop a stronger mindset.",
  },
  {
    date: "November 2025",
    title: "Taking the Vision to Schools",
    description:
      "The vision moved beyond online meetings as Felix began visiting secondary schools to encourage students about mindset, positive thinking, purpose, and the possibilities that exist when they believe in themselves.",
  },
  {
    date: "November 2025",
    title: "A Stronger Support System",
    description:
      "In November 2025, Esther Folorunsho and Mrs. Suka Lazarus joined the journey and became an important support system to Alkebulan Foundation. Their commitment, encouragement, and support contributed to strengthening the organisation as the vision continued to grow.",
  },
  {
    date: "December 2025",
    title: "Building With Purpose",
    description:
      'Alkebulan Foundation hosted its first onsite summit, themed "Building With Purpose." 23 students attended and were encouraged to think positively, discover their purpose, and believe in their potential.',
  },
  {
    date: "2026",
    title: "The Mission Expanded",
    description:
      "The organisation continued growing through school outreach, online meetings, mentorship, youth development activities, and conversations with experienced professionals who shared the vision.",
  },
  {
    date: "2026",
    title: "Official Registration",
    description:
      "Within eight months of the vision being born, Alkebulan Foundation became fully registered with the Federal Government of Nigeria, establishing a stronger foundation for the work ahead.",
  },
  {
    date: "2026",
    title: "Growing Across Africa",
    description:
      "During its first year, the organisation grew beyond Nigeria, with members joining from Kenya, Ghana, and other African countries. What began as a personal dream was becoming a growing African community.",
  },
];

const History = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-blue-50 blur-3xl opacity-70 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-slate-50 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">

        {/* =====================================
            HEADER
        ====================================== */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-3 mb-6">

            <span className="w-8 h-[2px] bg-blue-600" />

            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Our History
            </span>

            <span className="w-8 h-[2px] bg-blue-600" />

          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B132B] leading-tight">
            From a dream
            <span className="block text-blue-600">
              to a growing movement.
            </span>
          </h2>

          <p className="mt-6 text-gray-600 text-base md:text-lg leading-8">
            Our journey began with one person's conviction that young
            people can become more when they are given clarity,
            encouragement, knowledge, mentorship, and opportunity.
          </p>

        </div>


        {/* =====================================
            FOUNDING MOMENT
        ====================================== */}
        <div className="mt-16 md:mt-20">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#0B132B]">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/10" />

            <div className="absolute -left-20 -bottom-24 w-64 h-64 rounded-full border border-white/10" />

            <div className="relative p-8 md:p-12 lg:p-14">

              <div className="flex flex-col md:flex-row md:items-center gap-8">

                {/* Date */}
                <div className="shrink-0">

                  <p className="text-blue-300 text-xs uppercase tracking-[0.3em] font-semibold">
                    The Beginning
                  </p>

                  <p className="mt-3 text-4xl md:text-5xl font-bold text-white">
                    10.09.2025
                  </p>

                </div>


                {/* Divider */}
                <div className="hidden md:block w-px h-20 bg-white/10" />


                {/* Story */}
                <div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    It started with a dream.
                  </h3>

                  <p className="mt-3 text-white/70 leading-7">
                    A dream to empower young people, help them gain
                    clarity about their lives and future, and build a
                    better future for generations yet unborn.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            NUMBERS
        ====================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 md:mt-20 text-center">

          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#0B132B]">
              34
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Initial expressions of interest
            </p>
          </div>


          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#0B132B]">
              23
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Students at our first summit
            </p>
          </div>


          <div>
            <p className="text-4xl md:text-5xl font-bold text-[#0B132B]">
              4+
            </p>

            <p className="mt-2 text-sm text-gray-500">
              African countries represented
            </p>
          </div>

        </div>


        {/* =====================================
            JOURNEY
        ====================================== */}
        <div className="mt-24 md:mt-32">

          <div className="text-center mb-16">

            <p className="text-xs uppercase tracking-[0.3em] text-blue-600 font-bold">
              The Journey
            </p>

            <h3 className="mt-4 text-3xl md:text-4xl font-bold text-[#0B132B]">
              How the vision grew
            </h3>

            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-7">
              Every stage brought new people, new experiences, and
              new opportunities to make the vision a reality.
            </p>

          </div>


          {/* =====================================
              TIMELINE
          ====================================== */}
          <div className="relative">

            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-blue-100" />


            <div className="space-y-12 md:space-y-16">

              {milestones.map((item) => (

                <div
                  key={`${item.date}-${item.title}`}
                  className="relative pl-14"
                >

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1">

                    <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center shadow-sm">

                      <div className="w-3 h-3 rounded-full bg-blue-600" />

                    </div>

                  </div>


                  {/* Content */}
                  <div>

                    {/* Date */}
                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={15}
                        className="text-blue-600"
                      />

                      <span className="text-sm font-semibold text-blue-600">
                        {item.date}
                      </span>

                    </div>


                    {/* Title */}
                    <h4 className="mt-3 text-xl md:text-2xl font-bold text-[#0B132B]">
                      {item.title}
                    </h4>


                    {/* Description */}
                    <p className="mt-2 text-gray-600 leading-7 max-w-3xl">
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* =====================================
            PERSEVERANCE
        ====================================== */}
        <div className="mt-24 md:mt-32">

          <div className="border-t border-gray-200 pt-12 md:pt-16">

            <div className="max-w-3xl">

              <div className="flex items-center gap-3">

                <span className="w-10 h-[2px] bg-blue-600" />

                <span className="text-xs uppercase tracking-[0.25em] font-bold text-blue-600">
                  The Spirit Behind The Journey
                </span>

              </div>


              <h3 className="mt-6 text-3xl md:text-5xl font-bold text-[#0B132B] leading-tight">

                We kept building,

                <span className="block text-blue-600">
                  even when it was difficult.
                </span>

              </h3>


              <p className="mt-6 text-gray-600 text-base md:text-lg leading-8">
                Many people showed interest when the vision was first
                introduced. Some did not take it seriously, while others
                eventually gave up along the way.
              </p>


              <p className="mt-5 text-gray-600 text-base md:text-lg leading-8">
                But Felix never gave up. Despite the challenges, he
                continued believing in the vision, believing in young
                people, and believing in the possibility of achieving
                what he had started.
              </p>


              <div className="mt-8 flex items-center gap-2 text-[#0B132B] font-semibold">

                <span className="text-lg md:text-xl italic">
                  "What started as a dream continues to become a movement."
                </span>

                <ArrowUpRight
                  size={20}
                  className="text-blue-600 shrink-0"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            CLOSING
        ====================================== */}
        <div className="mt-24 md:mt-32 text-center">

          <div className="flex justify-center items-center gap-4">

            <span className="w-12 h-px bg-gray-200" />

            <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold">
              Our journey continues
            </span>

            <span className="w-12 h-px bg-gray-200" />

          </div>


          <h3 className="mt-6 text-3xl md:text-4xl font-bold text-[#0B132B]">
            From within we rise.
          </h3>


          <p className="mt-2 text-blue-600 font-semibold">
            Together, we build nations.
          </p>

        </div>

      </div>

    </section>
  );
};

export default History;