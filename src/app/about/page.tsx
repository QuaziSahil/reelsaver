import { Metadata } from "next";
import { Users, Target, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | ReelSaver - Free Instagram Downloader",
    description: "Learn about ReelSaver - the free, fast, and safe way to download Instagram Reels, Stories, and Posts.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container-custom">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About <span className="gradient-text">ReelSaver</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We built the simplest Instagram downloader because saving content shouldn&apos;t be complicated.
                    </p>
                </div>

                {/* Mission */}
                <div className="glass-card p-8 md:p-12 mb-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <Target className="w-6 h-6 text-pink-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Our Mission</h2>
                            <p className="text-gray-400">
                                To provide a free, fast, and safe way for everyone to download their favorite
                                Instagram content. No complicated steps, no hidden fees, no data collection.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card p-6 text-center">
                        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">User First</h3>
                        <p className="text-gray-400 text-sm">
                            Every feature we build is designed with you in mind. Simple, intuitive, and effective.
                        </p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <Shield className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Privacy Focused</h3>
                        <p className="text-gray-400 text-sm">
                            We don&apos;t track you, store your downloads, or sell your data. Your privacy matters.
                        </p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <Users className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
                        <p className="text-gray-400 text-sm">
                            Built for content creators, fans, and everyone who wants to save memories.
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">How We Work</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        ReelSaver uses publicly available APIs to fetch Instagram content. We don&apos;t require
                        you to log in or provide any personal information. Simply paste a link and download -
                        it&apos;s that simple.
                    </p>
                </div>
            </div>
        </div>
    );
}
