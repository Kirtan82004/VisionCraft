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
      {/* 🔥 Mobile Hamburger Button */}
      <button
        className="lg:hidden mt-20 p-3 text-purple-700 fixed top-4 left-4 bg-white shadow-md rounded-md "
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* 🔥 Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-20 left-0 lg:h-150 w-64 bg-white shadow-lg p-4 flex flex-col z-50  transform 
        transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={closeSidebar}
          className="lg:hidden mb-4 p-2 w-fit text-purple-700"
        >
          <FaTimes size={22} />
        </button>

        {/* Logo */}
        <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
          👓 Optical Admin
        </h2>

        {/* LINKS */}
        <nav className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
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
        <div className="mt-4 pt-4 border-t">
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
    className="flex items-center space-x-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 p-2 rounded-md cursor-pointer transition"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
