"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/audio/Header";
import { Hero } from "@/components/audio/Hero";
import { MusicLibrary, type Track } from "@/components/audio/MusicLibrary";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { AboutSection } from "@/components/audio/About";
import { ContactSection } from "@/components/audio/Contact";
import { Footer } from "@/components/audio/Footer";
import { AdminDashboard, AdminLogin } from "@/components/audio/AdminDashboard";
import { TrackDetail } from "@/components/audio/TrackDetail";
import { TrackModal } from "@/components/audio/TrackModal";
import { AllTracksModal } from "@/components/audio/AllTracksModal";
import { LibrarySkeleton } from "@/components/audio/TrackSkeleton";
import { toast } from "sonner";

export default function Home() {
  // Track state
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Track detail modal
  const [showTrackDetail, setShowTrackDetail] = useState(false);
  const [detailTrack, setDetailTrack] = useState<Track | null>(null);

  // New Track Modal (with vinyl)
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [modalTrack, setModalTrack] = useState<Track | null>(null);

  // All Tracks Modal
  const [showAllTracks, setShowAllTracks] = useState(false);

  // Fetch tracks
  const fetchTracks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);

      const response = await fetch(`/api/tracks?${params.toString()}`);
      const data = await response.json();

      if (data.tracks) {
        setTracks(data.tracks);
      }
    } catch (error) {
      console.error("Failed to fetch tracks:", error);
      toast.error("Failed to load tracks");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Check admin session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/login");
        const data = await response.json();
        if (data.authenticated) {
          setIsAdminLoggedIn(true);
        }
      } catch {
        // Not logged in
      }
    };

    checkSession();
    fetchTracks();
  }, [fetchTracks]);

  // Handle track selection
  const handleTrackSelect = useCallback((track: Track) => {
    if (activeTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  }, [activeTrack, isPlaying]);

  // Handle track info (opens new modal with vinyl)
  const handleTrackInfo = useCallback((track: Track) => {
    setModalTrack(track);
    setShowTrackModal(true);
  }, []);

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle next track
  const handleNext = useCallback(() => {
    if (!activeTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex((t) => t.id === activeTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setActiveTrack(tracks[nextIndex]);
  }, [activeTrack, tracks]);

  // Handle previous track
  const handlePrevious = useCallback(() => {
    if (!activeTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex((t) => t.id === activeTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setActiveTrack(tracks[prevIndex]);
  }, [activeTrack, tracks]);

  // Handle close player
  const handleClosePlayer = useCallback(() => {
    setIsPlaying(false);
    setActiveTrack(null);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle admin click
  const handleAdminClick = useCallback(() => {
    if (isAdminLoggedIn) {
      setShowAdminDashboard(true);
    } else {
      setShowAdminLogin(true);
    }
  }, [isAdminLoggedIn]);

  // Handle admin login
  const handleAdminLogin = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAdminLoggedIn(true);
        setShowAdminLogin(false);
        setShowAdminDashboard(true);
        toast.success("Welcome back!");
        return true;
      } else {
        toast.error(data.error || "Login failed");
        return false;
      }
    } catch {
      toast.error("Login failed");
      return false;
    }
  }, []);

  // Handle add track
  const handleAddTrack = useCallback(async (trackData: Omit<Track, "id">) => {
    try {
      const response = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackData),
      });

      if (response.ok) {
        await fetchTracks();
        toast.success("Track added!");
      } else {
        throw new Error("Failed to add track");
      }
    } catch {
      toast.error("Failed to add track");
    }
  }, [fetchTracks]);

  // Handle update track
  const handleUpdateTrack = useCallback(async (id: string, trackData: Partial<Track>) => {
    try {
      const response = await fetch(`/api/tracks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackData),
      });

      if (response.ok) {
        await fetchTracks();
        toast.success("Track updated!");
      } else {
        throw new Error("Failed to update track");
      }
    } catch {
      toast.error("Failed to update track");
    }
  }, [fetchTracks]);

  // Handle delete track
  const handleDeleteTrack = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/tracks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTracks();
        toast.success("Track deleted!");
      } else {
        throw new Error("Failed to delete track");
      }
    } catch {
      toast.error("Failed to delete track");
    }
  }, [fetchTracks]);

  // Play random track
  const playRandomTrack = useCallback(() => {
    if (tracks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setActiveTrack(tracks[randomIndex]);
    setIsPlaying(true);
  }, [tracks]);

  // Handle modal play/pause
  const handleModalPlayPause = useCallback(() => {
    if (modalTrack && activeTrack?.id !== modalTrack.id) {
      setActiveTrack(modalTrack);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [modalTrack, activeTrack, isPlaying]);

  // Handle view all tracks
  const handleViewAll = useCallback(() => {
    setShowAllTracks(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header onSearch={handleSearch} onAdminClick={handleAdminClick} />

      {/* Hero Section */}
      <Hero onPlayRandom={playRandomTrack} trackCount={tracks.length} />

      {/* Music Library */}
      {isLoading ? (
        <LibrarySkeleton count={5} />
      ) : (
        <MusicLibrary
          tracks={tracks}
          activeTrack={activeTrack}
          isPlaying={isPlaying}
          onTrackSelect={handleTrackSelect}
          onTrackInfo={handleTrackInfo}
          onViewAll={handleViewAll}
          searchQuery={searchQuery}
        />
      )}

      {/* About Section */}
      <AboutSection isAdmin={isAdminLoggedIn} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Audio Player */}
      {activeTrack && (
        <AudioPlayer
          track={activeTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={handleClosePlayer}
        />
      )}

      {/* Track Modal with Vinyl */}
      <TrackModal
        track={modalTrack}
        isOpen={showTrackModal}
        isPlaying={isPlaying && activeTrack?.id === modalTrack?.id}
        onClose={() => setShowTrackModal(false)}
        onPlayPause={handleModalPlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        allTracks={tracks}
      />

      {/* All Tracks Modal */}
      <AllTracksModal
        tracks={tracks}
        isOpen={showAllTracks}
        onClose={() => setShowAllTracks(false)}
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackSelect}
        onTrackInfo={handleTrackInfo}
      />

      {/* Legacy Track Detail Modal (keeping for compatibility) */}
      <TrackDetail
        track={detailTrack}
        isOpen={showTrackDetail}
        isPlaying={isPlaying && activeTrack?.id === detailTrack?.id}
        onClose={() => setShowTrackDetail(false)}
        onPlayPause={() => {
          if (detailTrack && activeTrack?.id !== detailTrack.id) {
            setActiveTrack(detailTrack);
            setIsPlaying(true);
          } else {
            setIsPlaying(!isPlaying);
          }
        }}
      />

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
        tracks={tracks}
        onAddTrack={handleAddTrack}
        onUpdateTrack={handleUpdateTrack}
        onDeleteTrack={handleDeleteTrack}
      />
    </main>
  );
}
