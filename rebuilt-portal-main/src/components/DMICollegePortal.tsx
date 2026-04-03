import { useState, useEffect, useCallback } from "react";
import {
  PANELS, DEPARTMENTS, STUDENT_USERS, FACULTY_USERS, CLUBS, PARTNERS, NOTIFICATIONS,
  DEPT_STUDENT_COUNTS, ADMIN_STUDENT_LIST, ADMIN_FACULTY_LIST, PLACEMENT_DATA,
  INFRASTRUCTURE_DATA, FINANCIAL_DATA, FACULTY_SUBJECTS, FACULTY_MENTEES,
  FACULTY_ASSIGNMENTS, FACULTY_PUBLICATIONS, ATTENDANCE_DATA,
} from "@/data/portalData";
import { syllabusData, importantQuestions, translations } from "@/data/syllabusData";

// ─── Shared helpers ──────────────────────────────────────────────────────────
const Toast = ({ msg, onClose }: { msg: string; onClose: () => void }) => {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
      <span>✅</span><span className="text-sm">{msg}</span>
    </div>
  );
};

const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const BackBtn = ({ label = "← Back to Home", onClick }: { label?: string; onClick: () => void }) => (
  <button onClick={onClick} className="fixed top-3 left-3 z-40 bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium shadow hover:shadow-md transition">
    {label}
  </button>
);

// ── Admin Panel ──
const AdminPanel = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [page, setPage] = useState("login");
  const [uid, setUid] = useState("PRINCIPAL2024");
  const [pw, setPw] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const login = () => {
    if (uid === "PRINCIPAL2024" && pw === "Admin@123") { setPage("dash"); showToast("Welcome to Principal Control Center!"); }
    else showToast("Invalid credentials!");
  };

  if (page === "login") return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1e1b4b 100%)" }}>
      <BackBtn onClick={onBack} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">🏛️ Principal Control Center</h1>
          <p className="text-gray-500 mt-1 text-sm">Complete College Management System</p>
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">🔐 Principal ID</label><input value={uid} onChange={e => setUid(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-400 outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">🔑 Secure Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-400 outline-none" placeholder="Admin@123" /></div>
          <button onClick={login} className="w-full py-3 rounded-lg font-semibold text-white" style={{ background: "linear-gradient(to right, #7c3aed, #4f46e5)" }}>🚀 Access Control Center</button>
        </div>
        <div className="mt-5 p-4 rounded-lg border border-purple-200 bg-purple-50">
          <p className="text-sm text-purple-800 font-semibold mb-1">🔒 Demo Credentials</p>
          <p className="text-xs text-purple-700"><strong>ID:</strong> PRINCIPAL2024</p>
          <p className="text-xs text-purple-700"><strong>Password:</strong> Admin@123</p>
        </div>
      </div>
    </div>
  );

  const metrics = [
    { label: "Students", value: "942", sub: "+23 this month", subColor: "text-green-400", iconBg: "bg-blue-100", valColor: "text-blue-600", border: "border-l-4 border-blue-400" },
    { label: "Faculty", value: "89", sub: "2 on leave", subColor: "text-blue-400", iconBg: "bg-green-100", valColor: "text-green-600", border: "border-l-4 border-green-400" },
    { label: "Avg CGPA", value: "8.6", sub: "+0.2 improvement", subColor: "text-green-400", iconBg: "bg-purple-100", valColor: "text-purple-600", border: "border-l-4 border-purple-400" },
    { label: "Attendance", value: "91%", sub: "5 below 75%", subColor: "text-red-400", iconBg: "bg-orange-100", valColor: "text-orange-500", border: "border-l-4 border-orange-400" },
    { label: "Fee Collection", value: "95.2%", sub: "₹32L pending", subColor: "text-red-400", iconBg: "bg-teal-100", valColor: "text-teal-600", border: "border-l-4 border-teal-400" },
    { label: "Urgent Issues", value: "6", sub: "Need attention", subColor: "text-orange-400", iconBg: "bg-red-100", valColor: "text-red-600", border: "border-l-4 border-red-400" },
  ];

  const cards = [
    { title: "👥 Student Management", btnColor: "bg-blue-600 hover:bg-blue-700", iconBg: "bg-blue-100", stats: [["Active Students", "942", "text-blue-600"], ["At Risk Students", "3", "text-red-500"], ["Fee Defaulters", "5", "text-orange-500"]], btn: "● Manage Students", action: "students" },
    { title: "🎓 Faculty Management", btnColor: "bg-green-600 hover:bg-green-700", iconBg: "bg-green-100", stats: [["Total Faculty", "89", "text-green-600"], ["On Leave", "1", "text-orange-500"], ["Departments", "7", "text-blue-600"]], btn: "👨‍🏫 Manage Faculty", action: "faculty" },
    { title: "📚 Academic Control", btnColor: "bg-purple-600 hover:bg-purple-700", iconBg: "bg-purple-100", stats: [["Current Semester", "Spring 2024", "text-purple-600"], ["Pending Results", "12", "text-orange-500"], ["Upcoming Exams", "Mid-Sem", "text-blue-600"]], btn: "📋 Academic Panel", action: "academic" },
    { title: "💰 Financial Control", btnColor: "bg-yellow-600 hover:bg-yellow-700", iconBg: "bg-yellow-100", stats: [["Total Collection", FINANCIAL_DATA.totalCollection, "text-yellow-600"], ["Pending Fees", FINANCIAL_DATA.pending, "text-red-500"], ["Monthly Expenses", FINANCIAL_DATA.monthlyExpenses, "text-blue-600"]], btn: "💳 Financial Panel", action: "finance" },
    { title: "🏢 Infrastructure", btnColor: "bg-indigo-600 hover:bg-indigo-700", iconBg: "bg-indigo-100", stats: [["Classrooms", `${INFRASTRUCTURE_DATA.classrooms.total} (${INFRASTRUCTURE_DATA.classrooms.maintenance} maint.)`, "text-indigo-600"], ["Labs", `${INFRASTRUCTURE_DATA.labs.total} (${INFRASTRUCTURE_DATA.labs.functional} func.)`, "text-green-600"], ["Hostel Occupancy", INFRASTRUCTURE_DATA.hostel.occupancy, "text-blue-600"]], btn: "🏗️ Infrastructure", action: "infra" },
    { title: "💼 Placements", btnColor: "bg-teal-600 hover:bg-teal-700", iconBg: "bg-teal-100", stats: [["Placement Rate", PLACEMENT_DATA.stats.placementRate, "text-teal-600"], ["Avg Package", PLACEMENT_DATA.stats.avgPackage, "text-green-600"], ["Upcoming Drives", "3 companies", "text-blue-600"]], btn: "🎯 Placement Panel", action: "placement" },
  ];

  const filteredStudents = ADMIN_STUDENT_LIST.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.dept.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #1e1b4b 100%)" }}>
      <BackBtn onClick={onBack} />
      <header className="px-6 py-5" style={{ background: "linear-gradient(to right, #3b0764, #1e3a8a, #312e81)" }}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div><h1 className="text-2xl font-bold text-white flex items-center gap-2">🏛️ Principal Dashboard</h1><p className="text-purple-300 text-sm">Welcome, Dr. Suresh Babu - Complete College Control</p></div>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setModal("reports")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">📊 Generate Report</button>
            <button onClick={() => setModal("quickActions")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium">⚡ Quick Actions</button>
            <button onClick={() => setModal("addNew")} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Add New</button>
            <button onClick={() => setModal("meeting")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">📅 Schedule Meeting</button>
            <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE</span>
            <button onClick={() => setPage("login")} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">🚪 Logout</button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Critical Alerts */}
        <div className="bg-white/95 rounded-xl border-l-4 border-red-500 p-5">
          <div className="flex items-center gap-2 mb-3"><span className="text-red-500 text-lg">⊗</span><h3 className="font-bold text-red-600">Critical Issues Requiring Immediate Attention</h3></div>
          <ul className="space-y-1 ml-4">
            <li className="text-red-700 text-sm flex items-center gap-2"><span>🚨</span> 3 students at academic risk (below 75% attendance)</li>
            <li className="text-red-700 text-sm flex items-center gap-2"><span>💰</span> 5 fee defaulters need attention — ₹32L pending</li>
            <li className="text-red-700 text-sm flex items-center gap-2"><span>🏗️</span> 2 classrooms + 2 labs under maintenance</li>
          </ul>
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map(m => (
            <div key={m.label} className={`bg-white rounded-xl shadow-lg p-4 ${m.border} hover:-translate-y-1 transition-transform`}>
              <div className={`${m.iconBg} p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2`}>📊</div>
              <p className="text-xs text-gray-500 font-medium">{m.label}</p>
              <p className={`text-2xl font-bold ${m.valColor}`}>{m.value}</p>
              <p className={`text-xs ${m.subColor} mt-0.5`}>{m.sub}</p>
            </div>
          ))}
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(c => (
            <div key={c.title} className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-4"><div className={`${c.iconBg} p-3 rounded-full`}>📋</div><h3 className="text-lg font-bold text-gray-800">{c.title}</h3></div>
              <div className="space-y-2 mb-5">{c.stats.map(([k, v, vc]) => (<div key={k} className="flex justify-between items-center text-sm"><span className="text-gray-500">{k}</span><span className={`font-bold ${vc}`}>{v}</span></div>))}</div>
              <button onClick={() => setModal(c.action)} className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold ${c.btnColor} transition`}>{c.btn}</button>
            </div>
          ))}
        </div>
        {/* Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Live College Activity</h3>
            <div className="space-y-3">
              {[["New admission completed", "CSE Department — Rajesh Kumar", "bg-blue-50", "bg-blue-500"], ["Fee payment received", "₹45,000 — Sneha Reddy (IT)", "bg-green-50", "bg-green-500"], ["Faculty leave approved", "Dr. Ramesh Babu — Medical leave (CIVIL)", "bg-yellow-50", "bg-yellow-500"], ["Lab maintenance completed", "Electronics Lab 3 — back online", "bg-purple-50", "bg-purple-500"], ["Placement drive registered", "Infosys — 45 students registered", "bg-teal-50", "bg-teal-500"]].map(([t, d, bg, dot]) => (
                <div key={t} className={`flex items-start gap-3 p-3 ${bg} rounded-lg`}><div className={`w-2 h-2 ${dot} rounded-full mt-2 flex-shrink-0`}></div><div><p className="text-sm font-medium text-gray-800">{t}</p><p className="text-xs text-gray-500">{d}</p></div></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ Priority Alerts</h3>
            <div className="space-y-3">
              {[["Attendance Alert", "3 students below 75% attendance threshold", "bg-red-50", "border-red-500", "text-red-800", "text-red-600", "bg-red-600", "Take Action"],
                ["Fee Reminder", "5 students have overdue fee payments totaling ₹32L", "bg-orange-50", "border-orange-500", "text-orange-800", "text-orange-600", "bg-orange-600", "Send Notices"],
                ["Infrastructure", "2 classrooms + 2 labs under maintenance", "bg-blue-50", "border-blue-500", "text-blue-800", "text-blue-600", "bg-blue-600", "Check Status"],
                ["Placement Drive", "Infosys drive on April 5 — 45 registrations pending", "bg-green-50", "border-green-500", "text-green-800", "text-green-600", "bg-green-600", "View Details"]].map(([t, d, bg, border, tc, dc, btnBg, btn]) => (
                <div key={t} className={`p-3 ${bg} border-l-4 ${border} rounded-lg`}>
                  <div className="flex justify-between items-start gap-2">
                    <div><p className={`text-sm font-semibold ${tc}`}>{t}</p><p className={`text-xs ${dc}`}>{d}</p></div>
                    <button onClick={() => showToast(`${btn} initiated!`)} className={`${btnBg} hover:opacity-90 text-white px-2 py-1 rounded text-xs whitespace-nowrap`}>{btn}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Modals */}
      {modal === "students" && (
        <Modal title="👥 Student Management" onClose={() => { setModal(null); setSearchTerm(""); }}>
          <div className="mb-4">
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Search by name, department or ID..." />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-100">{["ID", "Name", "Dept", "Sem", "CGPA", "Attend.", "Fees", "Status"].map(h => <th key={h} className="border px-3 py-2 text-left font-semibold text-gray-700">{h}</th>)}</tr></thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s.id} className="border-b hover:bg-blue-50">
                    <td className="border px-3 py-2 font-mono text-xs">{s.id}</td>
                    <td className="border px-3 py-2 font-medium">{s.name}</td>
                    <td className="border px-3 py-2">{s.dept}</td>
                    <td className="border px-3 py-2 text-center">{s.sem}</td>
                    <td className="border px-3 py-2"><span className={s.cgpa >= 8.5 ? "text-green-600 font-bold" : s.cgpa < 7.5 ? "text-red-600 font-bold" : "text-blue-600 font-bold"}>{s.cgpa}</span></td>
                    <td className="border px-3 py-2"><span className={s.attendance < 75 ? "text-red-600 font-bold" : ""}>{s.attendance}%</span></td>
                    <td className="border px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.feeStatus === "Paid" ? "bg-green-100 text-green-700" : s.feeStatus === "Pending" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{s.feeStatus}</span></td>
                    <td className="border px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Total</p><p className="text-xl font-bold text-blue-600">942</p></div>
            <div className="bg-green-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Active</p><p className="text-xl font-bold text-green-600">939</p></div>
            <div className="bg-red-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">At Risk</p><p className="text-xl font-bold text-red-600">3</p></div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Fee Defaulters</p><p className="text-xl font-bold text-yellow-600">5</p></div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Department-wise Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(DEPT_STUDENT_COUNTS).map(([dept, count]) => (
                <div key={dept} className="bg-gray-50 p-2 rounded-lg flex justify-between text-sm"><span className="text-gray-600">{dept}</span><span className="font-bold text-purple-600">{count}</span></div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {modal === "faculty" && (
        <Modal title="🎓 Faculty Management" onClose={() => setModal(null)}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-100">{["ID", "Name", "Dept", "Designation", "Experience", "Students", "Rating", "Status"].map(h => <th key={h} className="border px-3 py-2 text-left font-semibold text-gray-700">{h}</th>)}</tr></thead>
              <tbody>
                {ADMIN_FACULTY_LIST.map(f => (
                  <tr key={f.id} className="border-b hover:bg-green-50">
                    <td className="border px-3 py-2 font-mono text-xs">{f.id}</td>
                    <td className="border px-3 py-2 font-medium">{f.name}</td>
                    <td className="border px-3 py-2">{f.dept}</td>
                    <td className="border px-3 py-2 text-xs">{f.designation}</td>
                    <td className="border px-3 py-2">{f.exp}</td>
                    <td className="border px-3 py-2 text-center">{f.students}</td>
                    <td className="border px-3 py-2"><span className="text-yellow-600 font-bold">⭐ {f.rating}</span></td>
                    <td className="border px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{f.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-green-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Total Faculty</p><p className="text-xl font-bold text-green-600">89</p></div>
            <div className="bg-blue-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Men Faculty</p><p className="text-xl font-bold text-blue-600">52</p></div>
            <div className="bg-pink-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Women Faculty</p><p className="text-xl font-bold text-pink-600">37</p></div>
          </div>
        </Modal>
      )}

      {modal === "academic" && (
        <Modal title="📚 Academic Control" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-5 rounded-xl">
              <h4 className="font-bold text-purple-800 mb-3">📅 Current Semester Details</h4>
              {[["Semester", "Spring 2024 (Even Semester)"], ["Start Date", "January 8, 2024"], ["End Date", "May 20, 2024"], ["Mid-Sem Exams", "March 18-25, 2024"], ["End-Sem Exams", "May 1-15, 2024"], ["Results Expected", "June 10, 2024"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k}</span><span className="font-semibold text-purple-700">{v}</span></div>
              ))}
            </div>
            <div className="bg-blue-50 p-5 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3">📊 Academic Performance</h4>
              {[["Overall Pass Rate", "94.5%"], ["University Rank Holders", "12"], ["Distinction Students", "156"], ["First Class", "520"], ["Arrear Students", "48"], ["Average CGPA", "8.6"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k}</span><span className="font-semibold text-blue-700">{v}</span></div>
              ))}
            </div>
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">📝 Pending Actions</h4>
              {[["Internal Marks Upload", "12 subjects pending"], ["Lab Report Submissions", "8 subjects pending"], ["Project Reviews", "3rd review — April 2024"], ["Syllabus Completion", "78% average"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-1.5 items-start"><span className="text-gray-600">{k}</span><span className="font-semibold text-green-700 text-right">{v}</span></div>
              ))}
            </div>
            <div className="bg-orange-50 p-5 rounded-xl">
              <h4 className="font-bold text-orange-800 mb-3">🏆 Department Rankings</h4>
              {[["CSE", "1st — 96.2% pass rate"], ["IT", "2nd — 94.8% pass rate"], ["AIDS", "3rd — 93.5% pass rate"], ["ECE", "4th — 92.1% pass rate"], ["MECH", "5th — 90.5% pass rate"], ["EEE", "6th — 89.3% pass rate"], ["CIVIL", "7th — 87.0% pass rate"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k}</span><span className="font-semibold text-orange-700">{v}</span></div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {modal === "finance" && (
        <Modal title="💰 Financial Control" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Total Collection</p><p className="text-2xl font-bold text-green-600">{FINANCIAL_DATA.totalCollection}</p></div>
            <div className="bg-red-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Pending</p><p className="text-2xl font-bold text-red-600">{FINANCIAL_DATA.pending}</p></div>
            <div className="bg-blue-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Monthly Expenses</p><p className="text-2xl font-bold text-blue-600">{FINANCIAL_DATA.monthlyExpenses}</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3">💰 Fee Collection Breakdown</h4>
              <div className="space-y-2">{FINANCIAL_DATA.breakdown.map(b => (
                <div key={b.category} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm text-gray-800">{b.category}</p>
                  <div className="flex justify-between text-xs mt-1"><span className="text-green-600">Collected: {b.collected}</span><span className="text-red-600">Pending: {b.pending}</span></div>
                </div>
              ))}</div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3">📊 Monthly Expenses</h4>
              <div className="space-y-2">{FINANCIAL_DATA.expenses.map(e => (
                <div key={e.category} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-700">{e.category}</span>
                  <span className="font-bold text-sm text-blue-600">{e.amount}</span>
                </div>
              ))}</div>
            </div>
          </div>
        </Modal>
      )}

      {modal === "infra" && (
        <Modal title="🏢 Infrastructure" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-5 rounded-xl">
              <h4 className="font-bold text-indigo-800 mb-3">🏫 Classrooms</h4>
              {[["Total", INFRASTRUCTURE_DATA.classrooms.total], ["Functional", INFRASTRUCTURE_DATA.classrooms.functional], ["Under Maintenance", INFRASTRUCTURE_DATA.classrooms.maintenance], ["Smart Classrooms", INFRASTRUCTURE_DATA.classrooms.smart]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k as string}</span><span className="font-bold text-indigo-700">{String(v)}</span></div>
              ))}
            </div>
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">🔬 Laboratories</h4>
              {[["Total Labs", INFRASTRUCTURE_DATA.labs.total], ["Functional", INFRASTRUCTURE_DATA.labs.functional], ["Under Maintenance", INFRASTRUCTURE_DATA.labs.maintenance]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k as string}</span><span className="font-bold text-green-700">{String(v)}</span></div>
              ))}
              <div className="mt-3 space-y-1">{INFRASTRUCTURE_DATA.labs.types.map(t => <p key={t} className="text-xs text-gray-600">• {t}</p>)}</div>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3">🏢 Hostel</h4>
              {[["Total Blocks", INFRASTRUCTURE_DATA.hostel.blocks], ["Boys Blocks", INFRASTRUCTURE_DATA.hostel.boysBlocks], ["Girls Blocks", INFRASTRUCTURE_DATA.hostel.girlsBlocks], ["Total Rooms", INFRASTRUCTURE_DATA.hostel.totalRooms], ["Occupancy Rate", INFRASTRUCTURE_DATA.hostel.occupancy]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600">{k as string}</span><span className="font-bold text-blue-700">{String(v)}</span></div>
              ))}
            </div>
            <div className="bg-amber-50 p-5 rounded-xl">
              <h4 className="font-bold text-amber-800 mb-3">📚 Library</h4>
              {Object.entries(INFRASTRUCTURE_DATA.library).map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm mb-1.5"><span className="text-gray-600 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span><span className="font-bold text-amber-700">{v}</span></div>
              ))}
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl md:col-span-2">
              <h4 className="font-bold text-emerald-800 mb-3">🏟️ Sports Facilities</h4>
              <div className="flex flex-wrap gap-2">{INFRASTRUCTURE_DATA.sports.facilities.map(f => <span key={f} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">{f}</span>)}</div>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-gray-600">Grounds: <strong className="text-emerald-700">{INFRASTRUCTURE_DATA.sports.grounds}</strong></span>
                <span className="text-gray-600">Courts: <strong className="text-emerald-700">{INFRASTRUCTURE_DATA.sports.courts}</strong></span>
                <span className="text-gray-600">Gym: <strong className="text-emerald-700">{INFRASTRUCTURE_DATA.sports.gym}</strong></span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal === "placement" && (
        <Modal title="💼 Placements" onClose={() => setModal(null)}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {Object.entries(PLACEMENT_DATA.stats).map(([k, v]) => (
              <div key={k} className="bg-teal-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-lg font-bold text-teal-600">{v}</p>
              </div>
            ))}
          </div>
          <h4 className="font-bold text-gray-700 mb-3">🏢 Placement Drives</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-100">{["Company", "Package", "Students", "Date", "Status"].map(h => <th key={h} className="border px-3 py-2 text-left">{h}</th>)}</tr></thead>
              <tbody>
                {PLACEMENT_DATA.companies.map(c => (
                  <tr key={c.name} className="border-b hover:bg-teal-50">
                    <td className="border px-3 py-2 font-medium">{c.name}</td>
                    <td className="border px-3 py-2 text-green-600 font-bold">{c.package}</td>
                    <td className="border px-3 py-2 text-center">{c.students}</td>
                    <td className="border px-3 py-2">{c.date}</td>
                    <td className="border px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {/* Report Generation Center */}
      {modal === "reports" && (
        <Modal title="📊 Report Generation Center" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3">📚 Academic Reports</h4>
              <div className="space-y-2">
                {["Department Performance", "Attendance Analysis", "Grade Distribution"].map(r => (
                  <button key={r} onClick={() => showToast(`${r} report generated!`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition">{r}</button>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">💰 Financial Reports</h4>
              <div className="space-y-2">
                {["Fee Collection Status", "Monthly Expenses", "Budget Analysis"].map(r => (
                  <button key={r} onClick={() => showToast(`${r} report generated!`)} className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition">{r}</button>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl">
              <h4 className="font-bold text-purple-800 mb-3">👥 HR Reports</h4>
              <div className="space-y-2">
                {["Faculty Performance", "Leave Analysis", "Recruitment Status"].map(r => (
                  <button key={r} onClick={() => showToast(`${r} report generated!`)} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium transition">{r}</button>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl">
              <h4 className="font-bold text-orange-800 mb-3">🏢 Infrastructure Reports</h4>
              <div className="space-y-2">
                {["Facility Utilization", "Maintenance Status", "Compliance Report"].map(r => (
                  <button key={r} onClick={() => showToast(`${r} report generated!`)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-medium transition">{r}</button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 bg-gray-50 p-5 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">📋 Comprehensive Reports</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {["Executive Summary", "Annual College Report", "Accreditation Report", "NAAC Self-Study Report"].map(r => (
                  <button key={r} onClick={() => showToast(`${r} generated!`)} className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium transition">{r}</button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Quick Actions Center */}
      {modal === "quickActions" && (
        <Modal title="⚡ Quick Actions Center" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">🚨 Emergency Actions</h4>
              <div className="space-y-2">
                {[["Send Emergency Alert", "bg-red-500 hover:bg-red-600"], ["Campus Lockdown", "bg-orange-500 hover:bg-orange-600"], ["Evacuation Protocol", "bg-yellow-600 hover:bg-yellow-700"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} initiated!`)} className={`w-full ${cls} text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">📢 Communications</h4>
              <div className="space-y-2">
                {[["Broadcast Announcement", "bg-blue-600 hover:bg-blue-700"], ["Parent Notification", "bg-green-600 hover:bg-green-700"], ["Faculty Meeting", "bg-green-700 hover:bg-green-800"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} sent!`)} className={`w-full ${cls} text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">⚡ Quick Tasks</h4>
              <div className="space-y-2">
                {[["Approve Pending Leaves", "bg-teal-600 hover:bg-teal-700"], ["Review Complaints", "bg-purple-500 hover:bg-purple-600"], ["System Backup", "bg-gray-700 hover:bg-gray-800"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} completed!`)} className={`w-full ${cls} text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Items */}
      {modal === "addNew" && (
        <Modal title="➕ Add New Items - Complete Management System" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3">👥 Student Management</h4>
              <div className="space-y-2">
                {[["➕ Add New Student", "bg-blue-600"], ["📋 Bulk Admission", "bg-blue-600"], ["🔄 Transfer Student", "bg-blue-600"], ["👥 Add New Batch", "bg-blue-600"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-xl">
              <h4 className="font-bold text-green-800 mb-3">🎓 Faculty Management</h4>
              <div className="space-y-2">
                {[["➕ Add New Faculty", "bg-green-600"], ["🧑‍🏫 Add Guest Lecturer", "bg-green-600"], ["🔬 Add Lab Assistant", "bg-green-600"], ["👑 Assign HOD", "bg-green-600"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl">
              <h4 className="font-bold text-purple-800 mb-3">📚 Academic Management</h4>
              <div className="space-y-2">
                {[["➕ Add New Course", "bg-purple-500"], ["📂 Add New Subject", "bg-purple-500"], ["📅 Add Semester", "bg-purple-500"], ["📝 Add Exam Schedule", "bg-purple-500"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl">
              <h4 className="font-bold text-orange-800 mb-3">🏢 Infrastructure</h4>
              <div className="space-y-2">
                {[["🏫 Add New Classroom", "bg-orange-500"], ["🔬 Add New Lab", "bg-orange-500"], ["🏠 Add Hostel Room", "bg-orange-500"], ["🏗️ Add New Facility", "bg-orange-500"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 p-5 rounded-xl">
              <h4 className="font-bold text-yellow-800 mb-3">💰 Financial Management</h4>
              <div className="space-y-2">
                {[["💳 Add Fee Structure", "bg-yellow-600"], ["🎓 Add Scholarship", "bg-yellow-600"], ["📊 Add Expense Category", "bg-yellow-600"], ["📋 Add Budget Plan", "bg-yellow-600"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
            <div className="bg-teal-50 p-5 rounded-xl">
              <h4 className="font-bold text-teal-800 mb-3">💼 Placement & Events</h4>
              <div className="space-y-2">
                {[["🏢 Add Company", "bg-teal-600"], ["🎉 Add College Event", "bg-teal-600"], ["🛠️ Add Workshop", "bg-teal-600"], ["📢 Add Seminar", "bg-teal-600"]].map(([label, cls]) => (
                  <button key={label} onClick={() => showToast(`${label} form opened!`)} className={`w-full ${cls} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-medium transition`}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Meeting */}
      {modal === "meeting" && (
        <Modal title="📅 Schedule New Meeting" onClose={() => setModal(null)}>
          <div className="bg-indigo-50 p-4 rounded-xl mb-6">
            <h4 className="font-bold text-indigo-800">📅 Meeting Scheduler</h4>
            <p className="text-sm text-indigo-600">Schedule meetings with faculty, students, parents, or management</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); showToast("Meeting scheduled successfully!"); setModal(null); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title *</label><input required className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Enter meeting title" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                <select required className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  <option value="">Select Venue</option>
                  {["Conference Hall A", "Conference Hall B", "Board Room", "Seminar Hall", "Principal Office", "HOD Cabin", "Online (Google Meet)"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type *</label>
                <select required className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  <option value="">Select Meeting Type</option>
                  {["Faculty Meeting", "Department Meeting", "Parent-Teacher Meeting", "Board Meeting", "Student Council", "Placement Drive", "Emergency Meeting"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                <select className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  {["Normal", "High", "Urgent", "Critical"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label><input type="date" required className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Attendees *</label><textarea required rows={3} className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Enter attendee names or departments (one per line)" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Time *</label><input type="time" required className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Meeting Agenda</label><textarea rows={3} className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Enter meeting agenda and discussion points" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
                <select className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  {["1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours", "Half day", "Full day"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-semibold transition">📅 Schedule Meeting</button>
              <button type="button" onClick={() => setModal(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ── Faculty Panel ──
const FacultyPanel = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [page, setPage] = useState("login");
  const [uid, setUid] = useState("Faculty001");
  const [pw, setPw] = useState("");
  const [user, setUser] = useState<typeof FACULTY_USERS[string] | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, boolean>>({});

  const login = () => {
    const expected = uid.replace("Faculty", "fpass");
    if (FACULTY_USERS[uid] && pw === expected) { setUser(FACULTY_USERS[uid]); setPage("dash"); showToast(`Welcome back, ${FACULTY_USERS[uid].name}!`); }
    else showToast("Invalid credentials!");
  };

  if (page === "login") return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <BackBtn onClick={onBack} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8"><div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-4xl">🎓</span></div><h1 className="text-2xl font-bold text-gray-800">Faculty Portal</h1><p className="text-gray-500 text-sm">Academic Management System</p></div>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Faculty ID</label><input value={uid} onChange={e => setUid(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-400 outline-none" placeholder="Faculty001" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-400 outline-none" placeholder="fpass001" /></div>
          <button onClick={login} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition">Sign In</button>
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600"><strong>Demo:</strong> Faculty001 / fpass001 · Faculty002 / fpass002 · Faculty003 / fpass003 · Faculty004 / fpass004 · Faculty005 / fpass005</div>
      </div>
    </div>
  );

  const sections = [
    { title: "Live Classes", desc: "Schedule and conduct online classes", info: [["Next Class", "2:00 PM Today", "text-indigo-600"], ["Ongoing", "Data Structures", "text-green-600"], ["Students Online", "35/40", "text-blue-600"]], btn: "Manage Live Classes", btnColor: "bg-indigo-600 hover:bg-indigo-700", action: "live", iconBg: "bg-indigo-100", emoji: "📹" },
    { title: "AI Assistant", desc: "Get AI-powered teaching insights", info: [["Today's Suggestions", "5 New", "text-pink-600"], ["Auto Grading", "12 Completed", "text-green-600"], ["Student Insights", "Updated", "text-blue-600"]], btn: "Open AI Assistant", btnColor: "bg-pink-600 hover:bg-pink-700", action: "ai", iconBg: "bg-pink-100", emoji: "💡" },
    { title: "Smart Alerts", desc: "Intelligent notifications and reminders", info: [["Urgent Alerts", "3", "text-red-600"], ["Upcoming Deadlines", "7", "text-orange-600"], ["System Updates", "2", "text-blue-600"]], btn: "View All Alerts", btnColor: "bg-orange-600 hover:bg-orange-700", action: "alerts", iconBg: "bg-orange-100", emoji: "🔔" },
    { title: "My Students", desc: "Manage student records and performance", info: [["Total Students", String(user?.students || 120), "text-blue-600"], ["Class Average", "8.4 GPA", "text-green-600"], ["Attendance Rate", "91%", "text-purple-600"]], btn: "Manage Students", btnColor: "bg-blue-600 hover:bg-blue-700", action: "students", iconBg: "bg-blue-100", emoji: "👥" },
    { title: "My Mentees", desc: "Track mentee progress and reports", info: [["Total Mentees", String(user?.mentees || 20), "text-purple-600"], ["Average CGPA", "8.6", "text-green-600"], ["At Risk Students", "1", "text-red-600"]], btn: "Manage Mentees", btnColor: "bg-purple-600 hover:bg-purple-700", action: "mentees", iconBg: "bg-purple-100", emoji: "🎯" },
    { title: "My Subjects", desc: "Manage subjects and class schedules", info: ((FACULTY_SUBJECTS[uid] || []).slice(0, 3).map(s => [s.name, `Sem ${s.semester} - ${s.students} students`, "text-blue-600"])), btn: "Manage Subjects", btnColor: "bg-green-600 hover:bg-green-700", action: "subjects", iconBg: "bg-green-100", emoji: "📚" },
    { title: "Attendance", desc: "Take and manage class attendance", info: [["Today's Classes", "3", "text-yellow-600"], ["Attendance Taken", "2/3", "text-green-600"], ["Overall Rate", "91%", "text-blue-600"]], btn: "Take Attendance", btnColor: "bg-yellow-600 hover:bg-yellow-700", action: "attend", iconBg: "bg-yellow-100", emoji: "📋" },
    { title: "Assignments", desc: "Create and manage assignments", info: [["Total Given", String(user?.assignments || 15), "text-indigo-600"], ["Pending Review", String((FACULTY_ASSIGNMENTS[uid] || []).filter(a => a.status === "Active").length), "text-orange-600"], ["Graded", String((FACULTY_ASSIGNMENTS[uid] || []).filter(a => a.status === "Graded").length), "text-green-600"]], btn: "Manage Assignments", btnColor: "bg-indigo-600 hover:bg-indigo-700", action: "assign", iconBg: "bg-indigo-100", emoji: "📝" },
    { title: "Publications", desc: "Manage books, journals & certificates", info: [["Total Publications", String(user?.publications || 8), "text-red-600"], ["Journal Papers", String((FACULTY_PUBLICATIONS[uid] || []).filter(p => p.type === "Journal").length), "text-blue-600"], ["Conferences", String((FACULTY_PUBLICATIONS[uid] || []).filter(p => p.type === "Conference").length), "text-green-600"]], btn: "Manage Publications", btnColor: "bg-red-600 hover:bg-red-700", action: "pubs", iconBg: "bg-red-100", emoji: "📖" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} />
      <header className="bg-white shadow py-5 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><div><h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1><p className="text-gray-500 text-sm">Welcome, {user?.name} (ID: {uid})</p></div><button onClick={() => setPage("login")} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition">Logout</button></div></header>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div><h2 className="text-2xl font-bold mb-3">Academic Year 2023-24</h2><div className="flex flex-wrap gap-3"><span className="bg-white/20 px-3 py-1 rounded-full text-sm"><strong>Department:</strong> {user?.dept}</span><span className="bg-white/20 px-3 py-1 rounded-full text-sm"><strong>Experience:</strong> {user?.exp}</span><span className="bg-white/20 px-3 py-1 rounded-full text-sm"><strong>Designation:</strong> {user?.designation}</span></div></div>
            <div className="mt-4 md:mt-0 text-right"><p className="text-white/80 text-sm">Current Date</p><p className="text-lg font-semibold">March 18, 2024</p></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[["Total Students", user?.students, "text-blue-600", "bg-blue-100"], ["Subjects Teaching", user?.subjects, "text-green-600", "bg-green-100"], ["Mentees", user?.mentees, "text-purple-600", "bg-purple-100"], ["Assignments Given", user?.assignments, "text-yellow-600", "bg-yellow-100"], ["Publications", user?.publications, "text-red-600", "bg-red-100"]].map(([label, value, color, bg]) => (
            <div key={label as string} className="bg-white rounded-xl shadow p-5 flex items-center gap-4"><div className={`${bg} p-3 rounded-full`}>📊</div><div><p className="text-xs text-gray-500">{label as string}</p><p className={`text-2xl font-bold ${color}`}>{String(value)}</p></div></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(s => (
            <div key={s.title} className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-3"><div className={`${s.iconBg} p-3 rounded-full text-xl`}>{s.emoji}</div><h3 className="text-lg font-semibold text-gray-800">{s.title}</h3></div>
              <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
              <div className="space-y-1.5 mb-5">{s.info.map(([k, v, vc]) => (<div key={k} className="flex justify-between text-sm"><span className="text-gray-500">{k}</span><span className={`font-semibold ${vc}`}>{v}</span></div>))}</div>
              <button onClick={() => setModal(s.action)} className={`w-full py-2.5 rounded-xl text-white text-sm font-semibold ${s.btnColor} transition`}>{s.btn}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Modals - Full Content */}
      {modal === "students" && (
        <Modal title="👥 My Students" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(STUDENT_USERS).map(([id, u]) => (
              <div key={id} className="bg-blue-50 p-4 rounded-xl border hover:border-blue-300 transition">
                <div className="flex justify-between items-start mb-2"><div><h4 className="font-semibold text-blue-800">{u.name}</h4><p className="text-xs text-gray-500">{id} — {u.dept} {u.semester}th Sem, Sec {u.section}</p></div><span className={`text-xs px-2 py-1 rounded-full font-medium ${u.cgpa >= 8.8 ? "bg-green-100 text-green-700" : u.cgpa < 8.0 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>{u.cgpa >= 8.8 ? "Excellent" : u.cgpa < 8.0 ? "Needs Attention" : "Good"}</span></div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600"><span>CGPA: <strong className="text-blue-700">{u.cgpa}</strong></span><span>Attend.: <strong className={u.attendance < 80 ? "text-red-600" : ""}>{u.attendance}%</strong></span><span>Credits: <strong>{u.credits}</strong></span></div>
                <div className="mt-2 text-xs text-gray-500">📞 {u.phone} · ✉️ {u.email}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal === "ai" && (
        <Modal title="💡 AI Teaching Assistant" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="bg-pink-50 p-5 rounded-xl">
              <h4 className="font-bold text-pink-800 mb-3">💡 Today's AI Suggestions</h4>
              {[["📚 Teaching Tip", "Consider using visual diagrams for Binary Tree concepts. 85% of students learn better with visual aids.", "border-pink-400"],
                ["⚠️ Student Alert", "Karthik Rajan shows declining performance (7.9 CGPA, 85% attendance). Recommend one-on-one session.", "border-blue-400"],
                ["✅ Assignment Insight", "Data Structures Assignment 3 has 87.5% completion rate. Consider similar difficulty level for next assignment.", "border-green-400"],
                ["📊 Performance Trend", "Class average improved by 0.3 GPA points this semester. Top performers: Deepika Nair (9.3), Priya Sharma (9.1).", "border-purple-400"],
                ["🔔 Deadline Reminder", "SQL Query Optimization assignment due March 25 — only 30% submitted so far. Consider sending a reminder.", "border-orange-400"]].map(([t, d, border]) => (
                <div key={t} className={`bg-white p-3 rounded-lg mb-2 border-l-4 ${border}`}><p className="text-sm font-semibold mb-1">{t}</p><p className="text-xs text-gray-600">{d}</p></div>
              ))}
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl">
              <h4 className="font-bold text-indigo-800 mb-3">🤖 Auto-Grading Summary</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Graded Today</p><p className="text-xl font-bold text-green-600">12</p></div>
                <div className="bg-white p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Pending</p><p className="text-xl font-bold text-orange-600">8</p></div>
                <div className="bg-white p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Avg Score</p><p className="text-xl font-bold text-blue-600">82%</p></div>
              </div>
            </div>
            <button onClick={() => showToast("AI insights refreshed!")} className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm">Refresh Insights</button>
          </div>
        </Modal>
      )}

      {modal === "alerts" && (
        <Modal title="🔔 Smart Alerts" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {[["🚨 Urgent", "Karthik Rajan attendance dropped below 85%. Schedule counseling session.", "bg-red-50", "border-red-400", "text-red-800"],
              ["🚨 Urgent", "3 students haven't submitted Computer Networks Lab 2. Due date: March 22.", "bg-red-50", "border-red-400", "text-red-800"],
              ["⚠️ Warning", "Database Systems internal marks not yet uploaded for 12 students.", "bg-orange-50", "border-orange-400", "text-orange-800"],
              ["📅 Upcoming", "Mid-semester examination starts March 18. Ensure syllabus completion.", "bg-blue-50", "border-blue-400", "text-blue-800"],
              ["📅 Upcoming", "Faculty Development Program on March 25 — Registration required.", "bg-blue-50", "border-blue-400", "text-blue-800"],
              ["✅ Completed", "Data Structures Assignment 3 grading completed. Results published.", "bg-green-50", "border-green-400", "text-green-800"],
              ["ℹ️ System", "New version of online attendance system deployed. Please review changes.", "bg-gray-50", "border-gray-400", "text-gray-800"],
              ["ℹ️ System", "Library has added 15 new reference books for Database Systems.", "bg-gray-50", "border-gray-400", "text-gray-800"],
            ].map(([type, msg, bg, border, tc], i) => (
              <div key={i} className={`${bg} border-l-4 ${border} p-3 rounded-r-lg`}>
                <p className={`text-sm font-semibold ${tc}`}>{type}</p>
                <p className="text-xs text-gray-700 mt-1">{msg}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal === "mentees" && (
        <Modal title="🎯 My Mentees" onClose={() => setModal(null)}>
          <div className="space-y-4">
            {(FACULTY_MENTEES[uid] || []).map(m => (
              <div key={m.id} className={`p-4 rounded-xl border ${m.status === "At Risk" ? "bg-red-50 border-red-200" : m.status === "Excellent" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
                <div className="flex justify-between items-start">
                  <div><h4 className="font-semibold text-gray-800">{m.name}</h4><p className="text-xs text-gray-500">{m.id}</p></div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${m.status === "Excellent" ? "bg-green-100 text-green-700" : m.status === "At Risk" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{m.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                  <div><span className="text-gray-500">CGPA: </span><span className="font-bold">{m.cgpa}</span></div>
                  <div><span className="text-gray-500">Attendance: </span><span className={`font-bold ${m.attendance < 80 ? "text-red-600" : ""}`}>{m.attendance}%</span></div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => showToast(`Scheduled meeting with ${m.name}`)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Schedule Meeting</button>
                  <button onClick={() => showToast(`Report generated for ${m.name}`)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">Generate Report</button>
                </div>
              </div>
            ))}
            {(FACULTY_MENTEES[uid] || []).length === 0 && <p className="text-gray-500 text-center py-8">No mentees assigned yet.</p>}
          </div>
        </Modal>
      )}

      {modal === "subjects" && (
        <Modal title="📚 My Subjects" onClose={() => setModal(null)}>
          <div className="space-y-4">
            {(FACULTY_SUBJECTS[uid] || []).map(s => (
              <div key={s.code} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-green-300 transition">
                <div className="flex justify-between items-start mb-3">
                  <div><h4 className="font-bold text-gray-800 text-lg">{s.name}</h4><p className="text-sm text-gray-500">Code: {s.code} · Semester {s.semester}</p></div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded-lg"><span className="text-gray-500 text-xs">Students</span><p className="font-bold text-blue-600">{s.students}</p></div>
                  <div className="bg-green-50 p-2 rounded-lg"><span className="text-gray-500 text-xs">Schedule</span><p className="font-bold text-green-600 text-xs">{s.schedule}</p></div>
                  <div className="bg-purple-50 p-2 rounded-lg"><span className="text-gray-500 text-xs">Room</span><p className="font-bold text-purple-600">{s.room}</p></div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => showToast(`Taking attendance for ${s.name}`)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs">Take Attendance</button>
                  <button onClick={() => showToast(`Uploading marks for ${s.name}`)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Upload Marks</button>
                  <button onClick={() => showToast(`Materials shared for ${s.name}`)} className="bg-green-600 text-white px-3 py-1 rounded text-xs">Share Materials</button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal === "attend" && (
        <Modal title="📋 Attendance Management" onClose={() => setModal(null)}>
          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-3">📊 Recent Attendance Records</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-100">{["Date", "Subject", "Period", "Present", "Total", "%"].map(h => <th key={h} className="border px-3 py-2 text-left">{h}</th>)}</tr></thead>
                <tbody>
                  {ATTENDANCE_DATA.map((a, i) => (
                    <tr key={i} className="border-b">
                      <td className="border px-3 py-2">{a.date}</td>
                      <td className="border px-3 py-2 font-medium">{a.subject}</td>
                      <td className="border px-3 py-2 text-xs">{a.period}</td>
                      <td className="border px-3 py-2 text-center text-green-600 font-bold">{a.present}</td>
                      <td className="border px-3 py-2 text-center">{a.total}</td>
                      <td className="border px-3 py-2"><span className={`font-bold ${a.percentage >= 90 ? "text-green-600" : a.percentage >= 80 ? "text-yellow-600" : "text-red-600"}`}>{a.percentage}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-3">✅ Take Attendance — Data Structures (Today)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(STUDENT_USERS).slice(0, 8).map(([id, s]) => (
                <div key={id} className={`flex items-center justify-between p-2 rounded-lg border ${attendanceMarked[id] ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                  <span className="text-sm"><strong>{s.name}</strong> <span className="text-gray-400 text-xs">({id})</span></span>
                  <button onClick={() => { setAttendanceMarked(prev => ({ ...prev, [id]: !prev[id] })); }} className={`px-3 py-1 rounded text-xs font-medium ${attendanceMarked[id] ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}>{attendanceMarked[id] ? "Present ✓" : "Mark"}</button>
                </div>
              ))}
            </div>
            <button onClick={() => { showToast("Attendance submitted!"); setAttendanceMarked({}); }} className="mt-3 bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-medium">Submit Attendance</button>
          </div>
        </Modal>
      )}

      {modal === "assign" && (
        <Modal title="📝 Assignments" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {(FACULTY_ASSIGNMENTS[uid] || []).map((a, i) => (
              <div key={i} className={`p-4 rounded-xl border ${a.status === "Active" ? "bg-orange-50 border-orange-200" : "bg-green-50 border-green-200"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div><h4 className="font-semibold text-gray-800">{a.title}</h4><p className="text-xs text-gray-500">{a.subject} · Due: {a.dueDate}</p></div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.status === "Active" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>{a.status}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>Submitted: <strong className="text-blue-600">{a.submitted}/{a.total}</strong></span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${a.status === "Graded" ? "bg-green-500" : "bg-orange-500"}`} style={{ width: `${(a.submitted / a.total) * 100}%` }}></div></div>
                  <span className="text-xs text-gray-500">{Math.round((a.submitted / a.total) * 100)}%</span>
                </div>
                {a.status === "Active" && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => showToast(`Reminder sent for ${a.title}`)} className="bg-orange-500 text-white px-3 py-1 rounded text-xs">Send Reminder</button>
                    <button onClick={() => showToast(`Grading ${a.title}...`)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Start Grading</button>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => showToast("New assignment form opened!")} className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium mt-2">+ Create New Assignment</button>
          </div>
        </Modal>
      )}

      {modal === "pubs" && (
        <Modal title="📖 Publications & Research" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {(FACULTY_PUBLICATIONS[uid] || []).map((p, i) => (
              <div key={i} className="bg-white border rounded-xl p-4 hover:border-red-300 transition">
                <h4 className="font-semibold text-gray-800 mb-1">{p.title}</h4>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.type}</span>
                  <span>{p.journal}</span>
                  <span>📅 {p.year}</span>
                  <span className="text-orange-600 font-medium">📝 {p.citations} citations</span>
                </div>
              </div>
            ))}
            <div className="bg-gray-50 p-4 rounded-xl mt-4">
              <h4 className="font-bold text-gray-700 mb-2">📊 Research Summary</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center"><p className="text-xs text-gray-500">Total</p><p className="text-xl font-bold text-red-600">{(FACULTY_PUBLICATIONS[uid] || []).length}</p></div>
                <div className="text-center"><p className="text-xs text-gray-500">Total Citations</p><p className="text-xl font-bold text-blue-600">{(FACULTY_PUBLICATIONS[uid] || []).reduce((s, p) => s + p.citations, 0)}</p></div>
                <div className="text-center"><p className="text-xs text-gray-500">h-index</p><p className="text-xl font-bold text-green-600">{Math.min((FACULTY_PUBLICATIONS[uid] || []).length, 5)}</p></div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal === "live" && (
        <Modal title="📹 Live Classes" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-center"><div><h4 className="font-bold text-green-800">🟢 Currently Live: Data Structures</h4><p className="text-sm text-green-600">35/40 students online · Room: CSE Lab 1</p></div><button onClick={() => showToast("Joining live class...")} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Join Now</button></div>
            </div>
            <h4 className="font-bold text-gray-700">📅 Today's Schedule</h4>
            {(FACULTY_SUBJECTS[uid] || []).map(s => (
              <div key={s.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div><p className="font-medium text-gray-800">{s.name}</p><p className="text-xs text-gray-500">{s.schedule} · {s.room}</p></div>
                <button onClick={() => showToast(`Starting class for ${s.name}`)} className="bg-indigo-600 text-white px-3 py-1 rounded text-xs">Start Class</button>
              </div>
            ))}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-2">📊 Class Analytics</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><p className="text-xs text-gray-500">Avg Attendance</p><p className="text-lg font-bold text-blue-600">91%</p></div>
                <div><p className="text-xs text-gray-500">Classes This Week</p><p className="text-lg font-bold text-green-600">12</p></div>
                <div><p className="text-xs text-gray-500">Student Engagement</p><p className="text-lg font-bold text-purple-600">87%</p></div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── Exam Control ──
const ExamPanel = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState("");
  const [showDeptBreakdown, setShowDeptBreakdown] = useState(false);
  const [showFacultyBreakdown, setShowFacultyBreakdown] = useState(false);

  const login = () => {
    if (!username.trim() || !pw.trim()) { showToast("Please enter credentials"); return; }
    setLoggedUser(username.trim()); setPage("dash"); showToast("Logged in successfully!");
  };

  if (page === "login") return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <BackBtn onClick={onBack} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8"><h1 className="text-2xl font-bold text-gray-800">Examination Control</h1><p className="text-gray-500 text-sm">Manage your examination system</p></div>
        <div className="space-y-4">
          <div><label className="block text-gray-700 text-sm font-medium mb-1">Username</label><input value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter your username" /></div>
          <div><label className="block text-gray-700 text-sm font-medium mb-1">Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Enter your password" /></div>
          <button onClick={login} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">Sign In</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <BackBtn onClick={onBack} />
      <header className="bg-white shadow py-4 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><h1 className="text-2xl font-bold text-gray-900">Examination Control Dashboard — <span className="text-gray-700">{loggedUser}</span></h1><button onClick={() => setPage("login")} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Logout</button></div></header>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setShowDeptBreakdown(!showDeptBreakdown)}>
            <div className="flex items-center justify-between mb-2"><div><h3 className="text-base font-semibold text-gray-700">Total Students</h3><p className="text-4xl font-bold text-blue-600 mt-1">942</p></div><div className="bg-blue-100 p-3 rounded-full"><span className="text-2xl">👥</span></div></div>
            {showDeptBreakdown && (
              <div className="mt-3 pt-3 border-t">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">{Object.entries(DEPT_STUDENT_COUNTS).map(([d, n]) => (<div key={d} className="flex justify-between"><span className="text-gray-500">{d}</span><span className="font-semibold text-purple-600">{n}</span></div>))}</div>
              </div>
            )}
          </div>
          {/* Total Faculty */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setShowFacultyBreakdown(!showFacultyBreakdown)}>
            <div className="flex items-center justify-between"><div><h3 className="text-base font-semibold text-gray-700">Total Faculty</h3><p className="text-4xl font-bold text-green-600 mt-1">89</p></div><div className="bg-green-100 p-3 rounded-full"><span className="text-2xl">🎓</span></div></div>
            {showFacultyBreakdown && (
              <div className="mt-3 pt-3 border-t space-y-1.5 text-sm"><div className="flex justify-between"><span className="text-gray-500">Men Faculty</span><span className="font-semibold text-blue-600">52</span></div><div className="flex justify-between"><span className="text-gray-500">Women Faculty</span><span className="font-semibold text-pink-600">37</span></div></div>
            )}
          </div>
          {/* Total Departments */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform"><div className="flex items-center justify-between"><div><h3 className="text-base font-semibold text-gray-700">Total Departments</h3><p className="text-4xl font-bold text-purple-600 mt-1">7</p></div><div className="bg-purple-100 p-3 rounded-full"><span className="text-2xl">🏢</span></div></div>
            <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-1 text-xs">{DEPARTMENTS.map(d => <span key={d.code} className="text-gray-600">• {d.name.split(' ').slice(0, 2).join(' ')}</span>)}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{ title: "Seating Arrangements", desc: "Upload and manage seating arrangements for examinations", color: "purple", hasUpload: true, action: "seating" },
            { title: "Exam Rules", desc: "View and manage examination rules and regulations", color: "red", rules: ["No mobile phones allowed", "Arrive 30 minutes early", "Bring valid ID card", "No cheat sheets", "Absolute silence"], action: "rules" },
            { title: "Result Portal", desc: "Access Anna University exam results", color: "yellow", hasLink: true, action: "results" },
            { title: "Malpractice Rules", desc: "Guidelines and penalties for examination malpractice", color: "orange", rules: ["Copying: Exam cancellation", "Unfair means: Debarment", "Impersonation: Legal action", "Mobile usage: Paper cancellation"], action: "malprac" },
            { title: "Academic Syllabus", desc: "Access current academic syllabus and curriculum", color: "indigo", links: true, action: "syllabus" },
            { title: "Mark Sheet Arrangements", desc: "Upload and organize mark sheets by academic year", color: "teal", hasUpload: true, action: "marks" },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-4"><div className="bg-gray-100 p-3 rounded-full"><span className="text-xl">📋</span></div><h3 className="text-lg font-semibold text-gray-800">{card.title}</h3></div>
              <p className="text-gray-500 text-sm mb-3">{card.desc}</p>
              {card.rules && <div className="space-y-1.5 mb-4">{card.rules.map(r => (<div key={r} className="flex items-center gap-2 text-sm text-gray-700"><span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>{r}</div>))}</div>}
              {card.hasUpload && <div className="mb-4"><input type="file" className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg px-2 py-1.5" onChange={() => showToast("File selected!")} /></div>}
              {card.hasLink && <a href="https://coe1.annauniv.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium block mb-3">Anna University Results Portal →</a>}
              {card.links && <div className="space-y-1 mb-3"><a href="https://cac.annauniv.edu/aidetails/ai_ug_cands_2021ft.html" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline text-xs">Anna University Regulation 2021 Portal →</a><a href="https://cac.annauniv.edu/aidetails/ai_ug_cands_2025ft.html" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline text-xs">Anna University Regulation 2025 Portal →</a></div>}
              <button onClick={() => card.action === "rules" || card.action === "malprac" ? setModal(card.action) : showToast(`${card.title} action completed!`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition">{card.title}</button>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <Modal title={modal === "rules" ? "Examination Rules" : "Malpractice Penalties"} onClose={() => setModal(null)}>
          {modal === "rules" && <div className="space-y-3">{[["No Mobile Phones", "Mobile phones and electronic devices are strictly prohibited inside the examination hall. Violators will face paper cancellation."], ["Arrive Early", "Students must arrive at least 30 minutes before the examination begins. Late arrivals will not be permitted after 15 minutes."], ["Valid ID Required", "A valid college ID card must be presented at the examination hall. Without ID, students will not be allowed to write the exam."], ["No Cheat Sheets", "Any form of written material not permitted by the examiner is prohibited. This includes notes, books, and electronic aids."], ["Silence Policy", "Absolute silence must be maintained throughout the examination. Talking or signaling will be treated as malpractice."], ["Seating Rules", "Students must sit only in their assigned seats. Changing seats without permission is not allowed."]].map(([t, d]) => (<div key={t} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400"><span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span><div><p className="font-semibold text-red-800 text-sm">{t}</p><p className="text-xs text-red-600 mt-0.5">{d}</p></div></div>))}</div>}
          {modal === "malprac" && <div className="space-y-3">{[["Copying from another student", "Immediate cancellation of current exam paper"], ["Use of unfair means", "Debarment from all current semester exams"], ["Impersonation", "Legal action + permanent academic suspension"], ["Mobile phone usage", "Paper cancellation + disciplinary action"], ["Carrying unauthorized materials", "Warning for first offense, cancellation for repeat"], ["Communicating with others", "Paper cancellation + counseling referral"]].map(([v, p]) => (<div key={v} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400"><p className="font-medium text-orange-800 text-sm">{v}</p><span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full ml-4 flex-shrink-0">{p}</span></div>))}</div>}
        </Modal>
      )}
    </div>
  );
};

// ── Student Panel ──
const StudentPanel = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [page, setPage] = useState("login");
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");
  const [user, setUser] = useState<{ id: string } & typeof STUDENT_USERS[string] | null>(null);
  const [modal, setModal] = useState<string | null>(null);

  const login = () => {
    const exp = uid.replace("Student", "pass");
    if (STUDENT_USERS[uid] && pw === exp) { setUser({ id: uid, ...STUDENT_USERS[uid] }); setPage("dash"); showToast(`Welcome back, ${STUDENT_USERS[uid].name}!`); }
    else showToast("Invalid credentials!");
  };

  if (page === "login") return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <BackBtn onClick={onBack} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Student Portal</h1>
        <div className="space-y-4">
          <input value={uid} onChange={e => setUid(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="Student001" />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="pass001" />
          <button onClick={login} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Sign In</button>
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600"><strong>Demo:</strong> Student001/pass001 ... Student010/pass010</div>
      </div>
    </div>
  );

  const sections = [
    { title: "Course Registration", icon: "📘", color: "green", action: "courses", info: [["Current Credits", "18/24"], ["Available Credits", "6"]] },
    { title: "Grade Report", icon: "📊", color: "blue", action: "grades", info: [["Semester 6", "8.9 GPA"], ["Semester 5", "8.5 GPA"]] },
    { title: "Assignments", icon: "📝", color: "purple", action: "assign", info: [["Total", "8"], ["Submitted", "5"], ["Pending", "3"]] },
    { title: "Timetable", icon: "⏰", color: "yellow", action: "timetable", info: [["Daily Classes", "Available"], ["Internal Exams", "Available"]] },
    { title: "Library", icon: "📚", color: "indigo", action: "library", info: [["Reference Books", "245 Available"], ["Handwritten Notes", "89 Available"]] },
    { title: "Fee Payment", icon: "💳", color: "red", action: "fees", info: [["Total Fees", `₹${(user?.totalFees || 85000).toLocaleString()}`], ["Paid", `₹${(user?.paid || 70000).toLocaleString()}`], ["Pending", `₹${(user?.pendingFees || 15000).toLocaleString()}`]] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <BackBtn onClick={onBack} />
      <header className="bg-white shadow-lg py-5 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><div><h1 className="text-2xl font-bold">Student Dashboard</h1><p className="text-gray-500 text-sm">Welcome, {user?.name} (ID: {user?.id})</p></div><button onClick={() => setPage("login")} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Logout</button></div></header>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex flex-wrap gap-4"><div className="bg-white/20 px-3 py-1 rounded-full text-sm">Department: {user?.dept}</div><div className="bg-white/20 px-3 py-1 rounded-full text-sm">Semester: {user?.semester}th</div><div className="bg-white/20 px-3 py-1 rounded-full text-sm">Section: {user?.section}</div></div>
        </div>
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">🔔 Notifications from Admin Panel</h3>
          <div className="space-y-3">
            {NOTIFICATIONS.map(n => (
              <div key={n.title} className="bg-gray-50 border-l-4 border-gray-300 p-3 rounded-r-lg">
                <div className="flex justify-between items-start"><div><div className="font-semibold text-gray-800">{n.title}</div><div className="text-sm text-gray-600">{n.message}</div></div><div className="text-xs text-gray-500">{n.time}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["Current CGPA", user?.cgpa, "text-green-600"], ["Credits Earned", user?.credits, "text-blue-600"], ["Attendance", `${user?.attendance}%`, "text-purple-600"], ["Pending Fees", `₹${(user?.pendingFees || 0).toLocaleString()}`, "text-yellow-600"]].map(([l, v, c]) => (
            <div key={l as string} className="bg-white rounded-xl shadow p-4"><p className="text-xs text-gray-500">{l as string}</p><p className={`text-2xl font-bold ${c}`}>{String(v)}</p></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">⏰ Pending Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[["Data Structures Assignment 3", "March 20, 2024", "bg-red-50 border-red-200 text-red-800", "text-red-600", "2 days remaining"],
              ["Computer Networks Lab 2", "March 22, 2024", "bg-orange-50 border-orange-200 text-orange-800", "text-orange-600", "4 days remaining"],
              ["Software Engineering Report", "March 25, 2024", "bg-yellow-50 border-yellow-200 text-yellow-800", "text-yellow-600", "7 days remaining"]].map(([n, d, cls, dc, rem]) => (
              <button key={n} onClick={() => showToast(`Opening ${n}…`)} className={`${cls} border-2 p-4 rounded-lg text-left hover:opacity-80 transition`}><p className="font-semibold text-sm">{n}</p><p className={`${dc} text-xs mt-1`}>Due: {d}</p><p className="text-xs text-gray-500 mt-1">⏰ {rem}</p></button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(s => (
            <div key={s.title} className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center mb-3"><div className="bg-gray-100 p-3 rounded-full mr-3 text-xl">{s.icon}</div><h3 className="font-semibold text-gray-800">{s.title}</h3></div>
              <div className="space-y-1 mb-4">{s.info.map(([k, v]) => (<div key={k} className="flex justify-between text-sm"><span className="text-gray-500">{k}</span><span className="font-semibold text-gray-700">{v}</span></div>))}</div>
              <button onClick={() => setModal(s.action)} className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Open {s.title}</button>
            </div>
          ))}
        </div>
        {/* CGPA Calculator */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">🧮 CGPA Calculator</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1,2,3,4,5,6].map(sem => (
              <div key={sem} className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Semester {sem}</p>
                <p className="text-lg font-bold text-blue-600">{(7.5 + Math.random() * 2).toFixed(1)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Overall CGPA</p>
            <p className="text-3xl font-bold text-green-600">{user?.cgpa}</p>
          </div>
        </div>
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-gray-800 mb-4">👤 Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[["Full Name", user?.name], ["Student ID", user?.id], ["Department", user?.dept], ["Semester", `${user?.semester}th`], ["Section", user?.section], ["Phone", user?.phone], ["Email", user?.email], ["Date of Birth", user?.dob], ["Parent/Guardian", user?.parent], ["Address", user?.address]].map(([k, v]) => (
              <div key={k as string} className="flex gap-3 bg-gray-50 p-2 rounded-lg"><span className="text-gray-500 w-32 flex-shrink-0">{k as string}:</span><span className="font-medium text-gray-800">{String(v || "N/A")}</span></div>
            ))}
          </div>
        </div>
      </div>
      {modal && (
        <Modal title={sections.find(s => s.action === modal)?.title || modal} onClose={() => setModal(null)}>
          {modal === "grades" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[["Semester 6", "Current", "blue", [["Data Structures", "95/100 (A+)"], ["Computer Networks", "88/100 (A)"], ["Database Systems", "92/100 (A+)"], ["Software Engineering", "85/100 (A)"], ["Operating Systems", "90/100 (A+)"]]], ["Semester 5", "Previous", "green", [["Theory of Computation", "82/100 (A)"], ["Compiler Design", "87/100 (A)"], ["Computer Graphics", "85/100 (A)"], ["Software Testing", "88/100 (A)"], ["Mobile Computing", "80/100 (A)"]]]].map(([sem, tag, c, subjects]) => (
                <div key={sem as string} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">{sem as string} — <span className="text-blue-600">{tag as string}</span></h3>
                  {(subjects as string[][]).map(([s, g]) => (<div key={s} className="flex justify-between text-sm mb-1.5 bg-white p-2 rounded"><span>{s}</span><span className="font-semibold">{g}</span></div>))}
                </div>
              ))}
            </div>
          )}
          {modal === "timetable" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-100">{["Time", "Mon", "Tue", "Wed", "Thu", "Fri"].map(h => (<th key={h} className="border px-3 py-2 text-left font-semibold">{h}</th>))}</tr></thead>
                <tbody>{[["9:00-10:00", "Data Structures", "Computer Networks", "Database Systems", "Software Eng.", "Lab"],
                  ["10:00-11:00", "Computer Networks", "Database Systems", "Data Structures", "Lab", "Software Eng."],
                  ["11:00-12:00", "Database Systems", "Data Structures", "Software Eng.", "Computer Networks", "Free"],
                  ["12:00-1:00", "LUNCH", "LUNCH", "LUNCH", "LUNCH", "LUNCH"],
                  ["2:00-3:00", "Lab", "Software Eng.", "Lab", "Data Structures", "Computer Networks"],
                  ["3:00-4:00", "Free", "Lab", "Free", "Free", "Lab"]].map(([t, ...c]) => (
                  <tr key={t} className="border-b"><td className="border px-3 py-2 font-medium text-gray-600">{t}</td>{c.map((sub, i) => (<td key={i} className={`border px-3 py-2 ${sub === "Free" ? "text-gray-400 italic" : sub === "LUNCH" ? "text-center text-orange-500 font-medium" : ""}`}>{sub}</td>))}</tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {modal === "fees" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Total Fees</p><p className="text-xl font-bold text-blue-600">₹{(user?.totalFees || 85000).toLocaleString()}</p></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Paid</p><p className="text-xl font-bold text-green-600">₹{(user?.paid || 70000).toLocaleString()}</p></div>
                <div className="bg-red-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Pending</p><p className="text-xl font-bold text-red-600">₹{(user?.pendingFees || 15000).toLocaleString()}</p></div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">Payment History</h4>
                {[["Tuition Fee - Sem 6", "₹35,000", "Jan 15, 2024", "Paid"], ["Lab Fee", "₹10,000", "Jan 15, 2024", "Paid"], ["Library Fee", "₹5,000", "Jan 15, 2024", "Paid"], ["Hostel Fee", "₹20,000", "Feb 1, 2024", "Paid"], ["Transport Fee", "₹15,000", "Pending", "Due"]].map(([item, amt, date, status]) => (
                  <div key={item} className="flex justify-between items-center py-2 border-b text-sm">
                    <span className="text-gray-700">{item}</span>
                    <div className="flex items-center gap-3"><span className="font-bold">{amt}</span><span className="text-xs text-gray-500">{date}</span><span className={`text-xs px-2 py-0.5 rounded-full ${status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{status}</span></div>
                  </div>
                ))}
              </div>
              {(user?.pendingFees || 0) > 0 && <button onClick={() => showToast("Payment gateway opening...")} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Pay Now — ₹{(user?.pendingFees || 0).toLocaleString()}</button>}
            </div>
          )}
          {modal === "library" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Books Available</p><p className="text-xl font-bold text-indigo-600">245</p></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><p className="text-xs text-gray-500">Books Borrowed</p><p className="text-xl font-bold text-green-600">3</p></div>
              </div>
              <h4 className="font-bold text-gray-700">📚 Currently Borrowed</h4>
              {[["Data Structures by Tenenbaum", "Due: March 25, 2024"], ["Computer Networks by Forouzan", "Due: March 28, 2024"], ["Database Systems by Navathe", "Due: April 2, 2024"]].map(([book, due]) => (
                <div key={book} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span className="text-sm font-medium">{book}</span><span className="text-xs text-orange-600">{due}</span></div>
              ))}
            </div>
          )}
          {modal === "courses" && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-700">📘 Registered Courses — Semester {user?.semester}</h4>
              {[["CS6301", "Data Structures", "3+1", "Dr. Rajesh Kumar"], ["CS6302", "Computer Networks", "3+0", "Dr. Rajesh Kumar"], ["CS6303", "Database Systems", "3+1", "Dr. Rajesh Kumar"], ["CS6304", "Software Engineering", "3+0", "Prof. Meena Devi"], ["CS6305", "Operating Systems", "3+1", "Prof. Anand Kumar"]].map(([code, name, credits, faculty]) => (
                <div key={code} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                  <div><p className="font-medium text-gray-800">{name}</p><p className="text-xs text-gray-500">{code} · Credits: {credits} · {faculty}</p></div>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Registered</span>
                </div>
              ))}
            </div>
          )}
          {modal === "assign" && (
            <div className="space-y-3">
              {[["Data Structures Assignment 3", "Binary Tree Implementation", "March 20, 2024", "Pending", "Dr. Rajesh Kumar"],
                ["Computer Networks Lab 2", "TCP/IP Protocol Analysis", "March 22, 2024", "Pending", "Dr. Rajesh Kumar"],
                ["Software Engineering Report", "Requirement Specification Document", "March 25, 2024", "Pending", "Prof. Meena Devi"],
                ["Database Systems Assignment 2", "ER Diagram Design", "March 15, 2024", "Submitted", "Dr. Rajesh Kumar"],
                ["Operating Systems Lab 3", "Process Scheduling Simulation", "March 12, 2024", "Graded — 92/100", "Prof. Anand Kumar"]].map(([title, desc, due, status, faculty]) => (
                <div key={title} className={`p-4 rounded-xl border ${status === "Pending" ? "bg-orange-50 border-orange-200" : status?.startsWith("Graded") ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
                  <div className="flex justify-between items-start"><div><h4 className="font-semibold text-gray-800">{title}</h4><p className="text-xs text-gray-500">{desc} · {faculty}</p></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status === "Pending" ? "bg-orange-100 text-orange-700" : status === "Submitted" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{status}</span></div>
                  <p className="text-xs text-gray-500 mt-1">Due: {due}</p>
                  {status === "Pending" && <button onClick={() => showToast(`Submitting ${title}...`)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs">Submit Assignment</button>}
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

// ── Admission Page ──
const AdmissionPage = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [page, setPage] = useState("landing");
  const [form, setForm] = useState({ name: "", phone: "", place: "", degree: "" });
  const submit = (e: React.FormEvent) => { e.preventDefault(); showToast("Brochure request submitted!"); setPage("dashboard"); };

  if (page === "landing") return (
    <div className="min-h-screen bg-white">
      <BackBtn onClick={onBack} />
      <section className="py-20 px-4 text-center text-white" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Start Your Engineering Journey</h2>
        <p className="text-xl mb-8 opacity-90">DMI Engineering College — Where Dreams Become Reality</p>
        <button onClick={() => setPage("form")} className="bg-white text-purple-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition shadow-xl">Get Free Brochure →</button>
      </section>
      <section className="py-16 bg-gray-50">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Why Choose DMI Engineering College?</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[["🎓", "Expert Faculty", "Learn from 89+ qualified faculty with years of industry experience"], ["💼", "93.2% Placement", "Top companies like Infosys, ZOHO, TCS recruit from our campus"], ["🌟", "Modern Curriculum", "Anna University affiliated courses aligned with industry demands"]].map(([i, t, d]) => (
            <div key={t} className="text-center p-6 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform"><div className="text-4xl mb-3">{i}</div><h4 className="text-lg font-semibold mb-2">{t}</h4><p className="text-gray-500 text-sm">{d}</p></div>
          ))}
        </div>
      </section>
    </div>
  );

  if (page === "form") return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <BackBtn onClick={onBack} />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get Your Free Brochure</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Full Name *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-4 py-3 text-sm" /></div>
            <div><label className="block text-sm font-medium mb-1">Phone *</label><input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-lg px-4 py-3 text-sm" /></div>
            <div><label className="block text-sm font-medium mb-1">City *</label><input required value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} className="w-full border rounded-lg px-4 py-3 text-sm" /></div>
            <div><label className="block text-sm font-medium mb-1">Education *</label><select required value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} className="w-full border rounded-lg px-4 py-3 text-sm"><option value="">Select...</option><option>10th Grade</option><option>12th Grade</option><option>Diploma</option><option>Bachelor's Degree</option></select></div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setPage("landing")} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">← Back</button>
            <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold">Submit & Continue →</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} />
      <header className="bg-white shadow-sm border-b py-4 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><h1 className="text-xl font-bold text-gray-800">Student Portal</h1><span className="text-gray-600 text-sm">Welcome, <strong>{form.name}</strong>!</span></div></header>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          {[["📋", "Application Status", "Under Review"], ["📚", "Brochures", "3 Downloaded"], ["🎯", "Recommended", "5 Courses"], ["⭐", "Profile Score", "85%"]].map(([i, l, v]) => (
            <div key={l} className="bg-white rounded-xl shadow p-5 flex items-center gap-3"><span className="text-3xl">{i}</span><div><p className="text-xs text-gray-500">{l}</p><p className="text-base font-semibold text-blue-600">{v}</p></div></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold mb-4">🎯 Recommended Courses</h3>
          <div className="space-y-3">
            {[["BE", "4 Departments", "1 Common for Freshers"], ["B.Tech", "2 Departments", "1 Common for Freshers"]].map(([d, sub, tag]) => (
              <div key={d} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"><div><h4 className="font-semibold">{d}</h4><p className="text-sm text-gray-500">{sub}</p><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span></div><button onClick={() => showToast("Application started!")} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">Apply Now</button></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Other Facilities ──
const FacilitiesPage = ({ onBack, showToast }: { onBack: () => void; showToast: (msg: string) => void }) => {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [hostelTab, setHostelTab] = useState("mess");

  const apps = [
    { id: "canteen", icon: "🍽️", title: "Campus Canteen", desc: "Order food, track orders in real-time, view daily menus", color: "from-orange-400 to-red-500" },
    { id: "transport", icon: "🚌", title: "Transport Booking", desc: "Book bus rides, check routes, real-time tracking", color: "from-green-400 to-emerald-500" },
    { id: "clubs", icon: "🎭", title: "Club Management", desc: "Discover clubs, manage memberships, view events", color: "from-purple-400 to-pink-500" },
    { id: "lab", icon: "🔬", title: "Lab Booking", desc: "Reserve labs, check availability, manage schedules", color: "from-violet-400 to-indigo-500" },
    { id: "library", icon: "📚", title: "Library Bookstore", desc: "Browse books, check availability, place holds", color: "from-amber-400 to-yellow-500" },
    { id: "hostel", icon: "🏢", title: "Hostel Services", desc: "Complaints, mess menu, visitor management & room alloc.", color: "from-blue-400 to-cyan-500" },
  ];

  if (!activeApp) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100">
      <BackBtn onClick={onBack} />
      <section className="py-10 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-2">Welcome to Digital Campus</h2>
        <p className="text-lg opacity-90">Order food, book transport, manage clubs, reserve labs & more!</p>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Campus Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map(a => (
              <div key={a.id} onClick={() => setActiveApp(a.id)} className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-all border hover:border-indigo-300">
                <div className={`h-32 bg-gradient-to-br ${a.color} flex items-center justify-center text-6xl`}>{a.icon}</div>
                <div className="p-6"><h3 className="text-xl font-bold text-slate-800 mb-2">{a.title}</h3><p className="text-sm text-slate-500">{a.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const AppHeader = () => (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={() => setActiveApp(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 text-lg">←</button>
        <h2 className="text-xl font-bold text-slate-800">{apps.find(a => a.id === activeApp)?.icon} {apps.find(a => a.id === activeApp)?.title}</h2>
      </div>
    </div>
  );

  if (activeApp === "canteen") {
    const menu = [["🍛", "Biryani Special", "Chicken biryani with raita", "₹120"], ["🫓", "Chapati Curry", "4 Chapati + Butter chicken", "₹90"], ["🍜", "Hakka Noodles", "Veg/Non-Veg noodles", "₹80"], ["🥤", "Fresh Juice", "Orange / Mango / Mixed", "₹40"], ["🍕", "Pizza", "Cheese / Veggie / Paneer", "₹100"], ["🍔", "Burger", "Veg / Chicken with fries", "₹70"]];
    return (
      <div className="min-h-screen bg-gray-50">
        <BackBtn onClick={onBack} /><AppHeader />
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu.map(([i, n, d, p]) => (
              <div key={n} className="bg-white rounded-xl shadow overflow-hidden"><div className="h-32 bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center text-5xl">{i}</div><div className="p-4"><h4 className="font-bold">{n}</h4><p className="text-xs text-gray-500 mb-2">{d}</p><div className="flex justify-between items-center"><span className="text-lg font-bold text-orange-600">{p}</span><button onClick={() => { setCart([...cart, n]); showToast(`${n} added to cart!`); }} className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Add</button></div></div></div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-bold mb-3">🛒 Cart ({cart.length})</h3>
            {cart.length === 0 ? <p className="text-sm text-gray-400 text-center py-4">Cart is empty</p> : cart.map((item, i) => (<div key={i} className="flex justify-between items-center py-2 border-b text-sm"><span>{item}</span><button onClick={() => setCart(cart.filter((_, j) => j !== i))} className="text-red-500 text-xs">Remove</button></div>))}
            <button onClick={() => { if (cart.length === 0) { showToast("Cart is empty!"); return; } showToast(`Order placed! ${cart.length} items.`); setCart([]); }} className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium text-sm">Place Order</button>
          </div>
        </div>
      </div>
    );
  }

  if (activeApp === "clubs") return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLUBS.map(c => (
            <div key={c.name} className="bg-white rounded-xl shadow p-5 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-3"><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">{c.icon}</div><div><h3 className="font-bold text-slate-800">{c.name}</h3><p className="text-xs text-slate-400">{c.dept}</p></div></div>
              <p className="text-sm text-slate-500 mb-2">{c.desc}</p>
              <div className="text-xs text-gray-500 mb-2"><strong>Coordinator:</strong> {c.coordinator}</div>
              <div className="text-xs text-gray-500 mb-2"><strong>Next Event:</strong> {c.nextEvent}</div>
              <div className="text-xs text-gray-500 mb-3"><strong>Budget:</strong> {c.budget}</div>
              <div className="flex justify-between items-center"><span className="text-sm text-slate-500">👥 {c.members} members</span><button onClick={() => showToast(`Joined ${c.name}!`)} className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm">Join</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (activeApp === "hostel") return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {([["mess", "🍽️ Mess Menu"], ["complaints", "📝 Complaints"], ["visitors", "👥 Visitors"], ["fees", "💰 Fees"], ["rooms", "🛏️ Room Alloc."]] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setHostelTab(tab)} className={`w-full py-2 rounded-lg text-sm font-medium ${hostelTab === tab ? "bg-blue-500 text-white" : "bg-white text-slate-700 shadow"}`}>{label}</button>
          ))}
        </div>
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">
          {hostelTab === "mess" && (
            <div><h3 className="font-bold text-lg mb-4">🍽️ Weekly Mess Menu</h3><div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="bg-gray-50">{["Day", "Breakfast", "Lunch", "Dinner"].map(h => <th key={h} className="border px-3 py-2 text-left">{h}</th>)}</tr></thead><tbody>{[["Monday", "Idli, Sambar, Chutney", "Rice, Dal, Veg Curry", "Chapati, Paneer Masala"], ["Tuesday", "Dosa, Chutney", "Jeera Rice, Rajma", "Rice, Sambar, Curd"], ["Wednesday", "Poha, Tea", "Fried Rice, Manchurian", "Chapati, Mixed Veg"], ["Thursday", "Upma, Vada", "Lemon Rice, Sambar", "Rice, Chicken Curry"], ["Friday", "Pongal, Chutney", "Biryani, Raita", "Chapati, Dal Fry"], ["Saturday", "Bread, Omelette", "Pulao, Curry", "Rice, Fish Curry"], ["Sunday", "Idli, Dosa, Special", "Special Meals", "Fried Rice, Gobi"]].map(r => (<tr key={r[0]} className="border-b">{r.map((c, i) => <td key={i} className="border px-3 py-2">{c}</td>)}</tr>))}</tbody></table></div></div>
          )}
          {hostelTab === "complaints" && (
            <div><h3 className="font-bold text-lg mb-4">📝 Register Complaint</h3><div className="space-y-3"><input className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Subject" /><select className="w-full border rounded-lg px-4 py-2 text-sm"><option>Select Category</option><option>Electrical Issue</option><option>Plumbing</option><option>Furniture</option><option>Cleaning</option><option>Wi-Fi / Internet</option><option>Pest Control</option></select><textarea rows={3} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Describe your complaint..." /><button onClick={() => showToast("Complaint registered!")} className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm">Submit</button></div></div>
          )}
          {hostelTab === "fees" && (
            <div><h3 className="font-bold text-lg mb-4">💰 Fee Status</h3><div className="grid grid-cols-3 gap-4">{[["₹18,000", "Paid", "bg-green-50 text-green-600"], ["₹3,000", "Pending", "bg-yellow-50 text-yellow-600"], ["₹0", "Overdue", "bg-red-50 text-red-600"]].map(([v, l, cls]) => (<div key={l} className={`text-center p-4 ${cls.split(' ')[0]} rounded-lg`}><p className={`text-2xl font-bold ${cls.split(' ')[1]}`}>{v}</p><p className="text-sm text-slate-500">{l}</p></div>))}</div></div>
          )}
          {hostelTab === "visitors" && (
            <div><h3 className="font-bold text-lg mb-4">👥 Recent Visitors</h3>
              {[["Mr. Ramesh", "Visiting Arun (Room 204)", "10:30 AM", "Checked Out"], ["Mrs. Lakshmi", "Visiting Sneha (Room 112)", "11:00 AM", "In Campus"], ["Mr. Kumar", "Visiting Vikram (Room 305)", "2:00 PM", "Expected"]].map(([name, info, time, status]) => (
                <div key={name} className="p-3 border rounded-lg mb-2"><div className="flex justify-between"><div><p className="font-medium">{name}</p><p className="text-sm text-gray-500">{info}</p></div><div className="text-right"><span className="text-xs text-gray-400">{time}</span><br /><span className={`text-xs px-2 py-0.5 rounded-full ${status === "In Campus" ? "bg-green-100 text-green-700" : status === "Checked Out" ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}`}>{status}</span></div></div></div>
              ))}
            </div>
          )}
          {hostelTab === "rooms" && (
            <div><h3 className="font-bold text-lg mb-4">🛏️ Room Allocation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Total Rooms</p><p className="text-xl font-bold text-blue-600">320</p></div>
                <div className="bg-green-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Occupied</p><p className="text-xl font-bold text-green-600">301</p></div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Available</p><p className="text-xl font-bold text-yellow-600">19</p></div>
                <div className="bg-purple-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Occupancy</p><p className="text-xl font-bold text-purple-600">94%</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">{[["Block A (Boys)", "80 rooms, 76 occupied"], ["Block B (Boys)", "80 rooms, 78 occupied"], ["Block C (Girls)", "80 rooms, 75 occupied"], ["Block D (Girls)", "80 rooms, 72 occupied"]].map(([block, info]) => (
                <div key={block} className="bg-gray-50 p-3 rounded-lg"><p className="font-medium text-sm">{block}</p><p className="text-xs text-gray-500">{info}</p></div>
              ))}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (activeApp === "transport") return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[["🚌 Route 1", "Nagercoil → Campus", "6:30 AM / 5:00 PM", "45 seats"], ["🚌 Route 2", "Kanyakumari → Campus", "7:00 AM / 5:30 PM", "40 seats"], ["🚌 Route 3", "Marthandam → Campus", "6:45 AM / 5:15 PM", "35 seats"]].map(([route, path, time, seats]) => (
            <div key={route} className="bg-white rounded-xl shadow p-5">
              <h4 className="font-bold text-gray-800">{route}</h4>
              <p className="text-sm text-gray-500">{path}</p>
              <p className="text-xs text-gray-400 mt-1">⏰ {time}</p>
              <p className="text-xs text-green-600 mt-1">🪑 {seats} available</p>
              <button onClick={() => showToast(`Booked ${route}!`)} className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm">Book Seat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (activeApp === "lab") return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[["Computer Lab 1", "CSE", "40 systems", true], ["Computer Lab 2", "IT", "35 systems", true], ["Electronics Lab", "ECE", "30 stations", false], ["Mechanical Workshop", "MECH", "25 stations", true], ["Physics Lab", "S&H", "30 stations", true], ["Chemistry Lab", "S&H", "30 stations", false]].map(([name, dept, capacity, available]) => (
            <div key={name as string} className="bg-white rounded-xl shadow p-5">
              <div className="flex justify-between items-start"><h4 className="font-bold text-gray-800">{name as string}</h4><span className={`text-xs px-2 py-0.5 rounded-full ${available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{available ? "Available" : "In Use"}</span></div>
              <p className="text-sm text-gray-500">{dept as string} · {capacity as string}</p>
              <button onClick={() => showToast(`${available ? "Booked" : "Cannot book"} ${name}!`)} disabled={!available} className={`mt-3 w-full py-2 rounded-lg text-sm ${available ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}>{available ? "Book Now" : "Unavailable"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (activeApp === "library") return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["📚", "Total Books", "50,000+"], ["📖", "E-Books", "10,000+"], ["📰", "Journals", "200"], ["🪑", "Reading Seats", "500"]].map(([i, l, v]) => (
            <div key={l} className="bg-white rounded-xl shadow p-4 text-center"><span className="text-3xl">{i}</span><p className="text-xs text-gray-500 mt-2">{l}</p><p className="text-lg font-bold text-amber-600">{v}</p></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold mb-4">📖 Popular Books</h3>
          {[["Data Structures Using C", "Tenenbaum", "Available (12 copies)"], ["Computer Networks", "Andrew S. Tanenbaum", "Available (8 copies)"], ["Database System Concepts", "Silberschatz", "Available (10 copies)"], ["Introduction to Algorithms", "Cormen", "2 copies left"], ["Operating System Concepts", "Galvin", "Available (6 copies)"]].map(([title, author, status]) => (
            <div key={title} className="flex justify-between items-center py-2 border-b text-sm"><div><span className="font-medium">{title}</span><span className="text-gray-400 ml-2">by {author}</span></div><span className="text-xs text-green-600">{status}</span></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <BackBtn onClick={onBack} /><AppHeader />
      <div className="max-w-7xl mx-auto p-6 text-center py-20">
        <div className="text-6xl mb-4">{apps.find(a => a.id === activeApp)?.icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{apps.find(a => a.id === activeApp)?.title}</h3>
        <p className="text-gray-500 mb-6">{apps.find(a => a.id === activeApp)?.desc}</p>
        <button onClick={() => showToast("Feature launched!")} className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-base font-semibold">Launch Feature</button>
      </div>
    </div>
  );
};

// ─── Syllabus Browser Component ───
const SyllabusBrowser = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedSem, setSelectedSem] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "ta">("en");

  if (selectedSubject) {
    const questions = importantQuestions[selectedSubject] || [];
    const dept = selectedDept ? syllabusData[selectedDept] : null;
    const sem = selectedSem && dept ? dept.semesters[selectedSem] : null;
    const subject = sem?.subjects.find(s => s.code === selectedSubject);
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <button onClick={() => setSelectedSubject(null)} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">← Back to Subjects</button>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{subject?.name}</h3>
        <p className="text-sm text-gray-500 mb-4">Code: {subject?.code} | Credits: {subject?.credits || "N/A"} | Type: {subject?.type}</p>
        {questions.length > 0 && (
          <div className="mt-6"><h4 className="text-lg font-bold text-indigo-700 mb-3">📝 Important Questions</h4><div className="space-y-2">{questions.map((q, i) => (<div key={i} className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400"><p className="text-sm text-gray-700">{i + 1}. {q}</p></div>))}</div></div>
        )}
        <button onClick={() => showToast("Syllabus PDF downloading...")} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm">Download Syllabus PDF</button>
      </div>
    );
  }

  if (selectedSem && selectedDept) {
    const dept = syllabusData[selectedDept];
    const sem = dept?.semesters[selectedSem];
    if (!sem) return null;
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <button onClick={() => setSelectedSem(null)} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">← Back to Semesters</button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{dept.name} — {sem.name}</h3>
        <div className="space-y-3">
          {sem.subjects.map(s => (
            <div key={s.code} onClick={() => setSelectedSubject(s.code)} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 cursor-pointer transition border">
              <div><h4 className="font-semibold text-gray-800">{s.name}</h4><p className="text-xs text-gray-500">{s.code} • {s.credits || "N/A"} Credits • {s.type}</p></div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.type.toLowerCase().includes("practical") || s.type.toLowerCase().includes("project") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{s.category}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedDept) {
    const dept = syllabusData[selectedDept];
    if (!dept) return null;
    return (
      <div>
        <button onClick={() => setSelectedDept(null)} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">← Back to Departments</button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{dept.icon} {dept.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(dept.semesters).map(sem => {
            const semNum = parseInt(sem);
            const colors = ["from-blue-500 to-blue-600", "from-green-500 to-green-600", "from-purple-500 to-purple-600", "from-orange-500 to-orange-600", "from-red-500 to-red-600", "from-indigo-500 to-indigo-600", "from-pink-500 to-pink-600", "from-teal-500 to-teal-600"];
            return (<button key={sem} onClick={() => setSelectedSem(semNum)} className={`py-4 rounded-lg text-white font-semibold bg-gradient-to-r ${colors[(semNum - 1) % 8]} hover:opacity-90 transition`}>Semester {sem}</button>);
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="flex justify-center gap-2 mb-4">
          <button onClick={() => setLang("en")} className={`px-4 py-2 rounded-lg text-sm font-medium ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>English</button>
          <button onClick={() => setLang("ta")} className={`px-4 py-2 rounded-lg text-sm font-medium ${lang === "ta" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>தமிழ்</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {DEPARTMENTS.map(d => (
          <div key={d.code} onClick={() => setSelectedDept(d.code)} className={`bg-gradient-to-br ${d.from} ${d.to} rounded-xl shadow p-5 cursor-pointer hover:-translate-y-1 transition-transform`}>
            <div className={`${d.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}><span className="text-white text-xl">{syllabusData[d.code]?.icon || "🔷"}</span></div>
            <h3 className="font-bold text-gray-800 text-center text-sm">{d.name}</h3>
            <p className={`${d.accent} text-center text-xs font-semibold mt-1`}>Click to view syllabus</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Slider Box ───
const SliderBox = ({ title, slides, color }: { title: string; slides: [string, string][]; color: string }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 3000); return () => clearInterval(t); }, [slides.length]);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">
      <h3 className="text-xl font-bold text-center text-gray-700 mb-4">{title}</h3>
      <div className="rounded-xl overflow-hidden h-36 relative"><div className="h-full flex items-center justify-center text-white text-lg font-bold" style={{ background: slides[idx][1] }}>{slides[idx][0]}</div></div>
    </div>
  );
};

// ─── Main Homepage ───
const Homepage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [showAcademic, setShowAcademic] = useState(false);

  return (
    <div className="bg-gray-50">
      <header className="py-8 px-4 text-white" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #22c55e 100%)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center shadow-lg"><span className="text-5xl">🏫</span></div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">DMI Engineering College</h1>
            <p className="text-xl font-medium">Excellence in Engineering Education</p>
            <p className="italic mt-1 opacity-90">"Innovation • Excellence • Leadership"</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">{["AICTE Approved", "Anna University Affiliated", "NAAC B++"].map(b => (<span key={b} className="bg-white/20 px-3 py-1 rounded-full text-sm">{b}</span>))}</div>
          </div>
        </div>
      </header>

      <nav className="bg-gradient-to-r from-blue-700 to-blue-900 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 px-4">
          {PANELS.map(p => (<button key={p.id} onClick={() => onNavigate(p.id)} className="text-white text-sm px-4 py-2 rounded-lg hover:bg-white/20 transition">{p.icon} {p.label}</button>))}
          <button onClick={() => onNavigate("admission")} className="text-white text-sm px-4 py-2 rounded-lg hover:bg-white/20 transition">📝 Admissions</button>
        </div>
      </nav>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">🏛️ College Management System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PANELS.map(p => (
              <div key={p.id} className={`bg-gradient-to-br ${p.color} rounded-2xl shadow-xl p-6 hover:-translate-y-2 transition-transform`}>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">{p.icon}</div>
                  <h3 className={`text-lg font-bold mb-3 ${p.textColor}`}>{p.label}</h3>
                  <div className="space-y-1 mb-4">{p.stats.map(([k, v]) => (<div key={k} className={`flex justify-between text-xs ${p.textColor}`}><span>{k}:</span><span className="font-bold">{v}</span></div>))}</div>
                  <button onClick={() => onNavigate(p.id)} className={`w-full py-2 rounded-lg text-sm font-semibold ${p.textColor === "text-white" ? "bg-white/20 text-white hover:bg-white/30" : "bg-white text-gray-700 hover:bg-gray-50"} transition`}>{p.label}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">🎓 Academic Departments</h2>
          <p className="text-center text-gray-500 mb-6">Anna University Affiliated Programs</p>
          <div className="text-center mb-10">
            <button onClick={() => setShowAcademic(v => !v)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition">
              📚 {showAcademic ? "Hide" : "View"} Department Syllabus
            </button>
          </div>
          {showAcademic ? <SyllabusBrowser showToast={() => {}} /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEPARTMENTS.map(d => (
                <div key={d.code} className={`bg-gradient-to-br ${d.from} ${d.to} rounded-xl shadow p-5`}>
                  <div className={`${d.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}><span className="text-white text-xl">{syllabusData[d.code]?.icon || "🔷"}</span></div>
                  <h3 className="font-bold text-gray-800 text-center text-sm">{d.name}</h3>
                  <p className={`${d.accent} text-center text-xs font-semibold mt-1`}>8 Semesters • 160 Credits</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">🌟 College Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SliderBox title="🎉 Events" color="blue" slides={[["Tech Fest 2024", "#4f46e5"], ["Cultural Day", "#06b6d4"], ["Sports Meet", "#10b981"], ["Graduation Day", "#f59e0b"], ["Hackathon", "#14b8a6"], ["Annual Day", "#ec4899"]]} />
            <SliderBox title="🏆 Achievements" color="green" slides={[["NBA Accreditation", "#059669"], ["Best College Award", "#dc2626"], ["95% Placement", "#b45309"], ["Research Excellence", "#7c3aed"], ["Innovation Hub", "#059669"]]} />
            <SliderBox title="🏢 Infrastructure" color="purple" slides={[["Smart Classrooms", "#7c3aed"], ["Modern Labs", "#059669"], ["Digital Library", "#dc2626"], ["Sports Complex", "#b45309"], ["Hostel Facilities", "#14b8a6"]]} />
            <SliderBox title="🎓 Alumni" color="orange" slides={[["Tech Leaders", "#f97316"], ["Entrepreneurs", "#4f46e5"], ["Global Professionals", "#06b6d4"], ["Researchers", "#10b981"], ["Startup Founders", "#14b8a6"]]} />
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">🤝 MOU Partners</h2>
          <p className="text-center text-gray-500 mb-10">Strategic partnerships with leading industry organizations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERS.map(p => (
              <div key={p.name} className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 transition-transform">
                <div className={`${p.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}><span className="text-white font-bold text-xs text-center px-1">{p.name}</span></div>
                <h3 className="font-bold text-gray-800 text-center mb-1">{p.name}</h3>
                <p className={`${p.accent} text-center text-sm font-medium mb-2`}>Signed: {p.date}</p>
                <p className="text-gray-500 text-xs text-center">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">📍 About DMI Engineering College</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-blue-600 mb-5">🏛️ College Information</h3>
              <div className="space-y-3 text-sm">
                {[["College Name", "DMI Engineering College"], ["Location", "Kumarapuram Road, Aralvaimozhi, Kanyakumari"], ["Pincode", "629305"], ["Email", "dmieckk@gmail.com"], ["Phone", "+91 4652 278 456"]].map(([k, v]) => (
                  <div key={k} className="flex gap-3"><span className="text-gray-500 w-32">{k}:</span><span className="font-semibold text-gray-800">{v}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-green-600 mb-5">👥 Team & Mentor</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[["Arockia Juliya A.R", "Lead Developer", "bg-blue-50 text-blue-800"], ["Pranesh G / Harish Raja S", "UI/UX Designer", "bg-green-50 text-green-800"], ["Shanmugapriya R / Abin Sam S", "System Analyst", "bg-purple-50 text-purple-800"], ["Asha Lidia A", "Database Admin", "bg-orange-50 text-orange-800"]].map(([n, r, cls]) => (
                  <div key={n} className={`${cls.split(' ')[0]} p-3 rounded-lg`}><h5 className={`font-semibold ${cls.split(' ')[1]} text-sm`}>{n}</h5><p className="text-xs text-gray-600">{r}</p></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <p className="font-medium text-indigo-600 mb-1">Mrs. Monisha Raju (M.Tech)</p>
                <p className="text-gray-600 text-xs">With over 4 years of experience in engineering education, guiding the institution towards excellence in technical education.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">🎓 Ready to Join DMI Engineering College?</h3>
        <p className="mb-5 opacity-90">Start your engineering journey with us today</p>
        <button onClick={() => onNavigate("admission")} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition">Apply Now →</button>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="font-semibold mb-1">DMI Engineering College</p>
        <p className="text-gray-300 text-sm">Excellence in Engineering Education • Innovation • Leadership</p>
        <p className="text-gray-500 text-xs mt-3">© 2025 DMI Engineering College. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function DMICollegePortal() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => setToast(msg), []);
  const hideToast = useCallback(() => setToast(null), []);
  const navigateTo = useCallback((p: string) => setPage(p), []);
  const goHome = useCallback(() => setPage("home"), []);

  const pageProps = { onBack: goHome, showToast };

  return (
    <div className="font-sans">
      {page === "home" && <Homepage onNavigate={navigateTo} />}
      {page === "admin" && <AdminPanel {...pageProps} />}
      {page === "faculty" && <FacultyPanel {...pageProps} />}
      {page === "exam" && <ExamPanel {...pageProps} />}
      {page === "student" && <StudentPanel {...pageProps} />}
      {page === "admission" && <AdmissionPage {...pageProps} />}
      {page === "facilities" && <FacilitiesPage {...pageProps} />}
      {toast && <Toast msg={toast} onClose={hideToast} />}
    </div>
  );
}
