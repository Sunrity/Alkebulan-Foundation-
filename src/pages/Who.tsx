"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import OurTeam from "@/pages/team";
import {
    ArrowRight,
    Eye,
    Globe2,
    Lightbulb,
    Target,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/NGB-FAMILY.jpeg";
import "/src/style/who.css";

const WhoPage = () => {
    const navigate = useNavigate();

    const impactStats = [
        {
            number: "15+",
            title: "Young People Trained",
            description:
                "Young people equipped through our learning and development programmes.",
        },
        {
            number: "5+",
            title: "Economic Opportunities",
            description:
                "Participants who have progressed into employment, entrepreneurship, or income opportunities.",
        },
        {
            number: "50+",
            title: "Community Engagements",
            description:
                "Meaningful engagements through training sessions, conversations, and community activities.",
        },
        {
            number: "2+",
            title: "Projects Initiated",
            description:
                "Practical initiatives designed to turn ideas into meaningful community impact.",
        },
    ];

    const values = [
        {
            icon: Users,
            title: "Leadership",
            text: "We develop people who understand responsibility, service, influence, and the importance of leading by example.",
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            text: "We encourage young people to think differently, solve problems, create value, and embrace opportunities.",
        },
        {
            icon: Target,
            title: "Purpose",
            text: "We help individuals discover their potential and connect their abilities to a meaningful purpose.",
        },
        {
            icon: Globe2,
            title: "Impact",
            text: "We believe personal transformation should translate into positive change in families, communities, and nations.",
        },
    ];

    return (
        <main className="bg-white text-[#0B132B]">

            {/* =========================================================
                HERO
            ========================================================= */}
            <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">

                {/* Background Image */}
               {/* Background Image */}
              <img
                  src={bgImage}
                  alt="Alkebulan Foundation community"
                  className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Bright Professional Overlay */}
              <div className="absolute inset-0 bg-[#0B132B]/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/70 via-[#0B132B]/35 to-trasparent" />

                {/* Decorative Circle */}
                <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border border-white/10" />

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-28">

                    <motion.div
                        initial={{ opacity: 1, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="max-w-4xl"
                    >

                        <div className="inline-flex items-center gap-3 mb-7">
                            <span className="w-10 h-[2px] bg-blue-400" />

                            <span className="text-blue-300 text-sm font-bold tracking-[0.2em] uppercase">
                                About Alkebulan Foundation
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.02] tracking-tight">
                            Who We Are
                        </h1>

                        <p className="mt-7 text-lg md:text-xl text-white leading-8 max-w-3xl">
                            Alkebulan Foundation is a movement committed to raising
                            purpose-driven young leaders equipped with the mindset,
                            values, knowledge, and practical skills required to
                            create meaningful change.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            <Button
                                onClick={() => navigate("/skills")}
                                className="h-13 px-7 bg-white text-[#0B132B] hover:bg-blue-50 rounded-xl font-semibold"
                            >
                                Explore Our Programmes
                                <ArrowRight size={18} className="ml-2" />
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => navigate("/contact")}
                                className="h-13 px-7 border-white/30 bg-white/5 text-white hover:bg-white hover:text-[#0B132B] rounded-xl font-semibold"
                            >
                                Partner With Us
                            </Button>

                        </div>
                    </motion.div>
                </div>
            </section>


            {/* =========================================================
                WHAT ALKEBULAN MEANS
            ========================================================= */}
            <section className="py-24 md:py-32 px-6 bg-white">

                <div className="max-w-6xl mx-auto">

                    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24 items-center">

                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                                Our Identity
                            </span>

                            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B132B] leading-tight">
                                What Does
                                <span className="block text-blue-600">
                                    Alkebulan Mean?
                                </span>
                            </h2>

                            <div className="mt-7 w-16 h-1 bg-[#0B132B] rounded-full" />
                        </motion.div>


                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-lg text-[#0B132B] leading-8">
                                <strong className="text-[#0B132B]">
                                    Alkebulan
                                </strong>{" "}
                                is one of the oldest names associated with Africa,
                                often interpreted as{" "}
                                <strong className="text-[#0B132B]">
                                    “Mother of Mankind”
                                </strong>{" "}
                                or{" "}
                                <strong className="text-[#0B132B]">
                                    “Garden of Eden.”
                                </strong>
                            </p>

                            <p className="mt-6 text-[#0B132B] leading-8">
                                The name represents origin, strength, richness,
                                culture, wisdom, and untapped potential. It reminds
                                us that Africa is not simply a geographical
                                location, but a continent filled with people capable
                                of creating solutions and shaping the future.
                            </p>

                            <p className="mt-6 text-[#0B132B] leading-8">
                                At Alkebulan Foundation, this name reflects our
                                identity and our calling — to help young people
                                rediscover their roots, unlock their potential,
                                develop their capacity, and become a light to the
                                world.
                            </p>

                            <div className="mt-8 border-l-4 border-blue-600 pl-6">
                                <p className="text-xl md:text-2xl font-bold text-[#0B132B] leading-relaxed">
                                    “We are not just building people —
                                    <span className="text-blue-600">
                                        {" "}we are awakening a continent.
                                    </span>”
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* =========================================================
                MISSION & VISION
            ========================================================= */}
            <section className="py-24 md:py-32 px-6 bg-[#F8FAFC]">

                <div className="max-w-6xl mx-auto">

                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                            Our Direction
                        </span>

                        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0B132B]">
                            Purpose That Drives Us
                        </h2>
                    </div>


                    <div className="grid md:grid-cols-2 gap-7">

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-3xl p-8 md:p-10 border border-[#0B132B]/10 shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div className="w-14 h-14 rounded-2xl bg-[#0B132B] flex items-center justify-center">
                                <Target className="text-white" size={27} />
                            </div>

                            <h3 className="mt-7 text-2xl md:text-3xl font-bold">
                                Our Mission
                            </h3>

                            <p className="mt-5 text-[#0B132B] leading-8">
                                We empower young people with the mindset,
                                discipline, and faith for lasting success; equip
                                them with financial wisdom and practical skills to
                                build sustainable companies; nurture leaders of
                                excellence, integrity, and innovation; and foster a
                                community of nation-builders who create positive
                                impact in families, communities, and the world.
                            </p>

                            <div className="mt-8 w-12 h-1 bg-blue-600 rounded-full group-hover:w-20 transition-all duration-300" />
                        </motion.div>


                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="group bg-[#0B132B] text-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >

                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                                <Eye className="text-[#0B132B]" size={27} />
                            </div>

                            <h3 className="mt-7 text-2xl md:text-3xl font-bold">
                                Our Vision
                            </h3>

                            <p className="mt-5 text-white leading-8">
                                To raise visionary leaders who create value, build
                                sustainable companies, and transform nations
                                through integrity, innovation, and collaboration.
                                We are committed to building Africa by bringing
                                people together to shine the light within us —
                                unlocking potential, fostering unity, and driving
                                collective growth across the continent.
                            </p>

                            <div className="mt-8 w-12 h-1 bg-blue-400 rounded-full group-hover:w-20 transition-all duration-300" />
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* =========================================================
                OUR AIM
            ========================================================= */}
            <section className="relative py-24 md:py-28 px-6 bg-[#0B132B] overflow-hidden">

                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                <div className="relative max-w-5xl mx-auto text-center">

                    <span className="text-blue-300 text-sm font-bold tracking-[0.2em] uppercase">
                        Our Aim
                    </span>

                    <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-white">
                        Building People Who
                        <span className="text-blue-400">
                            {" "}Build the Future
                        </span>
                    </h2>

                    <div className="mt-7 w-16 h-1 bg-white mx-auto rounded-full" />

                    <p className="mt-8 text-lg md:text-xl text-white leading-9 max-w-3xl mx-auto">
                        We’re not just training minds — we’re building world
                        changers. Builders who are confident in purpose, strong
                        in values, and skilled in execution, ready to impact Africa
                        and the world at large.
                    </p>

                </div>
            </section>


            {/* =========================================================
                OUR VALUES
            ========================================================= */}
            <section className="py-24 md:py-32 px-6 bg-white">

                <div className="max-w-7xl mx-auto">

                    <div className="max-w-2xl mb-14">
                        <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                            What We Stand For
                        </span>

                        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0B132B]">
                            Values That Shape
                            <span className="text-blue-600">
                                {" "}Our Work
                            </span>
                        </h2>
                    </div>


                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {values.map((value, index) => {
                            const Icon = value.icon;

                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="group border border-[#0B132B]/10 rounded-2xl p-7 hover:bg-[#0B132B] hover:text-white hover:shadow-xl transition-all duration-300"
                                >

                                    <div className="w-12 h-12 rounded-xl bg-[#0B132B] flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Icon
                                            size={22}
                                            className="text-white group-hover:text-[#0B132B]"
                                        />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold">
                                        {value.title}
                                    </h3>

                                    <p className="mt-4 text-sm text-[#0B132B] group-hover:text-white/60 leading-7 transition-colors">
                                        {value.text}
                                    </p>

                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>
            
             {/* =========================================================
                OUR TEAM
            ========================================================= */}
            <section className="bg-[#F8FAFC]">

                <OurTeam />

            </section>            




            {/* =========================================================
                IMPACT
            ========================================================= */}
            <section className="py-24 md:py-32 px-6 bg-[#F8FAFC]">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center max-w-3xl mx-auto">

                        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0B132B] flex items-center justify-center">
                            <Globe2 className="text-white" size={27} />
                        </div>

                        <span className="block mt-6 text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                            Our Impact
                        </span>

                        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0B132B]">
                            Transformation Over
                            <span className="text-blue-600">
                                {" "}Numbers
                            </span>
                        </h2>

                        <p className="mt-5 text-[#0B132B] leading-7">
                            Every number represents a person, a story, an
                            opportunity, and a step toward the future we are
                            building together.
                        </p>

                    </div>


                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {impactStats.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                                className="bg-white rounded-2xl p-7 border border-[#0B132B]/10 shadow-sm"
                            >
                                <p className="text-4xl md:text-5xl font-extrabold text-blue-600">
                                    {item.number}
                                </p>

                                <h3 className="mt-4 text-lg font-bold text-[#0B132B]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm text-[#0B132B] leading-6">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}

                    </div>


                    {/* Focus */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 bg-[#0B132B] rounded-3xl p-8 md:p-12 text-center text-white"
                    >

                        <p className="text-blue-300 text-sm font-bold tracking-[0.2em] uppercase">
                            Our Focus
                        </p>

                        <h3 className="mt-4 text-2xl md:text-3xl font-bold">
                            We Don't Just Count Numbers.
                        </h3>

                        <p className="mt-5 text-white max-w-2xl mx-auto leading-7">
                            We build transformation. We are raising disciplined,
                            confident, purpose-driven, and skilled individuals
                            who are prepared to create value, lead responsibly,
                            and contribute meaningfully to society.
                        </p>

                    </motion.div>

                </div>
            </section>


            {/* =========================================================
                CTA
            ========================================================= */}
            <section className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-60 w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center">

                    <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                        Be Part of the Movement
                    </span>

                    <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B132B] leading-tight">
                        Step Into Your Purpose.
                        <span className="block text-blue-600">
                            Start Building Today.
                        </span>
                    </h2>

                    <p className="mt-6 text-[#0B132B] text-base md:text-lg leading-8 max-w-2xl mx-auto">
                        Whether you want to learn, lead, mentor, partner, or
                        support our mission, there is a place for you in the
                        Alkebulan Foundation community.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">

                        <Button
                            onClick={() => navigate("/skills")}
                            className="h-14 px-8 bg-[#0B132B] hover:bg-[#162044] text-white rounded-xl font-semibold"
                        >
                            Explore Programmes
                            <ArrowRight size={18} className="ml-2" />
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate("/contact")}
                            className="h-14 px-8 border-2 border-[#0B132B]/15 text-[#0B132B] hover:bg-[#0B132B] hover:text-white rounded-xl font-semibold"
                        >
                            Contact Us
                        </Button>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default WhoPage;