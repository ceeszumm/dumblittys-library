"use client";

import { useState } from "react";
import { Mic, Music, Headphones, Edit2, Save, X, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { GraffitiTag, SpraySplatter, ScribbleBackground } from "@/components/audio/GraffitiElements";
import { UndergroundZoneSign, StickerSign, NeonBoxSign, CautionTape } from "@/components/audio/StreetSigns";

interface AboutData {
  title: string;
  bio: string;
  imageUrl?: string;
}

interface AboutSectionProps {
  isAdmin?: boolean;
  aboutData?: AboutData;
  onUpdate?: (data: AboutData) => Promise<void>;
}

const defaultData: AboutData = {
  title: "About Dumblitty",
  bio: "Welcome to my personal music library. This is where I share my tracks, my creative journey, and my passion for music. Every beat, every lyric, every vibe - it's all here. Raw and unfiltered from the streets.",
  imageUrl: "",
};

export function AboutSection({ isAdmin = false, aboutData, onUpdate }: AboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const initialData = aboutData || defaultData;
  const [editData, setEditData] = useState<AboutData>(initialData);
  const [displayData, setDisplayData] = useState<AboutData>(initialData);

  const handleSave = async () => {
    try {
      if (onUpdate) {
        await onUpdate(editData);
      }
      setDisplayData(editData);
      setIsEditing(false);
      toast.success("About section updated! 🎤");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Elements */}
      <div className="absolute inset-0 brick-pattern opacity-5" />
      <div className="absolute inset-0 wall-cracks" />

      {/* Paint Splatters */}
      <SpraySplatter color="neon-pink" size={250} className="absolute top-0 left-0" />
      <SpraySplatter color="neon-yellow" size={200} className="absolute bottom-0 right-0" />
      <SpraySplatter color="neon-cyan" size={180} className="absolute top-1/2 right-1/4" />

      {/* Graffiti Tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraffitiTag text="DUMB" rotation={-10} color="neon-pink" size="xl" className="top-12 right-8 hidden lg:block" />
        <GraffitiTag text="LITTY" rotation={5} color="neon-cyan" size="lg" className="bottom-16 left-12 hidden lg:block" />
        <GraffitiTag text="UNDER" rotation={-6} color="neon-yellow" size="md" className="top-1/3 left-8 hidden lg:block" />
        <GraffitiTag text="GROUND" rotation={8} color="retro-orange" size="md" className="bottom-1/3 right-16 hidden lg:block" />
      </div>

      {/* Scribble Background */}
      <ScribbleBackground className="opacity-5" />

      {/* Street Signs */}
      <div className="absolute top-8 left-8 hidden xl:block animate-float">
        <UndergroundZoneSign />
      </div>

      {/* Stickers */}
      <div className="absolute top-16 right-16 hidden lg:block">
        <StickerSign text="REAL TALK" color="pink" rotation={-5} />
      </div>
      <div className="absolute bottom-20 left-16 hidden lg:block">
        <StickerSign text="NO CAP" color="yellow" rotation={8} />
      </div>

      {/* Caution Tape */}
      <div className="absolute top-0 left-0 right-0">
        <CautionTape />
      </div>

      {/* Decorative Background Text */}
      <div
        className="absolute -top-4 left-1/4 text-[120px] font-display text-neon-pink/5 leading-none select-none hidden lg:block"
      >
        ABOUT
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Rebel Badge */}
          <div className="inline-block mb-4">
            <div className="rebel-badge px-4 py-2 rounded-lg text-sm">
              <Zap className="w-3 h-3 inline mr-1" />
              The Artist
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4">
            <span className="text-neon-pink animate-neon-sign">About</span>{" "}
            <span className="text-vintage-paper graffiti-shadow">Me</span>
          </h2>

          {/* Animated Line */}
          <div className="w-32 h-1 mx-auto rounded-full overflow-hidden bg-card/30">
            <div className="h-full w-1/2 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full animate-[slide-in-right_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Content Card */}
        <div className="graffiti-border bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-1 bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan animate-color-shift" />

          <div className="p-6 sm:p-8">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block font-vintage">Title</label>
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="bg-muted border-border text-vintage-paper focus:border-neon-pink focus:ring-neon-pink/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block font-vintage">Bio</label>
                  <Textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="bg-muted border-border text-vintage-paper min-h-[150px] focus:border-neon-pink focus:ring-neon-pink/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block font-vintage">Profile Image URL</label>
                  <Input
                    value={editData.imageUrl || ""}
                    onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                    className="bg-muted border-border text-vintage-paper focus:border-neon-pink focus:ring-neon-pink/20"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="text-muted-foreground hover:text-vintage-paper border border-border hover:border-neon-pink/30"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-neon-green to-neon-cyan text-black hover:opacity-90 font-display uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              /* Display Mode */
              <div className="relative">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="absolute top-0 right-0 text-muted-foreground hover:text-neon-cyan border border-transparent hover:border-neon-cyan/30"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}

                <h3 className="text-2xl sm:text-3xl font-display text-neon-pink mb-4">
                  {displayData.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-lg mb-6 font-vintage">
                  {displayData.bio}
                </p>

                {/* Stats/Values */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {[
                    { icon: Music, label: "Originals", value: "100%", color: "text-neon-pink", borderColor: "hover:border-neon-pink/30" },
                    { icon: Mic, label: "Studio", value: "24/7", color: "text-neon-cyan", borderColor: "hover:border-neon-cyan/30" },
                    { icon: Flame, label: "Vibes", value: "Infinite", color: "text-neon-yellow", borderColor: "hover:border-neon-yellow/30" },
                    { icon: Zap, label: "Style", value: "Raw", color: "text-neon-green", borderColor: "hover:border-neon-green/30" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "text-center p-4 bg-card/50 rounded-lg border border-border transition-all duration-300",
                        item.borderColor
                      )}
                    >
                      <item.icon className={cn("w-6 h-6 mx-auto mb-2", item.color)} />
                      <p className="text-xl font-bold text-vintage-paper font-display">{item.value}</p>
                      <p className="text-xs text-muted-foreground font-vintage uppercase tracking-wider">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Neon Sign */}
        <div className="hidden xl:flex justify-center mt-8">
          <NeonBoxSign text="REAL RECOGNIZES REAL" color="cyan" />
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
