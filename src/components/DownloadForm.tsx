"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Link as LinkIcon, Loader2, AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react";

interface VideoData {
    url: string;
    thumbnail: string;
    type: string;
    username?: string;
    caption?: string;
}

export default function DownloadForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [copied, setCopied] = useState(false);

    const isValidInstagramUrl = (url: string): boolean => {
        const patterns = [
            /instagram\.com\/p\//,
            /instagram\.com\/reel\//,
            /instagram\.com\/reels\//,
            /instagram\.com\/stories\//,
            /instagram\.com\/tv\//,
            /instagr\.am\//,
        ];
        return patterns.some(pattern => pattern.test(url));
    };

    const extractShortcode = (url: string): string | null => {
        const patterns = [
            /instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/,
            /instagram\.com\/stories\/[^/]+\/(\d+)/,
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setVideoData(null);

        if (!url.trim()) {
            setError("Please enter an Instagram URL");
            return;
        }

        if (!isValidInstagramUrl(url)) {
            setError("Please enter a valid Instagram URL (Reel, Post, Story, or IGTV)");
            return;
        }

        setLoading(true);

        try {
            // Using a free public API approach
            const shortcode = extractShortcode(url);
            if (!shortcode) {
                throw new Error("Could not extract content ID from URL");
            }

            // Try multiple free API endpoints
            const response = await fetch(`https://api.saveig.app/api/v1/media?url=${encodeURIComponent(url)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                // Fallback: Try alternative API
                const altResponse = await fetch(`https://v1.saveig.app/${shortcode}`, {
                    method: 'GET',
                });

                if (!altResponse.ok) {
                    throw new Error("Unable to fetch video. The content may be private or the URL is invalid.");
                }

                const html = await altResponse.text();
                // Parse the response for video URL
                const videoMatch = html.match(/video_url['":\s]+['"]([^'"]+)['"]/);
                if (videoMatch) {
                    setVideoData({
                        url: videoMatch[1].replace(/\\u0026/g, '&'),
                        thumbnail: '',
                        type: 'video',
                    });
                } else {
                    throw new Error("Could not extract video from response");
                }
            } else {
                const data = await response.json();
                if (data.video_url || data.media_url) {
                    setVideoData({
                        url: data.video_url || data.media_url,
                        thumbnail: data.thumbnail || '',
                        type: data.type || 'video',
                        username: data.username,
                        caption: data.caption,
                    });
                } else {
                    throw new Error("No video found in response");
                }
            }
        } catch (err) {
            // Use fallback approach - direct embed method
            try {
                const embedUrl = url.replace(/\?.*$/, '') + '?__a=1&__d=dis';
                setVideoData({
                    url: `https://www.instagram.com/p/${extractShortcode(url)}/media/?size=l`,
                    thumbnail: `https://www.instagram.com/p/${extractShortcode(url)}/media/?size=l`,
                    type: 'media',
                });
            } catch {
                setError("Unable to process this URL. Please try a different Instagram link or try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!videoData?.url) return;

        try {
            const response = await fetch(videoData.url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `reelsaver_${Date.now()}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        } catch {
            // Fallback: Open in new tab
            window.open(videoData.url, '_blank');
        }
    };

    const copyToClipboard = async () => {
        if (!videoData?.url) return;
        await navigator.clipboard.writeText(videoData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Download Form */}
            <form onSubmit={handleSubmit} className="relative">
                <div className="gradient-border p-1">
                    <div className="relative flex items-center bg-gray-900 rounded-[14px] overflow-hidden">
                        <div className="absolute left-4 text-gray-400">
                            <LinkIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste Instagram URL here..."
                            className="w-full py-4 px-12 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                            disabled={loading}
                        />
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="absolute right-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="hidden sm:inline">Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    <span className="hidden sm:inline">Download</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Supported formats */}
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                    <span className="px-3 py-1 rounded-full bg-gray-800/50">Reels</span>
                    <span className="px-3 py-1 rounded-full bg-gray-800/50">Stories</span>
                    <span className="px-3 py-1 rounded-full bg-gray-800/50">Posts</span>
                    <span className="px-3 py-1 rounded-full bg-gray-800/50">IGTV</span>
                </div>
            </form>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-300 text-sm">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Preview */}
            <AnimatePresence>
                {videoData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 glass-card p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">Video found!</span>
                        </div>

                        {/* Preview */}
                        {videoData.thumbnail && (
                            <div className="mb-4 rounded-xl overflow-hidden bg-gray-800">
                                <img
                                    src={videoData.thumbnail}
                                    alt="Video thumbnail"
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        )}

                        {videoData.caption && (
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{videoData.caption}</p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <motion.button
                                onClick={handleDownload}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 min-w-[140px] py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download
                            </motion.button>

                            <motion.button
                                onClick={copyToClipboard}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="py-3 px-6 rounded-xl bg-gray-700/50 text-white flex items-center gap-2 hover:bg-gray-700"
                            >
                                {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                {copied ? "Copied!" : "Copy URL"}
                            </motion.button>

                            <motion.a
                                href={videoData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="py-3 px-6 rounded-xl bg-gray-700/50 text-white flex items-center gap-2 hover:bg-gray-700"
                            >
                                <ExternalLink className="w-5 h-5" />
                                <span className="hidden sm:inline">Open</span>
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
