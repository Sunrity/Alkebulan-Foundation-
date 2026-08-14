"use client";

import {
    Mail,
    Phone,
    Facebook,
    Instagram,
    Linkedin,
    ArrowUpRight,
} from "lucide-react";

const Footer = () => {
    const sponsors = [
        {
            name: "Rescaf",
            logo: "/partners/rescaf.jpg",
            url: "https://rescaf.io/",
        },
        {
            name: "Scitylana",
            logo: "/partners/Scitylana.jpeg",
            url: "https://www.scitylana.co.uk/",
        },
        {
            name: "8cousins",
            logo: "/partners/8c.png",
            url: "https://8-cousins-digital-home.vercel.app/",
        },
    ];

    return (
        <footer className="bg-[#0B132B] text-white">

          
                {/* =========================
                    PARTNERS SECTION
                ========================== */}

                <div className="border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

                        <div className="text-center mb-10">
                            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-blue-300 font-semibold">
                                Our Partners
                            </p>

                            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                                Building Impact Together
                            </h3>

                            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-white leading-7">
                                We are grateful to the organisations and partners
                                who believe in our vision and support our work
                                towards empowering the next generation.
                            </p>
                        </div>

                        {/* Partner Logos */}
                        {/* Partner Logos */}
<div className="relative overflow-hidden max-w-5xl mx-auto">
    {/* Mobile: Moving logos */}
    <div className="flex md:hidden w-max animate-partner-scroll">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
            <a
                key={`${sponsor.name}-${index}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
                className="flex items-center justify-center shrink-0 mx-6"
            >
                <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="w-36 h-24 object-contain opacity-80"
                />
            </a>
        ))}
    </div>

    {/* Desktop: Normal centered logos */}
    <div className="hidden md:flex flex-wrap items-center justify-center gap-16 lg:gap-20">
        {sponsors.map((sponsor) => (
            <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
                className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
            >
                <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="w-52 h-32 lg:w-60 lg:h-36 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
            </a>
        ))}
    </div>
</div>

                        <p className="text-center text-xs text-white mt-8">
                            Interested in partnering with us?{" "}
                            <a
                                href="/contact"
                                className="text-blue-300 hover:text-blue-200 transition-colors"
                            >
                                Let&apos;s work together.
                            </a>
                        </p>

                    </div>
                </div>




            {/* =========================
                MAIN FOOTER
            ========================== */}
            <div className="max-w-7xl mx-auto px-6 md:px-10">

                <div className="py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

                    {/* Brand */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Alkebulan{" "}
                                <span className="text-blue-400">
                                    Foundation
                                </span>
                            </h2>

                            <div className="mt-3 w-12 h-1 bg-blue-400 rounded-full" />
                        </div>

                        <p className="text-white leading-7 text-sm md:text-base max-w-sm">
                            We empower young minds to grow into impactful
                            leaders through mentorship, innovation, digital
                            skills, and purpose-driven education.
                        </p>

                        <p className="mt-6 text-sm font-medium text-white italic">
                            From within we rise. Together, we build nations.
                        </p>
                    </div>

                    {/* Quick Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Contact Us
                        </h3>

                        <div className="space-y-5">

                            <a
                                href="tel:+2349130961875"
                                className="group flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-all duration-300">
                                    <Phone size={18} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-white/70 mb-1">
                                        Phone
                                    </p>

                                    <p className="text-sm text-white">
                                        +234-913-096-1875
                                    </p>
                                </div>
                            </a>

                            <a
                                href="mailto:alkebulanfoundation08@gmail.com"
                                className="group flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-all duration-300">
                                    <Mail size={18} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-wider text-white/70 mb-1">
                                        Email
                                    </p>

                                    <p className="text-sm text-white group-hover:text-blue-300 transition break-all">
                                        alkebulanfoundation08@gmail.com
                                    </p>
                                </div>
                            </a>

                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Explore
                        </h3>

                        <div className="space-y-3">
                            <a
                                href="/"
                                className="block text-sm text-white hover:text-white transition-colors"
                            >
                                Home
                            </a>

                            <a
                                href="/skills"
                                className="block text-sm text-white hover:text-white transition-colors"
                            >
                                Our Programmes
                            </a>

                            <a
                                href="/about"
                                className="block text-sm text-white hover:text-white transition-colors"
                            >
                                About Us
                            </a>

                            <a
                                href="/contact"
                                className="block text-sm text-white hover:text-white transition-colors"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Stay Connected
                        </h3>

                        <p className="text-sm text-white leading-6 mb-6">
                            Follow Alkebulan Foundation for updates,
                            programmes, opportunities, and stories of impact.
                        </p>

                        <div className="flex items-center gap-3">

                            <a
                                href="https://web.facebook.com/profile.php?id=61586575755232"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300"
                            >
                                <Facebook size={21} />
                            </a>

                            <a
                                href="https://www.instagram.com/nextgenerationbuilders130925/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300"
                            >
                                <Instagram size={21} />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300"
                            >
                                <Linkedin size={21} />
                            </a>

                        </div>
                    </div>
                </div>

                {/* =========================
                    BOTTOM FOOTER
                ========================== */}
                <div className="border-t border-white py-6 flex flex-col md:flex-row items-center justify-between gap-3">

                    <p className="text-xs md:text-sm text-white text-center md:text-left">
                        © {new Date().getFullYear()} Alkebulan Foundation.
                        All rights reserved.
                    </p>

                    <p className="text-xs md:text-sm text-white">
                        Empowering the next generation.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;

