import { Link, useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  CircleDollarSign,
  BarChart,
  User,
  Wallet,
  Book,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart, label: "Transactions", path: "/transactions" },
  { icon: CircleDollarSign, label: "Investment", path: "/investment" },
  { icon: CreditCard, label: "Credit Cards", path: "/credit-cards" },
  { icon: Book, label: "Loans", path: "/loans" },
  { icon: Wallet, label: "User Page", path: "/userpage" }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-4">
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
