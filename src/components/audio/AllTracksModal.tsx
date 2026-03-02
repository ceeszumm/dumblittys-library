"use client";

import { useState } from "react";
import { X, Search, Music, Play, Pause, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Track } from "./MusicLibrary";

interface AllTracksModalProps {
  tracks: Track[];
  isOpen: boolean;
  onClose: () => void;
  activeTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onTrackInfo: (track: Track) => void;
}

export function AllTracksModal({
  tracks,
  isOpen,
  onClose,
  activeTrack,
  isPlaying,
  onTrackSelect,
  onTrackInfo,
}: AllTracksModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"title" | "year" | "artist">("title");
  const [filterType, setFilterType] = useState<"all" | "original" | "cover">("all");

  if (!isOpen) return null;

  // Filter and sort tracks
  const filteredTracks = tracks
    .filter((track) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre?.toLowerCase().includes(query)
      );
    })
    .filter((track) => {
      if (filterType === "all") return true;
      return track.type === filterType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "artist":
          return a.artist.localeCompare(b.artist);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Gradient colors for cards
  const gradients = [
    "from-retro-orange/80 to-neon-pink/80",
    "from-neon-cyan/80 to-neon-green/80",
    "from-neon-yellow/80 to-retro-rust/80",
    "from-neon-purple/80 to-neon-pink/80",
    "from-retro-gold/80 to-retro-orange/80",
  ];

  return (
    <div
      className="fixed inset-0 z-50 track-modal-overlay flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="track-modal-content w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl animate-slide-up relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-display">
              <span className="text-neon-cyan neon-glow">All</span>{" "}
              <span className="text-retro-orange">Tracks</span>
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-vintage-paper hover:border-neon-pink transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-vintage-paper placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-200"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "year" | "artist")}
              className="px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-vintage-paper focus:outline-none focus:border-neon-cyan transition-all duration-200 cursor-pointer"
            >
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="artist">Sort by Artist</option>
            </select>

            {/* Type Filter */}
            <div className="flex rounded-xl overflow-hidden border border-border">
              <button
                onClick={() => setFilterType("all")}
                className={cn(
                  "px-3 py-2.5 text-xs font-display uppercase tracking-wider transition-all duration-200",
                  filterType === "all"
                    ? "bg-neon-cyan text-black"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("original")}
                className={cn(
                  "px-3 py-2.5 text-xs font-display uppercase tracking-wider transition-all duration-200",
                  filterType === "original"
                    ? "bg-neon-green text-black"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                Original
              </button>
              <button
                onClick={() => setFilterType("cover")}
                className={cn(
                  "px-3 py-2.5 text-xs font-display uppercase tracking-wider transition-all duration-200",
                  filterType === "cover"
                    ? "bg-neon-yellow text-black"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                Cover
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-border">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-3 py-2.5 transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-neon-pink text-white"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-2.5 transition-all duration-200",
                  viewMode === "list"
                    ? "bg-neon-pink text-white"
                    : "bg-muted/50 text-muted-foreground hover:text-vintage-paper"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track Count */}
          <p className="text-sm text-muted-foreground mt-3 font-vintage">
            {filteredTracks.length} track{filteredTracks.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Track List */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {filteredTracks.length > 0 ? (
            viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredTracks.map((track, index) => {
                  const gradientIndex = track.id.charCodeAt(0) % gradients.length;
                  const isActive = activeTrack?.id === track.id;
                  const trackIsPlaying = isPlaying && isActive;

                  return (
                    <div
                      key={track.id}
                      onClick={() => onTrackInfo(track)}
                      className={cn(
                        "group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300",
                        isActive
                          ? "ring-2 ring-neon-pink shadow-[0_0_20px_rgba(255,45,124,0.3)] scale-105"
                          : "hover:scale-[1.02] hover:shadow-lg"
                      )}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Cover Image */}
                      <div className="aspect-square relative">
                        {track.coverImagePath ? (
                          <img
                            src={track.coverImagePath}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={cn(
                              "w-full h-full bg-gradient-to-br flex items-center justify-center",
                              gradients[gradientIndex]
                            )}
                          >
                            <Music className="w-12 h-12 text-white/30" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark via-vintage-dark/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                        {/* Street Art Corner Tag */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-neon-yellow text-vintage-dark text-[10px] font-display rounded transform rotate-3 shadow-md">
                          {track.year}
                        </div>

                        {/* Type Badge */}
                        <div className="absolute top-10 right-2">
                          <div className={cn(
                            "px-2 py-0.5 text-[8px] font-display uppercase tracking-wider rounded transform rotate-2",
                            track.type === "original"
                              ? "bg-neon-green/90 text-black"
                              : "bg-neon-yellow/90 text-black"
                          )}>
                            {track.type}
                          </div>
                        </div>

                        {/* Playing Indicator */}
                        {trackIsPlaying && (
                          <div className="absolute top-2 left-2 flex gap-0.5">
                            <div className="w-1 h-3 bg-neon-pink rounded-full animate-[equalizer_0.5s_ease-in-out_infinite]" />
                            <div className="w-1 h-3 bg-neon-cyan rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_0.1s]" />
                            <div className="w-1 h-3 bg-neon-yellow rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_0.2s]" />
                          </div>
                        )}

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onTrackSelect(track);
                            }}
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200",
                              trackIsPlaying
                                ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,45,124,0.5)]"
                                : "bg-vintage-paper/90 text-vintage-dark hover:bg-white"
                            )}
                          >
                            {trackIsPlaying ? (
                              <Pause className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5 ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Track Info */}
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-sm font-bold text-vintage-paper truncate">
                            {track.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate font-vintage">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      {/* Genre Tag */}
                      {track.genre && (
                        <div className="absolute bottom-12 left-3">
                          <span className="text-[9px] px-2 py-0.5 bg-retro-orange/20 text-retro-orange border border-retro-orange/30 rounded uppercase tracking-wider">
                            {track.genre}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-2">
                {filteredTracks.map((track, index) => {
                  const gradientIndex = track.id.charCodeAt(0) % gradients.length;
                  const isActive = activeTrack?.id === track.id;
                  const trackIsPlaying = isPlaying && isActive;

                  return (
                    <div
                      key={track.id}
                      onClick={() => onTrackInfo(track)}
                      className={cn(
                        "group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200",
                        isActive
                          ? "bg-neon-pink/10 border border-neon-pink/30"
                          : "bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border"
                      )}
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {track.coverImagePath ? (
                          <img
                            src={track.coverImagePath}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={cn(
                              "w-full h-full bg-gradient-to-br flex items-center justify-center",
                              gradients[gradientIndex]
                            )}
                          >
                            <Music className="w-5 h-5 text-white/50" />
                          </div>
                        )}

                        {/* Playing EQ */}
                        {trackIsPlaying && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-0.5">
                            <div className="w-0.5 h-3 bg-neon-pink rounded-full animate-[equalizer_0.5s_ease-in-out_infinite]" />
                            <div className="w-0.5 h-3 bg-neon-cyan rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_0.1s]" />
                            <div className="w-0.5 h-3 bg-neon-yellow rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_0.2s]" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-bold truncate",
                          isActive ? "text-neon-pink" : "text-vintage-paper"
                        )}>
                          {track.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate font-vintage">
                          {track.artist}
                        </p>
                      </div>

                      {/* Genre & Year */}
                      <div className="hidden sm:flex items-center gap-3">
                        <div className={cn(
                          "px-2 py-1 text-[10px] font-display uppercase tracking-wider rounded",
                          track.type === "original"
                            ? "bg-neon-green/20 text-neon-green"
                            : "bg-neon-yellow/20 text-neon-yellow"
                        )}>
                          {track.type}
                        </div>
                        {track.genre && (
                          <span className="text-xs px-2 py-1 bg-muted/50 rounded text-muted-foreground uppercase tracking-wider">
                            {track.genre}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-vintage">
                          {track.year}
                        </span>
                      </div>

                      {/* Duration */}
                      <span className="text-sm text-muted-foreground font-vintage w-12 text-right">
                        {formatDuration(track.duration)}
                      </span>

                      {/* Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTrackSelect(track);
                        }}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                          trackIsPlaying
                            ? "bg-neon-pink text-white"
                            : "bg-muted/50 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-neon-pink hover:text-white"
                        )}
                      >
                        {trackIsPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 border border-border flex items-center justify-center">
                <Music className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-vintage text-lg">
                {searchQuery ? `No tracks found for "${searchQuery}"` : "No tracks available"}
              </p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                {searchQuery ? "Try a different search term" : "Add tracks from the admin panel"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse delay-100" />
              <div className="w-1.5 h-1.5 rounded-full bg-neon-yellow animate-pulse delay-200" />
            </div>
            <span className="font-vintage">Dumblitty's Library</span>
          </div>
        </div>
      </div>
    </div>
  );
}
