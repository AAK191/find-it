export interface LostItem {
  _id: string;
  name: string;
  category: string;
  locationFound: string;
  description: string;
  imageUrl: string;
  createdAt: string;
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
