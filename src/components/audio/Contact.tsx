"use client";

import { useState } from "react";
import { Mail, Send, MapPin, Clock, MessageCircle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { GraffitiTag, SpraySplatter, ScribbleBackground } from "@/components/audio/GraffitiElements";
import { StickerSign, NeonBoxSign, CautionTape } from "@/components/audio/StreetSigns";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent! Thanks for reaching out. 🎵");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Elements */}
      <div className="absolute inset-0 brick-pattern opacity-5" />
      <div className="absolute inset-0 wall-cracks" />

      {/* Paint Splatters */}
      <SpraySplatter color="neon-cyan" size={280} className="absolute top-0 right-0" />
      <SpraySplatter color="neon-pink" size={220} className="absolute bottom-0 left-0" />
      <SpraySplatter color="neon-yellow" size={160} className="absolute top-1/3 left-1/4" />

      {/* Graffiti Tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraffitiTag text="CONNECT" rotation={-8} color="neon-pink" size="lg" className="top-8 left-8 hidden lg:block" />
        <GraffitiTag text="REACH" rotation={12} color="neon-cyan" size="lg" className="bottom-16 right-12 hidden lg:block" />
        <GraffitiTag text="OUT" rotation={-4} color="neon-yellow" size="md" className="top-1/2 right-8 hidden lg:block" />
        <GraffitiTag text="HIT ME" rotation={6} color="retro-orange" size="md" className="bottom-1/3 left-16 hidden lg:block" />
      </div>

      {/* Scribble Background */}
      <ScribbleBackground className="opacity-5" />

      {/* Stickers */}
      <div className="absolute top-16 left-8 hidden lg:block">
        <StickerSign text="HOLLA" color="pink" rotation={-8} />
      </div>
      <div className="absolute bottom-24 right-16 hidden lg:block">
        <StickerSign text="LET&apos;S TALK" color="cyan" rotation={5} />
      </div>

      {/* Caution Tape */}
      <div className="absolute bottom-0 left-0 right-0">
        <CautionTape />
      </div>

      {/* Decorative Background Text */}
      <div
        className="absolute -top-4 right-1/4 text-[100px] font-display text-neon-cyan/5 leading-none select-none hidden lg:block"
      >
        HIT ME UP
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Rebel Badge */}
          <div className="inline-block mb-4">
            <div className="rebel-badge px-4 py-2 rounded-lg text-sm">
              <MessageCircle className="w-3 h-3 inline mr-1" />
              Contact
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4">
            <span className="text-neon-cyan animate-neon-sign">Get In</span>{" "}
            <span className="text-vintage-paper graffiti-shadow">Touch</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto font-vintage text-lg">
            Got something to say? Collab ideas? Just want to vibe? Drop a message.
          </p>

          {/* Animated Line */}
          <div className="w-32 h-1 mx-auto mt-6 rounded-full overflow-hidden bg-card/30">
            <div className="h-full w-1/2 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full animate-[slide-in-right_2s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "contact@dumblitty.com", color: "text-neon-pink", borderColor: "hover:border-neon-pink/30" },
              { icon: MapPin, label: "Location", value: "Worldwide", color: "text-neon-cyan", borderColor: "hover:border-neon-cyan/30" },
              { icon: Clock, label: "Response", value: "24-48 hours", color: "text-neon-green", borderColor: "hover:border-neon-green/30" },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border transition-all duration-300",
                  item.borderColor
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border">
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-vintage uppercase tracking-wider">{item.label}</p>
                  <p className="text-vintage-paper font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Collab CTA */}
            <div className="p-6 bg-gradient-to-br from-neon-pink/10 to-neon-purple/5 rounded-xl border border-neon-pink/20 relative overflow-hidden">
              {/* Drip effect */}
              <div className="absolute -top-2 right-8 w-1 h-8 drip-pink opacity-50" />
              <div className="absolute -top-2 right-12 w-1 h-12 drip-cyan opacity-50" style={{ animationDelay: "0.5s" }} />

              <Mic className="w-8 h-8 text-neon-pink mb-3" />
              <p className="text-lg font-display text-vintage-paper mb-2">
                Want to Collab?
              </p>
              <p className="text-sm text-muted-foreground font-vintage">
                I&apos;m always down for creative projects. Hit me up and let&apos;s make something fresh.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="graffiti-border bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 overflow-hidden relative"
            >
              {/* Top Gradient */}
              <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-yellow to-neon-pink -mt-6 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl animate-color-shift" />

              {/* Corner Drips */}
              <div className="absolute top-0 right-8 w-1 h-6 drip-cyan opacity-30" />
              <div className="absolute top-0 right-12 w-1 h-10 drip-pink opacity-30" style={{ animationDelay: "0.3s" }} />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-muted-foreground text-sm font-vintage uppercase tracking-wider">Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-card border-border text-vintage-paper mt-1 focus:border-neon-cyan focus:ring-neon-cyan/20"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm font-vintage uppercase tracking-wider">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card border-border text-vintage-paper mt-1 focus:border-neon-cyan focus:ring-neon-cyan/20"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-muted-foreground text-sm font-vintage uppercase tracking-wider">Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-card border-border text-vintage-paper mt-1 min-h-[120px] focus:border-neon-cyan focus:ring-neon-cyan/20"
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-pink to-retro-orange hover:from-neon-pink/80 hover:to-retro-orange/80 text-white py-6 shadow-[0_0_20px_rgba(255,45,124,0.3)] font-display uppercase tracking-wider border border-neon-pink/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Neon Sign */}
        <div className="hidden xl:flex justify-center mt-10">
          <NeonBoxSign text="DON&apos;T BE A STRANGER" color="pink" blinking />
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
