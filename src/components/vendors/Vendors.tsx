import { useEffect, useState } from "react";
import { fetchVendors } from "../../services/api";
import type { Vendor } from "../../types";



const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchVendors();
      setVendors(data);
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Registrations</h1>
      <table className="min-w-full bg-white shadow rounded text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Registered At</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="px-4 py-2">{v.name}</td>
              <td className="px-4 py-2">{v.email}</td>
              <td className="px-4 py-2">{v.location}</td>
              <td className="px-4 py-2">
                {new Date(v.registeredAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
