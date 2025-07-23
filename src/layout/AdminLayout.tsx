import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  Users,
  FileText,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Parcels", to: "/parcels", icon: Truck },
  { label: "Agents", to: "/agents", icon: Users },
  { label: "Reports", to: "/reports", icon: FileText }
];


 

const AdminLayout = () => {
  const [hovered, setHovered] = useState(false);
const navigate = useNavigate();
 const { logout } = useAuth();
const handleLogout = () => {
  logout(); // clears context + localStorage
  navigate("/login", { replace: true }); // redirect
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
        <div className="mt-6">
          <div className="px-4 mb-6">
            <h2 className="text-xl font-bold">{hovered ? "Escrow Admin" : "EA"}</h2>
          </div>

          <nav className="flex flex-col gap-2">
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 mb-4 hover:bg-red-600 transition-all"
        >
          <LogOut size={20} />
          {hovered && <span>Logout</span>}
        </button>
      </aside>

      {/* Scrollable Main */}
      <main
        className="flex-1 ml-16 overflow-y-auto p-6 bg-gray-100"
        style={{ marginLeft: hovered ? "16rem" : "4rem", transition: "margin-left 0.3s" }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
