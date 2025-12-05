export enum TransactionType {
  RENT = 'RENT',
  SELL = 'SELL',
  GIVE = 'GIVE'
}

export enum Category {
  TOOLS = 'Tools',
  ELECTRONICS = 'Electronics',
  OUTDOORS = 'Outdoors',
  HOME = 'Home',
  PARTY = 'Party',
  OTHER = 'Other'
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  responseTime: string; // e.g. "Usually replies in 1 hr"
}

export interface Listing {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: Category;
  images: string[];
  price: number;
  currency: string;
  period?: 'day' | 'week' | 'month' | 'flat'; // For rent vs sell
  deposit?: number;
  transactionType: TransactionType;
  location: {
    lat: number;
    lng: number;
    addressShort: string; // e.g. "Downtown, 0.5km away"
    distanceKm: number;
  };
  available: boolean;
  tags: string[];
  rating: number;
}

export interface Booking {
  id: string;
  listingId: string;
  renterId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}