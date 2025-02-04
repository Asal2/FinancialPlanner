import {
  Home,
  CreditCard,
  Settings,
  BarChart,
  User,
  Wallet,
  Wrench,
  Book,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-bold text-gray-700">Dashboard</h2>
      <ul className="mt-6 space-y-4">
        {[
          { icon: Home, label: "Dashboard" },
          { icon: BarChart, label: "Transactions" },
          { icon: Wallet, label: "Accounts" },
          { icon: CreditCard, label: "Credit Cards" },
          { icon: Book, label: "Loans" },
          { icon: Wrench, label: "Services" },
          { icon: User, label: "Recommendations" },
          { icon: Settings, label: "Settings" },
        ].map(({ icon: Icon, label }, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
            <Icon size={20} />
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
