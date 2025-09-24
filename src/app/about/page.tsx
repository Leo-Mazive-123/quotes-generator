"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaQuoteLeft, FaGlobe, FaUsers, FaHeart, FaRocket, FaSmile } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center text-white h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/about.png')" }}
      >
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }}></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            About <span className="text-yellow-300">Quotes Generator</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl opacity-90">
            A sleek way to get daily inspiration, spark your creativity, and share wisdom with the world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <FaUsers className="text-blue-500 text-6xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            It all started with a simple idea — to make inspiration accessible at the click of a button.
            From timeless classics to modern wisdom, our app curates quotes that uplift and empower people
            across the globe.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <FaQuoteLeft className="text-indigo-500 text-6xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To inspire, motivate, and empower. With just a click, you can find a quote that resonates
            with your journey and share it with friends, family, or the world.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaLightbulb className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Inspiration</h3>
            <p className="text-gray-600 text-sm">We believe in the power of words to change lives.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaSmile className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Simplicity</h3>
            <p className="text-gray-600 text-sm">Easy to use, clean, and designed for everyone.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHeart className="text-pink-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-gray-600 text-sm">We grow together by sharing wisdom and positivity.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaRocket className="text-purple-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Growth</h3>
            <p className="text-gray-600 text-sm">Empowering you to aim higher every single day.</p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <FaGlobe className="text-purple-500 text-6xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why It Matters</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Words have power. The right quote can shift your mindset, brighten your day, and even change
            your life. That&apos;s why we&apos;ve built Quotes Generator — to spread positivity and meaningful ideas
            far and wide.
          </p>
        </div>
      </section>

      {/* Team / Creator */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet the Creator</h2>
          <div className="bg-gray-100 rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <Image
              src="/leo1.jpg"
              alt="Creator"
              width={160}
              height={160}
              className="rounded-full mx-auto mb-4 border-2 border-indigo-500"
            />
            <h3 className="text-xl font-semibold text-gray-800">Leo T. Mazive</h3>
            <p className="text-gray-600 mt-2">
              {"| Software Developer | The Dreamer | The Mentor | Builder of meaningful tools."}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-100 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to be Inspired?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Start exploring quotes and share positivity today.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;
