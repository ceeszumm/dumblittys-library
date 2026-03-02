"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Ban, Zap, Flame, Skull, Radio, Volume2, Music, Mic, Headphones, StopCircle, CircleDot } from "lucide-react";

interface StreetSignProps {
  type: "danger" | "warning" | "prohibited" | "custom" | "neon" | "graffiti";
  icon?: React.ReactNode;
  text?: string;
  subtext?: string;
  size?: "sm" | "md" | "lg";
  rotation?: number;
  className?: string;
}

export function StreetSign({
  type,
  icon,
  text,
  subtext,
  size = "md",
  rotation = -3,
  className,
}: StreetSignProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20 sm:w-24 sm:h-24",
    lg: "w-28 h-28 sm:w-32 sm:h-32",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  // Different sign styles
  const signStyles = {
    danger: "bg-red-600 border-4 border-white rounded-lg rotate-0",
    warning: "bg-yellow-400 border-4 border-black rounded-lg",
    prohibited: "bg-white border-4 border-red-600 rounded-full",
    custom: "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded",
    neon: "bg-vintage-dark border-2 border-neon-pink rounded-lg shadow-[0_0_20px_rgba(255,45,124,0.4)]",
    graffiti: "bg-concrete border-3 border-neon-cyan rounded transform",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center relative",
        sizeClasses[size],
        "transition-transform hover:scale-110 duration-300",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Sign body */}
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center p-2",
          signStyles[type]
        )}
      >
        {icon && (
          <div className={cn(iconSizes[size], type === "warning" ? "text-black" : type === "prohibited" ? "text-red-600" : type === "neon" ? "text-neon-pink" : "text-white")}>
            {icon}
          </div>
        )}
        {text && (
          <span
            className={cn(
              "font-display text-center uppercase leading-tight",
              size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-xs",
              type === "warning" ? "text-black" : type === "prohibited" ? "text-red-600" : "text-white"
            )}
          >
            {text}
          </span>
        )}
        {subtext && (
          <span
            className={cn(
              "font-vintage text-center uppercase leading-tight",
              size === "sm" ? "text-[6px]" : size === "md" ? "text-[8px]" : "text-[10px]",
              "opacity-70"
            )}
          >
            {subtext}
          </span>
        )}
      </div>

      {/* Bolt/pole effect */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600 rounded" />
    </div>
  );
}

// Pre-made rebel street signs
export function DangerSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="danger"
      icon={<AlertTriangle className="w-full h-full" />}
      text="LOUD"
      subtext="BEATS"
      rotation={-5}
      className={className}
    />
  );
}

export function NoMainstreamSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="prohibited"
      icon={<Ban className="w-full h-full" />}
      text="NO"
      subtext="MAINSTREAM"
      rotation={8}
      className={className}
    />
  );
}

export function WarningSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="warning"
      icon={<Flame className="w-full h-full" />}
      text="FIRE"
      subtext="BEATS"
      rotation={-8}
      className={className}
    />
  );
}

export function UndergroundZoneSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="neon"
      icon={<Radio className="w-full h-full" />}
      text="UNDER"
      subtext="GROUND"
      rotation={5}
      className={className}
    />
  );
}

export function MusicZoneSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="graffiti"
      icon={<Music className="w-full h-full" />}
      text="MUSIC"
      subtext="ZONE"
      rotation={-6}
      className={className}
    />
  );
}

export function VolumeWarningSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="danger"
      icon={<Volume2 className="w-full h-full" />}
      text="LOUD"
      subtext="VIBES"
      rotation={10}
      className={className}
    />
  );
}

export function MicCheckSign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="neon"
      icon={<Mic className="w-full h-full" />}
      text="MIC"
      subtext="CHECK"
      rotation={-4}
      className={className}
    />
  );
}

export function HeadphonesOnlySign({ className }: { className?: string }) {
  return (
    <StreetSign
      type="custom"
      icon={<Headphones className="w-full h-full" />}
      text="LISTEN"
      subtext="CLOSELY"
      rotation={7}
      className={className}
    />
  );
}

// Sticker-style signs
interface StickerSignProps {
  text: string;
  color?: "pink" | "cyan" | "yellow" | "green" | "orange";
  rotation?: number;
  className?: string;
}

export function StickerSign({ text, color = "pink", rotation = 5, className }: StickerSignProps) {
  const colorClasses = {
    pink: "bg-neon-pink text-white",
    cyan: "bg-neon-cyan text-vintage-dark",
    yellow: "bg-neon-yellow text-vintage-dark",
    green: "bg-neon-green text-vintage-dark",
    orange: "bg-retro-orange text-white",
  };

  return (
    <div
      className={cn(
        "px-4 py-2 font-display uppercase tracking-wider text-sm relative",
        colorClasses[color],
        "shadow-lg transform hover:scale-105 transition-transform duration-200",
        "before:absolute before:inset-0 before:bg-black/10 before:rounded",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
      {/* Tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-200/60 opacity-70" />
    </div>
  );
}

// Neon box sign
interface NeonBoxSignProps {
  text: string;
  subtext?: string;
  color?: "pink" | "cyan" | "yellow";
  blinking?: boolean;
  className?: string;
}

export function NeonBoxSign({ text, subtext, color = "pink", blinking = false, className }: NeonBoxSignProps) {
  const colorStyles = {
    pink: {
      border: "border-neon-pink",
      text: "text-neon-pink",
      shadow: "shadow-[0_0_30px_rgba(255,45,124,0.5)]",
    },
    cyan: {
      border: "border-neon-cyan",
      text: "text-neon-cyan",
      shadow: "shadow-[0_0_30px_rgba(0,245,255,0.5)]",
    },
    yellow: {
      border: "border-neon-yellow",
      text: "text-neon-yellow",
      shadow: "shadow-[0_0_30px_rgba(255,230,0,0.5)]",
    },
  };

  const style = colorStyles[color];

  return (
    <div
      className={cn(
        "px-6 py-4 bg-vintage-dark/80 border-2 rounded-lg backdrop-blur-sm",
        style.border,
        style.shadow,
        blinking && "animate-neon-sign",
        className
      )}
    >
      <p className={cn("font-display text-xl uppercase tracking-wider", style.text)}>{text}</p>
      {subtext && (
        <p className="font-vintage text-xs text-muted-foreground uppercase tracking-wider mt-1">{subtext}</p>
      )}
    </div>
  );
}

// Road marking style
interface RoadMarkingProps {
  text: string;
  className?: string;
}

export function RoadMarking({ text, className }: RoadMarkingProps) {
  return (
    <div
      className={cn(
        "px-8 py-4 bg-yellow-400 text-black font-display text-lg uppercase tracking-widest",
        "transform -skew-x-6 relative overflow-hidden",
        className
      )}
    >
      {/* Road texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-px bg-black/30 absolute top-1/3" />
        <div className="w-full h-px bg-black/30 absolute bottom-1/3" />
      </div>
      <span className="relative">{text}</span>
    </div>
  );
}

// Arrow sign
interface ArrowSignProps {
  direction: "left" | "right" | "up" | "down";
  text: string;
  className?: string;
}

export function ArrowSign({ direction, text, className }: ArrowSignProps) {
  const arrows = {
    left: "←",
    right: "→",
    up: "↑",
    down: "↓",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-white/90 border-2 border-black",
        "transform -rotate-2 font-display uppercase tracking-wider text-sm",
        className
      )}
    >
      {direction === "left" && <span className="text-xl">{arrows.left}</span>}
      <span className="text-black">{text}</span>
      {direction === "right" && <span className="text-xl">{arrows.right}</span>}
    </div>
  );
}

// Caution tape
interface CautionTapeProps {
  className?: string;
}

export function CautionTape({ className }: CautionTapeProps) {
  return (
    <div
      className={cn(
        "h-6 bg-yellow-400 relative overflow-hidden",
        className
      )}
    >
      {/* Stripes */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            black 10px,
            black 20px
          )`,
        }}
      />
    </div>
  );
}

// Street pole with signs
interface StreetPoleProps {
  signs: Array<{ type: "danger" | "warning" | "prohibited" | "neon"; icon?: React.ReactNode; text?: string; subtext?: string }>;
  className?: string;
}

export function StreetPole({ signs, className }: StreetPoleProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Signs stacked */}
      <div className="flex flex-col gap-2 items-center">
        {signs.map((sign, i) => (
          <StreetSign
            key={i}
            type={sign.type}
            icon={sign.icon}
            text={sign.text}
            subtext={sign.subtext}
            size="sm"
            rotation={i % 2 === 0 ? -3 : 3}
          />
        ))}
      </div>
      {/* Pole */}
      <div className="w-2 h-32 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b mt-2" />
    </div>
  );
}
