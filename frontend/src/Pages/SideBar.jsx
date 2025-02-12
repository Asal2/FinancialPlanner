import { Link, useLocation } from "react-router-dom"; // If using React Router
import {
  Home,
  CreditCard,
  Settings,
  CircleDollarSign,
  BarChart,
  User,
  Wallet,
  Wrench,
  Book,
} from "lucide-react";

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/frontend/src/Pages/Dash/Dashboard.jsx",
  },
  {
    icon: BarChart,
    label: "Transactions",
    path: "/frontend/src/Pages/Transcation/Trans.jsx",
  },
  {
    icon: Wallet,
    label: "Accounts",
    path: "/frontend/src/Pages/Account/Acc.jsx",
  },
  {
    icon: CircleDollarSign,
    label: "Investment",
    path: "/frontend/src/Pages/Investment/InvestmentDashboard.jsx",
  },
  {
    icon: CreditCard,
    label: "Credit Cards",
    path: "/frontend/src/Pages/CreditCard",
  },
  { icon: Book, label: "Loans", path: "/frontend/src/Pages/Loans" },
  { icon: Wrench, label: "Services", path: "/frontend/src/Pages/" },
  { icon: User, label: "Recommendations", path: "/recommendations" },
  { icon: Settings, label: "Settings", path: "/frontend/src/Pages/Settings" },
];

const Sidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4">
      <ul className="mt-6 space-y-4">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center gap-2 p-2 rounded-md ${
                location.pathname === path
                  ? "text-green-500 font-semibold bg-gray-200"
                  : "text-gray-600 hover:text-green-600"
              }`}>
              <Icon size={20} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
