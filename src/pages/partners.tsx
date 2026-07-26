"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const partners = [
  {
    name: "Rescaf",
    description: "Innovating digital solutions for youth empowerment.",
    logo: "/partners/rescaf.jpg",
    website: "https://rescaf.io",
  },
  {
    name: "Scitylana",
    description: "Supporting education and technology communities.",
    logo: "/partners/Scitylana.jpg",
    website: "https://www.scitylana.co.uk",
  },
  {
    name: "8Cousins",
    description: "Driving youth innovation and creativity.",
    logo: "/partners/8c.png",
    website: "https://8-cousins-digital-home.vercel.app/",
  },
];

const PartnersPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 pt-40">

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-[#0B132B]">
          Our Partners
        </h1>

        <p className="mt-6 text-gray-600 leading-8">
          Our partners play a vital role in helping us empower young people,
          strengthen communities, and create sustainable opportunities across
          Africa. Together, we are building a future driven by innovation,
          education, leadership, and impact.
        </p>
      </div>

      {/* Partners */}
      <div className="grid md:grid-cols-3 gap-8">

        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-20 mx-auto mb-5 object-contain"
            />

            <h3 className="text-xl font-bold text-[#0B132B]">
              {partner.name}
            </h3>

            <p className="text-gray-600 mt-3 text-sm">
              {partner.description}
            </p>

            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 bg-[#0B132B] text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Visit Website
            </a>
          </motion.div>
        ))}

      </div>

      {/* Become a Partner */}
      <div className="mt-24 bg-[#0B132B] rounded-3xl p-10 text-center text-white">

        <h2 className="text-3xl font-bold">
          Become a Partner
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-blue-100 leading-8">
          We welcome organizations, companies, institutions, and individuals
          who share our vision of empowering young people through education,
          skills development, innovation, and leadership. Together, we can
          create lasting impact across Africa.
        </p>

        <div className="mt-10 space-y-5">

          <div className="flex items-center justify-center gap-3">
            <Mail size={22} />
            <a
              href="mailto:alkebulanfoundation08@gmail.com"
              className="hover:underline"
            >
              alkebulanfoundation08@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone size={22} />
            <a
              href="tel:+2349130961875"
              className="hover:underline"
            >
              0913 096 1875
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};

export default PartnersPage;