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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WarpBackground className="h-screen w-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[40rem]" // Increased from w-[35rem] to w-[40rem] (640px)
      >
        <MagicCard className="p-10 py-12 rounded-2xl shadow-xl w-full bg-white/90 backdrop-blur-md border border-gray-200"
       
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            🚀 URL Shortener
          </h1>
          <p className="text-center text-gray-600 text-lg mt-2">
            Instantly shorten your long URLs
          </p>

          <div className="space-y-6 mt-6">
            <Input
              type="text"
              placeholder="Enter your URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
            />

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShorten}
                disabled={loading || !url}
                className={`w-full py-4 rounded-lg text-lg font-semibold transition-all ${
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
                className="bg-gray-100 p-6 rounded-lg text-center"
              >
                <p className="text-gray-700 font-medium text-lg">Your shortened URL:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline break-all text-lg"
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
                className="text-red-500 text-lg text-center"
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