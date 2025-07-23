import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Truck, LayoutDashboard, Users, FileText } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/parcels", label: "Parcels", icon: <Truck size={20} /> },
  { to: "/agents", label: "Agents", icon: <Users size={20} /> },
  { to: "/reports", label: "Reports", icon: <FileText size={20} /> }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Only show on admin routes
  const showSidebar = location.pathname.startsWith("/dashboard") ||
                      location.pathname.startsWith("/parcels") ||
                      location.pathname.startsWith("/agents") ||
                      location.pathname.startsWith("/reports");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  if (!showSidebar) return null;

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col justify-between fixed
        ${hovered ? "w-56" : "w-16"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-2 mt-6">
        {links.map(({ to, label, icon }) => (
          <Link
            to={to}
            key={to}
            className={`flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-800 ${
              location.pathname === to ? "bg-gray-800" : ""
            }`}
          >
            {icon}
            {hovered && <span>{label}</span>}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mb-4 hover:bg-red-600 w-full"
      >
        <LogOut size={20} />
        {hovered && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
