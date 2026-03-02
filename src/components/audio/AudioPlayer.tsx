"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  X,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { Track } from "./MusicLibrary";

interface AudioPlayerProps {
  track: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onClose?: () => void;
}

// Animated VU Bars
function VUBars({ isActive }: { isActive: boolean }) {
  const bars = 16;
  
  return (
    <div className="flex items-end gap-0.5 h-10">
      {Array.from({ length: bars }).map((_, i) => {
        const colors = [
          "bg-neon-green",
          "bg-neon-cyan", 
          "bg-neon-yellow",
          "bg-neon-pink",
        ];
        const colorIndex = i % colors.length;
        const height = Math.max(20, Math.random() * 100);
        
        return (
          <div
            key={i}
            className={cn(
              "w-1 rounded-sm transition-all duration-75",
              isActive ? colors[colorIndex] : "bg-muted"
            )}
            style={{
              height: isActive ? `${height}%` : "20%",
              opacity: isActive ? 1 : 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

export function AudioPlayer({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.audioFilePath;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    } else {
      onNext?.();
    }
  }, [isRepeat, onNext]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Player Container */}
      <div className="bg-vintage-dark border-t border-border backdrop-blur-lg">
        {/* Top Gradient Line */}
        <div className="h-[3px] bg-gradient-to-r from-retro-orange via-neon-pink to-neon-cyan" />

        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Left: Track Info */}
            <div className="flex items-center gap-4 min-w-0 sm:w-64">
              {/* Cover Art */}
              <div 
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border",
                  isPlaying && "animate-vintage-pulse ring-2 ring-neon-pink/50"
                )}
              >
                {track.coverImagePath ? (
                  <img
                    src={track.coverImagePath}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-retro-orange to-neon-pink flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>

              {/* Track Details */}
              <div className="min-w-0">
                <p className="text-sm font-bold text-vintage-paper truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground font-vintage truncate">{track.artist}</p>
              </div>
            </div>

            {/* Center: Controls */}
            <div className="flex-1 w-full sm:w-auto">
              {/* Transport Controls */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  className="text-muted-foreground hover:text-neon-cyan hover:bg-muted/30"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

                <Button
                  onClick={onPlayPause}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-retro-orange to-neon-pink hover:from-retro-orange/80 hover:to-neon-pink/80 text-white shadow-[0_0_15px_rgba(232,93,4,0.4)]"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  className="text-muted-foreground hover:text-neon-cyan hover:bg-muted/30"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-10 text-right font-vintage">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="flex-1 [&_[role=slider]]:bg-neon-pink [&_[role=slider]]:shadow-[0_0_10px_rgba(255,45,124,0.5)] [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-retro-orange [&_.bg-primary]:to-neon-pink"
                />
                <span className="text-xs text-muted-foreground w-10 font-vintage">
                  {formatTime(duration || track.duration)}
                </span>
              </div>
            </div>

            {/* Right: VU Meters & Volume */}
            <div className="hidden sm:flex items-center gap-4">
              {/* VU Bars */}
              <div className="bg-card px-3 py-2 rounded-lg border border-border">
                <VUBars isActive={isPlaying} />
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={cn(
                    "text-muted-foreground hover:text-neon-yellow hover:bg-muted/30",
                    isRepeat && "text-neon-yellow"
                  )}
                >
                  <Repeat className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-muted-foreground hover:text-neon-cyan hover:bg-muted/30"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>

                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(val) => {
                    setVolume(val[0] / 100);
                    setIsMuted(val[0] === 0);
                  }}
                  className="w-20"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-neon-pink hover:bg-muted/30"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Track Metadata Bar */}
          <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-center gap-4 text-xs text-muted-foreground font-vintage overflow-x-auto">
            {track.genre && (
              <span className="shrink-0">
                <span className="text-retro-orange">Genre:</span> {track.genre}
              </span>
            )}
            {track.bpm && (
              <span className="shrink-0">
                <span className="text-neon-cyan">BPM:</span> {track.bpm}
              </span>
            )}
            {track.year && (
              <span className="shrink-0">
                <span className="text-neon-yellow">Year:</span> {track.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
