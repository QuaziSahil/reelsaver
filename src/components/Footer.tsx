import Link from "next/link";
import { Download, Heart, Shield, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-white/10 bg-gray-950/50">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                                <Download className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">ReelSaver</span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-md">
                            The fastest and easiest way to download Instagram Reels, Stories, and Posts.
                            Free, no login required, and works on all devices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/how-to-use" className="text-gray-400 hover:text-white transition-colors">
                                    How to Use
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} ReelSaver. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for content lovers
                    </p>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-900/50 py-4">
                <div className="container-custom">
                    <p className="text-gray-500 text-xs text-center">
                        <Shield className="w-3 h-3 inline mr-1" />
                        ReelSaver is not affiliated with Instagram. We respect copyright laws.
                        Please only download content you have permission to use.
                    </p>
                </div>
            </div>
        </footer>
    );
}
