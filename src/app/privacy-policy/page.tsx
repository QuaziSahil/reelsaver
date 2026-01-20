import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | ReelSaver - Free Instagram Downloader",
    description: "Read ReelSaver's privacy policy to understand how we protect your privacy and handle your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Privacy <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-gray-400">
                        Last updated: January 2025
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12 prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                    <p className="text-gray-400 mb-6">
                        Welcome to ReelSaver. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy explains how we collect, use, and safeguard your information when you use our service.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                    <p className="text-gray-400 mb-4">
                        <strong className="text-white">We collect minimal information:</strong>
                    </p>
                    <ul className="text-gray-400 mb-6 list-disc list-inside space-y-2">
                        <li>URLs you paste to download content (not stored)</li>
                        <li>Basic analytics data (page views, device type)</li>
                        <li>Information you provide via contact forms</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mb-4">3. What We Don&apos;t Collect</h2>
                    <ul className="text-gray-400 mb-6 list-disc list-inside space-y-2">
                        <li>We do NOT store your downloaded content</li>
                        <li>We do NOT require account registration</li>
                        <li>We do NOT collect personal identification information</li>
                        <li>We do NOT share data with third parties (except analytics)</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                    <p className="text-gray-400 mb-6">
                        We use essential cookies to make our website function properly and analytics cookies to
                        understand how visitors use our site. Third-party advertising partners may also use cookies
                        to serve relevant ads.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                    <p className="text-gray-400 mb-6">
                        We use the following third-party services:
                    </p>
                    <ul className="text-gray-400 mb-6 list-disc list-inside space-y-2">
                        <li><strong className="text-white">Google Analytics:</strong> For website analytics</li>
                        <li><strong className="text-white">Google AdSense:</strong> For displaying advertisements</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                    <p className="text-gray-400 mb-6">
                        We implement appropriate security measures to protect your information. However, no method
                        of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                    <p className="text-gray-400 mb-6">
                        You have the right to:
                    </p>
                    <ul className="text-gray-400 mb-6 list-disc list-inside space-y-2">
                        <li>Access any personal data we hold about you</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of analytics tracking</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mb-4">8. Children&apos;s Privacy</h2>
                    <p className="text-gray-400 mb-6">
                        Our service is not directed to children under 13. We do not knowingly collect personal
                        information from children under 13.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
                    <p className="text-gray-400 mb-6">
                        We may update this privacy policy from time to time. We will notify you of any changes by
                        posting the new policy on this page.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                    <p className="text-gray-400">
                        If you have any questions about this privacy policy, please contact us at{" "}
                        <a href="mailto:support@reelsaver.app" className="text-pink-400 hover:underline">
                            support@reelsaver.app
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
