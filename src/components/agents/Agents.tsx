import { useEffect, useState } from "react";
import { fetchAgents, toggleAgentStatus } from "../../services/api";
import type { Agent } from "../../types";

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchAgents();
      setAgents(data);
    };
    load();
  }, []);

  const handleToggle = async (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;

    const updated = await toggleAgentStatus(id, !agent.isActive);
    setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agents Management</h1>

      <input
        type="text"
        placeholder="Search by name or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="border-t">
                <td className="px-4 py-2">{agent.name}</td>
                <td className="px-4 py-2">{agent.location}</td>
                <td className="px-4 py-2">{agent.phone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      agent.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleToggle(agent.id)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      agent.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {agent.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;
