"use client";

import { useState } from "react";
import AccountDetails from "@/components/AccountDetails";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    ArrowDown,
    MessageCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const ContactDonatePage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await emailjs.send(
                "service_2kp849z",
                "template_imyvufy",
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                },
                "YXrnHKPZfuuqtFedO"
            );

            console.log("EmailJS response:", response);

            // Clear form after successful submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });

            toast.success("Message sent successfully!");
        } catch (error) {
            console.error("EmailJS error:", error);

            toast.error(
                "Failed to send message. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden bg-[#0B132B] text-white">

                {/* Background decoration */}
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl" />

                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)]" />

                <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20 md:pt-36 md:pb-24 text-center">

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs md:text-sm font-bold tracking-[0.18em] uppercase">
                        Connect With Us
                    </span>

                    <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                        Contact &{" "}
                        <span className="text-blue-400">
                            Support Us
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-white text-basemd:text-lg leading-8">
                        Get in touch with Alkebulan Foundation,
                        partner with our vision, or support our
                        mission of empowering the next generation.
                    </p>

                    {/* Quick donation CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                        <a
                            href="#donate"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-600/20"
                        >
                            Support Our Mission
                            <ArrowDown size={18} />
                        </a>

                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold transition-all duration-300"
                        >
                            Send Us a Message
                            <MessageCircle size={18} />
                        </a>

                    </div>

                </div>
            </section>


            {/* =====================================================
                DONATION SECTION
            ====================================================== */}
            <section
                id="donate"
                className="relative -mt-1 py-12 md:py-16"
            >

                <div className="max-w-5xl mx-auto px-6 md:px-10">

                    <div className="text-center mb-8">

                        <span className="text-blue-600 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                            Make An Impact
                        </span>

                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#0B132B]">
                            Support Our Mission
                        </h2>

                        <p className="mt-3 max-w-2xl mx-auto text-black leading-7">
                            Your support helps us empower young people,
                            develop leaders, provide practical skills,
                            and create meaningful opportunities.
                        </p>

                    </div>

                    {/* Account component */}
                    <div className="max-w-3xl mx-auto">
                        <AccountDetails />
                    </div>

                </div>

            </section>


            {/* =====================================================
                CONTACT SECTION
            ====================================================== */}
            <section
                id="contact"
                className="py-16 md:py-24 bg-white"
            >

                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    {/* Section heading */}
                    <div className="max-w-2xl mb-12">

                        <span className="text-blue-600 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                            Get In Touch
                        </span>

                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#0B132B]">
                            We Would Love To Hear From You
                        </h2>

                        <p className="mt-4 text-black leading-7">
                            Whether you have a question, want to partner
                            with us, support one of our programmes, or
                            simply want to learn more about our work,
                            feel free to reach out.
                        </p>

                    </div>


                    {/* Main contact grid */}
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12">


                        {/* =================================================
                            CONTACT INFORMATION
                        ================================================== */}
                        <div className="space-y-6">

                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8">

                                <h3 className="text-xl font-bold text-[#0B132B] mb-7">
                                    Contact Information
                                </h3>

                                <div className="space-y-6">


                                    {/* PHONE */}
                                    <a
                                        href="tel:+2349130961875"
                                        className="flex items-center gap-4 group"
                                    >

                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all duration-300">

                                            <Phone
                                                size={20}
                                                className="text-blue-600 group-hover:text-white transition-colors"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                                Phone
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                +234 913 096 1875
                                            </p>

                                        </div>

                                    </a>


                                    {/* EMAIL */}
                                    <a
                                        href="mailto:alkebulanfoundation08@gmail.com"
                                        className="flex items-center gap-4 group"
                                    >

                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all duration-300">

                                            <Mail
                                                size={20}
                                                className="text-blue-600 group-hover:text-white transition-colors"
                                            />

                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                                Email
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800 break-all group-hover:text-blue-600 transition-colors">
                                                alkebulanfoundation08@gmail.com
                                            </p>

                                        </div>

                                    </a>


                                    {/* LOCATION */}
                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">

                                            <MapPin
                                                size={20}
                                                className="text-blue-600"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                                Location
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-800">
                                                Port Harcourt, Nigeria
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Small support message */}
                            <div className="rounded-2xl bg-[#0B132B] p-6 md:p-8 text-white">

                                <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.18em]">
                                    Together We Can
                                </p>

                                <h3 className="mt-2 text-2xl font-bold">
                                    Build A Better Future
                                </h3>

                                <p className="mt-3 text-white/60 leading-7 text-sm">
                                    Every conversation, partnership,
                                    contribution, and act of support
                                    helps us reach more young people
                                    and create greater impact.
                                </p>

                            </div>

                        </div>


                        {/* =================================================
                            CONTACT FORM
                        ================================================== */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/40 p-6 md:p-8 lg:p-10">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* FORM HEADER */}
                                <div>

                                    <span className="text-blue-600 text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
                                        Send Us A Message
                                    </span>

                                    <h3 className="mt-2 text-2xl md:text-3xl font-bold text-[#0B132B]">
                                        Let's Talk
                                    </h3>

                                    <p className="mt-3 text-gray-500 leading-7">
                                        Fill out the form below and
                                        our team will get back to you
                                        as soon as possible.
                                    </p>

                                </div>


                                {/* NAME */}
                                <div>

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        required
                                    />

                                </div>


                                {/* EMAIL */}
                                <div>

                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                        required
                                    />

                                </div>


                                {/* PHONE */}
                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Phone Number

                                        <span className="ml-2 text-gray-400 font-normal">
                                            Optional
                                        </span>
                                    </label>

                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full h-13 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />

                                </div>


                                {/* MESSAGE */}
                                <div>

                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Write your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={7}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                                        required
                                    />

                                </div>


                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-xl bg-[#0B132B] hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-3 shadow-lg shadow-[#0B132B]/20 hover:shadow-blue-700/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >

                                    <Send size={18} />

                                    {loading
                                        ? "Sending..."
                                        : "Send Message"}

                                </button>


                                <p className="text-center text-xs text-gray-400">
                                    We respect your privacy and will only
                                    use your information to respond to
                                    your message.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="bg-gray-50 py-16">

                <div className="max-w-4xl mx-auto px-6 text-center">

                    <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B]">
                        Every Contribution Makes A Difference
                    </h2>

                    <p className="mt-3 text-gray-500 max-w-2xl mx-auto leading-7">
                        Whether you support us financially, partner
                        with our programmes, volunteer your time, or
                        simply share our vision, you are helping us
                        build a stronger generation.
                    </p>

                    <a
                        href="#donate"
                        className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300"
                    >
                        Support Alkebulan Foundation
                        <ArrowDown size={18} />
                    </a>

                </div>

            </section>

        </div>
    );
};

export default ContactDonatePage;

