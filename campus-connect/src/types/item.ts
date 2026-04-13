export interface LostItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  image: string;
  date: string;
  uploadedBy: {
    id: string;
    name: string;
  };
}

export const CATEGORIES = [
  "Electronics",
  "Clothing",
  "ID Card",
  "Keys",
  "Bag",
  "Other",
] as const;
