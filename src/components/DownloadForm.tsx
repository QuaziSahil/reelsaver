"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Link as LinkIcon, Loader2, AlertCircle, CheckCircle2, Image as ImageIcon, Video } from "lucide-react";

interface MediaData {
    videoUrl: string;
    thumbnailUrl: string | null;
    shortcode: string;
    type: string;
    isVideo: boolean;
}

export default function DownloadForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState("");
    const [mediaData, setMediaData] = useState<MediaData | null>(null);

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
        setMediaData(null);

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

        try {
            const response = await fetch('/api/instagram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: trimmedUrl }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch media');
            }

            if (result.success && result.data) {
                setMediaData(result.data);
            } else {
                throw new Error('No media found in response');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch media. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!mediaData?.videoUrl) return;

        setDownloading(true);

        try {
            // Fetch the video as a blob
            const response = await fetch(mediaData.videoUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch media');
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            // Create download link
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `reelsaver_${mediaData.shortcode}_${Date.now()}.${mediaData.isVideo ? 'mp4' : 'jpg'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Cleanup
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download error:', err);
            // Fallback: Open in new tab
            window.open(mediaData.videoUrl, '_blank');
        } finally {
            setDownloading(false);
        }
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
                                    <span className="hidden sm:inline">Fetching...</span>
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

            {/* Media Preview & Download */}
            <AnimatePresence>
                {mediaData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 glass-card p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">
                                {mediaData.isVideo ? 'Video' : 'Image'} found!
                            </span>
                        </div>

                        {/* Thumbnail Preview */}
                        {mediaData.thumbnailUrl && (
                            <div className="mb-4 rounded-xl overflow-hidden bg-gray-800">
                                <img
                                    src={mediaData.thumbnailUrl}
                                    alt="Media preview"
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {/* Media Info */}
                        <div className="mb-4 p-4 rounded-xl bg-gray-800/50 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                                {mediaData.isVideo ? (
                                    <Video className="w-6 h-6 text-white" />
                                ) : (
                                    <ImageIcon className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <p className="text-white font-medium capitalize">
                                    Instagram {mediaData.type}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {mediaData.isVideo ? 'MP4 Video' : 'JPG Image'} • Ready to download
                                </p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <motion.button
                            onClick={handleDownload}
                            disabled={downloading}
                            whileHover={{ scale: downloading ? 1 : 1.02 }}
                            whileTap={{ scale: downloading ? 1 : 0.98 }}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {downloading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-6 h-6" />
                                    <span>Download {mediaData.isVideo ? 'Video' : 'Image'}</span>
                                </>
                            )}
                        </motion.button>

                        {/* Success message */}
                        <p className="mt-3 text-gray-500 text-xs text-center">
                            ✨ Your download will start automatically
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
