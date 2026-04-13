import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { getUser, logout } from "@/lib/auth";
import type { LostItem } from "@/types/item";
import LostItemCard from "@/components/LostItemCard";
import UploadModal from "@/components/UploadModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [items, setItems] = useState<LostItem[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const { data } = await api.get("/api/items");
      setItems(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <h1 className="font-display text-2xl font-bold text-primary">FindIt 🔍</h1>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-muted-foreground sm:block">
              Hi, {user?.name || "User"}
            </span>
            <button
              onClick={logout}
              className="rounded-lg border px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, or location..."
            className="w-full rounded-xl border bg-card px-5 py-3 text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-4xl">📭</p>
            <p className="mt-2">No items found</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <LostItemCard key={item.id} item={item} onClick={() => navigate(`/item/${item.id}`)} />
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-secondary-foreground shadow-lg transition hover:scale-110"
        title="Report found item"
      >
        +
      </button>

      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} onUploaded={fetchItems} />
    </div>
  );
};

export default Dashboard;
