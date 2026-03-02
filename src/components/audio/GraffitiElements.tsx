"use client";

import { cn } from "@/lib/utils";

// Various graffiti tags and scribbles
const graffitiTags = [
  { text: "DUMB", rotation: -12, color: "neon-pink" },
  { text: "LITTY", rotation: 8, color: "neon-cyan" },
  { text: "BEATS", rotation: -5, color: "neon-yellow" },
  { text: "RAW", rotation: 15, color: "retro-orange" },
  { text: "FIRE", rotation: -8, color: "neon-pink" },
  { text: "VIBES", rotation: 10, color: "neon-cyan" },
  { text: "DOPE", rotation: -3, color: "neon-green" },
  { text: "REAL", rotation: 7, color: "neon-yellow" },
  { text: "LOUD", rotation: -15, color: "retro-orange" },
  { text: "STREET", rotation: 5, color: "neon-pink" },
  { text: "UNDER", rotation: -10, color: "neon-cyan" },
  { text: "GROUND", rotation: 12, color: "neon-yellow" },
];

// Scribble patterns
const scribbles = [
  "M-20,10 Q-10,0 0,10 T20,10",
  "M-15,-5 Q0,-15 15,-5 T30,-5",
  "M-10,0 L10,0 M0,-10 L0,10",
  "M-20,-10 C-10,-20 10,0 20,-10",
  "M-15,5 Q-5,-5 5,5 T15,5",
];

interface GraffitiTagProps {
  text?: string;
  rotation?: number;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

export function GraffitiTag({
  text,
  rotation = -5,
  color = "neon-pink",
  size = "lg",
  className,
  animated = true,
}: GraffitiTagProps) {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl",
    md: "text-4xl sm:text-5xl",
    lg: "text-5xl sm:text-6xl lg:text-7xl",
    xl: "text-6xl sm:text-7xl lg:text-8xl",
  };

  const colorClasses: Record<string, string> = {
    "neon-pink": "text-neon-pink/15",
    "neon-cyan": "text-neon-cyan/15",
    "neon-yellow": "text-neon-yellow/15",
    "neon-green": "text-neon-green/15",
    "retro-orange": "text-retro-orange/15",
    "neon-purple": "text-neon-purple/15",
  };

  return (
    <div
      className={cn(
        "font-display select-none pointer-events-none",
        sizeClasses[size],
        colorClasses[color] || colorClasses["neon-pink"],
        animated && "animate-float",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </div>
  );
}

interface ScribbleLineProps {
  color?: string;
  className?: string;
}

export function ScribbleLine({ color = "neon-pink", className }: ScribbleLineProps) {
  const colorMap: Record<string, string> = {
    "neon-pink": "#FF2D7C",
    "neon-cyan": "#00F5FF",
    "neon-yellow": "#FFE600",
    "neon-green": "#39FF14",
    "retro-orange": "#E85D04",
  };

  return (
    <svg
      viewBox="0 0 100 30"
      className={cn("w-24 h-6 opacity-20", className)}
      fill="none"
    >
      <path
        d={scribbles[Math.floor(Math.random() * scribbles.length)]}
        stroke={colorMap[color] || colorMap["neon-pink"]}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-scribble"
      />
    </svg>
  );
}

interface SprayDripProps {
  color?: string;
  height?: number;
  delay?: number;
  className?: string;
}

export function SprayDrip({ color = "neon-pink", height = 40, delay = 0, className }: SprayDripProps) {
  const colorMap: Record<string, string> = {
    "neon-pink": "#FF2D7C",
    "neon-cyan": "#00F5FF",
    "neon-yellow": "#FFE600",
    "neon-green": "#39FF14",
    "retro-orange": "#E85D04",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className="w-1 rounded-full animate-drip"
        style={{
          background: `linear-gradient(to bottom, ${colorMap[color] || colorMap["neon-pink"]}, transparent)`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

interface GraffitiWallProps {
  section: "hero" | "library" | "about" | "contact" | "footer";
  className?: string;
}

export function GraffitiWall({ section, className }: GraffitiWallProps) {
  // Different graffiti for each section
  const sectionGraffiti: Record<string, Array<{ text: string; rotation: number; color: string; position: string }>> = {
    hero: [
      { text: "BEATS", rotation: -12, color: "neon-pink", position: "top-16 left-8" },
      { text: "RAW", rotation: 8, color: "neon-cyan", position: "bottom-20 right-12" },
      { text: "STREET", rotation: -5, color: "neon-yellow", position: "top-1/3 right-8" },
      { text: "LOUD", rotation: 15, color: "retro-orange", position: "bottom-1/3 left-16" },
    ],
    library: [
      { text: "DOPE", rotation: -8, color: "neon-cyan", position: "top-8 left-12" },
      { text: "FIRE", rotation: 10, color: "neon-pink", position: "bottom-16 right-8" },
      { text: "VIBES", rotation: -3, color: "neon-green", position: "top-1/2 left-4" },
      { text: "REAL", rotation: 7, color: "neon-yellow", position: "top-20 right-16" },
    ],
    about: [
      { text: "DUMB", rotation: -10, color: "neon-pink", position: "top-12 right-8" },
      { text: "LITTY", rotation: 5, color: "neon-cyan", position: "bottom-12 left-12" },
      { text: "UNDER", rotation: -6, color: "neon-yellow", position: "top-1/3 left-6" },
    ],
    contact: [
      { text: "CONNECT", rotation: -8, color: "neon-pink", position: "top-8 left-8" },
      { text: "REACH", rotation: 12, color: "neon-cyan", position: "bottom-16 right-12" },
      { text: "OUT", rotation: -4, color: "neon-yellow", position: "top-1/2 right-6" },
    ],
    footer: [
      { text: "PEACE", rotation: -5, color: "neon-pink", position: "top-8 right-12" },
      { text: "OUT", rotation: 8, color: "neon-cyan", position: "top-8 left-8" },
    ],
  };

  const tags = sectionGraffiti[section] || [];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {tags.map((tag, index) => (
        <GraffitiTag
          key={`${section}-${index}`}
          text={tag.text}
          rotation={tag.rotation}
          color={tag.color}
          size="lg"
          className={cn(tag.position, "absolute hidden lg:block")}
          animated
        />
      ))}
    </div>
  );
}

// Random spray paint splatters
interface SpraySplatterProps {
  color?: string;
  size?: number;
  className?: string;
}

export function SpraySplatter({ color = "neon-pink", size = 100, className }: SpraySplatterProps) {
  const colorMap: Record<string, string> = {
    "neon-pink": "rgba(255, 45, 124, 0.15)",
    "neon-cyan": "rgba(0, 245, 255, 0.15)",
    "neon-yellow": "rgba(255, 230, 0, 0.15)",
    "neon-green": "rgba(57, 255, 20, 0.15)",
    "retro-orange": "rgba(232, 93, 4, 0.15)",
  };

  return (
    <div
      className={cn("rounded-full blur-2xl animate-morph", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color] || colorMap["neon-pink"]} 0%, transparent 70%)`,
      }}
    />
  );
}

// Paint drips collection
interface PaintDripsProps {
  position?: "left" | "right" | "center";
  className?: string;
}

export function PaintDrips({ position = "left", className }: PaintDripsProps) {
  const colors = ["neon-pink", "neon-cyan", "neon-yellow", "retro-orange"];
  const positionClasses = {
    left: "left-4",
    right: "right-4",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div className={cn("absolute top-0 flex gap-3", positionClasses[position], className)}>
      {colors.map((color, i) => (
        <SprayDrip key={i} color={color} height={30 + i * 15} delay={i * 0.3} />
      ))}
    </div>
  );
}

// Corner tags with drip effect
interface CornerTagProps {
  text: string;
  color?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function CornerTag({ text, color = "neon-pink", position = "top-right", className }: CornerTagProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  const colorClasses: Record<string, string> = {
    "neon-pink": "bg-neon-pink text-white",
    "neon-cyan": "bg-neon-cyan text-vintage-dark",
    "neon-yellow": "bg-neon-yellow text-vintage-dark",
    "neon-green": "bg-neon-green text-vintage-dark",
    "retro-orange": "bg-retro-orange text-white",
  };

  return (
    <div className={cn("absolute z-10", positionClasses[position], className)}>
      <div
        className={cn(
          "px-3 py-1 font-display text-sm uppercase tracking-wider transform -rotate-3 shadow-lg relative",
          colorClasses[color] || colorClasses["neon-pink"]
        )}
      >
        {text}
        {/* Drip effect */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-4 rounded-b animate-drip"
          style={{ background: `linear-gradient(to bottom, currentColor, transparent)` }}
        />
      </div>
    </div>
  );
}

// Animated scribble background
export function ScribbleBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-5", className)}>
      {/* Random SVG scribbles */}
      <svg className="absolute top-10 left-10 w-32 h-32" viewBox="0 0 100 100">
        <path
          d="M10,50 Q25,25 50,50 T90,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-neon-pink animate-scribble"
        />
      </svg>
      <svg className="absolute top-1/4 right-20 w-24 h-24" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" className="text-neon-cyan animate-pulse" />
      </svg>
      <svg className="absolute bottom-20 left-1/4 w-28 h-28" viewBox="0 0 100 100">
        <path
          d="M20,20 L80,80 M80,20 L20,80"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neon-yellow animate-scribble"
        />
      </svg>
      <svg className="absolute bottom-1/3 right-1/4 w-20 h-20" viewBox="0 0 100 100">
        <path
          d="M50,10 L90,90 L10,90 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-neon-green animate-pulse"
        />
      </svg>
    </div>
  );
}

// Export all graffiti tags for random selection
export { graffitiTags };
