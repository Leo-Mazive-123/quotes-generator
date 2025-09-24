"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaEnvelope, FaPhone, FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const FORM_ENDPOINT = "https://formspree.io/f/mgvneobp"; // <-- replace with your Formspree endpoint

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToastMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setToastMessage(""), 3000);
      } else {
        setToastMessage("Failed to send message. Try again!");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (error) {
      setToastMessage("Error sending message. Try again!");
      setTimeout(() => setToastMessage(""), 3000);
      console.error(error);
    }
  };

  const handleClickInfo = (text: string, value: string) => {
    navigator.clipboard.writeText(value);
    setToastMessage(text);
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-20 bg-indigo-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          Questions, feedback, or just to say hi! We’re here to listen.
        </p>
      </section>

      <main className="flex-grow flex flex-col items-center p-6 -mt-12">
        <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 resize-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition font-semibold mt-2"
            >
              Send Message
            </button>
          </form>

          {/* Direct Contact Info */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
              onClick={() => handleClickInfo("Email copied!", "leomazive01@gmail.com")}
            >
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span>Email: <span className="text-indigo-600 hover:underline">leomazive01@gmail.com</span></span>
            </div>
            <div
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
              onClick={() => handleClickInfo("Phone number copied!", "+263 773 950 814")}
            >
              <FaPhone className="text-indigo-600 text-xl" />
              <span>Phone: <span className="text-indigo-600 hover:underline">+263 773 950 814</span></span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center">
              <a
                href="https://www.facebook.com/leo.mazive.92"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://wa.me/263773950814"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 transition"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/leo-mazive-b470a535b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-all duration-500 animate-fadeInOut">
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInOut { animation: fadeInOut 3s ease-in-out forwards; }
      `}</style>
    </div>
  );
};

export default Contact;
