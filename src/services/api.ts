const API_BASE = "http://localhost:5000";

export const fetchParcels = async () => {
  const res = await fetch(`${API_BASE}/parcels`);
  return res.json();
};

export const updateParcelStatus = async (id: string, status: string) => {
  const res = await fetch(`${API_BASE}/parcels/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const fetchAgents = async () => {
  const res = await fetch(`${API_BASE}/agents`);
  return res.json();
};

export const toggleAgentStatus = async (id: string, isActive: boolean) => {
  const res = await fetch(`${API_BASE}/agents/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
  return res.json();
};

export const fetchVendors = async () => {
  try {
    const res = await fetch(`${API_BASE}/vendors`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    throw error;
  }
};

export const fetchWallets = async () => {
  const res = await fetch("http://localhost:5000/wallets");
  if (!res.ok) throw new Error("Failed to fetch wallets");
  return res.json();
};


