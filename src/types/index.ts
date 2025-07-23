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

export interface Payout {
  amount: number;
  date: string;
  method: string;
}

export interface Wallet {
  agentName: string;
  balance: number;
  payouts: Payout[];
}

export type Vendor = {
  id: string;
  name: string;
  email: string;
  location: string;
  registeredAt: string;
};

export type ChartDatum = {
  status: string;
  count: number;
};