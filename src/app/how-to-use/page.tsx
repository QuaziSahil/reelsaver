import { Metadata } from "next";
import { Copy, Download, Link, Smartphone, Monitor, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "How to Use | ReelSaver - Free Instagram Downloader",
    description: "Learn how to download Instagram Reels, Stories, and Posts with ReelSaver. Step-by-step guide for all devices.",
};

const steps = [
    {
        icon: Link,
        title: "Step 1: Find the Content",
        description: "Open Instagram and navigate to the Reel, Story, or Post you want to download.",
        details: [
            "Open Instagram app or website",
            "Find the content you want to save",
            "Make sure the content is from a public account",
        ],
    },
    {
        icon: Copy,
        title: "Step 2: Copy the URL",
        description: "Copy the link to the Instagram content.",
        details: [
            "For Reels/Posts: Tap the three dots (⋯) → Copy Link",
            "For Stories: Tap three dots → Copy Link (or share to copy)",
            "On desktop: Copy the URL from your browser's address bar",
        ],
    },
    {
        icon: Download,
        title: "Step 3: Download",
        description: "Paste the URL on ReelSaver and click Download.",
        details: [
            "Go to ReelSaver home page",
            "Paste the copied URL in the input field",
            "Click the Download button",
            "Save the file to your device",
        ],
    },
];

const faqs = [
    {
        q: "Is ReelSaver free?",
        a: "Yes! ReelSaver is completely free to use. No subscription or payment required.",
    },
    {
        q: "Do I need to create an account?",
        a: "No account is needed. Just paste the URL and download instantly.",
    },
    {
        q: "Can I download private account content?",
        a: "No, ReelSaver only works with public Instagram content. Private account content cannot be downloaded.",
    },
    {
        q: "What types of content can I download?",
        a: "ReelSaver supports Instagram Reels, Stories, Posts (photos and videos), IGTV, and carousel posts.",
    },
    {
        q: "Is it safe to use?",
        a: "Yes, ReelSaver is completely safe. We don't require login, don't store your data, and don't install anything on your device.",
    },
    {
        q: "Why isn't my download working?",
        a: "Make sure: 1) The URL is from a public account, 2) The content hasn't been deleted, 3) You've copied the complete URL. If issues persist, try refreshing the page.",
    },
    {
        q: "Does it work on mobile?",
        a: "Yes! ReelSaver works on all devices - iPhone, Android, tablets, and computers.",
    },
    {
        q: "Where are downloaded files saved?",
        a: "Files are saved to your device's default download folder. On mobile, check your Downloads app or Photos gallery.",
    },
];

export default function HowToUsePage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container-custom max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        How to <span className="gradient-text">Download</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        A simple guide to save Instagram content in seconds
                    </p>
                </div>

                {/* Device Support */}
                <div className="glass-card p-6 mb-12">
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-300">
                            <Smartphone className="w-5 h-5 text-pink-400" />
                            <span>iPhone & Android</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                            <Monitor className="w-5 h-5 text-purple-400" />
                            <span>Windows & Mac</span>
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-6 mb-16">
                    {steps.map((step, index) => (
                        <div key={index} className="glass-card p-6 md:p-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex-shrink-0">
                                    <step.icon className="w-6 h-6 text-pink-400" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
                                    <p className="text-gray-400 mb-4">{step.description}</p>
                                    <ul className="space-y-2">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="glass-card group">
                                <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                                    <span className="font-semibold text-white">{faq.q}</span>
                                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 text-gray-400">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
                    >
                        <Download className="w-5 h-5" />
                        Start Downloading
                    </a>
                </div>
            </div>
        </div>
    );
}
