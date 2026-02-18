import { useState, useEffect } from "react";
import CamperCard from "@/components/CamperCard";

interface Camper {
  id: number;
  name: string;
  username: string;
  emoji: string;
}

const API = "http://localhost:3001";

const Index = () => {
  const [campers, setCampers] = useState<Camper[]>([]);

  useEffect(() => {
    fetch(`${API}/api/campers`)
      .then((res) => res.json())
      .then((data) => setCampers(data));
  }, []);

  const updateUsername = async (id: number, newUsername: string) => {
    await fetch(`${API}/api/campers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername }),
    });
    setCampers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, username: newUsername } : c))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Enrolled Campers
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {campers.map((c) => (
          <CamperCard
            key={c.id}
            name={c.name}
            username={c.username}
            emoji={c.emoji}
            onSave={(newUsername) => updateUsername(c.id, newUsername)}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
