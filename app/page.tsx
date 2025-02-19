"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

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
      } else {
        alert("Error shortening URL");
      }
    } catch (error) {
      console.error("Shortening error:", error);
      alert("Failed to shorten URL");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  
      <h2 className="text-xl text-gray-700 mb-6">URL Shortener</h2>

      <form onSubmit={shortURL} className="flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Shorten
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg w-80 text-center">
          <p className="text-gray-700 font-medium">Shortened URL:</p>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold break-all hover:underline"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
    </main>
  );
}
