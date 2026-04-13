import { useState, useRef } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { CATEGORIES } from "@/types/item";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

const UploadModal = ({ open, onClose, onUploaded }: UploadModalProps) => {
  const [form, setForm] = useState({ name: "", category: "Electronics", location: "", description: "" });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("location", form.location);
      fd.append("description", form.description);
      if (image) fd.append("image", image);

      await api.post("/api/items", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Item posted successfully!");
      onUploaded();
      onClose();
      setForm({ name: "", category: "Electronics", location: "", description: "" });
      setImage(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-card-foreground">Report Found Item</h2>
          <button onClick={onClose} className="text-2xl text-muted-foreground hover:text-foreground">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-card-foreground">Item Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Blue Backpack"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-card-foreground">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-card-foreground">Location Found</label>
            <input
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Library 2nd Floor"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-card-foreground">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Any additional details..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-card-foreground">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2.5 font-medium text-muted-foreground transition hover:bg-muted">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
