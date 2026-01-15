import { useState } from "react";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaCog,
  FaShoppingCart,
  FaClipboardList,
  FaCalendarAlt,
  FaBell,
  FaTools,
  FaSignOutAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* 🔥 Mobile Hamburger (TOP RIGHT) */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white shadow-md rounded-md text-purple-700"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* 🔥 Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-4 flex flex-col z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:left-0 lg:right-auto lg:translate-x-0 lg:top-20 lg:h-[calc(100vh-5rem)]
        `}
      >
        {/* Close (Mobile) */}
        <button
          onClick={closeSidebar}
          className="lg:hidden mb-4 p-2 text-purple-700 w-fit self-end"
        >
          <FaTimes size={22} />
        </button>

        {/* Logo */}
        <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
          👓 Optical Admin
        </h2>

        {/* Links */}
        <nav className="space-y-2 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-purple-300">
          <NavItem icon={<FaHome />} label="Dashboard" to="/admin/dashboard" close={closeSidebar} />
          <NavItem icon={<FaBox />} label="Inventory" to="/admin/inventory" close={closeSidebar} />
          <NavItem icon={<FaShoppingCart />} label="Orders" to="/admin/orders" close={closeSidebar} />
          <NavItem icon={<FaClipboardList />} label="Invoices" to="/admin/invoices" close={closeSidebar} />
          <NavItem icon={<FaCalendarAlt />} label="Appointments" to="/admin/appointments" close={closeSidebar} />
          <NavItem icon={<FaUsers />} label="Customers" to="/admin/customers" close={closeSidebar} />
          <NavItem icon={<FaBell />} label="Notifications" to="/admin/notifications" close={closeSidebar} />
          <NavItem icon={<FaEnvelope />} label="Send Mail" to="/admin/send-mail" close={closeSidebar} />
          <NavItem icon={<FaTools />} label="Services" to="/admin/services" close={closeSidebar} />
          <NavItem icon={<FaCog />} label="Settings" to="/admin/settings" close={closeSidebar} />
        </nav>

        {/* Logout */}
        <div className="pt-4 border-t">
          <NavItem icon={<FaSignOutAlt />} label="Logout" to="/logout" close={closeSidebar} />
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label, to, close }) => (
  <Link
    to={to}
    onClick={close}
    className="flex items-center gap-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 p-2 rounded-md transition"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
