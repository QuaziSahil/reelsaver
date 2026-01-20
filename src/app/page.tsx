"use client";

import { motion } from "framer-motion";
import { Instagram, Zap, Shield, Smartphone, Download, Globe } from "lucide-react";
import DownloadForm from "@/components/DownloadForm";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download your favorite content in seconds, not minutes.",
  },
  {
    icon: Shield,
    title: "100% Free & Safe",
    description: "No registration, no hidden fees. Your privacy is protected.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Use on any device - phone, tablet, or computer.",
  },
  {
    icon: Globe,
    title: "No Limits",
    description: "Download as many videos as you want, anytime.",
  },
];

const steps = [
  {
    num: "01",
    title: "Copy the URL",
    description: "Open Instagram and copy the link to the Reel, Story, or Post you want to download.",
  },
  {
    num: "02",
    title: "Paste it here",
    description: "Paste the Instagram URL into the input field above.",
  },
  {
    num: "03",
    title: "Download",
    description: "Click the download button and save the video to your device.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-white/10">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-gray-300">Free Instagram Downloader</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
          >
            Download Instagram{" "}
            <span className="gradient-text">Reels & Stories</span>
            <br />
            <span className="text-gray-400">in Seconds</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mx-auto mb-12"
          >
            The fastest way to save your favorite Instagram videos.
            No login required, completely free, works on all devices.
          </motion.p>

          {/* Download Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DownloadForm />
          </motion.div>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-6 container-custom">
        <div className="ad-container">
          {/* AdSense ad will be inserted here */}
          <span className="text-gray-600 text-xs">Advertisement</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">ReelSaver</span>?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We&apos;ve built the simplest and most reliable Instagram downloader on the web.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/[0.08] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to <span className="gradient-text">Download</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              It&apos;s as easy as 1-2-3. Just follow these simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
                )}

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download <span className="gradient-text">Any Content</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              ReelSaver supports all types of Instagram content. Download Reels, Stories, Posts,
              and IGTV videos with ease.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {["Reels", "Stories", "Posts", "IGTV", "Carousel"].map((type) => (
                <div key={type} className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-white/10">
                  <span className="text-white font-medium">{type}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Is ReelSaver free to use?",
                a: "Yes! ReelSaver is completely free. No hidden charges, no subscription required.",
              },
              {
                q: "Do I need to create an account?",
                a: "No account needed. Just paste the URL and download instantly.",
              },
              {
                q: "Is it safe to use?",
                a: "Absolutely. We don&apos;t store any of your data or downloaded content.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-1"
          >
            <div className="bg-gray-950 rounded-[22px] p-8 md:p-12 text-center">
              <Download className="w-16 h-16 mx-auto mb-6 text-pink-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Download?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Start saving your favorite Instagram content right now.
                It&apos;s free, fast, and works on any device.
              </p>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold text-lg"
              >
                <Download className="w-5 h-5" />
                Start Downloading
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
