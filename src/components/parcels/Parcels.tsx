import { useEffect, useState } from "react";

import { fetchParcels, updateParcelStatus } from "../../services/api";
import type { Parcel, ParcelStatus } from "../../types";

const statusColors: Record<ParcelStatus, string> = {
  in_transit: "bg-blue-100 text-blue-600",
  delivered: "bg-green-100 text-green-600",
  failed: "bg-red-100 text-red-600",
};

const Parcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      const data = await fetchParcels();
      setParcels(data);
    };
    load();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ParcelStatus) => {
    await updateParcelStatus(id, newStatus);
    setParcels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const filteredParcels =
    statusFilter === "all"
      ? parcels
      : parcels.filter((p) => p.status === statusFilter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Parcels Management</h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Statuses</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Parcel ID</th>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Receiver</th>
              <th className="px-4 py-2">Agent</th>
              <th className="px-4 py-2"> Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => (
              <tr key={parcel.id} className="border-t">
                <td className="px-4 py-2">{parcel.id}</td>
                <td className="px-4 py-2">{parcel.sender}</td>
                <td className="px-4 py-2">{parcel.receiver}</td>
                <td className="px-4 py-2">{parcel.agent}</td>
                <td className="px-4 py-2 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[parcel.status]
                    }`}
                  >
                    {parcel.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-2">{parcel.createdAt}</td>
                <td className="px-4 py-2">
                  <select
                    value={parcel.status}
                    onChange={(e) =>
                      handleStatusChange(
                        parcel.id,
                        e.target.value as ParcelStatus
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Parcels;
