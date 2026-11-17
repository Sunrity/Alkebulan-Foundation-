import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import logo from "../assets/logo.jpeg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Contact us", href: "/contact" },
  {
    name: "About",
    dropdown: [{ name: "Who we are", href: "/who" }],
  },
  {
    name: "Resources",
    dropdown: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/qapage" },
    ],
  },
  {
    name: "Community",
    dropdown: [{ name: "Skill", href: "/skills" }],
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      {/* Main Navigation */}
      <div className="bg-[#0B132B]/90 backdrop-blur-md text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Alkebulan Foundation"
              className="h-11 w-auto rounded object-cover"
            />
            <div>
              <span className="text-lg font-extrabold tracking-wider block leading-none text-white">
                ALKEBULAN
              </span>
              <span className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group py-1">
                    <button className="flex items-center font-medium text-gray-200 hover:text-blue-400 transition text-sm">
                      {link.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    <div className="absolute top-full left-0 mt-2 bg-[#0B132B] text-white shadow-2xl rounded-md py-2 min-w-[180px] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 border border-white/10">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setActiveLink(item.href)}
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/30 hover:text-blue-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`font-medium text-sm transition ${
                    activeLink === link.href
                      ? "text-blue-400 border-b-2 border-blue-500 pb-1"
                      : "text-gray-200 hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Single Login Action Button */}
            <Link
              to="/login"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md transition-colors shadow-sm ml-2"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0B132B] text-white border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-5 space-y-3">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name}>
                      <button
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="w-full flex justify-between items-center font-medium text-gray-200 py-2"
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileDropdownOpen[link.name] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileDropdownOpen[link.name] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 border-l border-blue-500/40 my-1 space-y-1"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => {
                                  setActiveLink(item.href);
                                  setMobileMenuOpen(false);
                                }}
                                className="block py-2 text-sm text-gray-300 hover:text-blue-400"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 text-gray-200 hover:text-blue-400 font-medium"
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Single Login Button */}
              <div className="pt-3 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;