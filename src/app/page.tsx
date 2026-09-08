"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (status === "loading") {
    return <div className="p-8 font-sans">Loading FinMate AI...</div>;
  }

  // State 1: Unauthenticated View (Show Sign In Button)
  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 font-sans bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">FinMate AI</h1>
        <p className="text-gray-600 mb-8">Your Multilingual Personal Finance Coach</p>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Sign In with Google
        </button>
      </main>
    );
  }

  // State 2: Authenticated View (Interactive Dashboard)
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Navigation Header */}
      <header className="flex justify-between items-center p-6 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-800">FinMate AI</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Signed in as <strong>{session.user?.name || session.user?.email}</strong>
          </span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r p-6 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "dashboard" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "reports" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("pro")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "pro" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            Pro Upgrade
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === "settings" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            Settings
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Dashboard View</h2>
              <p className="text-gray-600">Welcome to your AI Financial Hub!</p>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
              <p className="text-gray-600">Your monthly spending trends will appear here.</p>
            </div>
          )}

          {activeTab === "pro" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Pro Upgrade</h2>
              <p className="text-gray-600">Unlock unlimited AI coaching sessions and real-time bank sync.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p className="text-gray-600">Manage account preferences and connected profiles.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}