"use client";

import { useState } from "react";
import { Play, Pause, Music, ArrowRight, Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DangerSign,
  WarningSign,
  MusicZoneSign,
  StickerSign,
  CautionTape,
} from "@/components/audio/StreetSigns";
import { GraffitiTag, SpraySplatter, ScribbleBackground } from "@/components/audio/GraffitiElements";

export interface Track {
  id: string;
  title: string;
  artist: string;
  type: "original" | "cover";
  year: number;
  genre?: string;
  bpm?: number;
  duration: number;
  audioFilePath: string;
  coverImagePath?: string;
  lyrics?: string;
  originalArtist?: string;
  equipmentUsed?: string;
  recordingStudio?: string;
  description?: string;
}

interface TrackCardProps {
  track: Track;
  index: number;
  isPlaying: boolean;
  isActive: boolean;
  onClick: () => void;
  onCardClick: () => void;
}

export function TrackCard({ track, index, isPlaying, isActive, onClick, onCardClick }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const gradients = [
    "from-neon-pink/80 to-neon-purple/80",
    "from-neon-cyan/80 to-neon-green/80",
    "from-neon-yellow/80 to-retro-orange/80",
    "from-retro-orange/80 to-neon-pink/80",
    "from-neon-purple/80 to-neon-cyan/80",
  ];
  const gradientIndex = track.id.charCodeAt(0) % gradients.length;

  const streetLabels = ["HOT", "FRESH", "NEW", "DOPE", "FIRE"];

  return (
    <div
      className={cn(
        "group relative cursor-pointer transition-all duration-500 animate-fade-in",
        isActive ? "scale-105 z-10" : "hover:scale-[1.02]"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl transition-all duration-500",
          isActive
            ? "ring-2 ring-neon-pink shadow-[0_0_30px_rgba(255,45,124,0.5)]"
            : "ring-1 ring-border/50 hover:ring-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
        )}
      >
        {/* Cover Image or Gradient Background */}
        {track.coverImagePath ? (
          <img
            src={track.coverImagePath}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={cn(
            "w-full h-full bg-gradient-to-br flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
            gradients[gradientIndex]
          )}>
            <Disc3 className="w-16 h-16 text-white/30 animate-float" />
          </div>
        )}

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 transition-opacity duration-300",
            isHovered || isActive ? "opacity-95" : "opacity-80"
          )}
        />

        {/* Paint Splatter Effect on Hover */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 paint-splatter",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Track Info */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-sm sm:text-base font-bold text-vintage-paper truncate mb-1 drop-shadow-lg group-hover:text-neon-cyan transition-colors duration-300">
            {track.title}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-vintage">
            <span className="px-2 py-0.5 bg-neon-pink/20 text-neon-pink rounded border border-neon-pink/30">
              {formatDuration(track.duration)}
            </span>
            <span className="text-muted-foreground/80">{track.year}</span>
          </div>
        </div>

        {/* Street Art Corner Tag */}
        <div className="absolute top-3 right-3 street-stamp text-[10px] sm:text-xs">
          {streetLabels[index] || "PLAY"}
        </div>

        {/* Type Badge - Original or Cover */}
        <div className="absolute top-14 right-3">
          <div className={cn(
            "px-2 py-0.5 text-[9px] font-display uppercase tracking-wider rounded transform rotate-2",
            track.type === "original"
              ? "bg-neon-green/90 text-black"
              : "bg-neon-yellow/90 text-black"
          )}>
            {track.type}
          </div>
        </div>

        {/* Number Badge */}
        <div className="absolute top-3 left-3">
          <div className="relative">
            <div className="px-2 py-1 bg-neon-yellow text-black text-[10px] font-display rounded shadow-lg transform -rotate-2">
              #{index + 1}
            </div>
            {/* Drip effect */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-0 group-hover:h-4 bg-neon-yellow/50 rounded-b transition-all duration-500" />
          </div>
        </div>

        {/* Play Button */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            isHovered || isActive ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm transform",
              isPlaying
                ? "bg-neon-pink text-white shadow-[0_0_25px_rgba(255,45,124,0.6)] animate-pulse-ring"
                : "bg-vintage-paper/90 text-black hover:bg-white hover:scale-110"
            )}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>
        </div>

        {/* Equalizer Bars when Playing */}
        {isPlaying && (
          <div className="absolute top-3 left-14 flex items-end gap-0.5 h-5">
            <div className="eq-bar w-1" />
            <div className="eq-bar w-1" style={{ animationDelay: "0.1s" }} />
            <div className="eq-bar w-1" style={{ animationDelay: "0.2s" }} />
            <div className="eq-bar w-1" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      {/* Genre Tag */}
      {track.genre && (
        <div className="mt-2 flex justify-center">
          <span className="text-[10px] text-muted-foreground font-vintage uppercase tracking-wider bg-card/50 px-2 py-0.5 rounded border border-border/50">
            {track.genre}
          </span>
        </div>
      )}

      {/* Click Hint */}
      <div className={cn(
        "absolute -bottom-6 left-0 right-0 text-center text-[10px] text-muted-foreground/50 font-vintage uppercase tracking-wider transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        Click for details
      </div>
    </div>
  );
}

interface MusicLibraryProps {
  tracks: Track[];
  activeTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onTrackInfo: (track: Track) => void;
  onViewAll: () => void;
  searchQuery?: string;
}

export function MusicLibrary({
  tracks,
  activeTrack,
  isPlaying,
  onTrackSelect,
  onTrackInfo,
  onViewAll,
  searchQuery,
}: MusicLibraryProps) {
  const filteredTracks = searchQuery
    ? tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tracks;

  const featuredTracks = filteredTracks.slice(0, 5);
  const hasMoreTracks = filteredTracks.length > 5;

  return (
    <section id="library" className="py-16 sm:py-20 bg-black relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Elements */}
      <div className="absolute inset-0 brick-pattern opacity-5" />
      <div className="absolute inset-0 wall-cracks" />

      {/* Paint Splatters */}
      <SpraySplatter color="neon-cyan" size={200} className="absolute top-20 right-10" />
      <SpraySplatter color="neon-pink" size={150} className="absolute bottom-20 left-10" />
      <SpraySplatter color="neon-yellow" size={180} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Graffiti Tags - Library Section Specific */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraffitiTag text="DOPE" rotation={-8} color="neon-cyan" size="lg" className="top-8 left-12 hidden lg:block" />
        <GraffitiTag text="FIRE" rotation={10} color="neon-pink" size="lg" className="bottom-16 right-8 hidden lg:block" />
        <GraffitiTag text="VIBES" rotation={-3} color="neon-green" size="md" className="top-1/2 left-4 hidden lg:block" />
        <GraffitiTag text="REAL" rotation={7} color="neon-yellow" size="md" className="top-16 right-20 hidden lg:block" />
        <GraffitiTag text="BEATS" rotation={-12} color="retro-orange" size="md" className="bottom-32 left-1/4 hidden lg:block" />
      </div>

      {/* Scribble Background */}
      <ScribbleBackground className="opacity-10" />

      {/* Street Signs */}
      <div className="absolute top-12 right-8 hidden xl:block animate-float">
        <MusicZoneSign />
      </div>
      <div className="absolute bottom-24 left-8 hidden xl:block animate-float" style={{ animationDelay: "0.7s" }}>
        <WarningSign />
      </div>

      {/* Stickers */}
      <div className="absolute top-20 left-8 hidden lg:block">
        <StickerSign text="FEATURED" color="cyan" rotation={-5} />
      </div>
      <div className="absolute bottom-20 right-12 hidden lg:block">
        <StickerSign text="HOT SHIT" color="pink" rotation={8} />
      </div>

      {/* Caution Tape */}
      <div className="absolute top-0 left-0 right-0">
        <CautionTape />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Rebel Badge */}
          <div className="inline-block mb-4">
            <div className="rebel-badge px-4 py-2 rounded-lg text-sm animate-stamp">
              Featured Tracks
            </div>
          </div>

          {/* Title with Glitch Effect */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4">
            <span className="text-neon-cyan animate-neon-sign inline-block">Hot</span>{" "}
            <span className="text-vintage-paper graffiti-shadow">Shit</span>{" "}
            <span className="text-neon-pink animate-neon-flicker inline-block">🔥</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto font-vintage text-lg">
            The freshest picks from Dumblitty&apos;s collection. Click any card to explore.
          </p>

          {/* Animated Line */}
          <div className="w-48 h-1 mx-auto mt-6 rounded-full overflow-hidden bg-card/30">
            <div className="h-full w-1/2 bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan rounded-full animate-[slide-in-right_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Track Grid */}
        {featuredTracks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
              {featuredTracks.map((track, index) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={index}
                  isPlaying={isPlaying && activeTrack?.id === track.id}
                  isActive={activeTrack?.id === track.id}
                  onClick={() => onTrackSelect(track)}
                  onCardClick={() => onTrackInfo(track)}
                />
              ))}
            </div>

            {/* View All Button */}
            {hasMoreTracks && (
              <div className="text-center">
                <button
                  onClick={onViewAll}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-card/50 to-card/30 border border-border rounded-full text-vintage-paper font-display text-lg transition-all duration-300 hover:border-neon-pink hover:shadow-[0_0_30px_rgba(255,45,124,0.3)] hover:bg-gradient-to-r hover:from-neon-pink/20 hover:to-neon-cyan/20"
                >
                  <span className="group-hover:text-neon-cyan transition-colors">View All Tracks</span>
                  <span className="px-2 py-0.5 bg-neon-pink text-white text-xs rounded-full">
                    {filteredTracks.length}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-neon-pink" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card/50 border border-border flex items-center justify-center animate-float">
              <Music className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-2 font-vintage">
              {searchQuery
                ? `No tracks found for "${searchQuery}"`
                : "No tracks yet"}
            </p>
            <p className="text-muted-foreground/60 text-sm">
              {searchQuery
                ? "Try a different search term"
                : "Upload your first track to get started"}
            </p>
          </div>
        )}

        {/* Street Art Footer Tag */}
        <div className="absolute bottom-4 right-4 sm:right-8 opacity-20">
          <div className="font-display text-4xl sm:text-6xl text-neon-pink/30 transform -rotate-12 select-none">
            DUMB
          </div>
          <div className="font-display text-4xl sm:text-6xl text-neon-cyan/30 transform rotate-12 -mt-2 select-none">
            LITTY
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
