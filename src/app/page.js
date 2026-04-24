"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatusCards from "./components/StatusCards";
import RequestForm from "./components/RequestForm";
import RequestTable from "./components/RequestTable";
import Charts from "./components/Charts";
import Toast from "./components/Toast";
import dynamic from "next/dynamic";
import { FaMoon, FaSun } from "react-icons/fa";

const MapView = dynamic(
  () => import("./components/MapView"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] rounded-2xl bg-slate-800 flex items-center justify-center text-white rounded-xl">
        Loading Map...
      </div>
    ),
  }
);

export default function Home() {
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [time, setTime] = useState("");

  // Admin
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Resources
  const [resources, setResources] = useState({
    food: 10,
    doctors: 4,
    volunteers: 8,
  });

  // AI Chatbot
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  const tempPassword = "NGO2026";

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =====================
  // ADMIN LOGIN
  // =====================
  function handleAdminLogin() {
    if (
      email === "admin@ngo.com" &&
      password === tempPassword
    ) {
      setIsAdmin(true);
      setShowLogin(false);
      setEmail("");
      setPassword("");
      setToast("Admin Mode Enabled");
      setTimeout(() => setToast(""), 2000);
    } else {
      alert("Invalid Admin Credentials");
    }
  }

  function logoutAdmin() {
    setIsAdmin(false);
    setToast("Admin Logged Out");
    setTimeout(() => setToast(""), 2000);
  }

  // =====================
  // ADD REQUEST + AI
  // =====================
  function addRequest(item) {
    const text =
      `${item.area} ${item.need}`.toLowerCase();

    let priority = "low";

    // AI Priority
    if (
      text.includes("flood") ||
      text.includes("emergency") ||
      text.includes("child") ||
      text.includes("injured") ||
      text.includes("medical")
    ) {
      priority = "high";
    }

    // Duplicate Detection
    const duplicate = history.find(
      (req) =>
        req.area.toLowerCase() ===
          item.area.toLowerCase() &&
        req.need.toLowerCase() ===
          item.need.toLowerCase()
    );

    if (duplicate) {
      setToast("⚠ Duplicate Request Detected");
      setTimeout(() => setToast(""), 2500);
      return;
    }

    const newItem = {
      ...item,
      priority,
      status: "Pending",
    };

    setHistory([newItem, ...history]);

    setToast(
      `AI Priority: ${priority.toUpperCase()}`
    );

    setTimeout(() => setToast(""), 2500);
  }

  // =====================
  // REQUEST ACTIONS
  // =====================
  function deleteRequest(index) {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
  }

  function resolveRequest(index) {
    const updated = [...history];
    updated[index].status = "Resolved";
    setHistory(updated);
  }

  function makeHighPriority(index) {
    const updated = [...history];
    updated[index].priority = "high";
    setHistory(updated);
  }

  // =====================
  // RESOURCE CONTROL
  // =====================
  function addFood() {
    setResources({
      ...resources,
      food: resources.food + 5,
    });
  }

  function addDoctors() {
    setResources({
      ...resources,
      doctors: resources.doctors + 1,
    });
  }

  function addVolunteers() {
    setResources({
      ...resources,
      volunteers: resources.volunteers + 2,
    });
  }

  // =====================
  // AI CHATBOT
  // =====================
  function askAI() {
    const q = chatInput.toLowerCase();

    if (q.includes("highest")) {
      setChatReply(
        "Mata Mandir currently has highest demand."
      );
    } else if (q.includes("food")) {
      setChatReply(
        "Food requests are increasing this week."
      );
    } else if (q.includes("pending")) {
      setChatReply(
        `${
          history.filter(
            (i) => i.status !== "Resolved"
          ).length
        } pending requests found.`
      );
    } else if (q.includes("doctor")) {
      setChatReply(
        "Medical support should be increased."
      );
    } else {
      setChatReply(
        "AI suggests deploying more volunteers."
      );
    }
  }

  // =====================
  // PDF
  // =====================
  async function exportPDF() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Smart Resource Allocator Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Total Requests: ${history.length}`, 20, 50);

    doc.text(
      `High Priority: ${
        history.filter(
          (item) => item.priority === "high"
        ).length
      }`,
      20,
      60
    );

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      80
    );

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

        {/* TOP BAR */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">
            {activePage}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">

            <p className="text-sm opacity-70">
              {time}
            </p>

            <button
              onClick={exportPDF}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              Export PDF
            </button>

            {!isAdmin ? (
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white"
              >
                Admin Login
              </button>
            ) : (
              <button
                onClick={logoutAdmin}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout Admin
              </button>
            )}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="p-3 rounded-lg bg-emerald-500 text-white"
            >
              {darkMode ? (
                <FaSun />
              ) : (
                <FaMoon />
              )}
            </button>

          </div>
        </div>

        {/* ADMIN BADGE */}
        {isAdmin && (
          <div className="bg-emerald-500 px-4 py-2 rounded-lg w-fit">
            Admin Mode Active ✅
          </div>
        )}

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <>
            <StatusCards history={history} />
            <RequestForm addRequest={addRequest} />
            <Charts history={history} />

            <RequestTable
              history={history}
              isAdmin={isAdmin}
              deleteRequest={deleteRequest}
              resolveRequest={resolveRequest}
              makeHighPriority={makeHighPriority}
            />

            {/* AI CHATBOT */}
            <div className="bg-slate-800 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">
                AI Assistant
              </h2>

              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) =>
                    setChatInput(
                      e.target.value
                    )
                  }
                  placeholder="Ask AI..."
                  className="flex-1 p-3 rounded bg-slate-700"
                />

                <button
                  onClick={askAI}
                  className="px-4 bg-purple-500 rounded"
                >
                  Ask
                </button>
              </div>

              {chatReply && (
                <p className="mt-4 text-emerald-400">
                  {chatReply}
                </p>
              )}
            </div>

            {/* ADMIN RESOURCE CONTROL */}
            {isAdmin && (
              <div className="bg-slate-800 p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">
                  Admin Resource Control
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                  <div className="bg-slate-700 p-4 rounded-xl">
                    <p>Food Kits</p>
                    <p className="text-2xl font-bold">
                      {resources.food}
                    </p>
                    <button
                      onClick={addFood}
                      className="mt-3 px-4 py-2 bg-blue-500 rounded"
                    >
                      + Add Food
                    </button>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-xl">
                    <p>Doctors</p>
                    <p className="text-2xl font-bold">
                      {resources.doctors}
                    </p>
                    <button
                      onClick={addDoctors}
                      className="mt-3 px-4 py-2 bg-blue-500 rounded"
                    >
                      + Add Doctor
                    </button>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-xl">
                    <p>Volunteers</p>
                    <p className="text-2xl font-bold">
                      {resources.volunteers}
                    </p>
                    <button
                      onClick={addVolunteers}
                      className="mt-3 px-4 py-2 bg-blue-500 rounded"
                    >
                      + Add Volunteer
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* SECRET ANALYTICS */}
            {isAdmin && (
              <div className="bg-purple-600 p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">
                  Secret Admin Insights
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                  <div>
                    <p>Total Requests</p>
                    <p className="text-2xl font-bold">
                      {history.length}
                    </p>
                  </div>

                  <div>
                    <p>High Priority</p>
                    <p className="text-2xl font-bold">
                      {
                        history.filter(
                          (item) =>
                            item.priority ===
                            "high"
                        ).length
                      }
                    </p>
                  </div>

                  <div>
                    <p>Pending</p>
                    <p className="text-2xl font-bold">
                      {
                        history.filter(
                          (item) =>
                            item.status !==
                            "Resolved"
                        ).length
                      }
                    </p>
                  </div>

                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold mb-3">
                Live Resource Map
              </h2>
              <MapView />
            </div>
          </>
        )}

        {/* REQUESTS */}
        {activePage === "Requests" && (
          <RequestTable
            history={history}
            isAdmin={isAdmin}
            deleteRequest={deleteRequest}
            resolveRequest={resolveRequest}
            makeHighPriority={makeHighPriority}
          />
        )}

        {/* RESOURCES */}
        {activePage === "Resources" && (
          <>
            <StatusCards history={history} />
            <Charts history={history} />
          </>
        )}

        {/* REPORTS */}
        {activePage === "Reports" && (
          <>
            <Charts history={history} />
            <MapView />
          </>
        )}

        {/* SETTINGS */}
        {activePage === "Settings" && (
          <div className="p-6 rounded-xl bg-slate-800">
            <p>Theme Enabled</p>
            <p>Notifications Active</p>
            <p>Version 6.0</p>
          </div>
        )}

        <Toast message={toast} />

        {/* LOGIN MODAL */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md space-y-4">

              <h2 className="text-2xl font-bold text-center">
                Admin Login
              </h2>

              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-700"
              />

              <input
                type="password"
                placeholder="Temporary Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-700"
              />

              <button
                onClick={handleAdminLogin}
                className="w-full p-3 rounded-lg bg-purple-500"
              >
                Login
              </button>

              <button
                onClick={() =>
                  setShowLogin(false)
                }
                className="w-full p-3 rounded-lg bg-slate-600"
              >
                Cancel
              </button>

              <p className="text-sm text-center opacity-70">
                admin@ngo.com / NGO2026
              </p>

            </div>
          </div>
        )}

      </section>
    </main>
  );
}