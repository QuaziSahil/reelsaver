import { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | ReelSaver - Free Instagram Downloader",
    description: "Get in touch with ReelSaver team. We're here to help with any questions or feedback.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container-custom max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Have questions or feedback? We&apos;d love to hear from you.
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card p-6 text-center">
                        <Mail className="w-10 h-10 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                        <a href="mailto:support@reelsaver.app" className="text-gray-400 hover:text-pink-400 transition-colors">
                            support@reelsaver.app
                        </a>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <MessageCircle className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Feedback</h3>
                        <p className="text-gray-400 text-sm">
                            Use the form below to send us your thoughts
                        </p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <Clock className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                        <p className="text-gray-400 text-sm">
                            We typically respond within 24-48 hours
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 resize-none"
                                placeholder="Tell us what's on your mind..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
