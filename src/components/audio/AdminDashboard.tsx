"use client";

import { useState, useRef } from "react";
import { X, Save, Trash2, Edit, Plus, Music, Image as ImageIcon, FileAudio, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Track } from "./MusicLibrary";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  onAddTrack: (track: Omit<Track, "id">) => Promise<void>;
  onUpdateTrack: (id: string, track: Partial<Track>) => Promise<void>;
  onDeleteTrack: (id: string) => Promise<void>;
}

export function AdminDashboard({
  isOpen,
  onClose,
  tracks,
  onAddTrack,
  onUpdateTrack,
  onDeleteTrack,
}: AdminDashboardProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<"audio" | "cover" | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    artist: "Dumblitty",
    type: "original" as "original" | "cover",
    year: new Date().getFullYear(),
    genre: "",
    bpm: 120,
    duration: 180,
    audioFilePath: "",
    coverImagePath: "",
    originalArtist: "",
    equipmentUsed: "",
    recordingStudio: "",
    description: "",
    lyrics: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "Dumblitty",
      type: "original",
      year: new Date().getFullYear(),
      genre: "",
      bpm: 120,
      duration: 180,
      audioFilePath: "",
      coverImagePath: "",
      originalArtist: "",
      equipmentUsed: "",
      recordingStudio: "",
      description: "",
      lyrics: "",
    });
    setIsEditing(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.audioFilePath) {
      toast.error("Title and audio file are required!");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing) {
        await onUpdateTrack(isEditing, formData);
        toast.success("Track updated! 🔥");
      } else {
        await onAddTrack(formData);
        toast.success("Track added to library! 🎵");
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save track:", error);
      toast.error("Failed to save track");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (track: Track) => {
    setIsEditing(track.id);
    setFormData({
      title: track.title,
      artist: track.artist,
      type: track.type,
      year: track.year,
      genre: track.genre || "",
      bpm: track.bpm || 120,
      duration: track.duration,
      audioFilePath: track.audioFilePath,
      coverImagePath: track.coverImagePath || "",
      originalArtist: track.originalArtist || "",
      equipmentUsed: track.equipmentUsed || "",
      recordingStudio: track.recordingStudio || "",
      description: track.description || "",
      lyrics: track.lyrics || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this track? This cannot be undone.")) {
      setIsLoading(true);
      try {
        await onDeleteTrack(id);
        toast.success("Track deleted! 🗑️");
      } catch (error) {
        console.error("Failed to delete track:", error);
        toast.error("Failed to delete track");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // File upload handler - server-side upload via API
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "audio" | "cover") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (4MB limit for server upload)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      toast.error(`File too large! Max 4MB. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    setIsUploading(type);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("type", type);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        if (type === "audio") {
          setFormData({ ...formData, audioFilePath: data.url });
          toast.success(`Audio uploaded! 🎧 ${file.name}`);
        } else {
          setFormData({ ...formData, coverImagePath: data.url });
          toast.success(`Cover uploaded! 🖼️ ${file.name}`);
        }
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(null);
      if (type === "audio" && audioInputRef.current) {
        audioInputRef.current.value = "";
      }
      if (type === "cover" && coverInputRef.current) {
        coverInputRef.current.value = "";
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-vintage-dark border-border text-vintage-paper">
        {/* Gradient Top Bar */}
        <div className="h-1 bg-gradient-to-r from-retro-orange via-neon-pink to-neon-cyan -mt-6 -mx-6 mb-4 rounded-t-lg" />
        
        <DialogHeader className="flex-shrink-0 border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-display">
              <span className="text-retro-orange">Admin</span>{" "}
              <span className="text-neon-cyan">Panel</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-vintage-paper"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="library" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 bg-muted border border-border">
            <TabsTrigger
              value="library"
              className="data-[state=active]:bg-retro-orange/20 data-[state=active]:text-retro-orange"
            >
              📚 Library
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="data-[state=active]:bg-neon-pink/20 data-[state=active]:text-neon-pink"
            >
              {isEditing ? "✏️ Edit" : "➕ Add New"}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            {/* Library Tab */}
            <TabsContent value="library" className="m-0">
              <div className="space-y-3">
                {tracks.length === 0 ? (
                  <div className="text-center py-12">
                    <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                    <p className="text-muted-foreground text-lg">No tracks yet</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">Upload your first track to get started!</p>
                  </div>
                ) : (
                  tracks.map((track) => (
                    <div
                      key={track.id}
                      className={cn(
                        "flex items-center gap-4 p-4 bg-card rounded-lg border transition-all duration-200",
                        isEditing === track.id
                          ? "border-neon-pink ring-1 ring-neon-pink/30 shadow-[0_0_15px_rgba(255,45,124,0.2)]"
                          : "border-border hover:border-retro-orange/50 hover:bg-muted/30"
                      )}
                    >
                      {/* Cover Preview */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
                        {track.coverImagePath ? (
                          <img
                            src={track.coverImagePath}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-vintage-paper truncate">{track.title}</p>
                        <p className="text-sm text-muted-foreground font-vintage truncate">
                          {track.year} • {track.genre || "Unknown"} • {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(track)}
                          className="text-neon-cyan hover:bg-neon-cyan/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(track.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Add/Edit Tab */}
            <TabsContent value="add" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-card border-border text-vintage-paper mt-1 focus:border-retro-orange focus:ring-retro-orange/20"
                      placeholder="Track title..."
                    />
                  </div>

                  {/* Year & BPM */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm font-vintage">Year</Label>
                      <Input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                        className="bg-card border-border text-vintage-paper mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm font-vintage">BPM</Label>
                      <Input
                        type="number"
                        value={formData.bpm}
                        onChange={(e) => setFormData({ ...formData, bpm: parseInt(e.target.value) || 120 })}
                        className="bg-card border-border text-vintage-paper mt-1"
                      />
                    </div>
                  </div>

                  {/* Genre & Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-sm font-vintage">Genre</Label>
                      <Input
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="bg-card border-border text-vintage-paper mt-1"
                        placeholder="Hip Hop, R&B..."
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm font-vintage">Duration (sec)</Label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 180 })}
                        className="bg-card border-border text-vintage-paper mt-1"
                      />
                    </div>
                  </div>

                  {/* Audio Upload */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Audio File *</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={formData.audioFilePath}
                          onChange={(e) => setFormData({ ...formData, audioFilePath: e.target.value })}
                          className="bg-card border-border text-vintage-paper flex-1 font-vintage text-sm"
                          placeholder="/uploads/audio/file.mp3 or URL"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => audioInputRef.current?.click()}
                          disabled={isUploading === "audio"}
                          className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 shrink-0"
                        >
                          {isUploading === "audio" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <input
                        ref={audioInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileUpload(e, "audio")}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground/60">Supported: MP3, WAV, OGG, M4A</p>
                    </div>
                  </div>

                  {/* Cover Upload */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Cover Art</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={formData.coverImagePath}
                          onChange={(e) => setFormData({ ...formData, coverImagePath: e.target.value })}
                          className="bg-card border-border text-vintage-paper flex-1 font-vintage text-sm"
                          placeholder="/uploads/covers/image.jpg or URL"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => coverInputRef.current?.click()}
                          disabled={isUploading === "cover"}
                          className="border-neon-pink text-neon-pink hover:bg-neon-pink/10 shrink-0"
                        >
                          {isUploading === "cover" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "cover")}
                        className="hidden"
                      />
                      {/* Cover Preview */}
                      {formData.coverImagePath && (
                        <div className="relative inline-block">
                          <img
                            src={formData.coverImagePath}
                            alt="Cover preview"
                            className="w-20 h-20 rounded-lg object-cover border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, coverImagePath: "" })}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center text-xs hover:bg-destructive/80"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Description */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-card border-border text-vintage-paper mt-1 min-h-[80px] resize-none"
                      placeholder="Track description..."
                    />
                  </div>

                  {/* Equipment */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Equipment Used</Label>
                    <Input
                      value={formData.equipmentUsed}
                      onChange={(e) => setFormData({ ...formData, equipmentUsed: e.target.value })}
                      className="bg-card border-border text-vintage-paper mt-1"
                      placeholder="FL Studio, AKAI MPC, etc..."
                    />
                  </div>

                  {/* Recording Notes */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Recording Notes</Label>
                    <Input
                      value={formData.recordingStudio}
                      onChange={(e) => setFormData({ ...formData, recordingStudio: e.target.value })}
                      className="bg-card border-border text-vintage-paper mt-1"
                      placeholder="Home studio, mixing notes..."
                    />
                  </div>

                  {/* Lyrics */}
                  <div>
                    <Label className="text-muted-foreground text-sm font-vintage">Lyrics</Label>
                    <Textarea
                      value={formData.lyrics || ""}
                      onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                      className="bg-card border-border text-vintage-paper mt-1 min-h-[100px] resize-none font-vintage text-sm"
                      placeholder="Track lyrics..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                {isEditing && (
                  <Button
                    variant="ghost"
                    onClick={resetForm}
                    className="text-muted-foreground hover:text-vintage-paper"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.audioFilePath || isLoading}
                  className="bg-gradient-to-r from-retro-orange to-neon-pink hover:from-retro-orange/80 hover:to-neon-pink/80 text-white shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Track
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Library
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Admin Login Component
interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await onLogin(email, password);
      if (success) {
        onClose();
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-vintage-dark border-border text-vintage-paper">
        <div className="h-1 bg-gradient-to-r from-retro-orange via-neon-pink to-neon-cyan -mt-6 -mx-6 mb-4 rounded-t-lg" />
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            <span className="text-retro-orange">Admin</span>{" "}
            <span className="text-neon-cyan">Access</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-muted-foreground text-sm font-vintage">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border text-vintage-paper mt-1 focus:border-retro-orange"
              placeholder="admin@dumblitty.com"
              required
            />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm font-vintage">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border-border text-vintage-paper mt-1 focus:border-retro-orange"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-retro-orange to-neon-pink hover:from-retro-orange/80 hover:to-neon-pink/80 text-white"
          >
            {isLoading ? "Logging in..." : "Login 🎵"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
