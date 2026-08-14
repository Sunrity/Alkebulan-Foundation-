import React, { useRef, useState } from "react";

const VisionarySection = () => {
  const [showMore, setShowMore] = useState(false);

  // Reference to the Show More button
  const showMoreButtonRef = useRef(null);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);

    // Wait for the content to collapse before scrolling
    setTimeout(() => {
      showMoreButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =========================
            MAIN SECTION
        ========================== */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* =========================
              FOUNDER IMAGE
          ========================== */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-sm">

            {/* Decorative Circle */}
            <div className="absolute -left-4 -top-4 z-0 h-20 w-20 rounded-full bg-[#D4AF37]/20" />

            {/* Image Container */}
            <div className="relative z-10 overflow-hidden rounded-2xl bg-[#0B1F3A] shadow-xl">
              <img
                src="/mentors/felix.jpeg"
                alt="Felix Aabe Kpormon - Founder and Executive Director of Alkebulan Foundation"
                className="h-[380px] w-full object-cover object-center"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />

              {/* Founder Information */}
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D4AF37]">
                  Founder & Executive Director
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Felix Aabe Kpormon
                </h3>
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -bottom-4 -right-4 z-0 h-20 w-20 rounded-full bg-[#D4AF37]" />
          </div>

          {/* =========================
              MAIN CONTENT
          ========================== */}
          <div className="relative z-10">

            {/* Section Label */}
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Meet the Visionary
            </p>

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight text-[#0B1F3A] sm:text-4xl lg:text-5xl">
              The Visionary Behind Alkebulan Foundation
            </h2>

            {/* Name */}
            <h3 className="mt-5 text-xl font-bold text-[#0B1F3A]">
              Felix Aabe Kpormon
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Founder & Executive Director, Alkebulan Foundation for Skill
              Development
            </p>

            {/* Short Introduction */}
            <div className="mt-6 space-y-4 text-base leading-7 text-gray-700">

              <p>
                Every meaningful movement begins with a vision—a belief that
                things can be better and a willingness to take the first step
                towards making that belief a reality.
              </p>

              <p>
                Alkebulan Foundation was born from that vision.
              </p>

              <p>
                Felix Aabe Kpormon is the visionary and Founder of Alkebulan
                Foundation for Skill Development, an organisation committed to
                empowering young Africans, developing leaders, and creating
                opportunities for people to discover and maximise their
                potential.
              </p>

            </div>

            {/* =========================
                SHOW MORE BUTTON
            ========================== */}
            <div
              ref={showMoreButtonRef}
              className="mt-8 scroll-mt-24"
            >
              <button
                type="button"
                onClick={handleShowMore}
                aria-expanded={showMore}
                className="group inline-flex items-center gap-3 rounded-lg bg-[#0B1F3A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#0B1F3A] hover:shadow-xl"
              >
                <span>
                  Show More
                </span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* =========================
            FULL STORY
        ========================== */}
        {showMore && (
          <div className="mt-16 border-t border-gray-200 pt-16">

            <div className="mx-auto max-w-5xl">

              {/* Story Heading */}
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  The Story Behind the Vision
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                  Building people before building nations.
                </h3>
              </div>

              {/* =========================
                  FULL BIOGRAPHY
              ========================== */}
              <div className="mt-10 space-y-6 text-lg leading-8 text-black">
                <p>
                  His journey has been shaped by challenges, learning,
                  self-discovery, and a strong desire to make a difference in
                  the lives of others. Through his experiences, he came to
                  understand that many young people do not lack potential; what
                  they often lack are the right opportunities, guidance,
                  exposure, and someone who believes in them.
                </p>

                <p>
                  This became one of the driving forces behind Alkebulan
                  Foundation.
                </p>

                {/* Vision Highlight */}
                <div className="my-10 rounded-2xl bg-[#0B1F3A] p-8 text-white md:p-10">

                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    The Vision
                  </p>

                  <h4 className="mt-3 text-2xl font-bold">
                    Raising a generation prepared to build the future.
                  </h4>

                  <p className="mt-5 leading-8 text-gray-300">
                    His vision is to build a generation of young Africans who
                    are not only equipped with relevant skills but also possess
                    the mindset, leadership capacity, confidence, and sense of
                    responsibility needed to contribute meaningfully to
                    society.
                  </p>

                </div>

                <p>
                  Through Alkebulan Foundation, he is passionate about creating
                  platforms where young people can learn digital and practical
                  skills, develop leadership abilities, build their confidence,
                  and gain the support they need to pursue a better future.
                </p>

                <p>
                  For Felix, the Foundation is more than an organisation. It is
                  a movement built on the belief that{" "}
                  <span className="font-semibold text-[#0B1F3A]">
                    from within, we rise, and together, we build nations.
                  </span>
                </p>

                {/* Philosophy */}
                <div className="my-10 border-l-4 border-[#D4AF37] bg-gray-50 p-7 md:p-8">

                  <p className="text-xl font-semibold italic leading-8 text-[#0B1F3A]">
                    “I believe that every young person carries something
                    valuable within them. Sometimes, all they need is an
                    opportunity, the right guidance, and someone who believes
                    in what they can become.”
                  </p>

                  <p className="mt-4 text-sm font-medium text-gray-500">
                    — Felix Aabe Kpormon
                  </p>

                </div>

                {/* Future */}
                <h4 className="pt-4 text-2xl font-bold text-[#0B1F3A]">
                  Building the Future
                </h4>

                <p>
                  His vision is simple but ambitious: to contribute to the
                  development of a generation that will not wait for the future
                  to happen but will have the courage, skills, and character to
                  build it.
                </p>

                <p>
                  Through leadership development, digital skills, mentorship,
                  education, community outreach, and empowerment programmes,
                  Alkebulan Foundation seeks to equip young Africans with the
                  knowledge, mindset, character, and opportunities needed to
                  create meaningful impact.
                </p>

                <p>
                  The goal is to raise a generation that does not only look for
                  opportunities but learns to create them; a generation that
                  does not only complain about problems but develops the courage
                  and capacity to solve them.
                </p>

                {/* Closing */}
                <h4 className="pt-4 text-2xl font-bold text-[#0B1F3A]">
                  From Within We Rise
                </h4>

                <p>
                  At the heart of Alkebulan Foundation is the belief that
                  transformation begins from within. When young people discover
                  their worth, develop their capacity, and take responsibility
                  for their communities, they become catalysts for change.
                </p>

                <p>
                  Felix's vision is to contribute to a future where young
                  Africans are equipped not only to participate in the
                  development of the continent but to lead it, build it, and
                  shape it.
                </p>

              </div>

              {/* =========================
                  FINAL STATEMENT
              ========================== */}
              <div className="mt-12 rounded-2xl bg-[#0B1F3A] p-8 text-center md:p-10">

                <p className="text-2xl font-bold text-white md:text-3xl">
                  From within we rise.
                </p>

                <p className="mt-2 text-xl font-medium text-[#D4AF37]">
                  Together, we build nations.
                </p>

              </div>

              {/* =========================
                  SHOW LESS BUTTON
              ========================== */}
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowLess}
                  aria-expanded={showMore}
                  className="group inline-flex items-center gap-3 rounded-lg border-2 border-[#0B1F3A] px-7 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-all duration-300 hover:bg-[#0B1F3A] hover:text-white"
                >
                  <span>
                    Show Less
                  </span>

                  <span className="transition-transform duration-300 group-hover:-translate-y-1">
                    ↑
                  </span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default VisionarySection;