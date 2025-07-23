import { useEffect, useState } from "react";

import { fetchParcels, fetchAgents } from "../../services/api";
import type { Agent, Parcel } from "../../types";

const Dashboard = () => {
  const [totalToday, setTotalToday] = useState(0);
  const [pending, setPending] = useState(0);
  const [activeAgents, setActiveAgents] = useState(0);

  useEffect(() => {
    const load = async () => {
      const parcels: Parcel[] = await fetchParcels();
      const agents: Agent[] = await fetchAgents();

      const today = new Date().toISOString().split("T")[0];

      const parcelsToday = parcels.filter((p) =>
        p.createdAt.startsWith(today)
      ).length;

      const pendingDeliveries = parcels.filter(
        (p) => p.status === "in_transit"
      ).length;

      const activeAgentCount = agents.filter((a) => a.isActive).length;

      setTotalToday(parcelsToday);
      setPending(pendingDeliveries);
      setActiveAgents(activeAgentCount);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Parcels Today" value={totalToday} color="bg-blue-500" />
        <Card title="Pending Deliveries" value={pending} color="bg-yellow-500" />
        <Card title="Active Agents" value={activeAgents} color="bg-green-500" />
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <div className={`rounded-lg shadow p-6 text-white ${color}`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
