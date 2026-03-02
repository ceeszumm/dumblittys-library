"use client";

import { Github, Heart, Instagram, Twitter, Youtube, Mic, Flame } from "lucide-react";
import { GraffitiTag, SpraySplatter } from "@/components/audio/GraffitiElements";
import { StickerSign, CautionTape } from "@/components/audio/StreetSigns";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-black mt-auto">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan animate-color-shift" />

      {/* Brick Pattern */}
      <div className="absolute inset-0 brick-pattern opacity-5" />

      {/* Paint Splatters */}
      <SpraySplatter color="neon-pink" size={200} className="absolute top-0 left-0 opacity-50" />
      <SpraySplatter color="neon-cyan" size={180} className="absolute bottom-0 right-0 opacity-50" />

      {/* Graffiti Tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraffitiTag text="PEACE" rotation={-5} color="neon-pink" size="lg" className="top-4 right-8 hidden lg:block" />
        <GraffitiTag text="OUT" rotation={8} color="neon-cyan" size="lg" className="bottom-8 left-8 hidden lg:block" />
        <GraffitiTag text="VIBES" rotation={-8} color="neon-yellow" size="md" className="top-1/2 left-4 hidden lg:block" />
      </div>

      {/* Stickers */}
      <div className="absolute top-8 left-8 hidden lg:block">
        <StickerSign text="STAY REAL" color="pink" rotation={-5} />
      </div>

      {/* Caution Tape at Top */}
      <div className="absolute top-0 left-0 right-0">
        <CautionTape />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display text-vintage-paper mb-2">
              <span className="text-neon-pink animate-neon-sign">Dumblitty</span>
              <span className="text-neon-cyan">'s</span>
            </h3>
            <p className="text-sm text-muted-foreground font-vintage mb-4 uppercase tracking-wider">Personal Music Library</p>
            <p className="text-sm text-muted-foreground/60 max-w-xs mx-auto md:mx-0 font-vintage">
              Raw tracks, original vibes. No filters, just music from the heart of the streets.
            </p>

            {/* Rebel Badge */}
            <div className="inline-block mt-4">
              <div className="rebel-badge px-3 py-1 rounded text-xs">
                <Flame className="w-3 h-3 inline mr-1" />
                Underground
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-lg font-display text-neon-cyan mb-4">
              <Mic className="w-4 h-4 inline mr-1" />
              Connect
            </h4>
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Instagram, href: "#", label: "Instagram", hover: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-neon-pink/30" },
                { icon: Twitter, href: "#", label: "Twitter", hover: "hover:bg-neon-cyan/20 hover:border-neon-cyan/30" },
                { icon: Youtube, href: "#", label: "YouTube", hover: "hover:bg-red-500/20 hover:border-red-500/30" },
                { icon: Github, href: "https://github.com", label: "GitHub", hover: "hover:bg-card hover:border-border" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-card/50 border border-border flex items-center justify-center text-muted-foreground hover:text-vintage-paper transition-all duration-200 ${item.hover}`}
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-display text-neon-pink mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2 items-center md:items-end">
              {[
                { label: "All Tracks", href: "#library" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors font-vintage uppercase tracking-wider hover:border-b hover:border-neon-cyan/30"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/60 text-center sm:text-left font-vintage uppercase tracking-wider">
              © {new Date().getFullYear()} Dumblitty&apos;s Library. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1 font-vintage uppercase tracking-wider">
              Made with <Heart className="w-3 h-3 text-neon-pink inline animate-pulse" /> and raw beats
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Background Tags */}
      <div
        className="absolute bottom-4 left-4 text-4xl font-display text-neon-pink/10 select-none hidden lg:block"
      >
        VIBES
      </div>
      <div
        className="absolute bottom-4 right-4 text-4xl font-display text-neon-cyan/10 select-none hidden lg:block"
      >
        BEATS
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-display text-neon-yellow/5 select-none hidden lg:block"
      >
        DUMB LITTY
      </div>
    </footer>
  );
}
