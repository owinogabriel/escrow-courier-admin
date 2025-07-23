import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  Users,
  FileText,
  LogOut,
  Building2,
  Wallet
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Parcels", to: "/parcels", icon: Truck },
  { label: "Agents", to: "/agents", icon: Users },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Vendors", to: "/vendors", icon: Building2 },
  { label: "Wallets", to: "/wallets", icon: Wallet }
];

const AdminLayout = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 flex flex-col justify-between z-50
        ${hovered ? "w-64" : "w-16"} fixed top-0 left-0 bottom-0`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col">
          <div className="px-4 mt-6 mb-6">
            <h2 className="text-xl font-bold">
              {hovered ? "Escrow Admin" : "EA"}
            </h2>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-800 ${
                    isActive ? "bg-gray-800 font-semibold" : ""
                  }`
                }
              >
                <Icon size={20} />
                {hovered && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-600 w-full transition-all"
          >
            <LogOut size={20} />
            {hovered && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Scrollable Main */}
      <main
        className="flex-1 bg-gray-100 overflow-y-auto p-6"
        style={{
          marginLeft: hovered ? "16rem" : "4rem",
          transition: "margin-left 0.3s"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
