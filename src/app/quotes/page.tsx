"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCopy,
  FaWhatsapp,
  FaFacebook,
  FaTimes,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

interface Quote {
  id: number;
  quote: string;
  author: string;
  category?: string;
}

const categoryLabels: Record<string, string> = {
  Motivation: "Motivation",
  "Life Lessons": "Life",
  "Love Quotes": "Love",
  "Success & Achievement": "Success",
  "Friendship & Bonds": "Friendship",
};

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [isOffline, setIsOffline] = useState<boolean | null>(null);
  const [offlineQuotes, setOfflineQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // ------------------- Fetch Quotes -------------------
  const fetchQuotes = useCallback(async () => {
    if (!navigator.onLine) {
      const storedQuotes = localStorage.getItem("offlineQuotes");
      if (storedQuotes) {
        const offlineData = JSON.parse(storedQuotes);
        setQuotes(offlineData);
        setOfflineQuotes(offlineData);
        setIsOffline(true);
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      if (data) {
        const fetchedQuotes = data as Quote[];
        setQuotes(fetchedQuotes);
        const firstSix = fetchedQuotes.slice(0, 6);
        setOfflineQuotes(firstSix);
        localStorage.setItem("offlineQuotes", JSON.stringify(firstSix));
        setIsOffline(false);
      }
    } catch {
      const storedQuotes = localStorage.getItem("offlineQuotes");
      if (storedQuotes) {
        const offlineData = JSON.parse(storedQuotes);
        setQuotes(offlineData);
        setOfflineQuotes(offlineData);
        setIsOffline(true);
      }
    }
  }, []);

  // ------------------- Categories -------------------
  const fetchCategories = useCallback(() => {
    const mappedCategories = quotes
      .map((q) => {
        if (!q.category) return "";
        const trimmed = q.category.trim();
        return categoryLabels[trimmed] || trimmed.split(" ")[0];
      })
      .filter(Boolean) as string[];

    const uniqueCategories = Array.from(new Set(mappedCategories));

    // Only update if categories changed
    setCategories((prev) =>
      prev.length !== uniqueCategories.length ||
      !prev.every((c, idx) => c === uniqueCategories[idx])
        ? uniqueCategories
        : prev
    );
  }, [quotes]);

  // ------------------- Handlers -------------------
  const handleOffline = useCallback(() => setIsOffline(true), []);
  const handleOnline = useCallback(() => {
    setIsOffline(false);
    fetchQuotes();
  }, [fetchQuotes]);

  // ------------------- Effects -------------------
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const storedQuotes = localStorage.getItem("offlineQuotes");
    if (storedQuotes) setOfflineQuotes(JSON.parse(storedQuotes));

    const storedFavorites = localStorage.getItem("favoriteQuotes");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    fetchQuotes();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchQuotes, handleOnline, handleOffline]);

  useEffect(() => {
    if (quotes.length) fetchCategories();
  }, [quotes, fetchCategories]);

  // ------------------- Filtering -------------------
  const getFilteredQuotes = useCallback(() => {
    return quotes.filter((q) => {
      const quoteCategory = q.category
        ? categoryLabels[q.category.trim()] || q.category.trim().split(" ")[0]
        : "";
      const matchesCategory = selectedCategory
        ? quoteCategory.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      const matchesSearch =
        q.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = showFavoritesOnly ? favorites.includes(q.id) : true;
      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }, [quotes, selectedCategory, searchTerm, showFavoritesOnly, favorites]);

  const filteredQuotes = getFilteredQuotes();
  const displayedQuotes = isOffline ? offlineQuotes : filteredQuotes.slice(0, displayCount);
  const currentQuote =
    quoteIndex !== null ? (isOffline ? offlineQuotes[quoteIndex] : filteredQuotes[quoteIndex]) : null;

  // ------------------- Clipboard -------------------
  const copyToClipboard = () => {
    if (!currentQuote) return;
    navigator.clipboard.writeText(`"${currentQuote.quote}" - ${currentQuote.author}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  // ------------------- Favorites -------------------
  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favoriteQuotes", JSON.stringify(updated));
  };

  // ------------------- Sharing -------------------
  const shareQuote = (platform: "twitter" | "whatsapp" | "facebook") => {
    if (!currentQuote) return;
    const text = `"${currentQuote.quote}" - ${currentQuote.author}`;
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          "https://your-app-link.com"
        )}&quote=${encodeURIComponent(text)}`;
        break;
    }
    window.open(url, "_blank");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayCount(6);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/quotes.png')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Explore Inspiring Quotes
        </h1>
        <p className="relative z-10 text-white/90 mt-2">
          Discover, search, and share quotes that inspire you
        </p>
      </section>

      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-yellow-400 text-black text-center py-2 font-semibold flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>You are offline. Showing limited quotes from offline storage.</span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6 relative z-10 w-full">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 max-w-3xl w-full items-center">
          <input
            type="text"
            placeholder="Search quotes or authors..."
            className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDisplayCount(6);
            }}
          />
          <select
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-lg shadow-sm font-semibold transition ${
              showFavoritesOnly ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {showFavoritesOnly ? "Show All Quotes" : "Show Favorites"}
          </button>
        </div>

        {/* Quotes Grid */}
        <div
          className={`grid gap-6 max-w-6xl mx-auto w-full ${
            displayedQuotes.length === 1
              ? "grid-cols-1 place-items-center"
              : displayedQuotes.length === 2
              ? "grid-cols-1 md:grid-cols-2 place-items-center"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {displayedQuotes.map((q, idx) => (
            <motion.div
              key={q.id}
              onClick={() => setQuoteIndex(idx)}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer flex flex-col justify-between w-full max-w-sm relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex-grow">
                <p className="italic text-gray-800">&quot;{q.quote}&quot;</p>
                <p className="mt-4 font-semibold text-gray-900">- {q.author}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-green-600 font-bold animate-bounce">Click Me ↑</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(q.id);
                  }}
                  className="text-2xl transition"
                >
                  {favorites.includes(q.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        {!showFavoritesOnly && displayCount < filteredQuotes.length && (
          <div className="mt-6 flex justify-center w-full">
            <button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition font-semibold"
            >
              View More
            </button>
          </div>
        )}
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]"
          >
            Quote copied ✅
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence mode="wait">
        {currentQuote && (
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[gray] bg-opacity-50 z-50"
          >
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 relative flex flex-col justify-between">
              <div className="flex justify-end">
                <button onClick={() => setQuoteIndex(null)} className="text-gray-600 hover:text-gray-900">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex-grow">
                <p className="text-2xl italic text-gray-800">&quot;{currentQuote.quote}&quot;</p>
                <p className="mt-4 font-semibold text-gray-900">- {currentQuote.author}</p>
              </div>

              <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={copyToClipboard}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button
                    onClick={() => shareQuote("twitter")}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
                  >
                    X
                  </button>
                  <button
                    onClick={() => shareQuote("whatsapp")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button
                    onClick={() => shareQuote("facebook")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                  >
                    <FaFacebook /> Facebook
                  </button>
                </div>

                <button
                  onClick={() => toggleFavorite(currentQuote.id)}
                  className="text-3xl transition"
                >
                  {favorites.includes(currentQuote.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    setQuoteIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : 0))
                  }
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setQuoteIndex((prev) =>
                      prev !== null ? (prev + 1) % filteredQuotes.length : 0
                    )
                  }
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Quotes;
