import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";
import type { LostItem } from "@/types/item";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [msgOpen, setMsgOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/api/items/${id}`);
        setItem(data);
      } catch {
        toast.error("Item not found");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await api.post("/api/messages", { itemId: id, message });
      toast.success("Message sent to finder!");
      setMsgOpen(false);
      setMessage("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-6">
          <button onClick={() => navigate("/dashboard")} className="text-xl text-muted-foreground hover:text-foreground">
            ←
          </button>
          <h1 className="font-display text-xl font-bold text-primary">FindIt 🔍</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm md:flex">
          {/* Image */}
          <div className="aspect-square bg-muted md:w-1/2">
            {item.image ? (
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-muted-foreground">📦</div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4 p-6 md:w-1/2">
            <div>
              <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                {item.category}
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-card-foreground">{item.name}</h2>
            <p className="text-muted-foreground">{item.description || "No description provided."}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 <span className="font-medium text-card-foreground">{item.location}</span></p>
              <p>📅 {new Date(item.date).toLocaleDateString()}</p>
              <p>👤 Found by <span className="font-medium text-card-foreground">{item.uploadedBy?.name || "Unknown"}</span></p>
            </div>

            <button
              onClick={() => setMsgOpen(true)}
              className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Message the Finder
            </button>
          </div>
        </div>
      </main>

      {/* Message Modal */}
      {msgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-card-foreground">Send a Message</h3>
              <button onClick={() => setMsgOpen(false)} className="text-2xl text-muted-foreground hover:text-foreground">&times;</button>
            </div>
            <form onSubmit={sendMessage} className="space-y-4">
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Hi, I think this is my item..."
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setMsgOpen(false)} className="flex-1 rounded-lg border py-2.5 font-medium text-muted-foreground hover:bg-muted">
                  Cancel
                </button>
                <button type="submit" disabled={sending} className="flex-1 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                  {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
