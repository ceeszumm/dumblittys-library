"use client";

import Image from "next/image";
import { Play, Headphones, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DangerSign,
  WarningSign,
  NoMainstreamSign,
  UndergroundZoneSign,
  StickerSign,
  NeonBoxSign,
  CautionTape,
} from "@/components/audio/StreetSigns";
import { GraffitiTag, SpraySplatter, ScribbleBackground } from "@/components/audio/GraffitiElements";

interface HeroProps {
  onPlayRandom?: () => void;
  trackCount?: number;
}

export function Hero({ onPlayRandom, trackCount = 0 }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-black min-h-[90vh]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-street.png"
          alt="Street art background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
      </div>

      {/* Brick Pattern */}
      <div className="absolute inset-0 brick-pattern opacity-5" />

      {/* Wall Cracks */}
      <div className="absolute inset-0 wall-cracks" />

      {/* Paint Splatters */}
      <SpraySplatter color="neon-pink" size={300} className="absolute top-0 left-0" />
      <SpraySplatter color="neon-cyan" size={250} className="absolute bottom-0 right-0" />
      <SpraySplatter color="neon-yellow" size={200} className="absolute top-1/2 left-1/4" />

      {/* Graffiti Tags - Hero Section Specific */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraffitiTag text="BEATS" rotation={-12} color="neon-pink" size="xl" className="top-16 left-8 hidden lg:block" />
        <GraffitiTag text="RAW" rotation={8} color="neon-cyan" size="lg" className="bottom-32 right-16 hidden lg:block" />
        <GraffitiTag text="STREET" rotation={-5} color="neon-yellow" size="lg" className="top-1/3 right-8 hidden lg:block" />
        <GraffitiTag text="LOUD" rotation={15} color="retro-orange" size="md" className="bottom-1/3 left-20 hidden lg:block" />
        <GraffitiTag text="FIRE" rotation={-8} color="neon-pink" size="md" className="top-20 right-1/4 hidden lg:block" />
        <GraffitiTag text="REAL" rotation={10} color="neon-green" size="md" className="bottom-20 left-1/3 hidden lg:block" />
      </div>

      {/* Scribble Background */}
      <ScribbleBackground className="opacity-10" />

      {/* Street Signs */}
      <div className="absolute top-24 right-8 hidden xl:block animate-float">
        <DangerSign />
      </div>
      <div className="absolute top-1/3 right-16 hidden xl:block animate-float" style={{ animationDelay: "1s" }}>
        <NoMainstreamSign />
      </div>
      <div className="absolute bottom-32 left-8 hidden xl:block animate-float" style={{ animationDelay: "0.5s" }}>
        <WarningSign />
      </div>

      {/* Stickers */}
      <div className="absolute top-40 left-16 hidden lg:block rotate-6">
        <StickerSign text="UNDERGROUND" color="pink" rotation={-5} />
      </div>
      <div className="absolute bottom-40 right-24 hidden lg:block">
        <StickerSign text="NO FILTERS" color="cyan" rotation={8} />
      </div>

      {/* Caution Tape at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <CautionTape />
      </div>

      {/* Neon Box Sign */}
      <div className="absolute bottom-24 left-8 hidden xl:block">
        <NeonBoxSign text="LIVE" subtext="FROM THE STREETS" color="pink" blinking />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-[90vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full mb-6 animate-fade-in group hover:bg-neon-pink/20 transition-colors duration-300">
              <div className="relative">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-neon-green rounded-full animate-ping" />
              </div>
              <span className="text-sm text-neon-pink font-vintage uppercase tracking-wider">Now Streaming</span>
              <Sparkles className="w-3 h-3 text-neon-pink animate-pulse" />
            </div>

            {/* Main Title with Glitch Effect */}
            <h1 className="mb-6">
              <div className="glitch-container" data-text="DUMBLITTY">
                <span
                  className="block text-5xl sm:text-6xl lg:text-8xl font-display text-vintage-paper mb-2 graffiti-shadow animate-fade-in"
                >
                  <span className="text-neon-pink animate-neon-sign inline-block">DUMB</span>
                  <span className="text-neon-cyan">LITTY</span>
                </span>
              </div>
              <span
                className="block text-3xl sm:text-4xl lg:text-5xl font-display text-muted-foreground animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                &apos;s <span className="text-neon-yellow">LIBRARY</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-vintage">
              Welcome to my{" "}
              <span className="text-neon-pink border-b border-neon-pink/30">personal music vault</span>.
              Raw tracks, original vibes, and{" "}
              <span className="text-neon-yellow">creative sounds</span>.
              <br />
              <span className="text-neon-cyan/80">No filters, just music from the streets.</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                onClick={onPlayRandom}
                className="group relative bg-gradient-to-r from-neon-pink to-retro-orange hover:from-neon-pink/80 hover:to-retro-orange/80 text-white px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,45,124,0.3)] hover:shadow-[0_0_30px_rgba(255,45,124,0.4)] transition-all duration-300 overflow-hidden rounded-xl border border-neon-pink/30"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center font-display uppercase tracking-wider">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Play Random
                  <Zap className="w-4 h-4 ml-2 text-neon-yellow animate-pulse" />
                </span>
              </Button>

              <Button
                variant="outline"
                className="border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] px-8 py-6 rounded-xl group transition-all duration-300 font-display uppercase tracking-wider"
                size="lg"
                asChild
              >
                <a href="#library">
                  <Headphones className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Browse All
                </a>
              </Button>
            </div>

            {/* Stats with Rebel Style */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center lg:text-left p-4 bg-card/30 rounded-xl border border-border/50 backdrop-blur-sm hover:border-neon-pink/30 transition-all duration-300 group">
                <p className="text-3xl sm:text-4xl font-display text-neon-pink group-hover:animate-street-bounce">{trackCount}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-vintage uppercase tracking-wider">Tracks</p>
              </div>
              <div className="text-center lg:text-left p-4 bg-card/30 rounded-xl border border-border/50 backdrop-blur-sm hover:border-neon-cyan/30 transition-all duration-300 group">
                <p className="text-3xl sm:text-4xl font-display text-neon-cyan group-hover:animate-street-bounce">24/7</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-vintage uppercase tracking-wider">Studio</p>
              </div>
              <div className="text-center lg:text-left p-4 bg-card/30 rounded-xl border border-border/50 backdrop-blur-sm hover:border-neon-yellow/30 transition-all duration-300 group">
                <p className="text-3xl sm:text-4xl font-display text-neon-green group-hover:animate-street-bounce">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-vintage uppercase tracking-wider">Original</p>
              </div>
            </div>
          </div>

          {/* Right Side - Vinyl & Decorations */}
          <div className="hidden lg:flex items-center justify-center relative h-[500px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-cyan/5 rounded-3xl" />

            {/* Vinyl Record */}
            <div className="relative">
              {/* Neon Ring */}
              <div className="absolute -inset-8 rounded-full border border-neon-pink/20 animate-pulse-ring" />
              <div className="absolute -inset-16 rounded-full border border-neon-cyan/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />

              {/* Vinyl */}
              <div className="w-64 h-64 vinyl-disc hover:animate-vinyl-spin relative">
                {/* Center Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink to-retro-orange flex items-center justify-center border-2 border-neon-yellow shadow-lg z-10">
                  <span className="text-3xl font-display text-white">D</span>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-neon-pink/20 backdrop-blur-sm border border-neon-pink/30 flex items-center justify-center animate-float shadow-[0_0_20px_rgba(255,45,124,0.4)]">
                <span className="text-2xl">🎵</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full bg-neon-cyan/20 backdrop-blur-sm border border-neon-cyan/30 flex items-center justify-center animate-float shadow-[0_0_20px_rgba(0,245,255,0.4)]" style={{ animationDelay: "0.5s" }}>
                <span className="text-xl">🔥</span>
              </div>
              <div className="absolute top-1/2 -right-12 w-12 h-12 rounded-full bg-neon-yellow/20 backdrop-blur-sm border border-neon-yellow/30 flex items-center justify-center animate-float shadow-[0_0_20px_rgba(255,230,0,0.4)]" style={{ animationDelay: "1s" }}>
                <span className="text-lg">🎤</span>
              </div>
            </div>

            {/* Equalizer Bars */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-12">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-neon-pink via-neon-yellow to-neon-cyan rounded-t opacity-70"
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animation: `equalizer ${0.4 + Math.random() * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent animate-color-shift" />
    </section>
  );
}
