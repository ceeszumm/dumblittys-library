"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Download,
  Disc3,
  Music,
  Mic2,
  Calendar,
  Clock,
  Gauge,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Track } from "./MusicLibrary";

interface TrackModalProps {
  track: Track | null;
  isOpen: boolean;
  isPlaying: boolean;
  onClose: () => void;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  allTracks?: Track[];
}

export function TrackModal({
  track,
  isOpen,
  isPlaying,
  onClose,
  onPlayPause,
  onNext,
  onPrevious,
  allTracks = [],
}: TrackModalProps) {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [activeTab, setActiveTab] = useState<"lyrics" | "info">("lyrics");
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !track) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate gradient colors based on track id
  const gradients = [
    "from-retro-orange to-neon-pink",
    "from-neon-cyan to-neon-green",
    "from-neon-yellow to-retro-rust",
    "from-neon-purple to-neon-pink",
    "from-retro-gold to-retro-orange",
  ];
  const gradientIndex = track.id.charCodeAt(0) % gradients.length;

  return (
    <div
      className="fixed inset-0 z-50 track-modal-overlay flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="track-modal-content w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl animate-slide-up relative"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-vintage-dark/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-vintage-paper hover:border-neon-pink transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Vinyl */}
          <div className="flex-shrink-0 p-8 flex items-center justify-center bg-gradient-to-br from-vintage-dark to-background relative overflow-hidden">
            {/* Brick Pattern Background */}
            <div className="absolute inset-0 brick-pattern opacity-20" />

            {/* Vinyl Container */}
            <div className="relative">
              {/* Vinyl Glow Effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-full blur-xl transition-opacity duration-500",
                  isPlaying
                    ? "opacity-60"
                    : "opacity-30"
                )}
                style={{
                  background: `radial-gradient(circle, rgba(232, 93, 4, 0.3) 0%, transparent 70%)`,
                }}
              />

              {/* Vinyl Record */}
              <div
                className={cn(
                  "relative w-48 h-48 sm:w-56 sm:h-56 vinyl-disc",
                  isPlaying && "vinyl-spinning"
                )}
              >
                {/* Center Label with Cover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full overflow-hidden border-2 border-retro-gold z-10">
                  {track.coverImagePath ? (
                    <img
                      src={track.coverImagePath}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={cn(
                      "w-full h-full bg-gradient-to-br flex items-center justify-center",
                      gradients[gradientIndex]
                    )}>
                      <Music className="w-4 h-4 text-white/80" />
                    </div>
                  )}
                </div>
              </div>

              {/* Equalizer Bars (when playing) */}
              {isPlaying && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1">
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Info & Controls */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
            {/* Track Header */}
            <div className="mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-display text-vintage-paper mb-2 animate-neon-sign text-neon-cyan">
                    {track.title}
                  </h2>
                  <p className="text-lg text-retro-orange font-vintage">
                    {track.artist}
                  </p>
                </div>

                {/* Type Badge */}
                <div
                  className={cn(
                    "px-3 py-1 rounded text-xs font-display uppercase tracking-wider",
                    track.type === "original"
                      ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                      : "bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30"
                  )}
                >
                  {track.type}
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  {track.year}
                </span>
                <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-neon-pink" />
                  {formatDuration(track.duration)}
                </span>
                {track.bpm && (
                  <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                    <Gauge className="w-4 h-4 text-neon-yellow" />
                    {track.bpm} BPM
                  </span>
                )}
                {track.genre && (
                  <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
                    <Music className="w-4 h-4 text-retro-orange" />
                    {track.genre}
                  </span>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("lyrics")}
                className={cn(
                  "px-4 py-2 rounded-lg font-vintage text-sm uppercase tracking-wider transition-all duration-200",
                  activeTab === "lyrics"
                    ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,45,124,0.4)]"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                Lyrics
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={cn(
                  "px-4 py-2 rounded-lg font-vintage text-sm uppercase tracking-wider transition-all duration-200",
                  activeTab === "info"
                    ? "bg-neon-cyan text-vintage-dark shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                Info
              </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[200px]">
              {activeTab === "lyrics" && (
                <div className="lyrics-container p-4 rounded-xl border border-border overflow-y-auto max-h-64">
                  {track.lyrics ? (
                    <pre className="text-vintage-paper/80 whitespace-pre-wrap text-sm leading-relaxed">
                      {track.lyrics}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Mic2 className="w-12 h-12 mb-3 opacity-50" />
                      <p className="font-vintage">No lyrics available</p>
                      <p className="text-xs mt-1">Add lyrics in admin panel</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "info" && (
                <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/20">
                  {track.originalArtist && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center flex-shrink-0">
                        <Mic2 className="w-4 h-4 text-neon-pink" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Original Artist</p>
                        <p className="text-vintage-paper font-vintage">{track.originalArtist}</p>
                      </div>
                    </div>
                  )}
                  {track.equipmentUsed && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Settings2 className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Equipment Used</p>
                        <p className="text-vintage-paper font-vintage">{track.equipmentUsed}</p>
                      </div>
                    </div>
                  )}
                  {track.recordingStudio && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-yellow/20 flex items-center justify-center flex-shrink-0">
                        <Disc3 className="w-4 h-4 text-neon-yellow" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Recording Studio</p>
                        <p className="text-vintage-paper font-vintage">{track.recordingStudio}</p>
                      </div>
                    </div>
                  )}
                  {track.description && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Description</p>
                      <p className="text-vintage-paper/80 text-sm leading-relaxed">{track.description}</p>
                    </div>
                  )}
                  {!track.originalArtist && !track.equipmentUsed && !track.recordingStudio && !track.description && (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Settings2 className="w-10 h-10 mb-2 opacity-50" />
                      <p className="font-vintage">No additional info</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                  isLiked
                    ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,45,124,0.4)]"
                    : "bg-muted/50 text-muted-foreground hover:text-neon-pink hover:bg-neon-pink/10"
                )}
              >
                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-retro-orange hover:bg-retro-orange/10 transition-all duration-200">
                <Download className="w-5 h-5" />
              </button>

              <div className="flex-1" />

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-vintage-paper transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-cyan"
                />
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={onPrevious}
                className="w-12 h-12 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-vintage-paper hover:border-neon-cyan transition-all duration-200"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={onPlayPause}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200",
                  isPlaying
                    ? "bg-neon-pink text-white shadow-[0_0_25px_rgba(255,45,124,0.5)] animate-pulse-ring"
                    : "bg-gradient-to-br from-retro-orange to-neon-pink text-white hover:shadow-[0_0_25px_rgba(232,93,4,0.5)]"
                )}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-1" />
                )}
              </button>
              <button
                onClick={onNext}
                className="w-12 h-12 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-vintage-paper hover:border-neon-cyan transition-all duration-200"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
