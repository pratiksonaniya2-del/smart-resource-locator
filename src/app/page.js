"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatusCards from "./components/StatusCards";
import RequestForm from "./components/RequestForm";
import RequestTable from "./components/RequestTable";
import Charts from "./components/Charts";
import Toast from "./components/Toast";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
});
import { FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function addRequest(item) {
    setHistory([item, ...history]);
    setToast("Request allocated successfully");
    setTimeout(() => setToast(""), 2000);
  }
  async function exportPDF() {
const { default: jsPDF } = await import("jspdf");
const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Smart Resource Allocator Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Total Requests: ${history.length}`, 20, 50);

  doc.text(
    `High Priority: ${
      history.filter((item) => item.priority === "high").length
    }`,
    20,
    60
  );

  doc.text(
    `Food Requests: ${
      history.filter((item) => item.need === "food").length
    }`,
    20,
    70
  );

  doc.text(
    `Medical Requests: ${
      history.filter((item) => item.need === "medical").length
    }`,
    20,
    80
  );

  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 100);

  doc.save("ngo-report.pdf");
}
  return (
    <main
    
        className={`min-h-screen flex ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
      />

      <section className="flex-1 p-6 space-y-6">

        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{activePage}</h1>

          <div className="flex items-center gap-4">

  <p className="text-sm opacity-70">{time}</p>

  <button
    onClick={exportPDF}
    className="px-4 py-2 rounded-lg bg-blue-500 text-white"
  >
    Export PDF
  </button>

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-3 rounded-lg bg-emerald-500 text-white"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

</div>
        </div>

        {activePage === "Dashboard" && (
          <>
            <StatusCards history={history} />
            <RequestForm addRequest={addRequest} />
            <Charts history={history} />
            <RequestTable history={history} />
            <MapView />
          </>
        )}

        {activePage === "Requests" && (
          <RequestTable history={history} />
        )}

        {activePage === "Resources" && (
          <>
            <StatusCards history={history} />
            <Charts history={history} />
          </>
        )}

        {activePage === "Reports" && (
          <>
          <Charts history={history} />
          <MapView />
          </>
        )}

        {activePage === "Settings" && (
          <div className="p-6 rounded-xl bg-slate-800">
            <p>Theme Enabled</p>
            <p>Notifications Active</p>
            <p>Version 2.0</p>
          </div>
        )}

        <Toast message={toast} />
      </section>
    </main>
  );
}