"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Utility function to merge class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  async function shortURL(e: React.FormEvent) {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
      );

      if (response.ok) {
        const data = await response.text();
        setShortenedUrl(data);
        setCopySuccess(false);
      } else {
        alert("Error shortening URL");
      }
    } catch (error) {
      console.error("Shortening error:", error);
      alert("Failed to shorten URL");
    }
  }

  async function copyToClipboard() {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className={cn(
            "shadow-xl",
            "hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          )}
        >
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-gray-800">
              URL Shortener
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={shortURL} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Enter your URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="p-4"
              />
              
                <ShimmerButton type="submit" className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    Shorten URL
                  </span>
                </ShimmerButton>
            </form>

            {shortenedUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <p className="text-gray-700 font-medium mb-2">Shortened URL:</p>
                <div className="flex items-center justify-between">
                  <a
                    href={shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold break-all hover:underline"
                  >
                    {shortenedUrl}
                  </a>
                  <Button onClick={copyToClipboard} variant="secondary" className="ml-4">
                    {copySuccess ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
