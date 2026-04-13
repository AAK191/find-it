import type { LostItem } from "@/types/item";

interface LostItemCardProps {
  item: LostItem;
  onClick: () => void;
}

const LostItemCard = ({ item, onClick }: LostItemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted-foreground">📦</div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-card-foreground line-clamp-1">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            {item.category}
          </span>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          📍 {item.location}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(item.date).toLocaleDateString()}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-1 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Contact Finder
        </button>
      </div>
    </div>
  );
};

export default LostItemCard;
