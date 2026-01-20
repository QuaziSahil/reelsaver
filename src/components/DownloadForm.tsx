"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Link as LinkIcon, Loader2, AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react";

interface DownloadOption {
    url: string;
    quality: string;
    type: string;
}

export default function DownloadForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [downloadReady, setDownloadReady] = useState(false);
    const [copied, setCopied] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setDownloadReady(false);

        const trimmedUrl = url.trim();
        if (!trimmedUrl) {
            setError("Please enter an Instagram URL");
            return;
        }

        if (!isValidInstagramUrl(trimmedUrl)) {
            setError("Please enter a valid Instagram URL (Reel, Post, Story, or IGTV)");
            return;
        }

        setLoading(true);

        // Simulate quick processing
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create download URL using SnapInsta (reliable free service)
        const encodedUrl = encodeURIComponent(trimmedUrl);
        const snapInstaUrl = `https://snapinsta.app/download?url=${encodedUrl}`;

        setDownloadUrl(snapInstaUrl);
        setDownloadReady(true);
        setLoading(false);
    };

    const handleDownload = () => {
        // Use SnapInsta - a reliable free Instagram downloader
        const encodedUrl = encodeURIComponent(url.trim());
        window.open(`https://snapinsta.app/download?url=${encodedUrl}`, '_blank', 'noopener,noreferrer');
    };

    const handleAlternativeDownload = () => {
        // Alternative: Use FastDL
        const encodedUrl = encodeURIComponent(url.trim());
        window.open(`https://fastdl.app/en/?url=${encodedUrl}`, '_blank', 'noopener,noreferrer');
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(url);
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
                                    <span className="hidden sm:inline">Get Video</span>
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

            {/* Download Options */}
            <AnimatePresence>
                {downloadReady && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 glass-card p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">Ready to download!</span>
                        </div>

                        {/* Preview Card */}
                        <div className="mb-4 rounded-xl overflow-hidden bg-gray-800/50 p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-white font-medium truncate">Instagram Video</p>
                                    <p className="text-gray-400 text-sm truncate">{url}</p>
                                </div>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="space-y-3">
                            <motion.button
                                onClick={handleDownload}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download Video (HD)
                            </motion.button>

                            <motion.button
                                onClick={handleAlternativeDownload}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-6 rounded-xl bg-gray-700/50 text-white flex items-center justify-center gap-2 hover:bg-gray-700"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Alternative Download
                            </motion.button>

                            <motion.button
                                onClick={copyToClipboard}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-6 rounded-xl bg-gray-800/50 text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-700/50"
                            >
                                {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                {copied ? "Copied!" : "Copy URL"}
                            </motion.button>
                        </div>

                        {/* Instructions */}
                        <div className="mt-4 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
                            <p className="text-gray-400 text-xs text-center">
                                💡 Tip: A new page will open. Click the download button there to save your video.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
