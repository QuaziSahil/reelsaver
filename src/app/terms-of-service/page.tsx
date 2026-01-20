import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | ReelSaver - Free Instagram Downloader",
    description: "Read ReelSaver's terms of service to understand the rules and guidelines for using our service.",
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Terms of <span className="gradient-text">Service</span>
                    </h1>
                    <p className="text-gray-400">
                        Last updated: January 2025
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12 prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-400 mb-6">
                        By accessing and using ReelSaver, you accept and agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use our service.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                    <p className="text-gray-400 mb-6">
                        ReelSaver provides a free online tool to download publicly available Instagram content including
                        Reels, Stories, Posts, and IGTV videos. Our service is provided &quot;as is&quot; without warranties of any kind.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                    <p className="text-gray-400 mb-4">By using our service, you agree to:</p>
                    <ul className="text-gray-400 mb-6 list-disc list-inside space-y-2">
                        <li>Only download content you have permission to download</li>
                        <li>Respect copyright and intellectual property rights</li>
                        <li>Not use the service for any illegal purposes</li>
                        <li>Not attempt to abuse, hack, or disrupt our service</li>
                        <li>Comply with Instagram&apos;s Terms of Service</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mb-4">4. Copyright & Intellectual Property</h2>
                    <p className="text-gray-400 mb-6">
                        ReelSaver does not host any Instagram content. We simply provide a tool to access publicly available
                        content. All content downloaded remains the property of the original content creator. Users are solely
                        responsible for ensuring they have the right to download and use any content.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
                    <p className="text-gray-400 mb-6">
                        ReelSaver is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc.
                        Instagram and all related logos are trademarks of Meta Platforms, Inc.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                    <p className="text-gray-400 mb-6">
                        ReelSaver shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                        resulting from your use of the service. We are not responsible for any content downloaded using our tool.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
                    <p className="text-gray-400 mb-6">
                        We strive to maintain 24/7 availability but cannot guarantee uninterrupted service. Instagram may
                        change their platform at any time, which could affect our service&apos;s functionality.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">8. Advertisements</h2>
                    <p className="text-gray-400 mb-6">
                        Our service is supported by advertisements. By using ReelSaver, you agree to the display of
                        advertisements on our website. We use Google AdSense and other advertising partners.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
                    <p className="text-gray-400 mb-6">
                        We reserve the right to modify these terms at any time. Continued use of the service after changes
                        constitutes acceptance of the new terms.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
                    <p className="text-gray-400">
                        For questions about these Terms of Service, please contact us at{" "}
                        <a href="mailto:support@reelsaver.app" className="text-pink-400 hover:underline">
                            support@reelsaver.app
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
