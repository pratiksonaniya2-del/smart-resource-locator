"use client";

export default function Sidebar({ activePage, setActivePage }) {
  const menu = [
    "Dashboard",
    "Requests",
    "Resources",
    "Reports",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-slate-800 p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">NGO Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li
            key={item}
            onClick={() => setActivePage(item)}
            className={`cursor-pointer px-3 py-2 rounded-lg transition ${
              activePage === item
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}