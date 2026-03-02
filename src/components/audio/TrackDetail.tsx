"use client";

import {
  X,
  Play,
  Pause,
  Clock,
  Music,
  Calendar,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Track } from "./MusicLibrary";

interface TrackDetailProps {
  track: Track | null;
  isOpen: boolean;
  isPlaying: boolean;
  onClose: () => void;
  onPlayPause: () => void;
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function TrackDetail({
  track,
  isOpen,
  isPlaying,
  onClose,
  onPlayPause,
}: TrackDetailProps) {
  if (!track) return null;

  const gradients = [
    "from-retro-orange to-neon-pink",
    "from-neon-cyan to-neon-green",
    "from-neon-yellow to-retro-rust",
    "from-neon-purple to-neon-pink",
    "from-retro-gold to-retro-orange",
  ];
  const gradientIndex = track.id.charCodeAt(0) % gradients.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-vintage-dark border-border text-vintage-paper">
        {/* Header */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          {/* Cover Background */}
          {track.coverImagePath ? (
            <img
              src={track.coverImagePath}
              alt={track.title}
              className="w-full h-full object-cover opacity-40"
            />
          ) : (
            <div className={cn(
              "w-full h-full bg-gradient-to-br",
              gradients[gradientIndex]
            )} />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vintage-dark via-vintage-dark/80 to-transparent" />

          {/* Vintage Texture */}
          <div className="absolute inset-0 vintage-scratches opacity-20" />

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-vintage-paper/80 hover:text-vintage-paper hover:bg-vintage-dark/50"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Center Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl sm:text-4xl font-display text-vintage-paper mb-2 drop-shadow-lg">
              {track.title}
            </h2>
            <p className="text-muted-foreground font-vintage">{track.artist}</p>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-neon-yellow text-vintage-dark text-sm font-display rounded shadow-lg">
            {track.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Play Button */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={onPlayPause}
              className={cn(
                "w-16 h-16 rounded-full",
                isPlaying
                  ? "bg-neon-pink shadow-[0_0_20px_rgba(255,45,124,0.5)]"
                  : "bg-gradient-to-r from-retro-orange to-neon-pink"
              )}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </Button>
            <div>
              <p className="text-muted-foreground text-sm font-vintage">Click to</p>
              <p className="text-vintage-paper font-bold">{isPlaying ? "Pause" : "Play"}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-card rounded-lg p-3 text-center border border-border">
              <Clock className="w-5 h-5 text-retro-orange mx-auto mb-1" />
              <p className="text-lg font-bold text-vintage-paper">{formatDuration(track.duration)}</p>
              <p className="text-xs text-muted-foreground font-vintage">Duration</p>
            </div>
            <div className="bg-card rounded-lg p-3 text-center border border-border">
              <Gauge className="w-5 h-5 text-neon-cyan mx-auto mb-1" />
              <p className="text-lg font-bold text-vintage-paper">{track.bpm || "—"}</p>
              <p className="text-xs text-muted-foreground font-vintage">BPM</p>
            </div>
            <div className="bg-card rounded-lg p-3 text-center border border-border">
              <Calendar className="w-5 h-5 text-neon-green mx-auto mb-1" />
              <p className="text-lg font-bold text-vintage-paper">{track.year}</p>
              <p className="text-xs text-muted-foreground font-vintage">Released</p>
            </div>
            <div className="bg-card rounded-lg p-3 text-center border border-border">
              <Music className="w-5 h-5 text-neon-yellow mx-auto mb-1" />
              <p className="text-lg font-bold text-vintage-paper truncate px-1">{track.genre || "—"}</p>
              <p className="text-xs text-muted-foreground font-vintage">Genre</p>
            </div>
          </div>

          {/* Description */}
          {track.description && (
            <div className="mb-6">
              <h3 className="text-lg font-display text-neon-cyan mb-2">
                About This Track
              </h3>
              <p className="text-muted-foreground leading-relaxed">{track.description}</p>
            </div>
          )}

          {/* Equipment */}
          {track.equipmentUsed && (
            <div className="mb-6 p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1 font-vintage">Equipment</p>
              <p className="text-vintage-paper font-medium">{track.equipmentUsed}</p>
            </div>
          )}

          {/* Lyrics */}
          {track.lyrics && (
            <div className="mt-6">
              <h3 className="text-lg font-display text-neon-pink mb-3">
                Lyrics 🎤
              </h3>
              <div className="p-4 bg-card rounded-lg border border-border text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed max-h-64 overflow-y-auto font-vintage">
                {track.lyrics}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
