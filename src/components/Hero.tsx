import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import leadershipImage from "@/assets/kpor.jpeg";
import financialImage from "@/assets/esther-hero.jpg";
import personalGrowthImage from "@/assets/umuola.jpeg";
import purposeImage from "@/assets/NGB-FAMILY.jpeg";
import moment from "@/assets/moment3.jpeg"
import heroImage from "@/assets/moment2.jpeg"


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

const Hero: React.FC = () => {
    const navigate = useNavigate();

    const [eventIndex, setEventIndex] = React.useState(0);

    const events: Event[] = [
        {
            name: "Leadership Training",
            image: leadershipImage,
            description: (
                <>
                    <span className="font-bold text-black">
                        November 2025
                    </span>{" "}
                    - Equipping young people with the knowledge, confidence,
                    and character to lead with purpose.
                </>
            ),
        },

        {
            name: "Purpose & Impact Mentoring",
            image: purposeImage,
            description: (
                <>
                    <span className="font-bold text-black">
                        December 2025
                    </span>{" "}
                    - Helping young people discover their purpose, gain
                    clarity, and take intentional steps toward building a
                    meaningful future.
                </>
            ),
        },


        {
            name: "Purpose & Impact Mentoring",
            image: moment,
            description: (
                <>
                    <span className="font-bold text-black">
                        December 2025
                    </span>{" "}
                    - Helping young people discover their purpose, gain
                    clarity, and take intentional steps toward building a
                    meaningful future.
                </>
            ),
        },

        {
            name: "Moment from our past event",
            image: heroImage,
            description: (
                <>
                    <span className="font-bold text-black">
                        January 2026
                    </span>{" "}
                    - Helping young people understand money, wealth creation,
                    financial discipline, and smart decision-making.
                </>
            ),
        },

        {
            name: "Personal Growth & Vision",
            image: personalGrowthImage,
            description: (
                <>
                    <span className="font-bold text-black">
                        July 2026
                    </span>{" "}
                    - Helping young people discover themselves, clarify their
                    vision, and take intentional steps toward their future.
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

    // Move to the next event
    const nextEvent = () => {
        setEventIndex((current) => (current + 1) % events.length);
    };

    // Move to the previous event
    const previousEvent = () => {
        setEventIndex(
            (current) => (current - 1 + events.length) % events.length
        );
    };

    return (
        <main className="bg-white">

            {/* =========================================================
                HERO SECTION
            ========================================================= */}
            <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-white flex items-center">

                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Young leader at Alkebulan Foundation"
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Bright White Overlay */}
                    <div className="absolute inset-0 bg-white/85" />

                    {/* Subtle Navy Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#0B132B]/5 rounded-full blur-3xl" />

                <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="absolute top-1/3 left-6 md:left-12 w-1 h-20 bg-[#0B132B]/10 rounded-full hidden md:block" />

                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32"
                >
                    <div className="max-w-5xl mx-auto text-center">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.1,
                                duration: 0.7,
                            }}
                            className="flex justify-center mb-7"
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0B132B]/5 border border-[#0B132B]/10">
                                <span className="w-2 h-2 rounded-full bg-[#0B132B]" />

                                <span className="text-[#0B132B] text-sm md:text-base font-semibold tracking-wide">
                                    EMPOWERING THE NEXT GENERATION
                                </span>
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.25,
                                duration: 0.9,
                            }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#0B132B] leading-[0.98]"
                        >
                            <span className="block">
                                Mentoring Young
                            </span>

                            <span className="block mt-2">
                                Leaders to Build
                            </span>

                            <span className="block text-blue-600 mt-2">
                                The Future.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.8,
                            }}
                            className="mt-8 mx-auto max-w-3xl text-base md:text-lg lg:text-xl text-[#0B132B]/70 leading-8"
                        >
                            Alkebulan Foundation empowers purpose-driven young
                            people through leadership, digital skills,
                            mentorship, personal development, and meaningful
                            opportunities to create impact and shape a better
                            future.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.75,
                                duration: 0.8,
                            }}
                            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                        >
                            <Button
                                size="lg"
                                onClick={() => navigate("/skills")}
                                className="w-full sm:w-auto min-w-[210px] h-14 px-8 rounded-xl bg-[#0B132B] hover:bg-[#162044] text-white text-base font-semibold shadow-xl shadow-[#0B132B]/20 hover:-translate-y-1 transition-all duration-300"
                            >
                                Join Our Program
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("/contact")}
                                className="w-full sm:w-auto min-w-[180px] h-14 px-8 rounded-xl border-2 border-[#0B132B]/20 bg-white hover:bg-[#0B132B] text-[#0B132B] hover:text-white text-base font-semibold transition-all duration-300 hover:-translate-y-1"
                            >
                                Support Our Mission
                            </Button>
                        </motion.div>

                        {/* Impact Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1,
                                duration: 0.8,
                            }}
                            className="mt-14 flex flex-wrap justify-center items-center gap-6 md:gap-10"
                        >
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-[#0B132B]">
                                    Youth
                                </p>
                                <p className="text-xs md:text-sm text-[#0B132B]/50 mt-1">
                                    Empowerment
                                </p>
                            </div>

                            <div className="hidden sm:block w-px h-10 bg-[#0B132B]/15" />

                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-[#0B132B]">
                                    Leadership
                                </p>
                                <p className="text-xs md:text-sm text-[#0B132B]/50 mt-1">
                                    Development
                                </p>
                            </div>

                            <div className="hidden sm:block w-px h-10 bg-[#0B132B]/15" />

                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-[#0B132B]">
                                    Digital
                                </p>
                                <p className="text-xs md:text-sm text-[#0B132B]/50 mt-1">
                                    Skills
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* =========================================================
                WHAT WE TEACH
            ========================================================= */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden">

                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />

                <div className="relative max-w-7xl mx-auto px-6 md:px-10">

                    {/* Section Heading */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            margin: "-100px",
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                            What We Teach
                        </span>

                        <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B132B] tracking-tight">
                            Building the Person{" "}
                            <span className="text-blue-600">
                                Behind the Future
                            </span>
                        </h2>

                        <p className="mt-6 text-[#000000]/60 text-base md:text-lg leading-8">
                            We believe that meaningful change begins from
                            within. Our programmes combine knowledge,
                            character, practical skills, and purpose to
                            prepare young people for life, leadership, and
                            impact.
                        </p>
                    </motion.div>

                    {/* Teaching Cards */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {teachings.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: "-50px",
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                    className="group relative bg-white border border-[#0B132B]/10 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-[#0B132B] flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                        <Icon
                                            size={26}
                                            className="text-white"
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold text-[#0B132B]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm text-[#0B132B]/60 leading-7">
                                        {item.description}
                                    </p>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-7 right-7 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* =========================================================
                RECENT EVENTS
            ========================================================= */}
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">

                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70" />

                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0B132B]/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10">

                    {/* Section Header */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-5">
                            <span className="w-8 h-px bg-blue-600" />

                            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                                    Moment from our past Events
                            </span>

                            <span className="w-8 h-px bg-blue-600" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
                            Learning.
                            <span className="text-blue-600">
                                {" "}Connecting.
                            </span>

                            <br className="hidden sm:block" />

                            <span className="text-[#0B132B]">
                                {" "}Creating Impact.
                            </span>
                        </h2>

                        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#0c0000] leading-7 md:leading-8 max-w-2xl mx-auto">
                            From leadership conversations to practical learning
                            experiences, our programmes create spaces where
                            young people learn, connect, discover their
                            potential, and take meaningful steps toward
                            creating impact.
                        </p>
                    </motion.div>

                    {/* Events Slider */}
                    <div className="relative mt-12 md:mt-16">

                        <div className="overflow-hidden w-full">

                            <motion.div
                                animate={{
                                    x: `-${eventIndex * 100}%`,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                className="flex"
                            >

                                {events.map((event, index) => (

                                    <div
                                        key={event.name}
                                        className="min-w-full px-2 sm:px-3"
                                    >

                                        <motion.article
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                            }}
                                            className="group h-full max-w-3xl mx-auto"
                                        >

                                            {/* Image Container */}
                                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 border border-[#0B132B]/10 shadow-sm">

                                                <img
                                                    src={event.image}
                                                    alt={event.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />

                                                {/* Image Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/50 via-transparent to-transparent" />

                                                {/* Previous Button */}
                                                <button
                                                    type="button"
                                                    onClick={previousEvent}
                                                    aria-label="Previous event"
                                                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0B132B] shadow-lg hover:bg-[#0B132B] hover:text-white hover:scale-105 transition-all duration-300"
                                                >
                                                    <ArrowLeft size={20} />
                                                </button>

                                                {/* Next Button */}
                                                <button
                                                    type="button"
                                                    onClick={nextEvent}
                                                    aria-label="Next event"
                                                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0B132B]/95 backdrop-blur-sm flex items-center justify-center text-white shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <ArrowRight size={20} />
                                                </button>

                                                {/* Event Number */}
                                                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10">
                                                    <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm text-[#0B132B] text-xs font-bold shadow">
                                                        {String(index + 1).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>
                                                </div>

                                            </div>

                                            {/* Event Text */}
                                            <div className="pt-5 px-1 text-center sm:text-left">

                                                <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] leading-snug">
                                                    {event.name}
                                                </h3>

                                                <p className="mt-3 text-sm sm:text-base text-[#000000] leading-7">
                                                    {event.description}
                                                </p>

                                                <div className="mt-4 w-10 h-1 bg-blue-600 rounded-full group-hover:w-16 transition-all duration-300" />

                                            </div>

                                        </motion.article>

                                    </div>
                                ))}

                            </motion.div>

                        </div>

                        {/* Mobile-Friendly Indicators */}
                        <div className="flex justify-center items-center gap-2 mt-8">

                            {events.map((event, index) => (

                                <button
                                    type="button"
                                    key={event.name}
                                    onClick={() => setEventIndex(index)}
                                    aria-label={`Show ${event.name}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        eventIndex === index
                                            ? "w-8 bg-[#0B132B]"
                                            : "w-2 bg-[#0B132B]"
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

