import { db } from "../src/lib/db";

// Simple password hash function
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = simpleHash("dumblitty123");
  const admin = await db.admin.upsert({
    where: { email: "admin@dumblitty.com" },
    update: {},
    create: {
      email: "admin@dumblitty.com",
      password: adminPassword,
      name: "Dumblitty",
    },
  });
  console.log("✓ Created admin:", admin.email);

  // Create about content
  const about = await db.aboutContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "About Dumblitty",
      bio: "Welcome to my personal music library. This is where I share my tracks, my creative journey, and my passion for music. Every beat, every lyric, every vibe - it's all here. Raw and unfiltered from the streets. 🎤🔥",
    },
  });
  console.log("✓ Created about content");

  // Sample tracks
  const tracks = [
    {
      title: "Midnight Flow",
      year: 2024,
      genre: "Hip Hop",
      bpm: 95,
      duration: 198,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "Late night studio session. Raw vibes from the heart.",
    },
    {
      title: "Street Lights",
      year: 2024,
      genre: "Trap",
      bpm: 140,
      duration: 215,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "Inspired by the city nights. Neon dreams and concrete reality.",
    },
    {
      title: "Neon Dreams",
      year: 2023,
      genre: "Lo-Fi",
      bpm: 85,
      duration: 182,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "Chill beats for the late night crew. Vintage soul.",
    },
    {
      title: "Raw Bars",
      year: 2024,
      genre: "Rap",
      bpm: 90,
      duration: 234,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "No filter, just raw energy. Straight from the underground.",
    },
    {
      title: "Vibe Check",
      year: 2023,
      genre: "R&B",
      bpm: 110,
      duration: 203,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "Smooth sounds for the soul. Feel the rhythm.",
    },
    {
      title: "Underground",
      year: 2024,
      genre: "Hip Hop",
      bpm: 92,
      duration: 245,
      audioFilePath: "/uploads/audio/demo.mp3",
      description: "Straight from the underground. Authentic street vibes.",
    },
  ];

  for (const track of tracks) {
    await db.track.create({
      data: {
        ...track,
        artist: "Dumblitty",
        type: "original",
      },
    });
    console.log("✓ Created track:", track.title);
  }

  console.log("\n🎉 Seeding complete!");
  console.log("📧 Admin login: admin@dumblitty.com");
  console.log("🔑 Password: dumblitty123");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
