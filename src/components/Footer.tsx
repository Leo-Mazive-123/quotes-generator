"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState<"email" | "phone" | "">("");

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const quickLinks = [
    { label: "Home", href: "/" },
     { label: "About", href: "/about" },
    { label: "Quotes", href: "/quotes" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#4d9e42] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large screens */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaLightbulb className="text-yellow-300 animate-pulse" />
              Quotes Generator
            </h2>
            <p className="text-white/80">
              Fetch, read, and share your favorite quotes. Simple, clean, and fast. <br />
              Discover daily inspiration and wisdom from all over the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#38BDF8] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Harare, Zimbabwe</p>
            <p className="mb-2">
              Email:{" "}
              <span
                className="cursor-pointer underline hover:text-[#38BDF8]"
                onClick={() => handleCopy("leomazive@example.com", "email")}
              >
                leomazive01@gmail.com
              </span>
              {copied === "email" && <span className="text-green-400 ml-2">Copied!</span>}
            </p>
            <p className="mb-2">
              Phone:{" "}
              <span
                className="cursor-pointer underline hover:text-[#38BDF8]"
                onClick={() => handleCopy("+263712345678", "phone")}
              >
                +263 77 395 0814
              </span>
              {copied === "phone" && <span className="text-green-400 ml-2">Copied!</span>}
            </p>
          </div>
        </div>

        {/* Small screens */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaLightbulb className="text-yellow-300 animate-pulse" />
              Quotes Generator
            </h2>
            <p className="text-white/80">
              Fetch, read, and share your favorite quotes. Simple, clean, and fast. <br />
              Discover daily inspiration and wisdom from all over the world.
            </p>
          </div>

          <div className="flex justify-between">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-[#38BDF8] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-11">Contact Us</h3>
              <p className="mb-2">Harare, Zimbabwe</p>
              <p className="mb-2">
                Email:{" "}
                <span
                  className="cursor-pointer underline hover:text-[#38BDF8]"
                  onClick={() => handleCopy("leomazive@example.com", "email")}
                >
                  leomazive@example.com
                </span>
                {copied === "email" && <span className="text-green-400 ml-2">Copied!</span>}
              </p>
              <p className="mb-2">
                Phone:{" "}
                <span
                  className="cursor-pointer underline hover:text-[#38BDF8]"
                  onClick={() => handleCopy("+263712345678", "phone")}
                >
                  +263 71 234 5678
                </span>
                {copied === "phone" && <span className="text-green-400 ml-2">Copied!</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} Quotes Generator. Developed by Leo T. Mazive
      </div>
    </footer>
  );
};

export default Footer;
