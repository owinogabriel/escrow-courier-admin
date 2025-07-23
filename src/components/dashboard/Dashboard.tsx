import { useEffect, useState } from "react";
import { fetchParcels, fetchAgents } from "../../services/api";
import type { Agent, ChartDatum, Parcel } from "../../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


const Dashboard = () => {
  const [totalToday, setTotalToday] = useState(0);
  const [pending, setPending] = useState(0);
  const [activeAgents, setActiveAgents] = useState(0);
  const [chartData, setChartData] = useState<ChartDatum[]>([]);

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

      // Status Count for Chart
      const statusCount: Record<string, number> = {
        delivered: 0,
        in_transit: 0,
        failed: 0,
      };

      parcels.forEach((p) => {
        if (statusCount[p.status] !== undefined) {
          statusCount[p.status] += 1;
        }
      });

      const formattedChartData: ChartDatum[] = Object.entries(statusCount).map(
        ([status, count]) => ({
          status,
          count,
        })
      );

      setTotalToday(parcelsToday);
      setPending(pendingDeliveries);
      setActiveAgents(activeAgentCount);
      setChartData(formattedChartData);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card title="Total Parcels Today" value={totalToday} color="bg-blue-500" />
        <Card title="Pending Deliveries" value={pending} color="bg-yellow-500" />
        <Card title="Active Agents" value={activeAgents} color="bg-green-500" />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Parcel Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
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
