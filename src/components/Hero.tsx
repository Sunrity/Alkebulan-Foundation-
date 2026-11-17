import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import leadershipImage from "@/assets/kpor.jpeg";
import personalGrowthImage from "@/assets/umuola.jpeg";
import purposeImage from "@/assets/NGB-FAMILY.jpeg";
import moment from "@/assets/moment3.jpeg";
import heroImage from "@/assets/moment2.jpeg";

import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Coins,
  Lightbulb,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Event = {
  name: string;
  image: string;
  description: React.ReactNode;
};

const typewriterSlides = [
  {
    text: "Mentoring Young Leaders for Tomorrow",
    image: heroImage,
  },
  {
    text: "Building Skills to Shape a Better Future",
    image: moment,
  },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const [slideIndex, setSlideIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [eventIndex, setEventIndex] = useState(0);

  const events: Event[] = [
    {
      name: "Leadership Training",
      image: leadershipImage,
      description: (
        <>
          <span className="font-bold text-black">November 2025</span> - Equipping
          young people with the knowledge, confidence, and character to lead
          with purpose.
        </>
      ),
    },
    {
      name: "Purpose & Impact Mentoring",
      image: purposeImage,
      description: (
        <>
          <span className="font-bold text-black">December 2025</span> - Helping
          young people discover their purpose, gain clarity, and take
          intentional steps toward building a meaningful future.
        </>
      ),
    },
    {
      name: "Purpose & Impact Mentoring",
      image: moment,
      description: (
        <>
          <span className="font-bold text-black">December 2025</span> - Helping
          young people discover their purpose, gain clarity, and take
          intentional steps toward building a meaningful future.
        </>
      ),
    },
    {
      name: "Moment from our past event",
      image: heroImage,
      description: (
        <>
          <span className="font-bold text-black">January 2026</span> - Helping
          young people understand money, wealth creation, financial discipline,
          and smart decision-making.
        </>
      ),
    },
    {
      name: "Personal Growth & Vision",
      image: personalGrowthImage,
      description: (
        <>
          <span className="font-bold text-black">July 2026</span> - Helping
          young people discover themselves, clarify their vision, and take
          intentional steps toward their future.
        </>
      ),
    },
  ];

  const teachings = [
    {
      title: "Leadership",
      description:
        "We develop young people who understand responsibility, influence, service, decision-making, and the power of leading by example.",
      icon: Users,
    },
    {
      title: "Mindset",
      description:
        "We help young people develop self-awareness, discipline, confidence, critical thinking, resilience, and a growth-oriented mindset.",
      icon: Brain,
    },
    {
      title: "Financial Wisdom",
      description:
        "We teach practical financial principles that help young people understand money, manage resources, create value, and build sustainable wealth.",
      icon: Coins,
    },
    {
      title: "Practical Skills",
      description:
        "We equip young people with relevant digital and practical skills that can help them solve problems, create opportunities, and become economically productive.",
      icon: Lightbulb,
    },
  ];

  useEffect(() => {
    const currentText = typewriterSlides[slideIndex].text;
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setSlideIndex((prev) => (prev + 1) % typewriterSlides.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, slideIndex]);

  const nextEvent = () => {
    setEventIndex((current) => (current + 1) % events.length);
  };

  const previousEvent = () => {
    setEventIndex((current) => (current - 1 + events.length) % events.length);
  };

  return (
    <main className="bg-white font-sans m-0 p-0">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Dynamic Image Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={typewriterSlides[slideIndex].image}
              alt="Hero Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0B132B]/75 z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-36 md:pt-44 pb-16 text-white">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight min-h-[120px] sm:min-h-[160px] leading-tight text-center">
            {/* Inline container ensures the cursor flows naturally with multi-line text */}
            <span className="inline">
              {displayText}
              <span className="inline-block animate-pulse text-blue-500 ml-1 font-normal">
                |
              </span>
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl font-light italic text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Alkebulan Foundation empowers purpose-driven young people through
            leadership, mentorship, and practical opportunities to build a better future.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Button
              onClick={() => navigate("/skills")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-none text-sm tracking-widest uppercase transition-all duration-300"
            >
              JOIN OUR PROGRAM
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white hover:bg-white hover:text-[#0B132B] font-bold px-8 py-6 rounded-none text-sm tracking-widest uppercase bg-transparent transition-all duration-300"
            >
              SUPPORT OUR MISSION
            </Button>
          </div>
        </div>
      </section>

      {/* What We Teach */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">
              What We Teach
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B132B] tracking-tight">
              Building the Person <span className="text-blue-600">Behind the Future</span>
            </h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Our programmes combine knowledge, character, practical skills, and purpose to prepare young people for life.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-gray-50 border border-gray-100 p-6 rounded-none text-center hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-600"
                >
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B132B]">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Slider */}
      <section className="relative py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Moments from our past Events
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] mt-2">
              Learning. Connecting. Creating Impact.
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-none shadow-md bg-white border border-gray-200">
              <div className="relative aspect-[16/9]">
                <img
                  src={events[eventIndex].image}
                  alt={events[eventIndex].name}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={previousEvent}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B132B]/80 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextEvent}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B132B]/80 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0B132B]">
                  {events[eventIndex].name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {events[eventIndex].description}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              {events.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    eventIndex === index ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;