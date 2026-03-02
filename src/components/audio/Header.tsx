"use client";

import { useState } from "react";
import { Search, Menu, X, Music, Settings, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onAdminClick?: () => void;
}

export function Header({ onSearch, onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const navItems = [
    { label: "Tracks", href: "#library", icon: "🎵" },
    { label: "About", href: "#about", icon: "🎤" },
    { label: "Contact", href: "#contact", icon: "📧" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-vintage-dark/95 backdrop-blur-md border-b border-border relative overflow-hidden">
      {/* Animated Gradient Line */}
      <div className="h-[3px] bg-gradient-to-r from-retro-orange via-neon-pink to-neon-cyan animate-color-shift" />

      {/* Brick Pattern Background */}
      <div className="absolute inset-0 brick-pattern opacity-5 pointer-events-none" />

      {/* Spray Paint Effect on Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-neon-pink/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-neon-cyan/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Vinyl-style logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 vinyl-disc group-hover:animate-vinyl-spin rounded-full flex items-center justify-center transition-all duration-300">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-retro-orange to-neon-pink rounded-full flex items-center justify-center">
                  <Music className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
              {/* Neon Dot */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-display tracking-tight">
                <span className="text-retro-orange animate-neon-sign">Dumblitty</span>
                <span className="text-neon-cyan">'s</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-vintage tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse" />
                Music Library
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-vintage-paper/80 hover:text-neon-cyan font-medium transition-all duration-200 rounded-lg hover:bg-muted/30 relative group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Spray Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 via-neon-pink/10 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                <span className="relative flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span className="font-vintage uppercase tracking-wider text-sm">{item.label}</span>
                </span>

                {/* Underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-pink group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <div
                className={cn(
                  "flex items-center bg-card border rounded-xl transition-all duration-300 overflow-hidden",
                  isSearchFocused
                    ? "border-neon-pink shadow-[0_0_15px_rgba(255,45,124,0.3)] ring-1 ring-neon-pink/20"
                    : "border-border hover:border-muted"
                )}
              >
                <Input
                  type="text"
                  placeholder="Search tracks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-48 lg:w-56 bg-transparent border-0 focus-visible:ring-0 text-vintage-paper placeholder:text-muted-foreground/60 font-vintage text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 mr-1 text-muted-foreground hover:text-neon-pink hover:bg-transparent"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Admin Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-muted-foreground hover:text-neon-pink hover:bg-muted/30 border border-transparent hover:border-neon-pink/30 rounded-xl transition-all duration-200"
            >
              <Settings className="w-4 h-4 mr-1.5" />
              <span className="font-vintage uppercase tracking-wider text-xs">Admin</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-vintage-paper hover:text-neon-pink hover:bg-muted/30 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in relative">
            {/* Street art tag */}
            <div className="absolute top-2 right-4 text-4xl font-display text-neon-pink/10 transform rotate-12 select-none">
              MENU
            </div>

            <nav className="flex flex-col gap-2 relative z-10">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-vintage-paper hover:text-neon-cyan hover:bg-muted/30 rounded-xl transition-all duration-200 border border-transparent hover:border-neon-cyan/20"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-vintage uppercase tracking-wider">{item.label}</span>
                </a>
              ))}

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4 px-4">
                <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden focus-within:border-neon-pink focus-within:ring-1 focus-within:ring-neon-pink/20 transition-all duration-200">
                  <Input
                    type="text"
                    placeholder="Search tracks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-vintage-paper placeholder:text-muted-foreground/60 font-vintage text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 mr-1 text-muted-foreground hover:text-neon-pink"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              <Button
                variant="ghost"
                size="sm"
                onClick={onAdminClick}
                className="mt-2 mx-4 text-muted-foreground hover:text-neon-pink justify-start border border-border hover:border-neon-pink/30 rounded-xl"
              >
                <Settings className="w-4 h-4 mr-2" />
                <span className="font-vintage uppercase tracking-wider text-xs">Admin Panel</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
