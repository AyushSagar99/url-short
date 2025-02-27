"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/magicui/magic-card";
import { WarpBackground } from "@/components/magicui/warp-background";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setShortUrl(`http://${data.shortUrl}`);
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WarpBackground className="h-screen w-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl sm:w-[90%] md:w-[40rem]"
      >
        <MagicCard className="p-6 sm:p-8 md:p-10 py-12 rounded-2xl shadow-xl w-full bg-white/90 backdrop-blur-md border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">
            🚀 URL Shortener
          </h1>
          <p className="text-center text-gray-600 text-base sm:text-lg mt-2">
            Instantly shorten your long URLs
          </p>

          <div className="space-y-4 sm:space-y-6 mt-6">
            <Input
              type="text"
              placeholder="Enter your URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base"
            />

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShorten}
                disabled={loading || !url}
                className={`w-full py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                }`}
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </Button>
            </motion.div>

            {/* Shortened URL Display */}
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center"
              >
                <p className="text-gray-700 font-medium text-sm sm:text-lg">
                  Your shortened URL:
                </p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline break-all text-sm sm:text-lg"
                >
                  {shortUrl}
                </a>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm sm:text-lg text-center"
              >
                {error}
              </motion.p>
            )}
          </div>
        </MagicCard>
      </motion.div>
    </WarpBackground>
  );
}
