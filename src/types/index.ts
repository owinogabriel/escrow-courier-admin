// src/types/index.ts
export type ParcelStatus = "in_transit" | "delivered" | "failed";

export type Parcel = {
  id: string;
  sender: string;
  receiver: string;
  agent: string;
  status: ParcelStatus;
  createdAt: string;
};

export type Agent = {
  id: string;
  name: string;
  location: string;
  phone: string;
  isActive: boolean;
};