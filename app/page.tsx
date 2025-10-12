"use client";
import Dashboard from "./components/Dashboard";
import LoginForm, { Session } from "./components/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  return (
    <>
      {session ? (
        <Dashboard session={session} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={(data) => setSession(data)} />
      )}
    </>
  );
}
